"use client";

import { useState } from "react";
import Image from "next/image";
import { locations, workshops } from "@/lib/data";
import { MapPin, Phone, ArrowRight } from "./icons";
import Reveal from "./Reveal";
import Link from "next/link";

export default function Locations() {
  const [activeTab, setActiveTab] = useState<"showrooms" | "workshops">("showrooms");
  const currentList = activeTab === "showrooms" ? locations : workshops;

  return (
    <section id="locations" className="scroll-mt-24 bg-brand-deep py-14 lg:py-20 text-white">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Our Presence
            </p>
            <h2 className="mt-1 font-display text-2xl font-black uppercase tracking-wide sm:text-3xl">
              FIND US NEAR YOU
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Explore our state-of-the-art facilities across Mumbai and Thane.
            </p>
          </div>
          <div className="flex shrink-0 items-center">
            <Link
              href="#offers"
              className="group inline-flex items-center gap-2 rounded border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur transition-all hover:bg-white/20"
            >
              BOOK TEST DRIVE
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* Tab Capsules */}
        <Reveal className="mb-10 flex gap-3">
          <button
            onClick={() => setActiveTab("showrooms")}
            className={`rounded-full border px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === "showrooms"
                ? "bg-white border-white text-black"
                : "bg-white/5 border-white/10 text-white/75 hover:bg-white/10"
            }`}
          >
            Showrooms
          </button>
          <button
            onClick={() => setActiveTab("workshops")}
            className={`rounded-full border px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === "workshops"
                ? "bg-white border-white text-black"
                : "bg-white/5 border-white/10 text-white/75 hover:bg-white/10"
            }`}
          >
            Workshops
          </button>
        </Reveal>

        {/* Responsive Grid - Swaps key to trigger entering fade-in transitions */}
        <div
          key={activeTab}
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 animate-[fade-in_0.4s_ease-out_both] ${
            activeTab === "showrooms"
              ? "lg:grid-cols-3 xl:grid-cols-5"
              : "lg:grid-cols-3 max-w-[1100px] mx-auto"
          }`}
        >
          {currentList.map((loc, i) => (
            <Reveal
              key={loc.name + i}
              delay={(i % 4) * 80}
              variant="slide-left"
              className="w-full"
            >
              <article className="group relative flex h-[340px] flex-col justify-end overflow-hidden rounded-xl border border-white/10 shadow-lg bg-black/20">
                <Image
                  src={loc.image}
                  alt={`MG Motor Mumbai ${loc.name} ${loc.city}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
