import { escapeHtml } from "../utils/escape.js";

export function renderHero(data) {
  const metrics = data.hero.metrics
    .map(
      (m) => `
        <div class="metric">
          <strong>${escapeHtml(m.value)}</strong>
          <span>${escapeHtml(m.label)}</span>
        </div>
      `
    )
    .join("");

  const signalNodes = data.hero.metrics
    .slice(0, 3)
    .map(
      (m, index) => `
        <span class="signal-node signal-node-${String.fromCharCode(97 + index)}">
          <strong>${escapeHtml(m.value)}</strong>
          <small>${escapeHtml(m.label)}</small>
        </span>
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
      <aside class="hero-visual reveal reveal-delay-2">
        <div class="hero-visual-stage" aria-hidden="true">
          <div class="hero-visual-grid"></div>
          <div class="signal-orbit signal-orbit-a"></div>
          <div class="signal-orbit signal-orbit-b"></div>
          <div class="signal-core"><img src="./assets/logo-256.webp" width="256" height="256" alt="" decoding="async" /></div>
          ${signalNodes}
        </div>
        <div class="hero-metrics">
          ${metrics}
        </div>
      </aside>
    </div>
  `;
}
