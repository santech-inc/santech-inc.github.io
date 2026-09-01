import { escapeHtml } from "../utils/escape.js";

export function renderTechnology(data) {
  const tags = data.technology.tags
    .map((tag) => `<li class="tech-tag">${escapeHtml(tag)}</li>`)
    .join("");

  return `
    <div class="container panel tech-panel reveal">
      <span class="eyebrow">${escapeHtml(data.technology.title)}</span>
      <ul class="tech-tags">${tags}</ul>
    </div>
  `;
}
