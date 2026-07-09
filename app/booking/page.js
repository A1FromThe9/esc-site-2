import Link from "next/link";
import { Info } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Request a Booking" };

export default function BookingIndexPage() {
  return (
    <div className="wrap section" style={{ paddingTop: "2rem" }}>
      <div className="empty">
        <Info size={40} />
        <p>No profile was selected for this request.</p>
        <Link className="btn btn-ghost" href="/browse" style={{ marginTop: "1rem" }}>Choose a companion</Link>
      </div>
    </div>
  );
}
