import { Info } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Imprint", robots: { index: false } };

export default function ImpressumPage() {
  return (
    <div className="wrap section legal" style={{ paddingTop: "2.5rem" }}>
      <h1>Imprint</h1>
      <p className="updated">Legal notice under § 5 DDG (German Digital Services Act)</p>

      <div className="placeholder-flag">
        <Info size={18} />
        Prototype: all details below are placeholders and must be replaced with the
        operator&rsquo;s real details before any real operation.
      </div>

      <h2>Service provider</h2>
      <p>
        Aurélie (sample business)<br />
        Musterstrasse 1<br />
        10115 Berlin<br />
        Germany
      </p>

      <h2>Represented by</h2>
      <p>First name Last name</p>

      <h2>Contact</h2>
      <p>
        Phone: +49 30 000000<br />
        Email: contact@example.com
      </p>

      <h2>VAT identification number</h2>
      <p>In accordance with § 27a of the German VAT Act: DE000000000</p>

      <h2>Responsible for content under § 18(2) MStV</h2>
      <p>First name Last name, address as above</p>

      <h2>Note on the activity</h2>
      <p>
        In this example, Aurélie brokers companionship services for adults. Such
        services are legally permitted in Germany. The individuals listed on the
        platform act independently and are self-employed.
      </p>

      <h2>Dispute resolution</h2>
      <p>
        The European Commission provides a platform for online dispute resolution
        (ODR). We are not obliged and not willing to take part in dispute resolution
        proceedings before a consumer arbitration board.
      </p>
    </div>
  );
}
