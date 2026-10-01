import { escapeHtml } from "../utils/escape.js";

export function renderFooter(data) {
  const year = new Date().getFullYear();
  const repoLink = data.footer.repoLink
    ? `<p><a class="footer-link" href="${escapeHtml(data.footer.repoLink.href)}">${escapeHtml(
        data.footer.repoLink.label
      )}</a></p>`
    : "";

  return `
    <div class="container footer-inner">
      <div class="footer-brand">
        <img src="./assets/logo-96.webp" width="40" height="40" alt="SanTech Inc" loading="lazy" decoding="async" />
        <p>${escapeHtml(data.footer.copy)}</p>
      </div>
      ${repoLink}
      <p>© ${year} ${escapeHtml(data.footer.rights)}</p>
    </div>
  `;
}
