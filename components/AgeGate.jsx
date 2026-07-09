"use client";

import { useEffect, useState } from "react";

const AGE_KEY = "aurelie_age_ok";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(AGE_KEY) !== "1") {
      setVisible(true);
      document.documentElement.style.overflow = "hidden";
    }
  }, []);

  function accept() {
    localStorage.setItem(AGE_KEY, "1");
    document.documentElement.style.overflow = "";
    setVisible(false);
  }

  function leave() {
    window.location.href = "https://www.google.com";
  }

  if (!visible) return null;

  return (
    <div className="agegate" role="dialog" aria-modal="true" aria-label="Age verification">
      <div className="box">
        <div className="brand">
          Aurélie<span className="dot">.</span>
        </div>
        <h2>Are you 18 or older?</h2>
        <p>
          This site contains adult content and is intended solely for persons aged 18
          and over. By entering, you confirm that you are of legal age.
        </p>
        <div className="actions">
          <button className="btn btn-primary btn-lg" onClick={accept}>
            I am 18 or older
          </button>
          <button className="btn btn-ghost" onClick={leave}>
            Leave
          </button>
        </div>
        <p className="fine">
          Aurélie is a demo website (prototype). No real bookings are brokered and no
          real payments are processed.
        </p>
      </div>
    </div>
  );
}
