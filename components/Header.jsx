"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react/dist/ssr";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/browse", label: "Companions" },
    { href: "/#how", label: "How it works" },
    { href: "/#cities", label: "Cities" },
    { href: "/impressum", label: "Contact" },
  ];

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="brand" href="/">
          Aurélie<span className="dot">.</span>
        </Link>
        <nav>
          <ul className={`nav-links${open ? " open" : ""}`}>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={pathname === l.href ? "active" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-cta">
          <Link className="btn btn-primary" href="/browse">
            Browse
          </Link>
          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
