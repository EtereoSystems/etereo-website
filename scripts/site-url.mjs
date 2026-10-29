// Single source of truth for the public site origin used in canonical, og:url, JSON-LD and
// sitemap URLs. Resolves from the environment, then an optional .env file, then a default,
// with any trailing slash removed. The page generators and the postbuild inliner all read
// this, so every emitted absolute URL agrees on one domain — and a missing .env can never
// ship a raw %VITE_SITE_URL% placeholder in a tag that crawlers and social scrapers read.
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let fromFile;
const envPath = join(root, ".env");
if (existsSync(envPath)) {
  const m = readFileSync(envPath, "utf8").match(/^\s*VITE_SITE_URL\s*=\s*(.*)\s*$/m);
  if (m) fromFile = m[1].replace(/^["']|["']$/g, "");
}

export const SITE_URL = (
  process.env.VITE_SITE_URL ||
  fromFile ||
  "https://www.etereosystems.com"
).replace(/\/+$/, "");
