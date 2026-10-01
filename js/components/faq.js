import { escapeHtml } from "../utils/escape.js";

export function renderFaq(data) {
  const items = data.faq.items
    .map(
      (item) => `
        <details class="faq-item reveal">
          <summary><h3>${escapeHtml(item.q)}</h3></summary>
          <p>${escapeHtml(item.a)}</p>
        </details>
      `
    )
    .join("");

  return `
    <div class="container faq-layout">
      <div class="faq-intro">
        <span class="eyebrow">${escapeHtml(data.faq.title)}</span>
        <h2>${escapeHtml(data.faq.heading)}</h2>
      </div>
      <div class="faq-list">
        ${items}
      </div>
    </div>
  `;
}
