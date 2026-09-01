import { escapeHtml } from "../utils/escape.js";

export function renderContact(data) {
  const contact = data.contact;

  return `
    <div class="container contact-box panel reveal">
      <div>
        <span class="eyebrow">${escapeHtml(contact.eyebrow)}</span>
        <h2>${escapeHtml(contact.title)}</h2>
        <p>${escapeHtml(contact.description)}</p>
      </div>
      <div class="contact-actions">
        <a class="button button-primary" href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.button)}</a>
        <a class="button button-secondary" href="${escapeHtml(contact.whatsapp)}" target="_blank" rel="noopener noreferrer">${escapeHtml(contact.whatsappLabel)}</a>
      </div>
    </div>
  `;
}
