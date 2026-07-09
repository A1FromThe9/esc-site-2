/* profile.js - renders a single provider from ?id= and a simple lightbox. */

(async function () {
  const root = document.getElementById("profile-root");
  if (!root) return;

  const id = ESC.param("id");
  let p = null;
  try { p = id ? await ESC.byId(id) : null; } catch (e) { /* handled below */ }

  if (!p) {
    root.innerHTML = `
      <div class="empty">${ESC.icons.info}
        <p>This profile could not be found.</p>
        <a class="btn btn-ghost" href="browse.html" style="margin-top:1rem">View all companions</a>
      </div>`;
    return;
  }

  document.title = `${p.name}, ${p.city} · Aurélie`;

  const verified = p.verified
    ? `<span class="badge-verified" style="position:static">${ESC.icons.shield} Verified</span>` : "";

  const gallery = `
    <div class="gallery">
      <figure class="g-main" data-full="${ESC.photo(p.photos[0], 1200, 900)}">
        <img src="${ESC.photo(p.photos[0], 900, 675)}" alt="${p.name}, photo 1">
      </figure>
      ${p.photos.slice(1).map((seed, i) => `
        <figure data-full="${ESC.photo(seed, 900, 1125)}">
          <img src="${ESC.photo(seed, 500, 625)}" alt="${p.name}, photo ${i + 2}" loading="lazy">
        </figure>`).join("")}
    </div>`;

  const stats = `
    <div class="stat-row">
      <div class="stat"><div class="k">Age</div><div class="v">${p.age}</div></div>
      <div class="stat"><div class="k">Height</div><div class="v">${p.height}<small> cm</small></div></div>
      <div class="stat"><div class="k">Location</div><div class="v" style="font-size:1.15rem">${p.city}</div></div>
    </div>`;

  const langs = p.languages.map((l) => `<span class="chip">${l}</span>`).join("");
  const svcs = p.services.map((s) => `<span class="chip">${s}</span>`).join("");

  root.innerHTML = `
    <div class="profile">
      <div>${gallery}</div>
      <div class="profile-info">
        ${verified}
        <h1 style="margin-top:.75rem">${p.name} <span class="age">${p.age}</span></h1>
        <div class="profile-loc">${ESC.icons.pin} ${p.district}, ${p.city}</div>
        <p class="prose" style="font-size:1.1rem;color:var(--text)">${p.tagline}</p>
        ${stats}

        <h3 style="font-family:var(--font-ui);font-size:.78rem;text-transform:uppercase;letter-spacing:.16em;color:var(--text-faint);margin-bottom:.6rem">About me</h3>
        <div class="prose"><p>${p.about}</p></div>

        <h3 style="font-family:var(--font-ui);font-size:.78rem;text-transform:uppercase;letter-spacing:.16em;color:var(--text-faint);margin:1.5rem 0 .2rem">Languages</h3>
        <div class="chips">${langs}</div>

        <h3 style="font-family:var(--font-ui);font-size:.78rem;text-transform:uppercase;letter-spacing:.16em;color:var(--text-faint);margin:.5rem 0 .2rem">Companionship</h3>
        <div class="chips">${svcs}</div>

        <div class="booking-panel">
          <div class="rate">
            <span class="amt">${ESC.eur(p.rates.hour)}</span>
            <span class="per">/ hour</span>
          </div>
          <p class="deposit-note">Deposit to reserve: <b>${ESC.eur(p.rates.deposit)}</b>.
             Availability: ${p.availability}.</p>
          <a class="btn btn-primary btn-block btn-lg" href="booking.html?id=${encodeURIComponent(p.id)}">
            Request a booking ${ESC.icons.arrow}
          </a>
        </div>
      </div>
    </div>`;

  // lightbox
  const lb = document.createElement("div");
  lb.className = "agegate";
  lb.hidden = true;
  lb.style.cursor = "zoom-out";
  lb.innerHTML = `<img alt="" style="max-width:min(92vw,900px);max-height:88vh;border-radius:12px;border:1px solid var(--line-strong)">`;
  document.body.appendChild(lb);
  const lbImg = lb.querySelector("img");
  root.querySelectorAll(".gallery figure").forEach((fig) => {
    fig.addEventListener("click", () => {
      lbImg.src = fig.getAttribute("data-full");
      lb.hidden = false;
      document.documentElement.style.overflow = "hidden";
    });
  });
  lb.addEventListener("click", () => {
    lb.hidden = true;
    document.documentElement.style.overflow = "";
  });
})();
