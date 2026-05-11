export function renderServices(data) {
  const items = data.services.items
    .map(
      (item) => `
        <article class="service-card panel reveal">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");

  return `
    <div class="container">
      <span class="eyebrow">${data.services.title}</span>
      <h2>${data.services.description}</h2>
      <div class="grid cards-3">
        ${items}
      </div>
    </div>
  `;
}
