import { escapeHtml } from "../utils/escape.js";

export function renderProcess(data) {
  const items = data.process.steps
    .map(
      (item, index) => `
        <article class="process-step panel reveal">
          <span class="step-index">${escapeHtml(String(index + 1).padStart(2, "0"))}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </article>
      `
    )
    .join("");

  return `
    <div class="container">
      <span class="eyebrow">${escapeHtml(data.process.title)}</span>
      <div class="grid cards-4">
        ${items}
      </div>
    </div>
  `;
}
