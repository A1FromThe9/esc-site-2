/* home.js - renders featured providers on the landing page. */

(async function () {
  const grid = document.getElementById("featured-grid");
  if (!grid) return;

  grid.innerHTML = Array.from({ length: 4 }, skeletonCard).join("");
  try {
    const all = await ESC.all();
    const featured = all.filter((p) => p.featured).slice(0, 4);
    grid.innerHTML = featured.map(providerCard).join("");
  } catch (e) {
    grid.innerHTML =
      `<div class="empty" style="grid-column:1/-1">${ESC.icons.info}
       <p>Profiles could not be loaded. Please reload the page.</p></div>`;
  }
})();
