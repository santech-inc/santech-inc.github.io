import { site } from "../../data/content.js";
import { escapeHtml } from "../utils/escape.js";

const BRAND_MARK = `<img src="./assets/logo-96.webp" width="40" height="40" alt="" decoding="async" />`;

export function renderHeader(data, locale) {
  const navItems = data.nav
    .map(
      (item) =>
        `<a class="nav-link" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`
    )
    .join("");

  const a11y = data.a11y;
  const langLinks = Object.entries(site.paths)
    .map(
      ([code, path]) =>
        `<a class="lang-button ${code === locale ? "is-active" : ""}" href="${escapeHtml(path)}" hreflang="${code}" lang="${code}" data-locale="${code}"${
          code === locale ? ' aria-current="true"' : ""
        }>${code.toUpperCase()}</a>`
    )
    .join("");

  return `
    <div class="container header-inner reveal">
      <a href="#hero" class="brand" aria-label="${escapeHtml(a11y.homeLabel)}">
        <span class="brand-symbol">${BRAND_MARK}</span>
        <span class="brand-text">SanTech Inc</span>
      </a>
      <button
        class="nav-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="primary-nav"
        aria-label="${escapeHtml(a11y.navToggleOpen)}"
        data-label-open="${escapeHtml(a11y.navToggleOpen)}"
        data-label-close="${escapeHtml(a11y.navToggleClose)}"
      >
        <span class="nav-toggle-bar" aria-hidden="true"></span>
      </button>
      <nav id="primary-nav" class="nav" aria-label="${escapeHtml(a11y.navLabel)}">
        ${navItems}
      </nav>
      <div class="lang-switch" role="group" aria-label="${escapeHtml(a11y.langSwitchLabel)}">
        ${langLinks}
      </div>
    </div>
  `;
}
