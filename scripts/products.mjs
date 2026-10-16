// Builds the portfolio collages (one image per product, up to 3 screenshots
// each) that the landing shows in the "Casos destacados" section.
//
// One-off / manual: run `npm run products` after changing a product or its
// sources, then commit the generated WebP + JPG in assets/products/.
// The build itself never runs this (like scripts/og.mjs).
//
// Requires: Google Chrome (headless screenshots) and ImageMagick (`magick`).
// The myTracker artboards come from the sibling myTracker project; override the
// path with MYTRACKER_DESIGN if it lives elsewhere.

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, mkdir, rm, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "assets/products");

const CHROME =
  process.env.CHROME ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const MYTRACKER_DESIGN =
  process.env.MYTRACKER_DESIGN ||
  "/Users/san/Projects/myTracker/art/designs/myTracker.html";

const UA = "curl/8.7.1";
const CANVAS = { w: 1200, h: 750 };

// Canvas palette comes from the site brand (css/variables.css) so the collages
// sit naturally on the dark portfolio cards.
const BG_TOP = "#182451";
const BG_BOTTOM = "#0a0f24";

const PRODUCTS = [
  {
    slug: "a-la-mesa",
    layout: "phones",
    tiles: [
      { source: "alamesa-landing", crop: { x: 1616, y: 304, w: 400, h: 928 } },
      { source: "alamesa-landing", crop: { x: 2080, y: 400, w: 400, h: 896 } },
      { source: "alamesa-app" },
    ],
  },
  {
    slug: "mytracker",
    layout: "wides",
    tiles: [
      { source: "mytracker-design", crop: { x: 60, y: 180, w: 2820, h: 1540 } },
      { source: "mytracker-design", crop: { x: 60, y: 1940, w: 2820, h: 1540 } },
      { source: "mytracker-design", crop: { x: 60, y: 4100, w: 2820, h: 1540 } },
    ],
  },
  {
    slug: "buma",
    layout: "phones",
    tiles: [{ source: "buma-play-1" }, { source: "buma-play-2" }, { source: "buma-play-3" }],
  },
  {
    slug: "simon-in-space",
    layout: "phones",
    tiles: [{ source: "simon-play-1" }, { source: "simon-play-2" }, { source: "simon-play-3" }],
  },
  {
    slug: "apple2google-maps",
    layout: "phones",
    tiles: [{ source: "a2g-play-1" }, { source: "a2g-play-2" }, { source: "a2g-play-0" }],
  },
  {
    slug: "bigfolderwidget",
    layout: "phones",
    tiles: [
      { source: "bigfolder-shot-1" },
      { source: "bigfolder-shot-2" },
      { source: "bigfolder-shot-3" },
    ],
  },
  {
    slug: "psiphonqt",
    layout: "wides",
    tiles: [
      { source: "psiphon-macos" },
      { source: "psiphon-windows" },
      { source: "psiphon-linux" },
    ],
  },
];

const PLAY_APPS = {
  buma: "com.santech.buma",
  simon: "com.santech.simon_in_space",
  a2g: "org.santech.apple2googlemaps",
};

const PSIPHON_BASE =
  "https://raw.githubusercontent.com/santech-inc/PsiphonQt/main/screencaps";

const raw = {}; // logical source name -> absolute file path

async function magick(args) {
  await run("magick", args);
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": UA } });
  if (!res.ok) {
    throw new Error(`GET ${url} -> ${res.status}`);
  }
  return res.text();
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "user-agent": UA } });
  if (!res.ok) {
    throw new Error(`GET ${url} -> ${res.status}`);
  }
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

async function chromeShot(url, { w, h, dsf = 2, budget = 15000, out }) {
  await run(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-sandbox",
    "--disable-extensions",
    `--force-device-scale-factor=${dsf}`,
    `--virtual-time-budget=${budget}`,
    `--window-size=${w},${h}`,
    `--screenshot=${out}`,
    url,
  ]);
}

function fileUrl(path) {
  return `file://${path}`;
}

