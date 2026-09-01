// Static pre-render build: bakes each locale's markup + metadata into HTML so
// the site is fully readable by crawlers, social scrapers and JS-disabled
// clients. The runtime (js/main.js) hydrates behavior and handles the ES/EN
// toggle from the same content source, so there is a single source of truth.

import { readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { content } from "../data/content.js";
import { renderHeader } from "../js/components/header.js";
import { renderHero } from "../js/components/hero.js";
import { renderServices } from "../js/components/services.js";
import { renderPortfolio } from "../js/components/portfolio.js";
import { renderProcess } from "../js/components/process.js";
import { renderTechnology } from "../js/components/technology.js";
import { renderTestimonials } from "../js/components/testimonials.js";
import { renderDownloads } from "../js/components/downloads.js";
import { renderContact } from "../js/components/contact.js";
import { renderFooter } from "../js/components/footer.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(root, "dist");

const SITE_URL = "https://santech-inc.github.io";
const OG_IMAGE = `${SITE_URL}/assets/brand.svg`;

// locale -> path relative to SITE_URL and output file inside dist/
const targets = {
  es: { urlPath: "/", outFile: "index.html", depth: 0 },
  en: { urlPath: "/en/", outFile: "en/index.html", depth: 1 },
};

const sectionRenderers = {
  hero: renderHero,
  services: renderServices,
  portfolio: renderPortfolio,
  process: renderProcess,
  technology: renderTechnology,
  testimonials: renderTestimonials,
  downloads: renderDownloads,
  contact: renderContact,
};

function fillElement(html, tag, id, inner) {
  const pattern = new RegExp(
    `(<${tag}\\b[^>]*\\bid="${id}"[^>]*>)([\\s\\S]*?)(</${tag}>)`
  );
  if (!pattern.test(html)) {
    throw new Error(`Template is missing <${tag} id="${id}">`);
  }
  return html.replace(pattern, `$1${inner}$3`);
}

function headBlock(locale) {
  const canonical = `${SITE_URL}${targets[locale].urlPath}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SanTech Inc",
    url: `${SITE_URL}/`,
    logo: OG_IMAGE,
    email: content[locale].contact.email,
    description: content[locale].meta.description,
  };

  const lines = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  for (const [code, t] of Object.entries(targets)) {
    lines.push(`<link rel="alternate" hreflang="${code}" href="${SITE_URL}${t.urlPath}" />`);
  }
  lines.push(
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${targets.es.urlPath}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  );

  return lines.join("\n    ");
}

function buildLocale(template, locale) {
  const data = content[locale];
  let html = template;

  html = html.replace(
    "<html lang=\"es\">",
    `<html lang="${locale}" data-rendered-locale="${locale}">`
  );
  html = html.replace("<!-- build:head -->", headBlock(locale));

  html = html.replace(
    "<title>SanTech Inc</title>",
    `<title>${data.meta.title}</title>`
  );
  html = html.replace(
    /<meta id="meta-description"[^>]*>/,
    `<meta id="meta-description" name="description" content="${escapeAttr(data.meta.description)}" />`
  );
  html = html.replace(
    /<meta id="og-title"[^>]*>/,
    `<meta id="og-title" property="og:title" content="${escapeAttr(data.meta.title)}" />`
  );
  html = html.replace(
    /<meta id="og-description"[^>]*>/,
    `<meta id="og-description" property="og:description" content="${escapeAttr(data.meta.description)}" />`
  );
  html = html.replace(
    /<meta property="og:locale"[^>]*>/,
    `<meta property="og:locale" content="${data.meta.ogLocale}" />`
  );

  html = fillElement(html, "header", "site-header", renderHeader(data, locale));
  for (const [id, renderSection] of Object.entries(sectionRenderers)) {
    html = fillElement(html, "section", id, renderSection(data));
  }
  html = fillElement(html, "footer", "site-footer", renderFooter(data));

  if (targets[locale].depth > 0) {
    const prefix = "../".repeat(targets[locale].depth);
    html = html.replace(/(src|href)="\.\//g, `$1="${prefix}`);
  }

  return html;
}

function escapeAttr(value) {
  return String(value).replace(/"/g, "&quot;");
}

async function main() {
  const template = await readFile(resolve(root, "index.html"), "utf8");

  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  for (const [locale, target] of Object.entries(targets)) {
    if (!content[locale]) {
      continue;
    }
    const outPath = resolve(distDir, target.outFile);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, buildLocale(template, locale), "utf8");
    console.log(`  ${target.outFile}`);
  }

  for (const asset of ["css", "js", "data", "assets"]) {
    await cp(resolve(root, asset), resolve(distDir, asset), { recursive: true });
  }

  console.log("Build complete -> dist/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
