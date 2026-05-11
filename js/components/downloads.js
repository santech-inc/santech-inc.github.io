export function renderDownloads(data) {
  const download = data.downloads;

  return `
    <div class="container downloads panel reveal">
      <div>
        <span class="eyebrow">${download.title}</span>
        <h2>${download.description}</h2>
      </div>
      <div class="download-actions">
        <a class="button button-primary" href="${download.androidUrl}" target="_blank" rel="noopener noreferrer">${download.android}</a>
        <a class="button button-secondary" href="${download.iosUrl}" target="_blank" rel="noopener noreferrer">${download.ios}</a>
        <a class="button button-secondary" href="${download.docsUrl}" target="_blank" rel="noopener noreferrer">${download.docs}</a>
      </div>
    </div>
  `;
}
