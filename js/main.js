import { content } from "../data/content.js";
import { renderHeader } from "./components/header.js";
import { renderHero } from "./components/hero.js";
import { renderServices } from "./components/services.js";
import { renderPortfolio } from "./components/portfolio.js";
import { renderProcess } from "./components/process.js";
import { renderTechnology } from "./components/technology.js";
import { renderTestimonials } from "./components/testimonials.js";
import { renderDownloads } from "./components/downloads.js";
import { renderFaq } from "./components/faq.js";
import { renderContact } from "./components/contact.js";
import { renderFooter } from "./components/footer.js";

document.documentElement.classList.add("js");

const ids = {
  header: document.getElementById("site-header"),
  hero: document.getElementById("hero"),
  services: document.getElementById("services"),
  portfolio: document.getElementById("portfolio"),
  process: document.getElementById("process"),
  technology: document.getElementById("technology"),
  testimonials: document.getElementById("testimonials"),
  downloads: document.getElementById("downloads"),
  faq: document.getElementById("faq"),
  contact: document.getElementById("contact"),
  footer: document.getElementById("site-footer"),
  metaDescription: document.getElementById("meta-description"),
  ogDescription: document.getElementById("og-description"),
  ogTitle: document.getElementById("og-title"),
};

const sectionRenderers = [
  ["hero", renderHero],
  ["services", renderServices],
  ["portfolio", renderPortfolio],
  ["process", renderProcess],
  ["technology", renderTechnology],
  ["testimonials", renderTestimonials],
  ["downloads", renderDownloads],
  ["faq", renderFaq],
  ["contact", renderContact],
  ["footer", renderFooter],
];

const locales = Object.keys(content);
const defaultLocale = locales.includes("es") ? "es" : locales[0];
const localeKey = "santech-locale";
let revealObserver = null;
const prerenderedLocale = document.documentElement.dataset.renderedLocale;

function getLocale() {
  let savedLocale = null;
  try {
    savedLocale = localStorage.getItem(localeKey);
  } catch (error) {
    savedLocale = null;
  }
  return savedLocale && content[savedLocale] ? savedLocale : defaultLocale;
}

function persistLocale(locale) {
  try {
    localStorage.setItem(localeKey, locale);
  } catch (error) {
    /* storage unavailable (private mode, blocked) — non-fatal */
  }
}

function syncMeta(data, locale) {
  document.title = data.meta.title;
  ids.metaDescription?.setAttribute("content", data.meta.description);
  ids.ogDescription?.setAttribute("content", data.meta.description);
  ids.ogTitle?.setAttribute("content", data.meta.title);
  document.documentElement.lang = locale;
}

function closeMobileNav() {
  const toggle = ids.header?.querySelector(".nav-toggle");
  if (!toggle) {
    return;
  }
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", toggle.dataset.labelOpen ?? "");
  ids.header?.classList.remove("nav-open");
}

function bindHeader(locale) {
  const header = ids.header;
  if (!header) {
    return;
  }

  header.querySelectorAll(".lang-button").forEach((link) => {
    link.addEventListener("click", (event) => {
      const nextLocale = link.dataset.locale;
      if (!nextLocale || !content[nextLocale]) {
        return;
      }
      persistLocale(nextLocale);
      // Built pages: follow the real per-locale URL. Unbuilt dev shell: swap in place.
      if (prerenderedLocale) {
        return;
      }
      event.preventDefault();
      if (nextLocale !== locale) {
        render(nextLocale);
      }
    });
  });

  const toggle = header.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute(
        "aria-label",
        (isOpen ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? ""
      );
    });
  }

  header.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });
}

function bindReveals() {
  revealObserver?.disconnect();

  const elements = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  elements.forEach((element) => revealObserver.observe(element));
}

function bindGlobal() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  });
}

function render(locale) {
  const data = content[locale];

  if (ids.header) {
    ids.header.innerHTML = renderHeader(data, locale);
  }
  sectionRenderers.forEach(([key, renderSection]) => {
    if (ids[key]) {
      ids[key].innerHTML = renderSection(data);
    }
  });

  syncMeta(data, locale);
  bindHeader(locale);
  bindReveals();
}

if (prerenderedLocale && content[prerenderedLocale]) {
  // Built page: the URL (/ or /en/) defines the language, so the markup is
  // already correct — only wire up behavior.
  syncMeta(content[prerenderedLocale], prerenderedLocale);
  bindHeader(prerenderedLocale);
  bindReveals();
} else {
  render(getLocale());
}

bindGlobal();
