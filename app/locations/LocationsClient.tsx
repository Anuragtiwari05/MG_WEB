"use client";

import { useState } from "react";
import Image from "next/image";
import { locations, workshops } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, ExternalLink } from "@/components/icons";

export default function LocationsPage() {
  // Combine all locations into a single list
  const allLocations = [
    ...locations.map((d) => ({ ...d, type: "Showroom" as const })),
    ...workshops.map((w) => ({ ...w, type: "Workshop" as const })),
  ];

  const [filter, setFilter] = useState<"Showroom" | "Workshop">("Showroom");
  const [selectedLoc, setSelectedLoc] = useState<typeof allLocations[0] | null>(null);

  const filteredLocations = allLocations.filter((loc) => loc.type === filter);

  const handleFilterChange = (newFilter: "Showroom" | "Workshop") => {
    setFilter(newFilter);
    setSelectedLoc(null);
  };

  const activeQuery = selectedLoc
    ? `${selectedLoc.name} ${selectedLoc.city} ${selectedLoc.address}`
    : (filter === "Showroom"
        ? "MG Motor Krishiv Auto Showroom Mumbai"
        : "MG Motor Krishiv Auto Service Center Mumbai");

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(activeQuery)}&t=&z=${selectedLoc ? 12 : 10}&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <Navbar />
      <main className="mt-[80px] min-h-screen bg-bg-2">
        {/* Page Hero */}
        <section className="bg-white border-b border-border py-10">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal variant="fade-up">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Locations
              </span>
              <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-wide text-text sm:text-4xl">
                Our Showrooms & Workshops
              </h1>
              <p className="mt-2 text-sm text-muted max-w-xl">
                Explore all 4 authorized MG showrooms and 3 state-of-the-art service workshops across Mumbai in a single view.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Split Screen Map & List layout */}
        <section className="border-b border-border bg-white">
          <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row min-h-[600px]">
            {/* Left Column: Interactive List */}
            <div className="w-full lg:w-[45%] border-r border-border max-h-[80vh] overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4">
              {/* Toggle/Filter Bar */}
              <Reveal>
                <div className="flex rounded-lg bg-bg-2 p-1 border border-border max-w-xs mb-5">
                  <button
                    onClick={() => handleFilterChange("Showroom")}
                    className={`flex-1 rounded-md py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      filter === "Showroom"
                        ? "bg-brand text-white shadow-sm"
                        : "text-muted hover:text-brand"
                    }`}
                  >
                    Showrooms
                  </button>
                  <button
                    onClick={() => handleFilterChange("Workshop")}
                    className={`flex-1 rounded-md py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      filter === "Workshop"
                        ? "bg-brand text-white shadow-sm"
                        : "text-muted hover:text-brand"
                    }`}
                  >
                    Service Centres
                  </button>
                </div>
              </Reveal>

              <Reveal>
                <div className="mb-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
                    Click any location to pin it on the map:
                  </p>
                  {selectedLoc && (
                    <button
                      onClick={() => setSelectedLoc(null)}
                      className="text-xs font-bold text-brand hover:underline"
                    >
                      Clear selection (Reset Map)
                    </button>
                  )}
                </div>
              </Reveal>

              <div className="space-y-3.5">
                {filteredLocations.map((loc, i) => {
                  const isSelected = selectedLoc?.name === loc.name && selectedLoc?.city === loc.city;
                  return (
                    <Reveal key={loc.name + i} delay={i * 50}>
                      <div
                        onClick={() => setSelectedLoc(loc)}
                        className={`group cursor-pointer rounded-xl border p-5 transition-all duration-300 ${
                          isSelected
                            ? "bg-brand/5 border-brand shadow-md"
                            : "bg-bg-2 border-border hover:bg-white hover:border-brand/40"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span
                            className={`rounded px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              loc.type === "Showroom"
                                ? "bg-brand/10 text-brand border border-brand/20"
                                : "bg-[#00ad8a]/10 text-[#00ad8a] border border-[#00ad8a]/20"
                            }`}
                          >
                            {loc.type}
                          </span>
                          <span className="text-[10px] font-semibold text-muted">
                            {loc.city}
                          </span>
                        </div>

                        <h3 className="mt-3 font-display text-base font-extrabold text-text group-hover:text-brand transition-colors">
                          {loc.name}
                        </h3>

                        <p className="mt-2.5 flex items-start gap-2 text-xs leading-relaxed text-muted">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                          <span>{loc.address}</span>
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/80">
                          <a
                            href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-brand transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            {loc.phone}
                          </a>

                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              loc.name + " " + loc.city + " " + loc.address
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-brand hover:underline"
                          >
                            Directions
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Sticky Map Iframe */}
            <div className="w-full lg:w-[55%] relative h-[400px] lg:h-auto lg:sticky lg:top-[80px]">
              <iframe
                title="MG Mumbai Locations Map"
                src={mapSrc}
                className="w-full h-full border-0 min-h-[400px]"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
