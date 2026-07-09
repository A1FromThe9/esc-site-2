import BrowseClient from "@/components/BrowseClient";
import { getAllProviders } from "@/lib/profiles";

export const metadata = {
  title: "Browse Companions",
  description: "Browse and filter verified companions by city, language, services, and price.",
};

export default async function BrowsePage({ searchParams }) {
  const sp = await searchParams;
  const providers = getAllProviders();

  return (
    <div className="wrap section" style={{ paddingTop: "2.5rem" }}>
      <div className="sec-head" style={{ marginBottom: "1.75rem" }}>
        <h2>Companions</h2>
        <p>Filter by city, language, services, and price.</p>
      </div>
      <BrowseClient providers={providers} initialCity={sp?.city} />
    </div>
  );
}
