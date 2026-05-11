export function renderFooter(data) {
  const year = new Date().getFullYear();

  return `
    <div class="container footer-inner">
      <p>${data.footer.copy}</p>
      <p>© ${year} ${data.footer.rights}</p>
    </div>
  `;
}
