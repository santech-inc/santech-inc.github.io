export function renderHero(data) {
  const metrics = data.hero.metrics
    .map(
      (m) => `
        <article class="metric panel">
          <h3>${m.value}</h3>
          <p>${m.label}</p>
        </article>
      `
    )
    .join("");

  return `
    <div class="container hero-layout">
      <div class="hero-copy reveal">
        <span class="eyebrow">${data.hero.badge}</span>
        <h1>${data.hero.title}</h1>
        <p>${data.hero.description}</p>
        <div class="hero-actions reveal reveal-delay-1">
          <a class="button button-primary" href="#contact">${data.hero.primaryCta}</a>
          <a class="button button-secondary" href="#portfolio">${data.hero.secondaryCta}</a>
        </div>
      </div>
      <aside class="hero-metrics grid reveal reveal-delay-2">
        ${metrics}
      </aside>
    </div>
  `;
}
