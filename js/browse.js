/* browse.js - client-side search, filter and sort over profiles.json. */

(async function () {
  const results = document.getElementById("results");
  if (!results) return;

  const filtersEl = document.getElementById("filters");
  const countEl = document.getElementById("count");
  const searchEl = document.getElementById("search");
  const sortEl = document.getElementById("sort");
  const toggle = document.getElementById("filter-toggle");

  toggle && toggle.addEventListener("click", () => {
    const open = filtersEl.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  results.innerHTML = Array.from({ length: 8 }, skeletonCard).join("");

  let providers = [];
  try {
    providers = await ESC.all();
  } catch (e) {
    results.innerHTML =
      `<div class="empty" style="grid-column:1/-1">${ESC.icons.info}
       <p>Profile konnten nicht geladen werden.</p></div>`;
    return;
  }

  const uniq = (arr) => [...new Set(arr)].sort((a, b) => a.localeCompare(b, "de"));
  const cities = uniq(providers.map((p) => p.city));
  const languages = uniq(providers.flatMap((p) => p.languages));
  const services = uniq(providers.flatMap((p) => p.services));

  const group = (title, name, values) => `
    <h3>${title}</h3>
    <div class="filter-group">
      ${values.map((v) => `
        <label class="check">
          <input type="checkbox" name="${name}" value="${v}"> ${v}
        </label>`).join("")}
    </div>`;

  filtersEl.insertAdjacentHTML("beforeend", `
    ${group("Stadt", "city", cities)}
    ${group("Sprache", "lang", languages)}
    ${group("Services", "svc", services)}
    <h3>Preis pro Stunde</h3>
    <div class="filter-group">
      <select id="f-price" aria-label="Maximaler Stundenpreis">
        <option value="0">Alle Preise</option>
        <option value="200">bis ${ESC.eur(200)}</option>
        <option value="250">bis ${ESC.eur(250)}</option>
        <option value="300">bis ${ESC.eur(300)}</option>
      </select>
    </div>
    <h3>Sonstiges</h3>
    <div class="filter-group">
      <label class="check"><input type="checkbox" id="f-verified"> Nur verifizierte Profile</label>
    </div>
    <div class="filter-group" style="margin-top:1.4rem">
      <button type="button" class="btn btn-ghost btn-block" id="f-reset">Filter zurücksetzen</button>
    </div>
  `);

  // preselect from URL (?city= / ?q=)
  const qCity = ESC.param("city");
  if (qCity) {
    const box = filtersEl.querySelector(`input[name="city"][value="${qCity}"]`);
    if (box) box.checked = true;
  }
  const qText = ESC.param("q");
  if (qText && searchEl) searchEl.value = qText;

  const checked = (name) =>
    [...filtersEl.querySelectorAll(`input[name="${name}"]:checked`)].map((i) => i.value);

  function apply() {
    const text = (searchEl.value || "").trim().toLowerCase();
    const fCities = checked("city");
    const fLangs = checked("lang");
    const fSvc = checked("svc");
    const maxPrice = Number(document.getElementById("f-price").value);
    const onlyVerified = document.getElementById("f-verified").checked;

    let out = providers.filter((p) => {
      if (fCities.length && !fCities.includes(p.city)) return false;
      if (fLangs.length && !fLangs.some((l) => p.languages.includes(l))) return false;
      if (fSvc.length && !fSvc.some((s) => p.services.includes(s))) return false;
      if (maxPrice && p.rates.hour > maxPrice) return false;
      if (onlyVerified && !p.verified) return false;
      if (text) {
        const hay = `${p.name} ${p.city} ${p.district} ${p.services.join(" ")} ${p.tagline}`.toLowerCase();
        if (!hay.includes(text)) return false;
      }
      return true;
    });

    const sort = sortEl.value;
    if (sort === "price-asc") out.sort((a, b) => a.rates.hour - b.rates.hour);
    else if (sort === "price-desc") out.sort((a, b) => b.rates.hour - a.rates.hour);
    else if (sort === "newest") out.sort((a, b) => b.joined.localeCompare(a.joined));

    countEl.innerHTML = `<b>${out.length}</b> ${out.length === 1 ? "Begleiterin" : "Begleiterinnen"}`;

    if (!out.length) {
      results.innerHTML =
        `<div class="empty" style="grid-column:1/-1">${ESC.icons.search}
         <p>Keine Profile entsprechen Ihren Filtern.</p>
         <button class="btn btn-ghost" id="empty-reset" style="margin-top:1rem">Filter zurücksetzen</button></div>`;
      document.getElementById("empty-reset").addEventListener("click", reset);
      return;
    }
    results.innerHTML = out.map(providerCard).join("");
  }

  function reset() {
    filtersEl.querySelectorAll('input[type="checkbox"]').forEach((i) => (i.checked = false));
    document.getElementById("f-price").value = "0";
    searchEl.value = "";
    sortEl.value = "featured";
    apply();
  }

  filtersEl.addEventListener("change", apply);
  searchEl.addEventListener("input", apply);
  sortEl.addEventListener("change", apply);
  document.getElementById("f-reset").addEventListener("click", reset);

  apply();
})();
