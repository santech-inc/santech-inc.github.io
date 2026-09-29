import { escapeHtml } from "../utils/escape.js";

export function renderPortfolio(data) {
  const items = data.portfolio.items
    .map((item) => {
      const links = item.links || (item.link ? [{ url: item.link, label: item.linkLabel || item.link }] : []);
      const linksHtml = links
        .map(
          (l) =>
            `<a class="case-link" href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label || l.url)}</a>`
        )
        .join("");

      return `
        <article class="case-card panel reveal">
          <span class="case-tag">${escapeHtml(item.tag)}</span>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.impact)}</p>
          ${linksHtml ? `<div class="case-links">${linksHtml}</div>` : ""}
        </article>
      `;
    })
    .join("");

  return `
    <div class="container">
      <span class="eyebrow">${escapeHtml(data.portfolio.title)}</span>
      <div class="grid cards-4">
        ${items}
      </div>
      ${data.portfolio.note ? `<p class="portfolio-note">${escapeHtml(data.portfolio.note)}</p>` : ""}
    </div>
  `;
}
