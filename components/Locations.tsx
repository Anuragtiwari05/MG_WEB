"use client";

import { useState } from "react";
import Image from "next/image";
import { locations, workshops } from "@/lib/data";
import { MapPin, Phone, ArrowRight } from "./icons";
import Reveal from "./Reveal";
import Link from "next/link";

type Loc = (typeof locations)[number];

function LocationCard({ loc }: { loc: Loc }) {
  return (
    <article className="group relative aspect-square w-full overflow-hidden rounded-lg">
      <Image
        src={loc.image}
        alt={`MG Motor Mumbai ${loc.name} ${loc.city}`}
        title={`MG Motor Mumbai ${loc.name} ${loc.city}`}
        fill
        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-4">
        <span className="mb-1.5 inline-block w-fit rounded bg-brand/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
          {loc.type}
        </span>

        <h3 className="font-display text-sm font-semibold leading-snug text-white">
          {loc.name} - {loc.city}
        </h3>

        <p className="mt-1 flex items-center gap-1 text-[11px] text-white/75">
          <MapPin className="h-3 w-3 shrink-0 text-brand" />
          {loc.city}
        </p>

        <a
          href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
          className="mt-1 flex items-center gap-1 text-[11px] font-medium text-white/90 transition-colors hover:text-white"
        >
          <Phone className="h-3 w-3 shrink-0 text-brand" />
          {loc.phone}
        </a>
      </div>
    </article>
  );
}

const isSelectLoc = (loc: Loc) => loc.name.toLowerCase().includes("select");

export default function Locations() {
  const [filter, setFilter] = useState<"Showroom" | "Select" | "Service Centre">("Showroom");
  const currentList =
    filter === "Showroom"
      ? locations.filter((l) => !isSelectLoc(l))
      : filter === "Select"
      ? locations.filter(isSelectLoc)
      : workshops;

  return (
    <section id="locations" className="scroll-mt-24 bg-brand-deep py-14 lg:py-20 text-white">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Our Presence
            </p>
            <h2 className="mt-1 font-display text-2xl font-black tracking-wide sm:text-3xl">
              FIND US NEAR YOU
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Explore our state-of-the-art showrooms and service centres across Mumbai - Malad, Vasai, Prabhadevi, Jogeshwari & Worli.
            </p>
          </div>
          <div className="flex shrink-0 items-center">
            <Link
              href="/locations"
              className="group inline-flex items-center gap-2 rounded border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur transition-all hover:bg-white/20 cursor-pointer"
            >
              VIEW ON MAP
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* Toggle/Filter Bar */}
        <Reveal className="mb-8">
          <div className="flex flex-wrap gap-2.5">
            {(
              [
                { key: "Showroom", label: "Showrooms" },
                { key: "Select", label: "MG Select" },
                { key: "Service Centre", label: "Service Centres" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  filter === tab.key
                    ? "bg-white text-brand-deep"
                    : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Mobile: native horizontal swipeable row (scroll-snap, same
            mechanism as the blog/testimonial cards) - real finger-drag
            momentum instead of a stacked single-column grid. */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 sm:hidden [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {currentList.map((loc, i) => (
            <div key={loc.name + i} className="w-[88%] shrink-0 snap-start">
              <LocationCard loc={loc} />
            </div>
          ))}
        </div>

        {/* Tablet & up: responsive flex-wrap (not grid), left-aligned so
            every row - including a short last row - starts flush under the
            "Showrooms" tab instead of drifting toward the center. */}
        <div className="hidden flex-wrap justify-start gap-6 animate-[fade-in_0.4s_ease-out_both] sm:flex">
          {currentList.map((loc, i) => (
            <Reveal
              key={loc.name + i}
              delay={(i % 4) * 80}
              variant="slide-left"
              className="grow-0 shrink-0 basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] xl:basis-[calc(25%-18px)]"
            >
              <LocationCard loc={loc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
