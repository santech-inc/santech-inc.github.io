export function renderTestimonials(data) {
  const items = data.testimonials.items
    .map(
      (item) => `
        <figure class="testimonial panel reveal">
          <blockquote>${item.quote}</blockquote>
          <figcaption>${item.author}</figcaption>
        </figure>
      `
    )
    .join("");

  return `
    <div class="container">
      <span class="eyebrow">${data.testimonials.title}</span>
      <div class="grid cards-2">
        ${items}
      </div>
    </div>
  `;
}
