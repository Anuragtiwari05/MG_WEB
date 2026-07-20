"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Car360Viewer from "@/components/Car360Viewer";
import TestDriveForm from "@/components/TestDriveForm";
import { type Car, type FeatureSection, formatINR } from "@/lib/data";
import { getCarDekhoImage } from "@/lib/cardekho-image-map";
import { get360Config } from "@/lib/car360Config";

type Props = { car: Car };

/* ── ICON MAP for feature section tabs ── */
function TabIcon({ name, className }: { name: string; className?: string }) {
  const cls = `h-4 w-4 ${className ?? ""}`;
  switch (name) {
    case "car":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h1l2-4h10l2 4h1a2 2 0 012 2v6a2 2 0 01-2 2h-2m-8 0a2 2 0 104 0 2 2 0 00-4 0zm8 0a2 2 0 104 0 2 2 0 00-4 0z"/>
        </svg>
      );
    case "seat":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7V3M8 7V5M16 7V5"/>
        </svg>
      );
    case "wifi":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M1.42 9A16 16 0 0122.58 9M5.34 12.96a10 10 0 0113.32 0M8.76 16.54a5 5 0 016.48 0M12 20h.01"/>
        </svg>
      );
    case "shield":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      );
    case "airbag":
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/>
        </svg>
      );
  }
}

const getBestFor = (id: string) => {
  switch (id) {
    case "astor": return "Urban families looking for a high-tech, feature-rich compact SUV with advanced safety.";
    case "hector": return "Families seeking an ultra-spacious, premium SUV with next-gen connected features.";
    case "zs-ev": return "Eco-conscious buyers wanting a powerful, long-range green electric SUV.";
    case "windsor-ev": return "City commuters looking for a luxurious, spacious electric crossover utility vehicle.";
    case "comet-ev": return "Urban commuters seeking a compact, highly maneuverable, and smart city electric vehicle.";
    case "majestor": return "Elite travelers and executives seeking supreme business-class comfort and heavy-duty SUV road presence.";
    case "m9": return "VVIPs and large families wanting the pinnacle of luxury, silent, and clean electric MPV mobility.";
    case "cyberster": return "Sports car enthusiasts wanting pure open-top electric roadster thrills and jaw-dropping styling.";
    default: return "Buyers seeking premium luxury, safety, and modern connected vehicle technology.";
  }
};

