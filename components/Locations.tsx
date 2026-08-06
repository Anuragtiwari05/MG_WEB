"use client";

import Image from "next/image";
import { locations } from "@/lib/data";
import { MapPin, Phone, ArrowRight } from "./icons";
import Reveal from "./Reveal";
import Link from "next/link";

type Loc = (typeof locations)[number];

function LocationCard({ loc }: { loc: Loc }) {
  return (
    <article className="group relative flex h-[340px] flex-col justify-end overflow-hidden rounded-xl border border-white/10 shadow-lg bg-black/20">
      <Image
        src={loc.image}
        alt={`MG Motor Mumbai ${loc.name} ${loc.city}`}
        title={`MG Motor Mumbai ${loc.name} ${loc.city}`}
        fill
        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
      <div className="relative p-5">
        <span className="mb-2 inline-block rounded bg-brand px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
          {loc.type}
        </span>

        <h3 className="font-display text-base font-extrabold leading-snug text-white">
          {loc.name} ({loc.city})
        </h3>

        <p className="mt-2 flex items-start gap-1.5 text-[11px] text-white/70">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
          <span className="line-clamp-2">{loc.address}</span>
        </p>

        <a
          href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
          className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-white/80 transition-colors hover:text-white"
        >
          <Phone className="h-3.5 w-3.5 shrink-0 text-brand" />
          {loc.phone}
        </a>

        {/* Green Google Maps Search Button */}
        <div className="mt-4">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + " " + loc.city + " " + loc.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded bg-[#00ad8a] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#009677] hover:shadow-[0_0_12px_rgba(0,173,138,0.3)]"
          >
            <MapPin className="h-3 w-3" />
            Google Maps
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Locations() {
  const currentList = locations;

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
              Explore our state-of-the-art showrooms across Mumbai — Malad, Vasai, Prabhadevi, Jogeshwari & Worli.
            </p>
          </div>
          <div className="flex shrink-0 items-center">
            <Link
              href="/#test-drive"
              className="group inline-flex items-center gap-2 rounded border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur transition-all hover:bg-white/20 cursor-pointer"
            >
              BOOK TEST DRIVE
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* Mobile: native horizontal swipeable row (scroll-snap, same
            mechanism as the blog/testimonial cards) — real finger-drag
            momentum instead of a stacked single-column grid. */}
        <div className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 pr-4 sm:hidden [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {currentList.map((loc, i) => (
            <div key={loc.name + i} className="w-[78%] shrink-0 snap-start">
              <LocationCard loc={loc} />
            </div>
          ))}
        </div>

        {/* Tablet & up: responsive flex-wrap (not grid) so an incomplete last
            row — e.g. 5 showrooms at 3-per-row on iPad leaves 2 stranded on
            the left — centers itself instead of hugging the grid's left
            edge. */}
        <div className="hidden flex-wrap justify-center gap-6 animate-[fade-in_0.4s_ease-out_both] sm:flex">
          {currentList.map((loc, i) => (
            <Reveal
              key={loc.name + i}
              delay={(i % 4) * 80}
              variant="slide-left"
              className="grow-0 shrink-0 basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] xl:basis-[calc(20%-19.2px)]"
            >
              <LocationCard loc={loc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
