// Static pre-render build: bakes each locale's markup + metadata into HTML so
// the site is fully readable by crawlers, social scrapers and JS-disabled
// clients. The runtime (js/main.js) hydrates behavior from the same content
// source, so there is a single source of truth.
//
// Also emits SEO plumbing: bundled CSS, sitemap.xml (with hreflang),
// robots.txt, 404.html and site.webmanifest.

import { readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { content, site } from "../data/content.js";
import { renderHeader } from "../js/components/header.js";
import { renderHero } from "../js/components/hero.js";
import { renderServices } from "../js/components/services.js";
import { renderPortfolio } from "../js/components/portfolio.js";
import { renderProcess } from "../js/components/process.js";
import { renderTechnology } from "../js/components/technology.js";
import { renderTestimonials } from "../js/components/testimonials.js";
import { renderDownloads } from "../js/components/downloads.js";
import { renderFaq } from "../js/components/faq.js";
import { renderContact } from "../js/components/contact.js";
import { renderFooter } from "../js/components/footer.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(root, "dist");

const SITE_URL = site.url;
const LOGO_URL = `${SITE_URL}/assets/brand.svg`;
const ogImage = (locale) => `${SITE_URL}/assets/og-${locale}.png`;
const CSS_FILES = ["variables", "base", "background", "sections", "header", "animations"];
const BUNDLE_PATH = "css/site.css";

// locale -> output file inside dist/ and folder depth (for relative assets)
const targets = {
  es: { outFile: "index.html", depth: 0 },
  en: { outFile: "en/index.html", depth: 1 },
};
const pageUrl = (locale) => `${SITE_URL}${site.paths[locale]}`;

const sectionRenderers = {
  hero: renderHero,
  services: renderServices,
  portfolio: renderPortfolio,
  process: renderProcess,
  technology: renderTechnology,
  testimonials: renderTestimonials,
  downloads: renderDownloads,
  faq: renderFaq,
  contact: renderContact,
};

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function escapeXml(value) {
  return escapeAttr(value).replace(/>/g, "&gt;");
}

function fillElement(html, tag, id, inner) {
  const pattern = new RegExp(`(<${tag}\\b[^>]*\\bid="${id}"[^>]*>)([\\s\\S]*?)(</${tag}>)`);
  if (!pattern.test(html)) {
    throw new Error(`Template is missing <${tag} id="${id}">`);
  }
  return html.replace(pattern, (_, open, __, close) => `${open}${inner}${close}`);
}

function replaceOrThrow(html, search, replacement) {
  const matched = typeof search === "string" ? html.includes(search) : search.test(html);
  if (!matched) {
    throw new Error(`Template is missing expected markup: ${search}`);
  }
  return html.replace(search, () => replacement);
}

function structuredData(locale) {
  const data = content[locale];
  const url = pageUrl(locale);
  const orgId = `${SITE_URL}/#organization`;

  const apps = data.portfolio.items.map((item) => ({
    "@type": item.category === "DesktopEnhancementApplication" ? "SoftwareApplication" : "MobileApplication",
    name: item.name,
    applicationCategory: item.category,
    description: item.impact,
    url: item.links[0]?.url,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    sameAs: item.links.slice(1).map((link) => link.url),
    creator: { "@id": orgId },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "SanTech Inc",
        url: `${SITE_URL}/`,
        logo: LOGO_URL,
        email: data.contact.email,
        description: data.meta.description,
        sameAs: site.sameAs,
        knowsAbout: data.technology.tags,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: data.contact.email,
          availableLanguage: ["es", "en"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: data.services.title,
          itemListElement: data.services.items.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.text,
              provider: { "@id": orgId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: data.meta.siteName,
        inLanguage: ["es", "en"],
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: data.meta.title,
        description: data.meta.description,
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": orgId },
        primaryImageOfPage: ogImage(locale),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: locale,
        mainEntity: data.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${url}#apps`,
        name: data.portfolio.heading,
        itemListElement: apps.map((app, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: app,
        })),
      },
    ],
  };
}

function headBlock(locale) {
  const data = content[locale];
  const canonical = pageUrl(locale);
  const alternateLocales = Object.keys(targets)
    .filter((code) => code !== locale)
    .map((code) => `<meta property="og:locale:alternate" content="${content[code].meta.ogLocale}" />`);

  const lines = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage(locale)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(data.meta.title)}" />`,
    ...alternateLocales,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(data.meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(data.meta.description)}" />`,
    `<meta name="twitter:image" content="${ogImage(locale)}" />`,
  ];
  for (const code of Object.keys(targets)) {
    lines.push(`<link rel="alternate" hreflang="${code}" href="${pageUrl(code)}" />`);
  }
  lines.push(
    `<link rel="alternate" hreflang="x-default" href="${pageUrl("es")}" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c")}</script>`
  );

  return lines.join("\n    ");
}

