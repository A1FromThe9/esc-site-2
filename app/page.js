import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Check,
  Lock,
  CalendarBlank,
  ArrowRight,
  CreditCard,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import ProviderCard from "@/components/ProviderCard";
import { getFeaturedProviders } from "@/lib/profiles";

export default function HomePage() {
  const featured = getFeaturedProviders(4);

  return (
    <>
      {/* Hero: asymmetric split */}
      <section className="wrap hero">
        <div className="hero-copy">
          <p className="eyebrow">Companionship in Germany</p>
          <h1>
            Good company,
            <br />
            <em>kept discreet.</em>
          </h1>
          <p className="lead">
            Aurélie is a directory of verified companions. Clear pricing, secure
            enquiries, and discretion you can rely on.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" href="/browse">
              Browse companions <ArrowRight size={18} />
            </Link>
            <Link className="btn btn-ghost btn-lg" href="#how">
              How it works
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <figure className="h-a">
            <Image src="https://picsum.photos/seed/lena-1/600/900" alt="" width={600} height={900} priority />
          </figure>
          <figure className="h-b">
            <Image src="https://picsum.photos/seed/vivienne-2/600/600" alt="" width={600} height={600} />
          </figure>
          <figure className="h-c">
            <Image src="https://picsum.photos/seed/marlene-1/600/900" alt="" width={600} height={900} />
          </figure>
          <figure className="h-d">
            <Image src="https://picsum.photos/seed/sofia-3/600/600" alt="" width={600} height={600} />
          </figure>
        </div>
      </section>

      {/* Trust strip */}
      <div className="wrap">
        <div className="trust">
          <span className="item"><ShieldCheck size={18} /> Verified profiles</span>
          <span className="item"><Check size={18} /> Legal in Germany</span>
          <span className="item"><Lock size={18} /> Discreet enquiries</span>
          <span className="item"><CalendarBlank size={18} /> Deposit secures your booking</span>
        </div>
      </div>

      {/* Featured */}
      <Reveal className="wrap section">
        <div className="sec-head row">
          <div>
            <h2>Featured this week</h2>
          </div>
          <Link className="btn btn-ghost" href="/browse">View all</Link>
        </div>
        <div className="grid-cards">
          {featured.map((p) => (
            <ProviderCard p={p} key={p.id} />
          ))}
        </div>
      </Reveal>

      {/* How it works */}
      <Reveal className="wrap section" id="how">
        <div className="sec-head">
          <h2>How it works</h2>
          <p>Three steps from browsing to meeting. No hidden costs, no detours.</p>
        </div>
        <div className="process">
          <div className="step">
            <div className="num">01</div>
            <div>
              <h3>Browse</h3>
              <p>Filter by city, language, and type of companionship. Every profile
                 shows pricing and availability upfront.</p>
            </div>
          </div>
          <div className="step">
            <div className="num">02</div>
            <div>
              <h3>Request</h3>
              <p>Choose a date and duration and send a request. A small deposit
                 reserves the booking.</p>
            </div>
          </div>
          <div className="step">
            <div className="num">03</div>
            <div>
              <h3>Meet</h3>
              <p>You&rsquo;ll receive a confirmation. Pay the remaining balance
                 directly at the meeting, no complications.</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Promise bento */}
      <Reveal className="wrap section">
        <div className="sec-head">
          <p className="eyebrow">The promise</p>
          <h2>Discreet, verified, clear.</h2>
        </div>
        <div className="bento">
          <figure className="cell img">
            <Image src="https://picsum.photos/seed/promise-berlin/900/1100" alt="Evening city view" fill style={{ objectFit: "cover" }} />
            <figcaption>An evening, exactly as you imagine it.</figcaption>
          </figure>
          <div className="cell">
            <div className="ic"><Lock size={34} /></div>
            <h3>Discretion</h3>
            <p>Requests stay private. You decide what to share and with whom.</p>
          </div>
          <div className="cell">
            <div className="ic"><ShieldCheck size={34} /></div>
            <h3>Verification</h3>
            <p>Profiles marked verified have been personally checked.</p>
          </div>
          <div className="cell wide">
            <div className="ic"><CreditCard size={34} /></div>
            <h3>Fair, transparent pricing</h3>
            <p>Hourly rates are shown openly on each profile. The deposit is fully
               credited toward the total, and you pay the rest only at the meeting.</p>
          </div>
        </div>
      </Reveal>

      {/* Cities */}
      <Reveal className="wrap section" id="cities">
        <div className="sec-head">
          <h2>In your city</h2>
          <p>Companionship in Germany&rsquo;s largest cities.</p>
        </div>
        <div className="cities">
          {["Berlin", "Hamburg", "München", "Köln", "Frankfurt am Main", "Düsseldorf", "Stuttgart", "Leipzig"].map((city) => (
            <Link className="city-pill" href={`/browse?city=${encodeURIComponent(city)}`} key={city}>
              {city === "München" ? "Munich" : city === "Köln" ? "Cologne" : city}
            </Link>
          ))}
        </div>
      </Reveal>

      {/* Final CTA */}
      <Reveal className="wrap section">
        <div className="cta-band">
          <h2>Ready to meet someone?</h2>
          <p>Browse the profiles and send a no-obligation request in minutes.</p>
          <Link className="btn btn-primary btn-lg" href="/browse">Browse companions</Link>
        </div>
      </Reveal>
    </>
  );
}
