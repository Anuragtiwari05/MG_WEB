"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { locations, workshops } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, ExternalLink, ArrowRight } from "@/components/icons";

const allLocations = [
  ...locations.map((d) => ({ ...d, type: "Showroom" as const })),
  ...workshops.map((w) => ({ ...w, type: "Service Centre" as const })),
];

export default function LocationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const filter: "Showroom" | "Service Centre" = typeParam === "service" ? "Service Centre" : "Showroom";

  const [selectedLoc, setSelectedLoc] = useState<typeof allLocations[0] | null>(null);
  const [mapActive, setMapActive] = useState(false);

  const filteredLocations = allLocations.filter((loc) => loc.type === filter);
  const activeLoc = (selectedLoc?.type === filter ? selectedLoc : null) ?? filteredLocations[0] ?? null;

  const handleFilterChange = (newFilter: "Showroom" | "Service Centre") => {
    const newType = newFilter === "Showroom" ? "showroom" : "service";
    router.push(`?type=${newType}`, { scroll: false });
  };

  const activeQuery = activeLoc
    ? `${activeLoc.name} ${activeLoc.city} ${activeLoc.address}`
    : filter === "Showroom"
    ? "MG Motor Krishiv Auto Showroom Mumbai"
    : "MG Motor Krishiv Auto Service Center Mumbai";

  const activeCoords =
    activeLoc && "lat" in activeLoc && "lng" in activeLoc && activeLoc.lat != null && activeLoc.lng != null
      ? `${activeLoc.lat},${activeLoc.lng}`
      : null;

  const mapSrc = activeCoords
    ? `https://maps.google.com/maps?q=${activeCoords}&t=&z=${activeLoc ? 15 : 10}&ie=UTF8&iwloc=near&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(activeQuery)}&t=&z=${activeLoc ? 12 : 10}&ie=UTF8&iwloc=near&output=embed`;

  // Prefer the Google-Maps CID (place identifier) when we have one — it
  // opens directly on that exact listing's info card, with no results list
  // or ambiguity. Coordinates are the next best (always drop a single pin,
  // just without the business card). A plain name+address text query is
  // ambiguous (e.g. Malad has more than one similarly named MG dealer on
  // Google Maps) and Maps shows a list instead of jumping straight to the
  // place, so it's only used as a last-resort fallback.
  const activeCid = activeLoc && "cid" in activeLoc ? activeLoc.cid : null;
  const activeDirectionsHref = activeCid
    ? `https://www.google.com/maps?cid=${activeCid}`
    : activeCoords
    ? `https://www.google.com/maps/search/?api=1&query=${activeCoords}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeQuery)}`;

  return (
    <>
      <Navbar />
      <main className="mt-[80px] min-h-screen bg-white">
        {/* Page Hero */}
        <section className="bg-white py-12 lg:py-16">
          <div className="container-px mx-auto max-w-[900px] text-center">
            <Reveal variant="fade-up">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Locations
              </span>
              <h1 className="mt-2 font-display text-3xl font-black tracking-wide text-text sm:text-4xl">
                Explore Every MG Motor Mumbai Location
              </h1>
              <p className="mt-3 text-sm text-muted sm:text-base">
                Browse our showrooms and service centres across the Mumbai region, preview the
                branch on the map, and open turn-by-turn directions in Google Maps.
              </p>
            </Reveal>

            {/* Toggle buttons, centered above both containers */}
            <Reveal variant="fade-up" delay={100} className="mt-8 flex justify-center gap-2.5">
              <button
                onClick={() => handleFilterChange("Showroom")}
                className={`rounded-full border px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  filter === "Showroom"
                    ? "border-brand-deep bg-brand-deep text-white shadow-sm"
                    : "border-border text-muted hover:text-brand"
                }`}
              >
                Showrooms
              </button>
              <button
                onClick={() => handleFilterChange("Service Centre")}
                className={`rounded-full border px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  filter === "Service Centre"
                    ? "border-brand-deep bg-brand-deep text-white shadow-sm"
                    : "border-border text-muted hover:text-brand"
                }`}
              >
                Service Centres
              </button>
            </Reveal>
          </div>
        </section>

        {/* Two containers: location list + map/details */}
        <section className="pb-16 lg:pb-24">
          <div className="container-px mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

            {/* Container 1: location list */}
            <Reveal
              variant="fade-up"
              className="flex flex-col rounded-2xl border border-border bg-white shadow-sm lg:max-h-[720px]"
            >
              <div className="border-b border-border px-6 py-5 shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand">
                  {filter}
                </span>
                <h2 className="mt-1 font-display text-lg font-extrabold text-text">
                  Choose a branch
                </h2>
                <p className="mt-1 text-xs text-muted">
                  {filteredLocations.length} location{filteredLocations.length === 1 ? "" : "s"} available
                </p>
              </div>

              <div className="space-y-3 overflow-y-auto p-4 sm:p-5">
                {filteredLocations.map((loc, i) => {
                  const isSelected = activeLoc === loc;
                  return (
                    <div
                      key={loc.name + i}
                      onClick={() => setSelectedLoc(loc)}
                      className={`group cursor-pointer rounded-xl border p-4 transition-all duration-300 ${
                        isSelected
                          ? "border-brand bg-brand/5 shadow-md"
                          : "border-border bg-white hover:border-brand/30 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-white text-muted border border-border">
                          {loc.city}
                        </span>
                        <span
                          className="rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-brand/10 text-brand border border-brand/20"
                        >
                          {loc.type}
                        </span>
                      </div>

                      <h3 className="mt-2.5 font-display text-sm font-extrabold text-text group-hover:text-brand transition-colors">
                        {loc.name}
                      </h3>

                      <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-muted">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                        <span>{loc.address}</span>
                      </p>

                      <a
                        href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 flex items-center gap-1.5 text-xs font-bold text-muted hover:text-brand transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {loc.phone}
                      </a>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Container 2: map + active location details */}
            <Reveal
              variant="fade-up"
              delay={100}
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              <div className="relative h-[320px] overflow-hidden sm:h-[380px]">
                {/* 
                  Google Maps free embed forces a place card. 
                  We use a negative top margin to push the card out of the visible area.
                */}
                <div className="absolute left-0 top-0 w-full h-[calc(100%+180px)] -mt-[180px]">
                  <iframe
                    key={mapSrc}
                    title="MG Mumbai Locations Map"
                    src={mapSrc}
                    className={`h-full w-full border-0 ${
                      mapActive ? "" : "pointer-events-none lg:pointer-events-auto"
                    }`}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <a
                  href={activeDirectionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-xs font-bold text-text shadow-md hover:text-brand"
                >
                  Open in Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                {!mapActive && (
                  <button
                    type="button"
                    onClick={() => setMapActive(true)}
                    aria-label="Activate map to interact"
                    className="absolute inset-0 flex items-center justify-center bg-black/5 text-xs font-bold uppercase tracking-wider text-white cursor-pointer lg:hidden"
                  >
                    <span className="rounded-full bg-black/60 px-4 py-2 backdrop-blur-sm">
                      Tap to interact with map
                    </span>
                  </button>
                )}
              </div>

              {activeLoc && (
                <div className="p-6">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand">
                    Now Viewing
                  </span>
                  <h2 className="mt-1 font-display text-xl font-extrabold text-text">
                    {activeLoc.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted">
                    {activeLoc.type} in {activeLoc.city}. Use the map preview here or jump
                    straight into Google Maps for live navigation.
                  </p>

                  <a
                    href={activeDirectionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-deep px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
                  >
                    Get Directions
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Address</p>
                      <p className="mt-2 flex items-start gap-2 text-sm text-text">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <span>{activeLoc.address}</span>
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Contact</p>
                      <a
                        href={`tel:${activeLoc.phone.replace(/[^0-9+]/g, "")}`}
                        className="mt-2 flex items-center gap-2 text-sm font-semibold text-text hover:text-brand"
                      >
                        <Phone className="h-4 w-4 text-brand" />
                        {activeLoc.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