// Extracts the highest-resolution screenshot URLs from a Play Store page.
async function playScreenshots(path) {
  const html = await fetchText(
    `https://play.google.com/store/apps/details?id=${path}&hl=en&gl=US`
  );
  const tags = html.match(/<img\b[^>]*>/g) || [];
  const out = [];
  for (const tag of tags) {
    if (!tag.includes("data-screenshot-index")) {
      continue;
    }
    const srcset = /srcset="([^"]+)"/.exec(tag);
    if (!srcset) {
      continue;
    }
    const candidates = srcset[1].match(/https:\/\/play-lh\.googleusercontent\.com\/[A-Za-z0-9_=-]+/g);
    if (candidates && candidates.length) {
      out.push(candidates[candidates.length - 1].split("=")[0] + "=s0");
    }
  }
  return [...new Set(out)];
}

async function collectSources(workDir) {
  for (const [key, id] of Object.entries(PLAY_APPS)) {
    const urls = await playScreenshots(id);
    if (urls.length < 4) {
      throw new Error(`${key}: expected >=4 screenshots, got ${urls.length}`);
    }
    for (let i = 0; i < 4; i += 1) {
      const file = join(workDir, `raw-${key}-play-${i}.img`);
      await download(urls[i], file);
      raw[`${key}-play-${i}`] = file;
    }
  }

  for (let i = 1; i <= 3; i += 1) {
    const file = join(workDir, `raw-bigfolder-shot-${i}.img`);
    await download(
      `https://big-icon-folder-widget.github.io/assets/screenshot-${i}.jpg`,
      file
    );
    raw[`bigfolder-shot-${i}`] = file;
  }

  const psiphon = {
    "psiphon-macos": "MacOS_Monterrey.jpg",
    "psiphon-windows": "Windows10_windowMode.jpg",
    "psiphon-linux": "Plasma_windowMode.jpg",
  };
  for (const [name, file] of Object.entries(psiphon)) {
    const dest = join(workDir, `raw-${name}.img`);
    await download(`${PSIPHON_BASE}/${file}`, dest);
    raw[name] = dest;
  }

  // A la mesa landing (phone mockups) + live app screen.
  const alamesaLanding = join(workDir, "raw-alamesa-landing.png");
  await chromeShot("https://www.alamesa.menu/", { w: 1440, h: 900, out: alamesaLanding });
  raw["alamesa-landing"] = alamesaLanding;

  const alamesaApp = join(workDir, "raw-alamesa-app.png");
  await chromeShot("https://www.alamesa.menu/hammilton", {
    w: 390,
    h: 844,
    budget: 20000,
    out: alamesaApp,
  });
  raw["alamesa-app"] = alamesaApp;

  // myTracker UI artboards (single tall render, cropped per tile below).
  const design = join(workDir, "raw-mytracker-design.png");
  await chromeShot(fileUrl(MYTRACKER_DESIGN), {
    w: 1440,
    h: 9000,
    out: design,
  });
  raw["mytracker-design"] = design;
}

async function cropTile(source, tile, dest) {
  const src = raw[source];
  if (!src) {
    throw new Error(`unknown source ${source}`);
  }
  if (tile.crop) {
    const { x, y, w, h } = tile.crop;
    await magick([src, "-crop", `${w}x${h}+${x}+${y}`, "+repage", dest]);
  } else {
    await writeFile(dest, await readFile(src));
  }
}

async function tileBoxes(layout) {
  // Fixed boxes keep every collage in a layout visually consistent; sources
  // that differ slightly in aspect ratio letterbox onto the transparent canvas.
  if (layout === "phones") {
    const w = 306;
    const h = 654;
    const r = 24;
    const gap = 40;
    const total = 3 * w + 2 * gap;
    const x0 = Math.round((CANVAS.w - total) / 2);
    const y = Math.round((CANVAS.h - h) / 2);
    return Array.from({ length: 3 }, (_, i) => ({
      x: x0 + i * (w + gap),
      y,
      w,
      h,
      r,
    }));
  }
  // wides: two on top, one centered below (fills the 16:10 canvas).
  const w = 544;
  const h = 340;
  const r = 16;
  const gx = 32;
  const gy = 24;
  const x0 = Math.round((CANVAS.w - (2 * w + gx)) / 2);
  const y0 = Math.round((CANVAS.h - (2 * h + gy)) / 2);
  return [
    { x: x0, y: y0, w, h, r },
    { x: x0 + w + gx, y: y0, w, h, r },
    { x: Math.round((CANVAS.w - w) / 2), y: y0 + h + gy, w, h, r },
  ];
}