export default function CarDetailClient({ car }: Props) {
  const [selectedColor, setSelectedColor] = useState(car.colors[0]);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showStickyCtas, setShowStickyCtas] = useState(false);
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const ctasRef = useRef<HTMLDivElement>(null);

  // Lock background scroll while the test drive modal is open
  useEffect(() => {
    if (showTestDriveModal) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [showTestDriveModal]);

  useEffect(() => {
    const target = ctasRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCtas(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  /* featureSections state */
  const [activeFsTab, setActiveFsTab] = useState(0);
  const [activeFsItem, setActiveFsItem] = useState(0);

  // 360 View
  const [is360Active, setIs360Active] = useState(false);
  const car360Config = get360Config(car.id);

  const keyFacts = [
    ["Fuel type", car.fuel],
    ["Transmission", car.transmission],
    ["Seating", car.seating],
    ["Range / mileage", car.mileage],
  ];

  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i !== null ? Math.max(0, i - 1) : 0));
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? Math.min(car.galleryImages.length - 1, i + 1) : 0));

  /* Current active feature section & item */
  const fs: FeatureSection | undefined = car.featureSections?.[activeFsTab];
  const fsItem = fs?.items[activeFsItem];

  const activeImage = activeGalleryIndex !== null 
    ? car.galleryImages[activeGalleryIndex].src
    : (getCarDekhoImage(car.id, "hero", selectedColor.name) ?? selectedColor.image ?? car.image);

  const activeLabel = activeGalleryIndex !== null
    ? car.galleryImages[activeGalleryIndex].caption
    : selectedColor.name;

  return (
    <>
      <Navbar />
      <main className="mt-[80px] bg-white">
        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden border-b border-border bg-white">
          <div className="container-px mx-auto max-w-[1400px] pt-7 lg:pt-10">
            <nav aria-label="Breadcrumb" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              <Link href="/" className="hover:text-brand">Home</Link>
              <span className="mx-2 text-faint">/</span>
              <Link href="/cars" className="hover:text-brand">Vehicles</Link>
              <span className="mx-2 text-faint">/</span>
              <span className="text-text">MG {car.name}</span>
            </nav>

            <div className="grid grid-cols-1 gap-8 pb-10 pt-7 lg:min-h-[580px] lg:grid-cols-2 lg:gap-12 lg:py-12">
              {/* Left Column: Color & Gallery Preview Card + Color Selection + Gallery Selection */}
              <Reveal variant="slide-right" className="flex flex-col gap-6 w-full">
                {/* Main Color & Angle Preview Card — or 360° Viewer for Hector */}
                {is360Active && car360Config ? (
                  <Car360Viewer
                    config={car360Config}
                    onClose={() => setIs360Active(false)}
                  />
                ) : (
                  /* ── STATIC PREVIEW CARD ─────────────────────────── */
                  <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl bg-white border border-slate-200/60 shadow-sm">
                    <div className="absolute inset-x-[20%] bottom-[8%] h-[6%] rounded-[50%] bg-black/10 blur-2xl" />
                    
                    <Image
                      src={activeImage}
                      alt={`${car.name} preview in ${activeLabel}`}
                      fill
                      priority
                      className="object-contain p-4 transition-all duration-[600ms]"
                      style={{ filter: activeImage === car.image ? selectedColor.cssFilter || "none" : "none" }}
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-text shadow-sm backdrop-blur">
                      {activeLabel}
                    </span>

                    <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-black/10 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-text backdrop-blur-sm shadow-sm">
                      <Image
                        src="/images/logo-mg.png"
                        alt="MG Logo"
                        width={12}
                        height={12}
                        className="object-contain"
                      />
                      <span>MG {car.name}</span>
                    </span>

                    {car360Config && (
                      <button
                        type="button"
                        onClick={() => setIs360Active(true)}
                        className="absolute right-4 bottom-4 group flex items-center gap-2 rounded-full bg-slate-900 hover:bg-[#B71C1C] text-white font-bold text-[11px] px-4 py-2 shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 z-20"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
                        </svg>
                        360° View
                      </button>
                    )}
                  </div>
                )}


                {/* ── COLOUR OPTION BELOW THE CAR IMAGE ── */}
                <div className="flex flex-col items-center lg:items-start bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted">
                      Colours · <span className="text-slate-800 font-bold">{car.colors.length} options</span>
                    </p>
                    <p className="text-[11px] font-semibold text-slate-400">
                      Selected: <strong className="text-slate-800">{selectedColor.name}</strong>
                    </p>
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-2.5 justify-center lg:justify-start">
                    {car.colors.map((color) => {
                      const selected = color.name === selectedColor.name && activeGalleryIndex === null;
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => {
                            setSelectedColor(color);
                            setActiveGalleryIndex(null);
                          }}
                          aria-label={`Show ${car.name} in ${color.name}`}
                          aria-pressed={selected}
                          title={color.name}
                          className={`h-9 w-9 shrink-0 rounded-full border-2 transition-all cursor-pointer ${
                            selected
                              ? "border-slate-800 ring-2 ring-slate-800/20 scale-110"
                              : "border-slate-200 hover:border-slate-400"
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* ── IMAGE GALLERY THUMBNAILS RIGHT BELOW THE COLORS ── */}
                {car.galleryImages.length > 0 && (
                  <div className="flex flex-col bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between w-full">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted">
                        Gallery Preview · <span className="text-slate-800 font-bold">{car.galleryImages.length} angles</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold">Tap to preview on the car</p>
                    </div>
                    <div className="mt-3.5 grid grid-cols-3 gap-3">
                      {car.galleryImages.slice(0, 8).map((img, i) => {
                        const selected = activeGalleryIndex === i;
                        return (
                          <button
                            key={img.src}
                            type="button"
                            onClick={() => setActiveGalleryIndex(i)}
                            aria-pressed={selected}
                            title={img.caption}
                            className={`group relative aspect-video overflow-hidden rounded-lg border bg-slate-50 transition-all cursor-pointer ${
                              selected
                                ? "border-brand ring-2 ring-brand/15 shadow-sm"
                                : "border-slate-200 hover:border-brand"
                            }`}
                          >
                            <Image
                              src={img.src}
                              alt={img.caption}
                              fill
                              sizes="(max-width: 640px) 33vw, 150px"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className={`absolute inset-0 bg-black/5 transition-opacity duration-200 ${selected ? "opacity-0" : "group-hover:opacity-0"}`} />
                          </button>
                        );
                      })}
                      
                      {/* 9th box: View All link to #gallery */}
                      <a
                        href="#gallery"
                        className="group relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition-all hover:border-brand cursor-pointer"
                      >
                        {/* 2x2 Image Collage Background with low opacity */}
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                          {car.galleryImages.slice(0, 4).map((img, idx) => (
                            <div key={idx} className="relative w-full h-full bg-slate-200">
                              <Image
                                src={img.src}
                                alt=""
                                fill
                                sizes="60px"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        
                        {/* Overlay to ensure text readability */}
                        <div className="absolute inset-0 bg-slate-50/65 group-hover:bg-slate-100/45 transition-colors duration-300" />

                        {/* Foreground Label & Arrow */}
                        <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">View All</span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5 text-slate-800 transition-transform group-hover:translate-x-0.5"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </Reveal>

              {/* Right Column: Title + Specifications + Key Highlights + Action Buttons */}
              <Reveal variant="slide-left" className="flex flex-col w-full">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {car.category === "Electric" ? "Electric Vehicle" : car.type}
                </p>
                <h1 className="mt-1 font-display text-3xl font-black text-text sm:text-4xl">
                  MG {car.name}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {car.blurb}
                </p>
                
                <div className="mt-5 flex items-baseline gap-2 border-t border-slate-100 pt-5">
                  <span className="font-display text-3xl font-black text-brand">
                    {formatINR(car.priceINR)}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    *Ex-showroom price
                  </span>
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-semibold text-muted">Seating</dt>
                    <dd className="mt-0.5 text-sm font-bold text-text leading-snug">{car.seating}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-muted">Fuel</dt>
                    <dd className="mt-0.5 text-sm font-bold text-text leading-snug">{car.fuel}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-muted">Mileage / range</dt>
                    <dd className="mt-0.5 text-sm font-bold text-text leading-snug">{car.mileage}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-muted">Boot space</dt>
                    <dd className="mt-0.5 text-sm font-bold text-text leading-snug">{car.bootSpace}</dd>
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <dt className="text-xs font-semibold text-muted">Best for</dt>
                    <dd className="mt-0.5 text-sm font-medium text-text leading-snug">{getBestFor(car.id)}</dd>
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <dt className="text-xs font-semibold text-muted">Engine / motor choices</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {car.engine.split("|").map(choice => (
                        <span key={choice} className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-text">
                          {choice.trim()}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <dt className="text-xs font-semibold text-muted">Transmission choices</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {car.transmission.split("|").map(choice => (
                        <span key={choice} className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-text">
                          {choice.trim()}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                {/* KEY HIGHLIGHTS */}
                <div className="mt-5 border-t border-slate-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Key Highlights</p>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {car.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm text-text">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div ref={ctasRef} className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setShowTestDriveModal(true)} className="group inline-flex items-center gap-2 rounded bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light cursor-pointer">
                    Book a Test Drive
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  <Link href="/contact-us" className="inline-flex items-center gap-2 rounded border border-brand bg-white px-6 py-3.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white cursor-pointer">
                    Get a Variant Quote
                  </Link>
                  {car.brochureUrl && (
                    <a href={car.brochureUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-6 py-3.5 text-sm font-semibold text-text transition-all hover:border-slate-400 hover:bg-slate-100 cursor-pointer">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      Download Brochure
                    </a>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── STICKY NAV ── */}
        <nav aria-label="Vehicle sections" className="sticky top-[80px] z-30 hidden border-b border-slate-200 bg-white/95 backdrop-blur-md lg:block shadow-sm">
          <div className="container-px mx-auto flex max-w-[1400px] items-center justify-between py-3.5">
            {/* Left / Middle Navigation Links */}
            <div className="flex items-center gap-7 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
              <a href="#overview" className="whitespace-nowrap transition-colors hover:text-brand">Overview</a>
              <a href="#gallery" className="whitespace-nowrap transition-colors hover:text-brand">Gallery</a>
              <a href={car.featureSections ? "#explore" : "#highlights"} className="whitespace-nowrap transition-colors hover:text-brand">Features</a>
              <a href="#safety" className="whitespace-nowrap transition-colors hover:text-brand">Safety</a>
              <a href="#specifications" className="whitespace-nowrap transition-colors hover:text-brand">Specifications</a>
              <a href="#specifications" className="whitespace-nowrap transition-colors hover:text-brand">Variants</a>
            </div>

            {/* Extreme Right: Transitioned CTA Buttons */}
            <div
              className={`flex items-center gap-2.5 transition-all duration-300 ${
                showStickyCtas
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <button
                type="button"
                onClick={() => setShowTestDriveModal(true)}
                className="group inline-flex items-center gap-1.5 rounded bg-brand px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-brand-light cursor-pointer shadow-sm"
              >
                <span>Book a Test Drive</span>
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <Link
                href="/contact-us"
                className="inline-flex items-center gap-1.5 rounded border border-brand bg-white px-4 py-2 text-xs font-semibold text-brand transition-all hover:bg-brand hover:text-white cursor-pointer"
              >
                Get a Variant Quote
              </Link>

              {car.brochureUrl && (
                <a
                  href={car.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-text transition-all hover:border-slate-400 hover:bg-slate-100 cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  <span>Download Brochure</span>
                </a>
              )}
            </div>
          </div>
        </nav>

        {/* ── OVERVIEW / KEY FACTS ── */}
        <section id="overview" className="scroll-mt-36 border-b border-border bg-white py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1180px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <Reveal>
                <p className="eyebrow">Vehicle Overview</p>
                <h2 className="mt-2 font-display text-3xl font-black text-text">Key facts</h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-muted">
                  Built to deliver a powerful, connected, and extremely comfortable driving experience. Explore the standard specifications and performance of the MG {car.name}.
                </p>
              </Reveal>
              <Reveal variant="slide-left" className="grid grid-cols-2 border-l border-t border-border">
                {keyFacts.map(([label, value]) => (
                  <div key={label} className="min-h-32 border-b border-r border-border p-5 sm:p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
                    <p className="mt-3 text-sm font-black leading-5 text-text sm:text-base">{value}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── HIGHLIGHTS ── */}
        <section id="highlights" className="scroll-mt-36 bg-bg-2 py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1180px]">
            <Reveal className="max-w-xl">
              <p className="eyebrow">Designed around you</p>
              <h2 className="mt-2 font-display text-3xl font-black text-text">Made for every drive</h2>
            </Reveal>
            <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
              {car.highlights.map((highlight, index) => (
                <Reveal key={highlight} delay={index * 70} className="flex min-h-28 items-center gap-5 bg-white p-6">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-black text-white">0{index + 1}</span>
                  <p className="text-sm font-bold leading-6 text-text">{highlight}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMMERSIVE FEATURE EXPLORER (only if featureSections exist) ── */}
        {car.featureSections && fs && fsItem && (
          <section id="explore" className="scroll-mt-36 bg-[#0a0c10] py-14 text-white lg:py-20">
            <div className="container-px mx-auto max-w-[1280px]">
              <Reveal>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-brand">Explore every dimension</p>
                <h2 className="mt-2 font-display text-3xl font-black lg:text-4xl">MG {car.name} — Feature Explorer</h2>
              </Reveal>

              {/* Tab bar */}
              <div className="mt-8 flex gap-0 overflow-x-auto border-b border-white/10">
                {car.featureSections.map((section, i) => (
                  <button
                    key={section.tab}
                    type="button"
                    onClick={() => { setActiveFsTab(i); setActiveFsItem(0); }}
                    className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] transition-colors ${
                      activeFsTab === i
                        ? "border-brand text-brand"
                        : "border-transparent text-white/50 hover:text-white/80"
                    }`}
                  >
                    <TabIcon name={section.icon} />
                    {section.tab}
                  </button>
                ))}
              </div>

              {/* Content area */}
              <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
                {/* Left: item list */}
                <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-0">
                  {fs.items.map((item, i) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveFsItem(i)}
                      className={`group flex shrink-0 flex-col items-start rounded-lg px-4 py-3 text-left transition lg:w-full lg:rounded-none lg:border-l-2 lg:px-5 lg:py-5 ${
                        activeFsItem === i
                          ? "lg:border-brand bg-white/8 text-white"
                          : "lg:border-white/10 text-white/50 hover:bg-white/5 hover:text-white/80"
                      }`}
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-brand/80">{`0${i + 1}`}</p>
                      <p className="mt-1 text-xs font-bold leading-5">{item.title}</p>
                    </button>
                  ))}
                </div>

                {/* Right: main feature display */}
                <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white/5">
                    <Image
                      key={fsItem.image}
                      src={fsItem.image}
                      alt={fsItem.title}
                      fill
                      className="object-cover transition duration-700"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>

                  {/* Text panel */}
                  <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    {fsItem.subtitle && (
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-brand">{fsItem.subtitle}</p>
                    )}
                    <h3 className="mt-2 font-display text-xl font-black leading-tight text-white">{fsItem.title}</h3>
                    <div className="mt-3 h-px w-10 bg-brand" />
                    <p className="mt-4 text-sm leading-7 text-white/70">{fsItem.description}</p>
                    {fsItem.highlights && (
                      <ul className="mt-5 space-y-2">
                        {fsItem.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-3 text-xs font-medium text-white/80">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── DEEP DIVE SECTIONS ── */}
        {car.detailedSections.length > 0 && (
          <section id="deep-dive" className="scroll-mt-36 bg-white py-14 lg:py-20">
            <div className="container-px mx-auto max-w-[1180px]">
              <Reveal className="max-w-xl">
                <p className="eyebrow">Under the surface</p>
                <h2 className="mt-2 font-display text-3xl font-black text-text">What makes the {car.name}</h2>
              </Reveal>
              <div className="mt-10 space-y-16 lg:space-y-20">
                {car.detailedSections.map((section, index) => (
                  <Reveal
                    key={section.title}
                    delay={index * 60}
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-[0_16px_40px_-20px_rgba(15,23,42,0.25)]">
                      <Image src={section.image} alt={section.title} fill className="object-cover transition duration-700 hover:scale-105" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-brand">0{index + 1}</span>
                      <h3 className="mt-2 font-display text-2xl font-black leading-tight text-text lg:text-3xl">{section.title}</h3>
                      <div className="mt-4 h-0.5 w-12 bg-brand" />
                      <p className="mt-5 text-sm leading-7 text-muted">{section.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SAFETY CALLOUTS ── */}
        <section className="border-y border-border bg-bg-2 py-14 lg:py-16">
          <div className="container-px mx-auto max-w-[1180px]">
            <Reveal className="text-center">
              <p className="eyebrow">Your peace of mind</p>
              <h2 className="mt-2 font-display text-3xl font-black text-text">Safety, as standard</h2>
            </Reveal>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {car.details.safety.map((item, index) => (
                <Reveal key={item} delay={index * 60} className="rounded-xl border border-border bg-white p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
                    <svg className="h-5 w-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.06em] text-text">{item}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PHOTO GALLERY ── */}
        {car.galleryImages.length > 0 && (
          <section id="gallery" className="scroll-mt-36 bg-white py-14 lg:py-20">
            <div className="container-px mx-auto max-w-[1180px]">
              <Reveal>
                <p className="eyebrow">In the spotlight</p>
                <h2 className="mt-2 font-display text-3xl font-black text-text">MG {car.name} gallery</h2>
                <p className="mt-3 max-w-md text-sm text-muted">Every angle, every detail. Tap any photo to view full screen.</p>
              </Reveal>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {car.galleryImages.map((img, index) => (
                  <Reveal
                    key={img.src}
                    delay={index * 45}
                    className={`group relative cursor-zoom-in overflow-hidden rounded-xl border border-border shadow-sm ${index === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : ""}`}
                  >
                    <div
                      className="relative w-full aspect-square bg-bg-2"
                      onClick={() => setLightboxIndex(index)}
                    >
                      <Image src={img.src} alt={img.caption} fill className="object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <p className="absolute bottom-0 left-0 right-0 translate-y-2 px-3 py-2.5 text-[11px] font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {img.caption}
                      </p>
                      <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
                        <svg className="h-3.5 w-3.5 text-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── LIGHTBOX ── */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm" onClick={closeLightbox}>
            <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" onClick={closeLightbox} aria-label="Close">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-30" onClick={(e) => { e.stopPropagation(); prevImage(); }} disabled={lightboxIndex === 0} aria-label="Previous">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="relative mx-16 max-h-[85vh] max-w-[85vw] overflow-hidden rounded-xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative" style={{ width: "75vw", maxWidth: 1000, aspectRatio: "16/9" }}>
                <Image src={car.galleryImages[lightboxIndex].src} alt={car.galleryImages[lightboxIndex].caption} fill className="object-contain" sizes="85vw" />
              </div>
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 px-4 py-3 text-sm font-medium text-white">
                {car.galleryImages[lightboxIndex].caption}
                <span className="ml-3 text-xs text-white/60">{lightboxIndex + 1} / {car.galleryImages.length}</span>
              </p>
            </div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-30" onClick={(e) => { e.stopPropagation(); nextImage(); }} disabled={lightboxIndex === car.galleryImages.length - 1} aria-label="Next">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}

        {/* ── KEY TECH FEATURES ── */}
        <section className="bg-bg-2 py-14 lg:py-16">
          <div className="container-px mx-auto max-w-[1180px]">
            <Reveal className="text-center">
              <p className="eyebrow">Built-in intelligence</p>
              <h2 className="mt-2 font-display text-3xl font-black text-text">Key technology</h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {car.details.features.map((feat, index) => (
                <Reveal key={feat} delay={index * 60} className="flex items-start gap-4 rounded-xl border border-border bg-white p-5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                    <svg className="h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-xs font-bold leading-5 text-text">{feat}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPECIFICATIONS ── */}
        <section id="specifications" className="scroll-mt-36 border-y border-border bg-bg-2 py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1180px]">
            <Reveal>
              <p className="eyebrow">The details</p>
              <h2 className="mt-2 font-display text-3xl font-black text-text">Specifications</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <SpecCard title="Dimensions & capacity" items={[["Length", car.details.length], ["Width", car.details.width], ["Height", car.details.height], ["Wheelbase", car.details.wheelbase], ["Boot space", car.bootSpace]]} />
              <SpecCard title="Performance" items={[["Engine", car.engine], ["Power output", car.details.power], ["Max torque", car.details.torque], ["Transmission", car.transmission], ...(car.details.battery ? [["Battery pack", car.details.battery]] : []), ...(car.details.acceleration ? [["0–100 km/h", car.details.acceleration]] : [])]} />
              <SpecCard title="Chassis & Mechanicals" items={[["Structure", car.details.chassis], ["Suspension", car.details.suspension], ["Braking System", car.details.brakes]]} />
              <SpecCard title="Warranty & Infotainment" items={[["Infotainment", car.details.infotainment], ["Warranty Program", car.details.warranty]]} />
            </div>
          </div>
        </section>

        {/* ── ENQUIRE CTA ── */}
        <section id="enquire" className="scroll-mt-36 bg-brand-deep py-14 text-white lg:py-16">
          <div className="container-px mx-auto flex max-w-[1180px] flex-col justify-between gap-7 md:flex-row md:items-center">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Ready when you are</p>
              <h2 className="mt-2 font-display text-3xl font-black">Meet the MG {car.name}</h2>
              <p className="mt-2 text-sm text-white/65">Book a test drive with MG Motor Mumbai.</p>
            </Reveal>
            <Reveal variant="slide-left" className="flex flex-wrap gap-3">
              <button type="button" onClick={() => setShowTestDriveModal(true)} className="btn-primary px-6 py-3 text-xs uppercase tracking-wider cursor-pointer">Book a test drive</button>
              <Link href="/contact-us" className="rounded-md border border-white/35 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-text">Enquire now</Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />

      {/* ── BOOK A TEST DRIVE MODAL — stays on this car's URL, sized to fit the viewport ── */}
      {showTestDriveModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowTestDriveModal(false);
          }}
        >
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowTestDriveModal(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-slate-400 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="overflow-y-auto rounded-xl p-6 sm:p-10">
              <TestDriveForm presetCarId={car.id} onExit={() => setShowTestDriveModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SpecCard({ title, items }: { title: string; items: string[][] }) {
  return (
    <Reveal className="rounded-xl border border-border bg-white p-6 sm:p-7">
      <h3 className="border-b border-border pb-4 text-xs font-black tracking-[0.13em] text-text">{title}</h3>
      <dl className="mt-2">
        {items.map(([label, value]) => (
          <div key={label} className="flex gap-5 border-b border-border/70 py-3.5 text-xs last:border-0">
            <dt className="w-[42%] shrink-0 font-medium text-muted">{label}</dt>
            <dd className="font-bold leading-5 text-text">{value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
