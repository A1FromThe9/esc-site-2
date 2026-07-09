import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand">
              Aurélie<span className="dot">.</span>
            </div>
            <p className="footer-blurb">
              A discreet directory for companionship in Germany. Verified profiles,
              clear pricing, secure enquiries.
            </p>
          </div>
          <div>
            <h4>Discover</h4>
            <ul>
              <li><Link href="/browse?city=Berlin">Berlin</Link></li>
              <li><Link href="/browse?city=Hamburg">Hamburg</Link></li>
              <li><Link href="/browse?city=M%C3%BCnchen">Munich</Link></li>
              <li><Link href="/browse">All cities</Link></li>
            </ul>
          </div>
          <div>
            <h4>Info</h4>
            <ul>
              <li><Link href="/#how">How it works</Link></li>
              <li><Link href="/#cities">Cities</Link></li>
              <li><Link href="/impressum">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/impressum">Imprint</Link></li>
              <li><Link href="/datenschutz">Privacy Policy</Link></li>
              <li><Link href="/agb">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Aurélie. Prototype and demo project.</span>
          <span>For persons aged 18 and over only.</span>
        </div>
      </div>
    </footer>
  );
}
