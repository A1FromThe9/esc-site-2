import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, MapPin, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Gallery from "@/components/Gallery";
import { getAllProviders, getProviderById } from "@/lib/profiles";
import { eur } from "@/lib/format";

export function generateStaticParams() {
  return getAllProviders().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = getProviderById(id);
  if (!p) return { title: "Profile" };
  return { title: `${p.name}, ${p.city}`, description: p.tagline };
}

export default async function ProfilePage({ params }) {
  const { id } = await params;
  const p = getProviderById(id);
  if (!p) notFound();

  return (
    <div className="wrap section" style={{ paddingTop: "2rem" }}>
      <Link href="/browse" className="back-link">&larr; Back to all profiles</Link>

      <div className="profile">
        <Gallery photos={p.photos} name={p.name} />

        <div className="profile-info">
          {p.verified && (
            <span className="badge-verified static">
              <ShieldCheck size={14} weight="fill" /> Verified
            </span>
          )}
          <h1>
            {p.name} <span className="age">{p.age}</span>
          </h1>
          <div className="profile-loc">
            <MapPin size={16} /> {p.district}, {p.city}
          </div>
          <p className="prose profile-tagline">{p.tagline}</p>

          <div className="stat-row">
            <div className="stat">
              <div className="k">Age</div>
              <div className="v">{p.age}</div>
            </div>
            <div className="stat">
              <div className="k">Height</div>
              <div className="v">{p.height}<small> cm</small></div>
            </div>
            <div className="stat">
              <div className="k">Location</div>
              <div className="v small">{p.city}</div>
            </div>
          </div>

          <h3 className="section-label">About me</h3>
          <div className="prose"><p>{p.about}</p></div>

          <h3 className="section-label">Languages</h3>
          <div className="chips">
            {p.languages.map((l) => <span className="chip" key={l}>{l}</span>)}
          </div>

          <h3 className="section-label">Companionship</h3>
          <div className="chips">
            {p.services.map((s) => <span className="chip" key={s}>{s}</span>)}
          </div>

          <div className="booking-panel">
            <div className="rate">
              <span className="amt">{eur(p.rates.hour)}</span>
              <span className="per">/ hour</span>
            </div>
            <p className="deposit-note">
              Deposit to reserve: <b>{eur(p.rates.deposit)}</b>. Availability: {p.availability}.
            </p>
            <Link className="btn btn-primary btn-block btn-lg" href={`/booking/${p.id}`}>
              Request a booking <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
