"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const categories = [
  {
    title: "SUVs",
    description: "Intelligent, spacious, and commanding SUVs built for city commutes and weekend getaways. Equipped with premium cabins and Level 2 ADAS.",
    models: "ASTOR • HECTOR • HECTOR PLUS • ZS EV • GLOSTER",
    modelList: ["Astor", "Hector", "Hector Plus", "ZS EV", "Gloster"],
    icon: "🚙",
  },
  {
    title: "Electric Vehicles (EVs)",
    description: "MG's pioneering electric range combining clean energy, advanced battery tech, and smart connectivity for daily commutes and long journeys.",
    models: "COMET EV • WINDSOR EV • ZS EV • CYBERSTER",
    modelList: ["Comet EV", "Windsor EV", "ZS EV", "Cyberster"],
    icon: "⚡",
  },
  {
    title: "City Mobility",
    description: "Ultra-compact, agile, and smart vehicles designed to navigate congested city streets and tight parking spaces with absolute ease.",
    models: "COMET EV",
    modelList: ["Comet EV"],
    icon: "🚗",
  },
  {
    title: "Luxury & Performance",
    description: "High-performance sports cars and luxury MUVs featuring advanced design, unmatched road presence, and supreme comfort.",
    models: "CYBERSTER • GLOSTER • MAJESTOR • M9",
    modelList: ["Cyberster", "Gloster", "Majestor", "M9"],
    icon: "✨",
  },
];

export default function LineupCategories() {
  const [activePopup, setActivePopup] = useState<number | null>(null);

  return (
    <section id="lineup" className="scroll-mt-24 bg-white py-14 lg:py-20 border-b border-border">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            The MG Lineup
          </p>
          <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-wide text-text sm:text-4xl">
            New MG cars for every driver, family and budget
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            As an authorised MG Motor Mumbai dealership, we stock the complete MG range — from intelligent compact city cars to premium family SUVs and state-of-the-art electric vehicles. Explore each category below.
          </p>
        </Reveal>

        {/* Grid of categories */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal
              key={cat.title}
              delay={i * 100}
              variant="scale-up"
              className="h-full"
            >
              <div
                className="group relative flex h-full flex-col justify-between rounded-xl border border-border bg-bg-2 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md hover:bg-white cursor-pointer"
                onClick={() => setActivePopup(i)}
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-text transition-colors group-hover:text-brand">
                    {cat.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
                    {cat.models}
                  </p>
                  <span className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand transition-all group-hover:bg-brand group-hover:text-white">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                {/* Left accent bar on hover */}
                <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-transparent transition-all group-hover:bg-brand" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── MODAL POPUP ─────────────────────────────────────────── */}
      {activePopup !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setActivePopup(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Card */}
          <div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent strip */}
            <div className="h-1.5 w-full bg-brand" />

            {/* Content */}
            <div className="p-7">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-3xl">{categories[activePopup].icon}</span>
                  <h3 className="mt-2 font-display text-xl font-black uppercase tracking-wide text-text">
                    {categories[activePopup].title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {categories[activePopup].description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePopup(null)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Models list */}
              <div className="mt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-3">
                  Models in this category
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categories[activePopup].modelList.map((model) => (
                    <a
                      key={model}
                      href="/cars"
                      className="flex items-center gap-2.5 rounded-lg border border-border bg-bg-2 px-4 py-3 text-sm font-semibold text-text transition-all hover:border-brand/50 hover:bg-brand/5 hover:text-brand"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {model}
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex gap-3">
                <a
                  href="/cars"
                  className="flex-1 rounded-lg bg-brand py-3 text-center text-sm font-bold text-white transition-all hover:bg-brand/90"
                >
                  Explore Range →
                </a>
                <button
                  type="button"
                  onClick={() => setActivePopup(null)}
                  className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-muted transition-all hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
