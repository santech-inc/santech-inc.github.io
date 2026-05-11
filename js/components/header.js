export function renderHeader(data, locale) {
  const navItems = data.nav
    .map((item) => `<a class="nav-link" href="${item.href}">${item.label}</a>`)
    .join("");

  return `
    <div class="container header-inner reveal">
      <a href="#hero" class="brand" aria-label="SanTech home">
        <span class="brand-symbol" aria-hidden="true">S</span>
        <span class="brand-text">SanTech Inc</span>
      </a>
      <nav class="nav" aria-label="primary">
        ${navItems}
      </nav>
      <div class="lang-switch" role="group" aria-label="language switch">
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
