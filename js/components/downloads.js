import { escapeHtml } from "../utils/escape.js";

export function renderDownloads(data) {
  const download = data.downloads;

  return `
    <div class="container downloads panel reveal">
      <div>
        <span class="eyebrow">${escapeHtml(download.title)}</span>
        <h2>${escapeHtml(download.description)}</h2>
      </div>
      <div class="download-actions">
        <a class="button button-primary" href="${escapeHtml(download.androidUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(download.android)}</a>
        <a class="button button-secondary" href="${escapeHtml(download.iosUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(download.ios)}</a>
        <a class="button button-secondary" href="${escapeHtml(download.docsUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(download.docs)}</a>
      </div>
    </div>
  `;
}
