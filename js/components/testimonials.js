import { escapeHtml } from "../utils/escape.js";

export function renderTestimonials(data) {
  const items = data.testimonials.items
    .map(
      (item) => `
        <figure class="testimonial panel reveal">
          <blockquote>${escapeHtml(item.quote)}</blockquote>
          <figcaption>${escapeHtml(item.author)}</figcaption>
        </figure>
      `
    )
    .join("");

  return `
    <div class="container">
      <span class="eyebrow">${escapeHtml(data.testimonials.title)}</span>
      <div class="grid cards-2">
        ${items}
      </div>
    </div>
  `;
}
