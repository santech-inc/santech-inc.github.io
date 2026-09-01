import { escapeHtml } from "../utils/escape.js";

const BRAND_MARK = `
  <svg viewBox="0 0 32 32" role="img" aria-hidden="true" focusable="false">
    <rect width="32" height="32" rx="9" fill="url(#brand-mark-gradient)" />
    <path
      d="M20.5 11.4c-.9-1-2.3-1.6-4-1.6-2.8 0-4.6 1.4-4.6 3.6 0 2 1.5 2.9 4 3.4l1.3.3c1.4.3 2 .7 2 1.5 0 .9-.9 1.5-2.3 1.5-1.4 0-2.5-.5-3.3-1.5l-1.9 1.7c1 1.3 2.8 2.1 5 2.1 3 0 5-1.5 5-3.9 0-2.1-1.5-3.1-4.2-3.6l-1.3-.3c-1.3-.3-1.8-.7-1.8-1.4 0-.8.8-1.3 2-1.3 1.2 0 2.2.4 2.9 1.3z"
      fill="#fff"
    />
    <defs>
      <linearGradient id="brand-mark-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stop-color="#00BDDF" />
        <stop offset="0.5" stop-color="#2D80E4" />
        <stop offset="1" stop-color="#6F5DE5" />
      </linearGradient>
    </defs>
  </svg>
`;

export function renderHeader(data, locale) {
  const navItems = data.nav
    .map(
      (item) =>
        `<a class="nav-link" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`
    )
    .join("");

  const a11y = data.a11y;

  return `
    <div class="container header-inner reveal">
      <a href="#hero" class="brand" aria-label="SanTech home">
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
        <button class="lang-button ${locale === "es" ? "is-active" : ""}" data-locale="es" aria-pressed="${
          locale === "es"
        }">ES</button>
        <button class="lang-button ${locale === "en" ? "is-active" : ""}" data-locale="en" aria-pressed="${
          locale === "en"
        }">EN</button>
      </div>
    </div>
  `;
}
