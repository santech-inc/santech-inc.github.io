const HTML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Escapes a value for safe interpolation into an HTML string.
 *
 * Every dynamic text or attribute value coming from `data/content.js` goes
 * through here before being placed inside a template literal, so a stray `<`
 * (or a future non-trusted content source) can never inject markup.
 */
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);
}
