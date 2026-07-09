import { Info } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Terms", robots: { index: false } };

export default function AgbPage() {
  return (
    <div className="wrap section legal" style={{ paddingTop: "2.5rem" }}>
      <h1>Terms and Conditions</h1>
      <p className="updated">Version: sample draft</p>

      <div className="placeholder-flag">
        <Info size={18} />
        Prototype: these terms are a non-binding placeholder and have not been
        legally reviewed.
      </div>

      <h2>1. Scope</h2>
      <p>These terms apply to use of the Aurélie directory. Aurélie merely provides
         a platform through which adult companions present their services and
         receive requests.</p>

      <h2>2. Formation of a booking</h2>
      <p>A request submitted through the form is a non-binding enquiry. A contract
         for companionship is formed exclusively and directly between the
         companion and the requesting person.</p>

      <h2>3. Deposit</h2>
      <p>A deposit may be charged to reserve a booking. It is credited toward the
         agreed total price. Cancellation and refund terms are agreed between the
         parties.</p>

      <h2>4. Age of majority</h2>
      <p>Use is permitted only to persons aged 18 and over. By using the site, you
         confirm that you are of legal age.</p>

      <h2>5. Liability</h2>
      <p>Aurélie assumes no liability for the accuracy of profile information
         submitted by third parties or for the course of individual meetings.</p>

      <h2>6. Note on the prototype</h2>
      <p>This website is a demonstration project. No real bookings are brokered
         and no real payments are processed.</p>
    </div>
  );
}
