/* data.js - shared data access, helpers and icon set.
   Icons: a single consistent stroke family (24x24, 1.6 stroke, round joins),
   inlined because this prototype has no build step to pull an icon package.
   Kept to one visual family and one stroke width on purpose. */

const ESC = (() => {
  let _cache = null;

  async function load() {
    if (_cache) return _cache;
    const res = await fetch("data/profiles.json", { cache: "no-cache" });
    if (!res.ok) throw new Error("profiles load failed");
    _cache = await res.json();
    return _cache;
  }

  async function all() { return (await load()).providers; }

  async function byId(id) {
    return (await all()).find((p) => p.id === id) || null;
  }

  // picsum placeholder photography, deterministic per seed
  function photo(seed, w = 600, h = 800) {
    return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
  }

  function eur(n) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency", currency: "EUR", maximumFractionDigits: 0,
    }).format(n);
  }

  function param(name) {
    return new URLSearchParams(location.search).get(name);
  }

  // ---- icons ----
  const S = (d, extra = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}${extra}</svg>`;

  const icons = {
    shield: S('<path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>'),
    pin: S('<path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z"/><circle cx="12" cy="11" r="2"/>'),
    search: S('<circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/>'),
    check: S('<path d="M5 12l4.5 4.5L19 7"/>'),
    star: S('<path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>'),
    globe: S('<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3c2.5 2.4 3.8 5.5 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3z"/>'),
    calendar: S('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5"/><line x1="8" y1="3" x2="8" y2="6.5"/><line x1="16" y1="3" x2="16" y2="6.5"/>'),
    lock: S('<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>'),
    arrow: S('<line x1="4" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>'),
    menu: S('<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>'),
    close: S('<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>'),
    info: S('<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none"/>'),
    clock: S('<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>'),
    sliders: S('<line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="9" cy="8" r="2.2" fill="var(--bg)"/><circle cx="15" cy="16" r="2.2" fill="var(--bg)"/>'),
    chevron: S('<polyline points="9 6 15 12 9 18"/>'),
    heart: S('<path d="M12 20s-7-4.4-9.2-8.6C1.2 8 3 5 6 5c1.8 0 3.1 1 4 2.3C10.9 6 12.2 5 14 5c3 0 4.8 3 3.2 6.4C19 15.6 12 20 12 20z"/>'),
    card: S('<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><line x1="3" y1="10" x2="21" y2="10"/>'),
  };

  return { load, all, byId, photo, eur, param, icons };
})();
