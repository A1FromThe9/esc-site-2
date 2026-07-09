/* booking.js - booking request + a SIMULATED deposit checkout.
   No real payment is processed. Real Stripe wiring is a Phase 2 (Next.js) task. */

(async function () {
  const root = document.getElementById("booking-root");
  if (!root) return;

  const id = ESC.param("id");
  let p = null;
  try { p = id ? await ESC.byId(id) : null; } catch (e) { /* below */ }

  if (!p) {
    root.innerHTML = `
      <div class="empty">${ESC.icons.info}
        <p>Für die Anfrage wurde kein Profil ausgewählt.</p>
        <a class="btn btn-ghost" href="browse.html" style="margin-top:1rem">Begleiterin auswählen</a>
      </div>`;
    return;
  }

  document.title = `Termin anfragen bei ${p.name} · Aurélie`;

  const today = new Date().toISOString().split("T")[0];

  root.innerHTML = `
    <div class="checkout">
      <form class="panel" id="booking-form" novalidate>
        <div class="mock-note">${ESC.icons.info}
          <span>Prototyp: Diese Anfrage wird nicht wirklich versendet und die Anzahlung
          nicht tatsächlich abgebucht. Bitte keine echten Zahlungsdaten eingeben.</span>
        </div>

        <div class="step-h">Details zum Treffen</div>
        <div class="grid-2">
          <div class="field">
            <label for="b-date">Datum</label>
            <input type="date" id="b-date" min="${today}" required>
            <span class="err" data-err="b-date"></span>
          </div>
          <div class="field">
            <label for="b-time">Uhrzeit</label>
            <input type="time" id="b-time" required>
            <span class="err" data-err="b-time"></span>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <label for="b-hours">Dauer</label>
            <select id="b-hours">
              <option value="1">1 Stunde</option>
              <option value="2" selected>2 Stunden</option>
              <option value="3">3 Stunden</option>
              <option value="4">4 Stunden</option>
              <option value="6">6 Stunden (Abend)</option>
            </select>
          </div>
          <div class="field">
            <label for="b-place">Ort / Stadtteil</label>
            <input type="text" id="b-place" placeholder="z. B. Restaurant, Hotel, ${p.city}">
          </div>
        </div>
        <div class="field">
          <label for="b-msg">Nachricht <span class="help">(optional)</span></label>
          <textarea id="b-msg" placeholder="Anlass, Wünsche, alles was ${p.name} wissen sollte."></textarea>
        </div>

        <div class="step-h">Ihre Kontaktdaten</div>
        <div class="grid-2">
          <div class="field">
            <label for="b-name">Name oder Pseudonym</label>
            <input type="text" id="b-name" autocomplete="name" required>
            <span class="err" data-err="b-name"></span>
          </div>
          <div class="field">
            <label for="b-contact">Bevorzugter Kontakt</label>
            <select id="b-contact">
              <option value="email">E-Mail</option>
              <option value="phone">Telefon</option>
              <option value="signal">Signal</option>
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <label for="b-email">E-Mail</label>
            <input type="email" id="b-email" autocomplete="email" placeholder="name@beispiel.de" required>
            <span class="err" data-err="b-email"></span>
          </div>
          <div class="field">
            <label for="b-phone">Telefon <span class="help">(optional)</span></label>
            <input type="tel" id="b-phone" autocomplete="tel" placeholder="+49 ...">
          </div>
        </div>

        <div class="step-h">Anzahlung</div>
        <div class="grid-2">
          <div class="field" style="grid-column:1/-1">
            <label for="c-num">Kartennummer</label>
            <input type="text" id="c-num" inputmode="numeric" placeholder="4242 4242 4242 4242" required>
            <span class="err" data-err="c-num"></span>
          </div>
          <div class="field">
            <label for="c-exp">Gültig bis</label>
            <input type="text" id="c-exp" placeholder="MM / JJ" required>
            <span class="err" data-err="c-exp"></span>
          </div>
          <div class="field">
            <label for="c-cvc">CVC</label>
            <input type="text" id="c-cvc" inputmode="numeric" placeholder="123" required>
            <span class="err" data-err="c-cvc"></span>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block btn-lg" id="pay-btn" style="margin-top:1rem">
          ${ESC.icons.lock} Anzahlung ${ESC.eur(p.rates.deposit)} zahlen
        </button>
        <p class="help" style="text-align:center;margin-top:.75rem">
          Die Anzahlung wird auf den Gesamtpreis angerechnet. Rest bei Ihrem Treffen.
        </p>
      </form>

      <aside class="panel summary">
        <div class="prov">
          <img src="${ESC.photo(p.photos[0], 120, 144)}" alt="${p.name}">
          <div>
            <div style="font-family:var(--font-display);font-size:1.4rem;line-height:1">${p.name}</div>
            <div style="color:var(--text-muted);font-size:.85rem">${p.district}, ${p.city}</div>
          </div>
        </div>
        <div class="summary-line"><span>Datum</span><span class="val" id="s-date">-</span></div>
        <div class="summary-line"><span>Uhrzeit</span><span class="val" id="s-time">-</span></div>
        <div class="summary-line"><span>Dauer</span><span class="val" id="s-hours">2 Stunden</span></div>
        <div class="summary-line"><span>Stundensatz</span><span class="val">${ESC.eur(p.rates.hour)}</span></div>
        <div class="summary-line"><span>Voraussichtlich gesamt</span><span class="val" id="s-total">${ESC.eur(p.rates.hour * 2)}</span></div>
        <div class="summary-total">
          <span>Jetzt fällig (Anzahlung)</span>
          <span class="amt">${ESC.eur(p.rates.deposit)}</span>
        </div>
      </aside>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const form = $("#booking-form");

  // live summary
  function refresh() {
    const h = Number($("#b-hours").value);
    $("#s-date").textContent = $("#b-date").value
      ? new Date($("#b-date").value).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })
      : "-";
    $("#s-time").textContent = $("#b-time").value || "-";
    $("#s-hours").textContent = `${h} ${h === 1 ? "Stunde" : "Stunden"}`;
    $("#s-total").textContent = ESC.eur(p.rates.hour * h);
  }
  form.addEventListener("input", refresh);
  form.addEventListener("change", refresh);

  function setErr(field, msg) {
    const el = root.querySelector(`[data-err="${field}"]`);
    if (el) el.textContent = msg || "";
    return !msg;
  }

  function validate() {
    let ok = true;
    const req = (id, msg) => {
      const v = $("#" + id).value.trim();
      if (!v) { setErr(id, msg); ok = false; } else setErr(id, "");
      return v;
    };
    req("b-date", "Bitte ein Datum wählen.");
    req("b-time", "Bitte eine Uhrzeit wählen.");
    req("b-name", "Bitte Namen angeben.");
    const email = $("#b-email").value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setErr("b-email", "Gültige E-Mail angeben."); ok = false; } else setErr("b-email", "");
    const num = $("#c-num").value.replace(/\s/g, "");
    if (num.length < 12) { setErr("c-num", "Kartennummer prüfen."); ok = false; } else setErr("c-num", "");
    if (!/^\d{2}\s*\/?\s*\d{2}$/.test($("#c-exp").value.trim())) { setErr("c-exp", "MM / JJ"); ok = false; } else setErr("c-exp", "");
    if (!/^\d{3,4}$/.test($("#c-cvc").value.trim())) { setErr("c-cvc", "CVC prüfen."); ok = false; } else setErr("c-cvc", "");
    return ok;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      root.querySelector('.err:not(:empty)')?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const btn = $("#pay-btn");
    btn.disabled = true;
    btn.innerHTML = "Verarbeite Anzahlung ...";

    // simulate a payment round-trip
    setTimeout(() => {
      const ref = "AUR-" + Math.random().toString(36).slice(2, 7).toUpperCase();
      const when = `${$("#s-date").textContent}, ${$("#b-time").value} Uhr`;
      root.innerHTML = `
        <div class="panel confirm">
          <div class="tick">${ESC.icons.check}</div>
          <h1 style="font-size:2.4rem">Anfrage gesendet</h1>
          <p class="prose">Ihre Anzahlung von <b style="color:var(--text)">${ESC.eur(p.rates.deposit)}</b>
             ist eingegangen und <b style="color:var(--text)">${p.name}</b> wurde über Ihre Anfrage
             für ${when} informiert. Sie erhalten in Kürze eine Bestätigung.</p>
          <p class="help" style="margin-top:1rem">Referenz ${ref}</p>
          <div class="mock-note" style="text-align:left;margin-top:1.5rem">${ESC.icons.info}
            <span>Prototyp-Hinweis: Es wurde keine echte Zahlung ausgeführt und keine
            Nachricht versendet. Dies ist eine Demonstration des Buchungsablaufs.</span>
          </div>
          <div style="display:flex;gap:.75rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap">
            <a class="btn btn-ghost" href="browse.html">Weitere Profile</a>
            <a class="btn btn-primary" href="index.html">Zur Startseite</a>
          </div>
        </div>`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1400);
  });

  refresh();
})();
