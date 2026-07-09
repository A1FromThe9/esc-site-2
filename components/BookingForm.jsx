"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Info, Lock, Check } from "@phosphor-icons/react/dist/ssr";
import { eur, photo } from "@/lib/format";

const today = new Date().toISOString().split("T")[0];

export default function BookingForm({ p }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState(2);
  const [place, setPlace] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const total = useMemo(() => eur(p.rates.hour * hours), [p, hours]);
  const dateLabel = date
    ? new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
    : "-";

  function validate() {
    const errs = {};
    if (!date) errs.date = "Please choose a date.";
    if (!time) errs.time = "Please choose a time.";
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) errs.email = "Please enter a valid email.";
    if (cardNum.replace(/\s/g, "").length < 12) errs.cardNum = "Check your card number.";
    if (!/^\d{2}\s*\/?\s*\d{2}$/.test(cardExp.trim())) errs.cardExp = "MM / YY";
    if (!/^\d{3,4}$/.test(cardCvc.trim())) errs.cardCvc = "Check your CVC.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      document.querySelector(".err:not(:empty)")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const ref = "AUR-" + Math.random().toString(36).slice(2, 7).toUpperCase();
      setConfirmation({ ref, when: `${dateLabel} at ${time}` });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1400);
  }

  if (confirmation) {
    return (
      <div className="panel confirm">
        <div className="tick"><Check size={30} /></div>
        <h1>Request sent</h1>
        <p className="prose">
          Your deposit of <b style={{ color: "var(--text)" }}>{eur(p.rates.deposit)}</b> has
          been received and <b style={{ color: "var(--text)" }}>{p.name}</b> has been notified
          of your request for {confirmation.when}. You&rsquo;ll receive a confirmation shortly.
        </p>
        <p className="help" style={{ marginTop: "1rem" }}>Reference {confirmation.ref}</p>
        <div className="mock-note" style={{ textAlign: "left", marginTop: "1.5rem" }}>
          <Info size={18} />
          <span>Prototype notice: no real payment was processed and no message was sent.
            This is a demonstration of the booking flow.</span>
        </div>
        <div className="btn-row">
          <Link className="btn btn-ghost" href="/browse">More profiles</Link>
          <Link className="btn btn-primary" href="/">Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <form className="panel" onSubmit={handleSubmit} noValidate>
        <div className="mock-note">
          <Info size={18} />
          <span>Prototype: this request is not actually sent and the deposit is not
            actually charged. Please do not enter real payment details.</span>
        </div>

        <div className="step-h">Meeting details</div>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="b-date">Date</label>
            <input type="date" id="b-date" min={today} value={date} onChange={(e) => setDate(e.target.value)} required />
            <span className="err">{errors.date}</span>
          </div>
          <div className="field">
            <label htmlFor="b-time">Time</label>
            <input type="time" id="b-time" value={time} onChange={(e) => setTime(e.target.value)} required />
            <span className="err">{errors.time}</span>
          </div>
        </div>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="b-hours">Duration</label>
            <select id="b-hours" value={hours} onChange={(e) => setHours(Number(e.target.value))}>
              <option value={1}>1 hour</option>
              <option value={2}>2 hours</option>
              <option value={3}>3 hours</option>
              <option value={4}>4 hours</option>
              <option value={6}>6 hours (evening)</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="b-place">Location / district</label>
            <input type="text" id="b-place" placeholder={`e.g. restaurant, hotel, ${p.city}`} value={place} onChange={(e) => setPlace(e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="b-msg">Message <span className="help">(optional)</span></label>
          <textarea id="b-msg" placeholder={`Occasion, preferences, anything ${p.name} should know.`} value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>

        <div className="step-h">Your contact details</div>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="b-name">Name or alias</label>
            <input type="text" id="b-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <span className="err">{errors.name}</span>
          </div>
          <div className="field">
            <label htmlFor="b-contact">Preferred contact</label>
            <select id="b-contact" value={contact} onChange={(e) => setContact(e.target.value)}>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="signal">Signal</option>
            </select>
          </div>
        </div>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="b-email">Email</label>
            <input type="email" id="b-email" autoComplete="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <span className="err">{errors.email}</span>
          </div>
          <div className="field">
            <label htmlFor="b-phone">Phone <span className="help">(optional)</span></label>
            <input type="tel" id="b-phone" autoComplete="tel" placeholder="+49 ..." value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <div className="step-h">Deposit</div>
        <div className="grid-2">
          <div className="field" style={{ gridColumn: "1/-1" }}>
            <label htmlFor="c-num">Card number</label>
            <input type="text" id="c-num" inputMode="numeric" placeholder="4242 4242 4242 4242" value={cardNum} onChange={(e) => setCardNum(e.target.value)} required />
            <span className="err">{errors.cardNum}</span>
          </div>
          <div className="field">
            <label htmlFor="c-exp">Expiry</label>
            <input type="text" id="c-exp" placeholder="MM / YY" value={cardExp} onChange={(e) => setCardExp(e.target.value)} required />
            <span className="err">{errors.cardExp}</span>
          </div>
          <div className="field">
            <label htmlFor="c-cvc">CVC</label>
            <input type="text" id="c-cvc" inputMode="numeric" placeholder="123" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} required />
            <span className="err">{errors.cardCvc}</span>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: "1rem" }} disabled={submitting}>
          <Lock size={18} /> {submitting ? "Processing deposit ..." : `Pay ${eur(p.rates.deposit)} deposit`}
        </button>
        <p className="help" style={{ textAlign: "center", marginTop: ".75rem" }}>
          The deposit is credited toward the total. Pay the rest at your meeting.
        </p>
      </form>

      <aside className="panel summary">
        <div className="prov">
          <Image src={photo(p.photos[0], 120, 144)} alt={p.name} width={60} height={72} />
          <div>
            <div className="prov-name">{p.name}</div>
            <div className="prov-loc">{p.district}, {p.city}</div>
          </div>
        </div>
        <div className="summary-line"><span>Date</span><span className="val">{dateLabel}</span></div>
        <div className="summary-line"><span>Time</span><span className="val">{time || "-"}</span></div>
        <div className="summary-line"><span>Duration</span><span className="val">{hours} {hours === 1 ? "hour" : "hours"}</span></div>
        <div className="summary-line"><span>Hourly rate</span><span className="val">{eur(p.rates.hour)}</span></div>
        <div className="summary-line"><span>Estimated total</span><span className="val">{total}</span></div>
        <div className="summary-total">
          <span>Due now (deposit)</span>
          <span className="amt">{eur(p.rates.deposit)}</span>
        </div>
      </aside>
    </div>
  );
}
