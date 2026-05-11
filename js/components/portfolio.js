export function renderPortfolio(data) {
  const items = data.portfolio.items
    .map(
      (item) => `
        <article class="case-card panel reveal">
          <span class="case-tag">${item.tag}</span>
          <h3>${item.name}</h3>
          <p>${item.impact}</p>
        </article>
      `
    )
    .join("");

  return `
    <div class="container">
      <span class="eyebrow">${data.portfolio.title}</span>
      <div class="grid cards-3">
        ${items}
      </div>
    </div>
  `;
}
