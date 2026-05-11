export function renderProcess(data) {
  const items = data.process.steps
    .map(
      (item, index) => `
        <article class="process-step panel reveal">
          <span class="step-index">0${index + 1}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");

  return `
    <div class="container">
      <span class="eyebrow">${data.process.title}</span>
      <div class="grid cards-4">
        ${items}
      </div>
    </div>
  `;
}
