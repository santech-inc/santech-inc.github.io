import { escapeHtml } from "../utils/escape.js";

export function renderPortfolio(data) {
  const items = data.portfolio.items
    .map(
      (item) => `
        <article class="case-card panel reveal">
          <span class="case-tag">${escapeHtml(item.tag)}</span>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.impact)}</p>
        </article>
      `
    )
    .join("");

  return `
    <div class="container">
      <span class="eyebrow">${escapeHtml(data.portfolio.title)}</span>
      <div class="grid cards-3">
        ${items}
      </div>
    </div>
  `;
}
