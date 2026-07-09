import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { eur, photo } from "@/lib/format";

export default function ProviderCard({ p }) {
  return (
    <article className="card">
      <Link className="card-link" href={`/profile/${p.id}`} aria-label={`View ${p.name}'s profile`}>
        <div className="card-media">
          {p.verified && (
            <span className="badge-verified">
              <ShieldCheck size={14} weight="fill" /> Verified
            </span>
          )}
          <Image
            src={photo(p.photos[0], 520, 700)}
            alt={`${p.name}, ${p.city}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="card-body">
          <div className="card-name">
            {p.name}
            <span className="age">{p.age}</span>
          </div>
          <div className="card-meta">
            <span>{p.city}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="price">from {eur(p.rates.hour)}/hr</span>
          </div>
          <div className="card-tags">
            {p.services.slice(0, 2).map((s) => (
              <span className="tag" key={s}>{s}</span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton">
      <div className="sk-media" />
    </div>
  );
}
