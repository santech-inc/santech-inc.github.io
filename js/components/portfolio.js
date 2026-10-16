import { escapeHtml } from "../utils/escape.js";

export function renderPortfolio(data) {
  const items = data.portfolio.items
    .map((item, index) => {
      const links = item.links || (item.link ? [{ url: item.link, label: item.linkLabel || item.link }] : []);
      const linksHtml = links
        .map(
          (l) =>
            `<a class="case-link" href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label || l.url)}</a>`
        )
        .join("");

      const mediaHtml = item.image
        ? `
          <div class="case-media">
            <picture>
              ${item.imageWebp ? `<source type="image/webp" srcset="${escapeHtml(item.imageWebp)}" />` : ""}
              <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt || item.name)}" width="1200" height="750" loading="lazy" decoding="async" />
            </picture>
          </div>`
        : "";

      return `
        <article class="case-card ${index === 0 ? "case-card-featured" : ""} panel reveal">
          ${mediaHtml}
          <div class="case-body">
            <span class="case-index">${escapeHtml(String(index + 1).padStart(2, "0"))}</span>
            <span class="case-tag">${escapeHtml(item.tag)}</span>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.impact)}</p>
            ${linksHtml ? `<div class="case-links">${linksHtml}</div>` : ""}
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <div class="container">
      <span class="eyebrow">${escapeHtml(data.portfolio.title)}</span>
      <h2>${escapeHtml(data.portfolio.heading)}</h2>
      <div class="portfolio-grid">
        ${items}
      </div>
      ${data.portfolio.note ? `<p class="portfolio-note">${escapeHtml(data.portfolio.note)}</p>` : ""}
    </div>
  `;
}
