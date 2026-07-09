/* site.js - shared shell behaviour: age gate, mobile nav, scroll reveal, year.
   Runs on every page. No global scroll listeners (IntersectionObserver only). */

(function () {
  const AGE_KEY = "aurelie_age_ok";

  /* ---- Age gate (18+) ---- */
  function initAgeGate() {
    // legal / prose pages still show it; but skip if already confirmed
    if (localStorage.getItem(AGE_KEY) === "1") return;

    const gate = document.createElement("div");
    gate.className = "agegate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.setAttribute("aria-label", "Age verification");
    gate.innerHTML = `
      <div class="box">
        <div class="brand">Aurélie<span class="dot">.</span></div>
        <h2>Are you 18 or older?</h2>
        <p>This site contains adult content and is intended solely for persons
           aged 18 and over. By entering, you confirm that you are of legal age.</p>
        <div class="actions">
          <button class="btn btn-primary btn-lg" data-yes>I am 18 or older</button>
          <button class="btn btn-ghost" data-no>Leave</button>
        </div>
        <p class="fine">Aurélie is a demo website (prototype). No real bookings are
           brokered and no real payments are processed.</p>
      </div>`;
    document.body.appendChild(gate);
    document.documentElement.style.overflow = "hidden";

    gate.querySelector("[data-yes]").addEventListener("click", () => {
      localStorage.setItem(AGE_KEY, "1");
      gate.remove();
      document.documentElement.style.overflow = "";
    });
    gate.querySelector("[data-no]").addEventListener("click", () => {
      location.href = "https://www.google.com";
    });
  }

  /* ---- Mobile nav ---- */
  function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = open ? ESC.icons.close : ESC.icons.menu;
    });
  }

  /* ---- Scroll reveal (motivated: staggered section entry) ---- */
  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach((el) => io.observe(el));
  }

  /* ---- Inject any icons declared via data-icon ---- */
  function initIcons() {
    document.querySelectorAll("[data-icon]").forEach((el) => {
      const name = el.getAttribute("data-icon");
      if (ESC.icons[name]) el.innerHTML = ESC.icons[name];
    });
  }

  function initYear() {
    const y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  }

  function initFavicon() {
    if (document.querySelector('link[rel="icon"]')) return;
    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>" +
      "<rect width='32' height='32' rx='8' fill='%23191416'/>" +
      "<path d='M16 25s-8-5-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 6-8 11-8 11z' fill='%23e88599'/>" +
      "</svg>";
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = "data:image/svg+xml," + svg;
    document.head.appendChild(link);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initAgeGate();
    initNav();
    initReveal();
    initIcons();
    initYear();
    initFavicon();
  });
})();
