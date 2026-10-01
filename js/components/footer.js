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
      <p>${escapeHtml(data.footer.copy)}</p>
      ${repoLink}
      <p>© ${year} ${escapeHtml(data.footer.rights)}</p>
    </div>
  `;
}
