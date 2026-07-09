/* cards.js - the provider card, shared by the home and browse grids. */

function providerCard(p) {
  const verified = p.verified
    ? `<span class="badge-verified">${ESC.icons.shield} Verified</span>` : "";
  const tags = p.services.slice(0, 2)
    .map((s) => `<span class="tag">${s}</span>`).join("");
  return `
    <article class="card">
      <a class="card-link" href="profile.html?id=${encodeURIComponent(p.id)}"
         aria-label="View ${p.name}'s profile">
        <div class="card-media">
          ${verified}
          <img src="${ESC.photo(p.photos[0], 520, 700)}" alt="${p.name}, ${p.city}" loading="lazy">
        </div>
        <div class="card-body">
          <div class="card-name">${p.name}<span class="age">${p.age}</span></div>
          <div class="card-meta">
            <span>${p.city}</span>
            <span aria-hidden="true">&middot;</span>
            <span class="price">from ${ESC.eur(p.rates.hour)}/hr</span>
          </div>
          <div class="card-tags">${tags}</div>
        </div>
      </a>
    </article>`;
}

function skeletonCard() {
  return `<div class="skeleton"><div class="sk-media"></div></div>`;
}
