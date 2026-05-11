export function renderContact(data) {
  return `
    <div class="container contact-box panel reveal">
      <div>
        <span class="eyebrow">Contact</span>
        <h2>${data.contact.title}</h2>
        <p>${data.contact.description}</p>
      </div>
      <div class="contact-actions">
        <a class="button button-primary" href="mailto:${data.contact.email}">${data.contact.button}</a>
        <a class="button button-secondary" href="${data.contact.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </div>
  `;
}