async function roundedTile(src, { w, h, r, fit }, dest) {
  const geom = fit === "cover" ? `${w}x${h}^` : `${w}x${h}`;
  const mask = `roundrectangle 0,0,${w - 1},${h - 1},${r},${r}`;
  await magick([
    src,
    "-resize",
    geom,
    "-background",
    "none",
    "-gravity",
    "center",
    "-extent",
    `${w}x${h}`,
    "(",
    "-size",
    `${w}x${h}`,
    "xc:none",
    "-fill",
    "white",
    "-draw",
    mask,
    ")",
    "-compose",
    "DstIn",
    "-composite",
    "-stroke",
    "rgba(255,255,255,0.22)",
    "-strokewidth",
    "2",
    "-fill",
    "none",
    "-draw",
    `roundrectangle 1,1,${w - 2},${h - 2},${r},${r}`,
    dest,
  ]);
}

async function softShadow(w, h, r, dest) {
  await magick([
    "-size",
    `${w}x${h}`,
    "xc:none",
    "-fill",
    "rgba(0,0,0,0.55)",
    "-draw",
    `roundrectangle 0,0,${w - 1},${h - 1},${r},${r}`,
    "-blur",
    "0x22",
    dest,
  ]);
}

function gridDraw(w, h) {
  const parts = [];
  for (let x = 100; x < w; x += 100) {
    parts.push(`line ${x},0 ${x},${h}`);
  }
  for (let y = 100; y < h; y += 100) {
    parts.push(`line 0,${y} ${w},${y}`);
  }
  return parts.join(" ");
}

async function buildCanvas(dest) {
  await magick([
    "-size",
    `${CANVAS.w}x${CANVAS.h}`,
    `gradient:${BG_TOP}-${BG_BOTTOM}`,
    "-fill",
    "rgba(45,128,228,0.22)",
    "-draw",
    `circle ${CANVAS.w - 190},150 ${CANVAS.w - 190},400`,
    "-fill",
    "rgba(111,224,255,0.14)",
    "-draw",
    `circle 160,650 160,880`,
    "-blur",
    "0x70",
    "-stroke",
    "rgba(255,255,255,0.05)",
    "-strokewidth",
    "1",
    "-draw",
    gridDraw(CANVAS.w, CANVAS.h),
    dest,
  ]);
}

async function buildCollage(product, workDir) {
  const boxes = await tileBoxes(product.layout);
  if (boxes.length !== product.tiles.length) {
    throw new Error(`${product.slug}: layout expects ${boxes.length} tiles`);
  }

  const canvas = join(workDir, `${product.slug}-canvas.png`);
  await buildCanvas(canvas);

  for (let i = 0; i < product.tiles.length; i += 1) {
    const box = boxes[i];
    const cropped = join(workDir, `${product.slug}-${i}-crop.png`);
    const framed = join(workDir, `${product.slug}-${i}-tile.png`);
    const shadow = join(workDir, `${product.slug}-${i}-shadow.png`);
    await cropTile(product.tiles[i].source, product.tiles[i], cropped);
    await roundedTile(
      cropped,
      { ...box, fit: product.layout === "wides" ? "cover" : "contain" },
      framed
    );
    await softShadow(box.w, box.h, box.r, shadow);
    await magick([canvas, shadow, "-geometry", `+${box.x + 5}+${box.y + 14}`, "-composite", canvas]);
    await magick([canvas, framed, "-geometry", `+${box.x}+${box.y}`, "-composite", canvas]);
  }

  await magick([canvas, "-quality", "82", "-define", "webp:method=6", join(outDir, `${product.slug}.webp`)]);
  await magick([canvas, "-quality", "86", "-sampling-factor", "4:2:0", "-strip", join(outDir, `${product.slug}.jpg`)]);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const workDir = await mkdtemp(join(tmpdir(), "santech-products-"));
  try {
    console.log("Collecting sources...");
    await collectSources(workDir);
    console.log(`  ${Object.keys(raw).length} sources`);
    for (const product of PRODUCTS) {
      await buildCollage(product, workDir);
      console.log(`  assets/products/${product.slug}.webp|.jpg`);
    }
    console.log("Done.");
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
