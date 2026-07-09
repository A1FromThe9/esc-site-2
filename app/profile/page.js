import Link from "next/link";
import { Info } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Profile" };

export default function ProfileIndexPage() {
  return (
    <div className="wrap section" style={{ paddingTop: "2rem" }}>
      <div className="empty">
        <Info size={40} />
        <p>This profile could not be found.</p>
        <Link className="btn btn-ghost" href="/browse" style={{ marginTop: "1rem" }}>View all companions</Link>
      </div>
    </div>
  );
}
