import { content } from "../data/content.js";
import { renderHeader } from "./components/header.js";
import { renderHero } from "./components/hero.js";
import { renderServices } from "./components/services.js";
import { renderPortfolio } from "./components/portfolio.js";
import { renderProcess } from "./components/process.js";
import { renderTechnology } from "./components/technology.js";
import { renderTestimonials } from "./components/testimonials.js";
import { renderDownloads } from "./components/downloads.js";
import { renderContact } from "./components/contact.js";
import { renderFooter } from "./components/footer.js";

const ids = {
  header: document.getElementById("site-header"),
  hero: document.getElementById("hero"),
  services: document.getElementById("services"),
  portfolio: document.getElementById("portfolio"),
  process: document.getElementById("process"),
  technology: document.getElementById("technology"),
  testimonials: document.getElementById("testimonials"),
  downloads: document.getElementById("downloads"),
  contact: document.getElementById("contact"),
  footer: document.getElementById("site-footer"),
  metaDescription: document.getElementById("meta-description"),
  ogDescription: document.getElementById("og-description"),
};

const defaultLocale = "es";
const localeKey = "santech-locale";

function getLocale() {
  const savedLocale = localStorage.getItem(localeKey);
  return savedLocale && content[savedLocale] ? savedLocale : defaultLocale;
}

function syncMeta(data, locale) {
  document.title = data.meta.title;
  ids.metaDescription.setAttribute("content", data.meta.description);
  ids.ogDescription.setAttribute("content", data.meta.description);
  document.documentElement.lang = locale;
}

function bindLanguageSwitcher() {
  const langButtons = document.querySelectorAll(".lang-button");

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextLocale = button.dataset.locale;
      if (!nextLocale || !content[nextLocale]) {
        return;
      }

      localStorage.setItem(localeKey, nextLocale);
      render(nextLocale);
    });
  });
}

function render(locale) {
  const data = content[locale];

  ids.header.innerHTML = renderHeader(data, locale);
  ids.hero.innerHTML = renderHero(data);
  ids.services.innerHTML = renderServices(data);
  ids.portfolio.innerHTML = renderPortfolio(data);
  ids.process.innerHTML = renderProcess(data);
  ids.technology.innerHTML = renderTechnology(data);
  ids.testimonials.innerHTML = renderTestimonials(data);
  ids.downloads.innerHTML = renderDownloads(data);
  ids.contact.innerHTML = renderContact(data);
  ids.footer.innerHTML = renderFooter(data);

  syncMeta(data, locale);
  bindLanguageSwitcher();
}

render(getLocale());
