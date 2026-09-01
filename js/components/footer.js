import { escapeHtml } from "../utils/escape.js";

export function renderFooter(data) {
  const year = new Date().getFullYear();

  return `
    <div class="container footer-inner">
      <p>${escapeHtml(data.footer.copy)}</p>
      <p>© ${year} ${escapeHtml(data.footer.rights)}</p>
    </div>
  `;
}
