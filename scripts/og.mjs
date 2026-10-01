// Generates the Open Graph share cards (1200x630 PNG) for each locale.
// One-off / manual: run `node scripts/og.mjs` after changing the card design,
// then commit the PNGs in assets/. Requires ImageMagick (`magick`) on PATH.
//
// The build itself does not run this (keeps CI converter-free); it only copies
// the committed PNGs from assets/.

import { readFile, writeFile, unlink } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const cards = {
  es: { line1: "Apps móviles y", line2: "software a medida", tagline: "50+ clientes · iOS · Android · Escritorio" },
  en: { line1: "Mobile apps and", line2: "custom software", tagline: "50+ clients · iOS · Android · Desktop" },
};

// Real logo (same artwork as the favicon), rendered to PNG and embedded inline.
const logoPng = resolve(root, "assets/.og-logo.png");
await run("magick", ["-background", "none", "-density", "600", resolve(root, "assets/brand.svg"), "-resize", "192x192", "-strip", logoPng]);
const logoData = `data:image/png;base64,${(await readFile(logoPng)).toString("base64")}`;
await unlink(logoPng);

const svg = ({ line1, line2, tagline }) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#091126"/><stop offset="0.58" stop-color="#1B2C6B"/><stop offset="1" stop-color="#5545BD"/>
    </linearGradient>
    <clipPath id="logo-clip"><rect width="96" height="96" rx="24"/></clipPath>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g opacity="0.10" stroke="#FFFFFF" stroke-width="1">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="630"/>`).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1200" y2="${i * 100}"/>`).join("")}
  </g>
  <g transform="translate(96,88)">
    <image href="${logoData}" xlink:href="${logoData}" width="96" height="96" clip-path="url(#logo-clip)"/>
    <text x="120" y="62" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-size="40" font-weight="700" fill="#fff">SanTech Inc</text>
  </g>
  <text x="96" y="330" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="#fff">${line1}</text>
  <text x="96" y="440" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="#03BEDF">${line2}</text>
  <text x="96" y="520" font-family="Sora, Helvetica, Arial, sans-serif" font-size="30" fill="#E9EFFF" fill-opacity="0.9">${tagline}</text>
  <text x="96" y="572" font-family="Sora, Helvetica, Arial, sans-serif" font-size="26" fill="#A7B8D5">santech-inc.github.io</text>
</svg>`;

for (const [locale, card] of Object.entries(cards)) {
  const svgPath = resolve(root, `assets/og-${locale}.svg`);
  const pngPath = resolve(root, `assets/og-${locale}.png`);
  await writeFile(svgPath, svg(card), "utf8");
  await run("magick", [
    "-density", "192", svgPath,
    "-resize", "1200x630", "-flatten", "-strip", pngPath,
  ]);
  await unlink(svgPath);
  console.log(`  assets/og-${locale}.png`);
}