function applyCommonHead(html, locale, depth) {
  const data = content[locale];

  html = replaceOrThrow(html, '<html lang="es">', `<html lang="${locale}" data-rendered-locale="${locale}">`);
  html = replaceOrThrow(
    html,
    /<!-- build:css -->[\s\S]*?<!-- endbuild:css -->/,
    `<link rel="stylesheet" href="./${BUNDLE_PATH}" />`
  );
  html = replaceOrThrow(html, "<title>SanTech Inc</title>", `<title>${escapeXml(data.meta.title)}</title>`);
  html = replaceOrThrow(
    html,
    /<meta id="meta-description"[^>]*>/,
    `<meta id="meta-description" name="description" content="${escapeAttr(data.meta.description)}" />`
  );
  html = replaceOrThrow(
    html,
    /<meta id="og-title"[^>]*>/,
    `<meta id="og-title" property="og:title" content="${escapeAttr(data.meta.title)}" />`
  );
  html = replaceOrThrow(
    html,
    /<meta id="og-description"[^>]*>/,
    `<meta id="og-description" property="og:description" content="${escapeAttr(data.meta.description)}" />`
  );
  html = replaceOrThrow(
    html,
    /<meta property="og:locale"[^>]*>/,
    `<meta property="og:locale" content="${data.meta.ogLocale}" />`
  );

  if (depth > 0) {
    const prefix = "../".repeat(depth);
    html = html.replace(/(src|href)="\.\//g, `$1="${prefix}`);
  }
  return html;
}

function buildLocale(template, locale) {
  const data = content[locale];
  let html = template.replace("<!-- build:head -->", () => headBlock(locale));

  html = fillElement(html, "header", "site-header", renderHeader(data, locale));
  for (const [id, renderSection] of Object.entries(sectionRenderers)) {
    html = fillElement(html, "section", id, renderSection(data));
  }
  html = fillElement(html, "footer", "site-footer", renderFooter(data));

  return applyCommonHead(html, locale, targets[locale].depth);
}

// 404 lives at the site root; GitHub Pages serves it for any missing path, so
// every asset/link must be root-absolute.
function build404(template) {
  const es = content.es;
  const en = content.en;
  let html = template.replace("<!-- build:head -->", '<meta name="robots" content="noindex" />');
  html = html.replace(/<meta name="robots" content="index[^>]*>\n\s*/, "");
  html = applyCommonHead(html, "es", 0);
  html = html.replace(` data-rendered-locale="es"`, "");
  html = html.replace(/(src|href)="\.\//g, '$1="/');
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>404 · ${escapeXml(es.notFound.title)} | SanTech Inc</title>`);

  const body = `
    <main class="not-found">
      <div>
        <span class="eyebrow">404</span>
        <h1>${escapeXml(es.notFound.title)}</h1>
        <p>${escapeXml(es.notFound.text)}</p>
        <p lang="en">${escapeXml(en.notFound.text)}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="/">${escapeXml(es.notFound.cta)}</a>
          <a class="button button-secondary" href="/en/" lang="en">${escapeXml(en.notFound.cta)}</a>
        </div>
      </div>
    </main>`;
  return html.replace(/<body>[\s\S]*<\/body>/, () => `<body>${body}\n  </body>`);
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const alternates = Object.keys(targets)
    .map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${pageUrl(code)}" />`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl("es")}" />`)
    .join("\n");

  const urls = Object.keys(targets)
    .map(
      (code) => `  <url>
    <loc>${pageUrl(code)}</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

const robots = () => `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const manifest = () =>
  JSON.stringify(
    {
      name: "SanTech Inc",
      short_name: "SanTech",
      description: content.es.meta.description,
      start_url: "/",
      display: "browser",
      background_color: "#091126",
      theme_color: "#091126",
      icons: [
        { src: "/assets/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/assets/icons/icon-512.png", sizes: "512x512", type: "image/png" },
        { src: "/assets/brand.svg", sizes: "any", type: "image/svg+xml" },
      ],
    },
    null,
    2
  );

async function bundleCss() {
  const parts = await Promise.all(
    CSS_FILES.map(async (name) => `/* ${name}.css */\n${await readFile(resolve(root, `css/${name}.css`), "utf8")}`)
  );
  // Light minification: drop comments and collapse whitespace.
  return parts
    .join("\n")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

async function main() {
  const template = await readFile(resolve(root, "index.html"), "utf8");

  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  for (const asset of ["js", "data", "assets"]) {
    await cp(resolve(root, asset), resolve(distDir, asset), {
      recursive: true,
      filter: (src) => !src.endsWith(".DS_Store"),
    });
  }
  // public/: files served verbatim at the site root (e.g. Google Search
  // Console verification). Generated files below take precedence.
  await cp(resolve(root, "public"), distDir, {
    recursive: true,
    filter: (src) => !src.endsWith(".DS_Store"),
  });
  await mkdir(resolve(distDir, "css"), { recursive: true });
  await writeFile(resolve(distDir, BUNDLE_PATH), await bundleCss(), "utf8");

  for (const [locale, target] of Object.entries(targets)) {
    const outPath = resolve(distDir, target.outFile);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, buildLocale(template, locale), "utf8");
    console.log(`  ${target.outFile}`);
  }

  const extras = {
    "404.html": build404(template),
    "sitemap.xml": buildSitemap(),
    "robots.txt": robots(),
    "site.webmanifest": manifest(),
  };
  for (const [file, body] of Object.entries(extras)) {
    await writeFile(resolve(distDir, file), body, "utf8");
    console.log(`  ${file}`);
  }

  console.log("Build complete -> dist/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
