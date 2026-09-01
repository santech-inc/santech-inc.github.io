import { escapeHtml } from "../utils/escape.js";

export function renderServices(data) {
  const items = data.services.items
    .map(
      (item) => `
        <article class="service-card panel reveal">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </article>
      `
    )
    .join("");

  return `
    <div class="container">
      <span class="eyebrow">${escapeHtml(data.services.title)}</span>
      <h2>${escapeHtml(data.services.description)}</h2>
      <div class="grid cards-3">
        ${items}
      </div>
    </div>
  `;
}
