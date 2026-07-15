"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { type Car, type FeatureSection, formatINR } from "@/lib/data";
import { getCarDekhoImage } from "@/lib/cardekho-image-map";

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

export default function CarDetailClient({ car }: Props) {
  const [selectedColor, setSelectedColor] = useState(car.colors[0]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* featureSections state */
  const [activeFsTab, setActiveFsTab] = useState(0);
  const [activeFsItem, setActiveFsItem] = useState(0);

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
  const heroImage = getCarDekhoImage(car.id, "hero", selectedColor.name) ?? selectedColor.image ?? car.image;

  return (
    <>
      <Navbar />
      <main className="mt-[80px] bg-white">
        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#f0f0f0] via-[#f0f0f0] to-white">
          <div className="container-px mx-auto max-w-[1400px] pt-7 lg:pt-10">
            <nav aria-label="Breadcrumb" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              <Link href="/" className="hover:text-brand">Home</Link>
              <span className="mx-2 text-faint">/</span>
              <Link href="/cars" className="hover:text-brand">Vehicles</Link>
              <span className="mx-2 text-faint">/</span>
              <span className="text-text">MG {car.name}</span>
            </nav>

            <div className="grid items-center gap-5 pb-10 pt-7 lg:min-h-[580px] lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:py-12">
              <Reveal className="order-2 lg:order-1">
                <p className="eyebrow">{car.type}</p>
                <h1 className="mt-3 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-text sm:text-5xl lg:text-6xl">
                  MG {car.name}
                </h1>
                <p className="mt-5 max-w-lg text-sm leading-7 text-muted sm:text-base">{car.blurb}</p>
                <div className="mt-7 border-l-2 border-brand pl-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Starting from</p>
                  <p className="mt-1 text-3xl font-black text-text">{formatINR(car.priceINR)}<span className="ml-1 text-sm font-medium text-muted">*</span></p>
                  <p className="mt-1 text-xs text-muted">Ex-showroom price. Terms and conditions apply.</p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={`/locate-service-centre?model=${encodeURIComponent(car.name)}`} className="btn-primary px-6 py-3 text-xs uppercase tracking-wider">
                    Book a test drive
                  </Link>
                  <Link href="/contact-us" className="btn-outline px-6 py-3 text-xs uppercase tracking-wider">
                    Request a callback
                  </Link>
                </div>
              </Reveal>

              <Reveal variant="slide-left" className="order-1 lg:order-2 flex flex-col gap-6 w-full">
                {/* Frameless floating image — no box, no border, no shadow */}
                <div className="relative isolate aspect-[16/9] w-full">
                  {/* Subtle ground shadow */}
                  <div className="absolute inset-x-[20%] bottom-[5%] h-[6%] rounded-[50%] bg-black/10 blur-2xl" />
                  <Image
                    src={heroImage}
                    alt={`${car.name} front three-quarter view in ${selectedColor.name}`}
                    fill
                    priority
                    className="object-contain transition-all duration-[600ms]"
                    style={{ filter: heroImage === car.image ? selectedColor.cssFilter || "none" : "none" }}
                  />
                  {/* Left edge fade — blends into section bg */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#f0f0f0] to-transparent" />
                  {/* Right edge fade */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-[#f0f0f0] to-transparent" />
                  {/* Bottom fade */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#f0f0f0] to-transparent" />
                  {/* Top fade */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#f0f0f0] to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-text backdrop-blur-sm">MG {car.name}</span>
                </div>

                {/* ── COLOUR OPTION BELOW THE CAR IMAGE ── */}
                <div className="flex flex-col items-center lg:items-start bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted">Select Colour Variant</p>
                  <div className="mt-3.5 flex flex-wrap gap-2.5 justify-center lg:justify-start">
                    {car.colors.map((color) => {
                      const selected = color.name === selectedColor.name;
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          aria-pressed={selected}
                          className={`group flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                            selected
                              ? "border-slate-900 bg-slate-900 text-white shadow-md"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
                          }`}
                        >
                          <span
                            className={`h-4 w-4 rounded-full border transition-all duration-200 ${
                              selected ? "border-white/40 ring-2 ring-white/60 scale-110" : "border-black/10 shadow-inner"
                            }`}
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="pr-0.5">{color.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-[11px] font-semibold text-slate-400">
                    Selected: <strong className="text-slate-800">{selectedColor.name}</strong>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── STICKY NAV ── */}
        <nav aria-label="Vehicle sections" className="sticky top-[80px] z-20 hidden border-b border-border bg-white/95 backdrop-blur lg:block">
          <div className="container-px mx-auto flex max-w-[1400px] items-center gap-8 overflow-x-auto py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            <a href="#overview" className="whitespace-nowrap text-brand">Overview</a>
            <a href="#highlights" className="whitespace-nowrap hover:text-brand">Highlights</a>
            {car.featureSections && <a href="#explore" className="whitespace-nowrap hover:text-brand">Explore</a>}
            <a href="#deep-dive" className="whitespace-nowrap hover:text-brand">Deep Dive</a>
            <a href="#gallery" className="whitespace-nowrap hover:text-brand">Gallery</a>
            <a href="#specifications" className="whitespace-nowrap hover:text-brand">Specifications</a>
            <a href="#enquire" className="ml-auto whitespace-nowrap text-brand hover:underline">Enquire now</a>
          </div>
        </nav>

        {/* ── OVERVIEW / KEY FACTS ── */}
        <section id="overview" className="scroll-mt-36 border-b border-border bg-white py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1180px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <Reveal>
                <p className="eyebrow">Vehicle Overview</p>
                <h2 className="mt-2 font-display text-3xl font-black uppercase text-text">Key facts</h2>
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
              <h2 className="mt-2 font-display text-3xl font-black uppercase text-text">Made for every drive</h2>
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
                <h2 className="mt-2 font-display text-3xl font-black uppercase lg:text-4xl">MG {car.name} — Feature Explorer</h2>
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
                    <h3 className="mt-2 font-display text-xl font-black uppercase leading-tight text-white">{fsItem.title}</h3>
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
                <h2 className="mt-2 font-display text-3xl font-black uppercase text-text">What makes the {car.name}</h2>
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
                      <h3 className="mt-2 font-display text-2xl font-black uppercase leading-tight text-text lg:text-3xl">{section.title}</h3>
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
              <h2 className="mt-2 font-display text-3xl font-black uppercase text-text">Safety, as standard</h2>
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
                <h2 className="mt-2 font-display text-3xl font-black uppercase text-text">MG {car.name} gallery</h2>
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
              <h2 className="mt-2 font-display text-3xl font-black uppercase text-text">Key technology</h2>
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
              <h2 className="mt-2 font-display text-3xl font-black uppercase text-text">Specifications</h2>
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
              <h2 className="mt-2 font-display text-3xl font-black uppercase">Meet the MG {car.name}</h2>
              <p className="mt-2 text-sm text-white/65">Book a test drive with MG Motor Mumbai.</p>
            </Reveal>
            <Reveal variant="slide-left" className="flex flex-wrap gap-3">
              <Link href={`/locate-service-centre?model=${encodeURIComponent(car.name)}`} className="btn-primary px-6 py-3 text-xs uppercase tracking-wider">Book a test drive</Link>
              <Link href="/contact-us" className="rounded-md border border-white/35 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-text">Enquire now</Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SpecCard({ title, items }: { title: string; items: string[][] }) {
  return (
    <Reveal className="rounded-xl border border-border bg-white p-6 sm:p-7">
      <h3 className="border-b border-border pb-4 text-xs font-black uppercase tracking-[0.13em] text-text">{title}</h3>
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
