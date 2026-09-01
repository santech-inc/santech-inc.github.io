import { escapeHtml } from "../utils/escape.js";

export function renderHero(data) {
  const metrics = data.hero.metrics
    .map(
      (m) => `
        <article class="metric panel">
          <h3>${escapeHtml(m.value)}</h3>
          <p>${escapeHtml(m.label)}</p>
        </article>
      `
    )
    .join("");

  return `
    <div class="container hero-layout">
      <div class="hero-copy reveal">
        <span class="eyebrow">${escapeHtml(data.hero.badge)}</span>
        <h1>${escapeHtml(data.hero.title)}</h1>
        <p>${escapeHtml(data.hero.description)}</p>
        <div class="hero-actions reveal reveal-delay-1">
          <a class="button button-primary" href="#contact">${escapeHtml(data.hero.primaryCta)}</a>
          <a class="button button-secondary" href="#portfolio">${escapeHtml(data.hero.secondaryCta)}</a>
        </div>
      </div>
      <aside class="hero-metrics grid reveal reveal-delay-2">
        ${metrics}
      </aside>
    </div>
  `;
}
