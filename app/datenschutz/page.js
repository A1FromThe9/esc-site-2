import Link from "next/link";
import { Info } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Privacy Policy", robots: { index: false } };

export default function DatenschutzPage() {
  return (
    <div className="wrap section legal" style={{ paddingTop: "2.5rem" }}>
      <h1>Privacy Policy</h1>
      <p className="updated">Under Art. 13 and 14 GDPR</p>

      <div className="placeholder-flag">
        <Info size={18} />
        Prototype: this privacy policy is a placeholder and has not been legally
        reviewed. A complete, reviewed policy is required before any real operation.
      </div>

      <h2>1. Controller</h2>
      <p>The provider named in the <Link href="/impressum">Imprint</Link> is
         responsible for data processing.</p>

      <h2>2. What data we process</h2>
      <p>This prototype deliberately processes only minimal data:</p>
      <ul>
        <li><strong>Age verification:</strong> your confirmation that you are of
            legal age is stored exclusively in your browser (localStorage) and is
            never transmitted to us.</li>
        <li><strong>Booking form:</strong> entries in the request form never leave
            your browser in this prototype. No transmission, server-side storage,
            or payment processing takes place.</li>
      </ul>

      <h2>3. Cookies</h2>
      <p>This website does not use tracking or marketing cookies. Only the local
         storage entry for age verification mentioned above is used.</p>

      <h2>4. External content</h2>
      <p>Fonts are self-hosted via next/font, and placeholder images from an
         external image service are loaded for display. Your IP address may be
         transmitted to the image provider as a result. In a production
         deployment, these images should be self-hosted too.</p>

      <h2>5. Your rights</h2>
      <p>You have the right to access, rectification, erasure, restriction of
         processing, data portability, and objection. You also have the right to
         lodge a complaint with a data protection supervisory authority.</p>

      <h2>6. Privacy contact</h2>
      <p>For privacy questions, reach us at the address listed in the Imprint.</p>
    </div>
  );
}
