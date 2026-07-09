import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap error-hero">
      <div>
        <p className="eyebrow">404 error</p>
        <h1>Nobody&rsquo;s here.</h1>
        <p>This page doesn&rsquo;t exist or has moved. Browse the profiles instead.</p>
        <div className="btn-row">
          <Link className="btn btn-primary btn-lg" href="/browse">Browse companions</Link>
          <Link className="btn btn-ghost btn-lg" href="/">Back home</Link>
        </div>
      </div>
    </div>
  );
}
