<?php
// Receives the contact form (src/components/Contact.tsx) and forwards it to the inbox.
// Written for PHP 7.4+ so it runs on whatever version the Websupport host is set to.
declare(strict_types=1);

// Websupport only sends mail() whose From is a mailbox that exists on this domain.
const INBOX = 'info@etereosystems.com';
const PER_IP_HOUR = 5;
// the From mailbox's own 300/h sending quota is shared with the people who use it
const ALL_HOUR = 40;

date_default_timezone_set('Europe/Bratislava');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply(int $code, string $error = ''): void
{
    http_response_code($code);
    echo json_encode($error === '' ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

// Hashed key and timestamps only, kept for an hour, outside the web root.
function allow(string $key, int $max): bool
{
    $file = sys_get_temp_dir() . '/etereo-contact-' . hash('sha256', __DIR__ . $key);
    $fh = @fopen($file, 'c+');
    if ($fh === false) {
        return true;
    }
    flock($fh, LOCK_EX);
    $now = time();
    $hits = array_filter(
        json_decode(stream_get_contents($fh) ?: '[]', true) ?: [],
        function ($t) use ($now) { return is_int($t) && $t > $now - 3600; }
    );
    $ok = count($hits) < $max;
    if ($ok) {
        $hits[] = $now;
        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, json_encode(array_values($hits)));
    }
    flock($fh, LOCK_UN);
    fclose($fh);
    return $ok;
}

// RFC 2047 caps an encoded word at 75 chars, so split on character boundaries
function encode_header(string $s): string
{
    preg_match_all('/.{1,11}/us', $s, $m);
    return implode(' ', array_map(function ($c) { return '=?UTF-8?B?' . base64_encode($c) . '?='; }, $m[0]));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, 'method');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '')) {
    reply(403, 'origin');
}

$in = json_decode((string) file_get_contents('php://input', false, null, 0, 32768), true);
if (!is_array($in)) {
    reply(400, 'body');
}

// only a bot fills the field nobody can see; let it think it worked
if (($in['website'] ?? '') !== '') {
    reply(200);
}

$text = function (string $k) use ($in): string { return is_string($in[$k] ?? null) ? trim($in[$k]) : ''; };
// anything that ends up in a header has to stay on one line
$line = function (string $s): string { return (string) preg_replace('/\s+/u', ' ', $s); };
// the u flag also rejects input that is not valid UTF-8
$fits = function (string $s, int $max): bool { return preg_match('/^.{1,' . $max . '}$/us', $s) === 1; };

$name = $line($text('name'));
$email = $text('email');
$company = $line($text('company'));
$context = $text('context');
$lang = ($in['lang'] ?? '') === 'sk' ? 'SK' : 'EN';
$topics = [];
foreach (is_array($in['topics'] ?? null) ? array_slice($in['topics'], 0, 10) : [] as $t) {
    if (is_string($t) && $fits($line($t), 100)) {
        $topics[] = $line($t);
    }
}

if (
    !$fits($name, 200)
    || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || ($company !== '' && !$fits($company, 200))
    || !$fits($context, 5000)
    || ($in['consent'] ?? false) !== true
) {
    reply(422, 'invalid');
}

if (!allow($_SERVER['REMOTE_ADDR'] ?? '', PER_IP_HOUR) || !allow('*', ALL_HOUR)) {
    reply(429, 'rate');
}

$body = implode("\n", [
    'Nový dopyt z kontaktného formulára na webe.',
    '',
    'Meno:   ' . $name,
    'E-mail: ' . $email,
    'Firma:  ' . ($company !== '' ? $company : '—'),
    'Témy:   ' . ($topics ? implode(', ', $topics) : '—'),
    'Jazyk:  ' . $lang,
    '',
    'Správa:',
    $context,
    '',
    '—',
    'Odoslané ' . date('j. n. Y H:i') . ' so súhlasom so spracovaním osobných údajov.',
    'Odpoveď (Reply) ide priamo na adresu odosielateľa.',
]);

preg_match('/^.{0,80}/us', $name . ($company !== '' ? ', ' . $company : ''), $who);
$sent = mail(
    INBOX,
    encode_header('Dopyt z webu: ' . $who[0]),
    quoted_printable_encode((string) preg_replace('/\r\n?|\n/', "\r\n", $body)),
    [
        'From' => 'ETEREO web <' . INBOX . '>',
        'Reply-To' => $email,
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding' => 'quoted-printable',
    ],
    // envelope sender on our own domain, so SPF aligns for the domain's DMARC policy
    '-f' . INBOX
);

if (!$sent) {
    error_log('contact.php: mail() returned false');
    reply(500, 'mail');
}
reply(200);
