export function renderTechnology(data) {
  const tags = data.technology.tags
    .map((tag) => `<li class="tech-tag">${tag}</li>`)
    .join("");

  return `
    <div class="container panel tech-panel reveal">
      <span class="eyebrow">${data.technology.title}</span>
      <ul class="tech-tags">${tags}</ul>
    </div>
  `;
}
