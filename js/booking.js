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
        <p>No profile was selected for this request.</p>
        <a class="btn btn-ghost" href="browse.html" style="margin-top:1rem">Choose a companion</a>
      </div>`;
    return;
  }

  document.title = `Request a booking with ${p.name} · Aurélie`;

  const today = new Date().toISOString().split("T")[0];

  root.innerHTML = `
    <div class="checkout">
      <form class="panel" id="booking-form" novalidate>
        <div class="mock-note">${ESC.icons.info}
          <span>Prototype: this request is not actually sent and the deposit is not
          actually charged. Please do not enter real payment details.</span>
        </div>

        <div class="step-h">Meeting details</div>
        <div class="grid-2">
          <div class="field">
            <label for="b-date">Date</label>
            <input type="date" id="b-date" min="${today}" required>
            <span class="err" data-err="b-date"></span>
          </div>
          <div class="field">
            <label for="b-time">Time</label>
            <input type="time" id="b-time" required>
            <span class="err" data-err="b-time"></span>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <label for="b-hours">Duration</label>
            <select id="b-hours">
              <option value="1">1 hour</option>
              <option value="2" selected>2 hours</option>
              <option value="3">3 hours</option>
              <option value="4">4 hours</option>
              <option value="6">6 hours (evening)</option>
            </select>
          </div>
          <div class="field">
            <label for="b-place">Location / district</label>
            <input type="text" id="b-place" placeholder="e.g. restaurant, hotel, ${p.city}">
          </div>
        </div>
        <div class="field">
          <label for="b-msg">Message <span class="help">(optional)</span></label>
          <textarea id="b-msg" placeholder="Occasion, preferences, anything ${p.name} should know."></textarea>
        </div>

        <div class="step-h">Your contact details</div>
        <div class="grid-2">
          <div class="field">
            <label for="b-name">Name or alias</label>
            <input type="text" id="b-name" autocomplete="name" required>
            <span class="err" data-err="b-name"></span>
          </div>
          <div class="field">
            <label for="b-contact">Preferred contact</label>
            <select id="b-contact">
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="signal">Signal</option>
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <label for="b-email">Email</label>
            <input type="email" id="b-email" autocomplete="email" placeholder="name@example.com" required>
            <span class="err" data-err="b-email"></span>
          </div>
          <div class="field">
            <label for="b-phone">Phone <span class="help">(optional)</span></label>
            <input type="tel" id="b-phone" autocomplete="tel" placeholder="+49 ...">
          </div>
        </div>

        <div class="step-h">Deposit</div>
        <div class="grid-2">
          <div class="field" style="grid-column:1/-1">
            <label for="c-num">Card number</label>
            <input type="text" id="c-num" inputmode="numeric" placeholder="4242 4242 4242 4242" required>
            <span class="err" data-err="c-num"></span>
          </div>
          <div class="field">
            <label for="c-exp">Expiry</label>
            <input type="text" id="c-exp" placeholder="MM / YY" required>
            <span class="err" data-err="c-exp"></span>
          </div>
          <div class="field">
            <label for="c-cvc">CVC</label>
            <input type="text" id="c-cvc" inputmode="numeric" placeholder="123" required>
            <span class="err" data-err="c-cvc"></span>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block btn-lg" id="pay-btn" style="margin-top:1rem">
          ${ESC.icons.lock} Pay ${ESC.eur(p.rates.deposit)} deposit
        </button>
        <p class="help" style="text-align:center;margin-top:.75rem">
          The deposit is credited toward the total. Pay the rest at your meeting.
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
        <div class="summary-line"><span>Date</span><span class="val" id="s-date">-</span></div>
        <div class="summary-line"><span>Time</span><span class="val" id="s-time">-</span></div>
        <div class="summary-line"><span>Duration</span><span class="val" id="s-hours">2 hours</span></div>
        <div class="summary-line"><span>Hourly rate</span><span class="val">${ESC.eur(p.rates.hour)}</span></div>
        <div class="summary-line"><span>Estimated total</span><span class="val" id="s-total">${ESC.eur(p.rates.hour * 2)}</span></div>
        <div class="summary-total">
          <span>Due now (deposit)</span>
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
      ? new Date($("#b-date").value).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
      : "-";
    $("#s-time").textContent = $("#b-time").value || "-";
    $("#s-hours").textContent = `${h} ${h === 1 ? "hour" : "hours"}`;
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
    req("b-date", "Please choose a date.");
    req("b-time", "Please choose a time.");
    req("b-name", "Please enter your name.");
    const email = $("#b-email").value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setErr("b-email", "Please enter a valid email."); ok = false; } else setErr("b-email", "");
    const num = $("#c-num").value.replace(/\s/g, "");
    if (num.length < 12) { setErr("c-num", "Check your card number."); ok = false; } else setErr("c-num", "");
    if (!/^\d{2}\s*\/?\s*\d{2}$/.test($("#c-exp").value.trim())) { setErr("c-exp", "MM / YY"); ok = false; } else setErr("c-exp", "");
    if (!/^\d{3,4}$/.test($("#c-cvc").value.trim())) { setErr("c-cvc", "Check your CVC."); ok = false; } else setErr("c-cvc", "");
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
    btn.innerHTML = "Processing deposit ...";

    // simulate a payment round-trip
    setTimeout(() => {
      const ref = "AUR-" + Math.random().toString(36).slice(2, 7).toUpperCase();
      const when = `${$("#s-date").textContent} at ${$("#b-time").value}`;
      root.innerHTML = `
        <div class="panel confirm">
          <div class="tick">${ESC.icons.check}</div>
          <h1 style="font-size:2.4rem">Request sent</h1>
          <p class="prose">Your deposit of <b style="color:var(--text)">${ESC.eur(p.rates.deposit)}</b>
             has been received and <b style="color:var(--text)">${p.name}</b> has been notified
             of your request for ${when}. You'll receive a confirmation shortly.</p>
          <p class="help" style="margin-top:1rem">Reference ${ref}</p>
          <div class="mock-note" style="text-align:left;margin-top:1.5rem">${ESC.icons.info}
            <span>Prototype notice: no real payment was processed and no message was
            sent. This is a demonstration of the booking flow.</span>
          </div>
          <div style="display:flex;gap:.75rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap">
            <a class="btn btn-ghost" href="browse.html">More profiles</a>
            <a class="btn btn-primary" href="index.html">Back home</a>
          </div>
        </div>`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1400);
  });

  refresh();
})();
