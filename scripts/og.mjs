// Generates the Open Graph share cards (1200x630 PNG) for each locale.
// One-off / manual: run `node scripts/og.mjs` after changing the card design,
// then commit the PNGs in assets/. Requires ImageMagick (`magick`) on PATH.
//
// The build itself does not run this (keeps CI converter-free); it only copies
// the committed PNGs from assets/.

import { writeFile, unlink } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const cards = {
  es: { line1: "Desarrollo de software", line2: "a medida" },
  en: { line1: "Custom software", line2: "development" },
};

const svg = ({ line1, line2 }) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0D1946"/><stop offset="0.5" stop-color="#1F2F85"/><stop offset="1" stop-color="#5C48D2"/>
    </linearGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="88" y2="88" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00BDDF"/><stop offset="0.5" stop-color="#2D80E4"/><stop offset="1" stop-color="#6F5DE5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g opacity="0.10" stroke="#FFFFFF" stroke-width="1">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="630"/>`).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1200" y2="${i * 100}"/>`).join("")}
  </g>
  <g transform="translate(96,88)">
    <rect width="88" height="88" rx="24" fill="url(#mark)"/>
    <path d="M56 31c-2.5-2.7-6.3-4.4-11-4.4-7.7 0-12.6 3.8-12.6 9.9 0 5.5 4.1 8 11 9.3l3.6.8c3.8.8 5.5 1.9 5.5 4.1 0 2.5-2.5 4.1-6.3 4.1-3.8 0-6.9-1.4-9.1-4.1l-5.2 4.7c2.7 3.6 7.7 5.8 13.7 5.8 8.2 0 13.7-4.1 13.7-10.7 0-5.8-4.1-8.5-11.5-9.9l-3.6-.8c-3.6-.8-4.9-1.9-4.9-3.8 0-2.2 2.2-3.6 5.5-3.6 3.3 0 6 1.1 8 3.6z" fill="#fff"/>
    <text x="112" y="60" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-size="40" font-weight="700" fill="#fff">SanTech Inc</text>
  </g>
  <text x="96" y="330" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-size="92" font-weight="700" fill="#fff">${line1}</text>
  <text x="96" y="440" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-size="92" font-weight="700" fill="#03BEDF">${line2}</text>
  <text x="96" y="560" font-family="Sora, Helvetica, Arial, sans-serif" font-size="30" fill="#E9EFFF" fill-opacity="0.82">santech-inc.github.io</text>
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
