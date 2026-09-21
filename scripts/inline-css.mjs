// Inlines the built stylesheets into every dist HTML document and drops the files.
//
// Runs as `postbuild`, on Vite's output rather than on the sources, so the styles still
// live only in src/styles/*.css — nothing here is hand-maintained and nothing can drift.
//
// The site paints its first screen from static HTML (see the boot shell in index.html),
// which left one render-blocking request between the document and first paint. On a
// throttled mobile connection that request was worth ~900 ms of FCP and ~1 s of Speed
// Index. The whole stylesheet is 37 kB and the host serves HTML brotli-compressed, so
// carrying it in the document is cheaper than fetching it.
//
// The trade is that the CSS is no longer cached across pages: each of the ten documents
// carries its own copy, so a second page costs those bytes again instead of a cache hit.
// That is the right way round for a marketing site people arrive at from search.
import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const LINK = /[ \t]*<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>\n?/g;

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith(".html")) out.push(path);
  }
  return out;
}

const used = new Set();
let pages = 0;
let bytes = 0;

for (const file of await htmlFiles(DIST)) {
  const html = readFileSync(file, "utf8");
  const hrefs = [...html.matchAll(LINK)].map((m) => m[1]);
  if (!hrefs.length) continue;

  const css = hrefs
    .map((href) => {
      const asset = join(DIST, href.replace(/^\//, ""));
      used.add(asset);
      return readFileSync(asset, "utf8");
    })
    .join("");

  // The first link becomes the <style>; the rest just go, so the cascade order holds.
  let first = true;
  const out = html.replace(LINK, () => (first ? ((first = false), `    <style>${css}</style>\n`) : ""));
  writeFileSync(file, out);
  pages++;
  bytes = css.length;
  console.log(`  inlined ${(css.length / 1024).toFixed(1)} kB into ${relative(DIST, file)}`);
}

// Nothing links them any more, and no JS chunk imports them — see the CSS note in CLAUDE.md.
for (const asset of used) if (existsSync(asset)) rmSync(asset);

console.log(`inline-css: ${(bytes / 1024).toFixed(1)} kB into ${pages} page(s), ${used.size} file(s) removed`);
