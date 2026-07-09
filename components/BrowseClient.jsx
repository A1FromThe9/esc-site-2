"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react/dist/ssr";
import ProviderCard from "@/components/ProviderCard";
import { eur } from "@/lib/format";

export default function BrowseClient({ providers, initialCity }) {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState(initialCity ? [initialCity] : []);
  const [langs, setLangs] = useState([]);
  const [services, setServices] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allCities = useMemo(
    () => [...new Set(providers.map((p) => p.city))].sort((a, b) => a.localeCompare(b, "en")),
    [providers]
  );
  const allLangs = useMemo(
    () => [...new Set(providers.flatMap((p) => p.languages))].sort((a, b) => a.localeCompare(b, "en")),
    [providers]
  );
  const allServices = useMemo(
    () => [...new Set(providers.flatMap((p) => p.services))].sort((a, b) => a.localeCompare(b, "en")),
    [providers]
  );

  function toggle(list, setList, value) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function reset() {
    setSearch("");
    setCities([]);
    setLangs([]);
    setServices([]);
    setMaxPrice(0);
    setOnlyVerified(false);
    setSort("featured");
  }

  const results = useMemo(() => {
    const text = search.trim().toLowerCase();
    let out = providers.filter((p) => {
      if (cities.length && !cities.includes(p.city)) return false;
      if (langs.length && !langs.some((l) => p.languages.includes(l))) return false;
      if (services.length && !services.some((s) => p.services.includes(s))) return false;
      if (maxPrice && p.rates.hour > maxPrice) return false;
      if (onlyVerified && !p.verified) return false;
      if (text) {
        const hay = `${p.name} ${p.city} ${p.district} ${p.services.join(" ")} ${p.tagline}`.toLowerCase();
        if (!hay.includes(text)) return false;
      }
      return true;
    });

    if (sort === "price-asc") out = [...out].sort((a, b) => a.rates.hour - b.rates.hour);
    else if (sort === "price-desc") out = [...out].sort((a, b) => b.rates.hour - a.rates.hour);
    else if (sort === "newest") out = [...out].sort((a, b) => b.joined.localeCompare(a.joined));

    return out;
  }, [providers, search, cities, langs, services, maxPrice, onlyVerified, sort]);

  return (
    <div className="browse">
      <aside className={`filters${filtersOpen ? " open" : ""}`} aria-label="Filters">
        <div className="searchbar" style={{ marginBottom: ".5rem" }}>
          <MagnifyingGlass size={18} />
          <input
            type="search"
            placeholder="Name, city, service ..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <h3>City</h3>
        <div className="filter-group">
          {allCities.map((c) => (
            <label className="check" key={c}>
              <input type="checkbox" checked={cities.includes(c)} onChange={() => toggle(cities, setCities, c)} /> {c}
            </label>
          ))}
        </div>

        <h3>Language</h3>
        <div className="filter-group">
          {allLangs.map((l) => (
            <label className="check" key={l}>
              <input type="checkbox" checked={langs.includes(l)} onChange={() => toggle(langs, setLangs, l)} /> {l}
            </label>
          ))}
        </div>

        <h3>Services</h3>
        <div className="filter-group">
          {allServices.map((s) => (
            <label className="check" key={s}>
              <input type="checkbox" checked={services.includes(s)} onChange={() => toggle(services, setServices, s)} /> {s}
            </label>
          ))}
        </div>

        <h3>Price per hour</h3>
        <div className="filter-group">
          <select aria-label="Maximum hourly price" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}>
            <option value={0}>All prices</option>
            <option value={200}>up to {eur(200)}</option>
            <option value={250}>up to {eur(250)}</option>
            <option value={300}>up to {eur(300)}</option>
          </select>
        </div>

        <h3>Other</h3>
        <div className="filter-group">
          <label className="check">
            <input type="checkbox" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} /> Verified profiles only
          </label>
        </div>

        <div className="filter-group" style={{ marginTop: "1.4rem" }}>
          <button type="button" className="btn btn-ghost btn-block" onClick={reset}>Reset filters</button>
        </div>
      </aside>

      <section>
        <div className="browse-head">
          <button
            className="btn btn-ghost filter-toggle"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((v) => !v)}
          >
            <SlidersHorizontal size={18} /> Filters
          </button>
          <div className="browse-count">
            <b>{results.length}</b> {results.length === 1 ? "companion" : "companions"}
          </div>
          <div className="field" style={{ margin: 0, minWidth: "190px" }}>
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        {results.length ? (
          <div className="grid-cards">
            {results.map((p) => (
              <ProviderCard p={p} key={p.id} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <MagnifyingGlass size={40} />
            <p>No profiles match your filters.</p>
            <button className="btn btn-ghost" style={{ marginTop: "1rem" }} onClick={reset}>Reset filters</button>
          </div>
        )}
      </section>
    </div>
  );
}
