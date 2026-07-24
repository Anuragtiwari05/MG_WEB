"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, getCarTransparentImage } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

const AUTOPLAY = 7000;

function getModelSlug(model: string): string {
  const m = model.toLowerCase();
  if (m.includes("zs ev") || m.includes("zs-ev")) return "zs-ev";
  if (m.includes("cyberster")) return "cyberster";
  if (m.includes("windsor")) return "windsor-ev";
  if (m.includes("astor")) return "astor";
  if (m.includes("hector")) return "hector";
  if (m.includes("majestor")) return "majestor";
  if (m.includes("m9")) return "m9";
  if (m.includes("comet")) return "comet-ev";
  return "";
}

// Mobile shows the car alone (no banner scenery/baked text — see the
// transparent product cutouts under public/images/models/), so only slides
// that resolve to a real model get a cutout to show; the two generic
// "MG MOTOR LINEUP" filler slides don't name an actual model and are skipped.
const mobileSlides = heroSlides.filter((s) => s.exploreSlug || getModelSlug(s.model));

export default function Hero() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const mobTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const deskTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mobile autoplay
  useEffect(() => {
    if (mobTimer.current) clearInterval(mobTimer.current);
    mobTimer.current = setInterval(
      () => setMobileIndex((i) => (i + 1) % mobileSlides.length),
      AUTOPLAY
    );
    return () => { if (mobTimer.current) clearInterval(mobTimer.current); };
  }, []);

  // Desktop autoplay
  useEffect(() => {
    if (deskTimer.current) clearInterval(deskTimer.current);
    deskTimer.current = setInterval(
      () => setDesktopIndex((i) => (i + 1) % heroSlides.length),
      AUTOPLAY
    );
    return () => { if (deskTimer.current) clearInterval(deskTimer.current); };
  }, []);

  const goMobile = useCallback((dir: number) =>
    setMobileIndex((i) => (i + dir + mobileSlides.length) % mobileSlides.length), []);

  const goDesktop = useCallback((dir: number) =>
    setDesktopIndex((i) => (i + dir + heroSlides.length) % heroSlides.length), []);

  const slide = mobileSlides[mobileIndex];
  const slideSlug = slide ? slide.exploreSlug || getModelSlug(slide.model) : "";

  return (
    <section id="home" className="w-full bg-brand-deep">

      {/* ═══════════════════════════════════════
          MOBILE  (<640 px)
          Just the car — a transparent product cutout, not the desktop
          banner — floating on the brand background. No crop, ever: the
          whole vehicle is always visible on every phone size.
          Text + CTAs sit below in a dark panel.
          ═══════════════════════════════════════ */}
      <div className="sm:hidden">

        <div className="relative w-full overflow-hidden aspect-[4/3] min-h-[220px] max-h-[38vh]">
          {/* Soft spotlight + floor shadow so the floating cutout doesn't look bare */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-2/3 w-2/3 rounded-full bg-brand/10 blur-3xl" />
          </div>
          <div className="pointer-events-none absolute bottom-[8%] left-1/2 h-4 w-2/3 -translate-x-1/2 rounded-[100%] bg-black/50 blur-md" />

          {mobileSlides.map((s, i) => {
            const active = i === mobileIndex;
            const cutout = getCarTransparentImage(s.exploreSlug || getModelSlug(s.model));
            return (
              <div
                key={`mob-img-${s.model}`}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ opacity: active ? 1 : 0, zIndex: active ? 10 : 0, pointerEvents: active ? "auto" : "none" }}
              >
                <Image
                  src={cutout}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-contain p-6"
                />
              </div>
            );
          })}

          {/* Prev / Next arrows */}
          <button
            aria-label="Previous slide"
            onClick={() => goMobile(-1)}
            className="absolute left-2 top-1/2 z-30 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => goMobile(1)}
            className="absolute right-2 top-1/2 z-30 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Text panel */}
        <div className="bg-brand-deep px-4 pt-4 pb-6 text-center text-white">
          {slide && (
            <Reveal key={slide.model} variant="fade-up" className="flex flex-col items-center">
              <span className="inline-block rounded-full bg-brand px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest">
                {slide.badge}
              </span>
              <h1 className="mt-2 font-display text-2xl font-black leading-tight tracking-tight">
                {slide.headline}
              </h1>
              <p className="mt-1.5 max-w-xs text-sm leading-snug text-white/75">
                {slide.sub}
              </p>
              {slide.price && (
                <p className="mt-2 text-xs font-semibold text-white/60">
                  Starting at{" "}
                  <span className="text-lg font-bold text-white">₹{slide.price} Lakh</span>*
                </p>
              )}
              {/* Feature chips: stands in for whatever feature row is baked
                  into the desktop banner's own pixels — the cutout carries
                  none of that copy, so it renders as real text here. */}
              {slide.features.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                  {slide.features.map((feature, idx) => (
                    <span key={feature} className="flex items-center gap-3">
                      {idx > 0 && <span className="h-3 w-px bg-white/30" aria-hidden="true" />}
                      <span className="text-[10px] font-bold uppercase tracking-wide text-white/90">
                        {feature}
                      </span>
                    </span>
                  ))}
                </div>
              )}
              <div className={`mt-4 grid w-full gap-2.5 ${slideSlug ? "grid-cols-2" : "grid-cols-1 max-w-[200px]"}`}>
                <Link
                  href="/#test-drive"
                  className="block rounded bg-brand px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-light"
                >
                  Book Test Drive
                </Link>
                {slideSlug && (
                  <Link
                    href={`/cars/${slideSlug}`}
                    className="block rounded border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm hover:bg-white/20"
                  >
                    Explore Model
                  </Link>
                )}
              </div>
            </Reveal>
          )}

          {/* Dots */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {mobileSlides.map((s, i) => (
              <button
                key={`mob-dot-${s.model}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setMobileIndex(i)}
                className="h-1.5 overflow-hidden rounded-full bg-white/20 transition-all"
                style={{ width: i === mobileIndex ? 36 : 12 }}
              >
                <span
                  className="block h-full rounded-full bg-brand"
                  style={{
                    width: i === mobileIndex ? "100%" : "0%",
                    transition: i === mobileIndex ? `width ${AUTOPLAY}ms linear` : "none",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          DESKTOP  (≥640 px)
          Full viewport height. Video plays where available.
          Text overlaid bottom-left (or center-left).
          ═══════════════════════════════════════ */}
      <div className="relative hidden h-screen h-dvh w-full sm:block">
        {heroSlides.map((s, i) => {
          const active = i === desktopIndex;
          const slug = s.exploreSlug || getModelSlug(s.model);
          const showOwnText = !s.hasImageText;

          return (
            <div
              key={`desk-${s.model}`}
              className="absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-1000"
              style={{ opacity: active ? 1 : 0, zIndex: active ? 10 : 0, pointerEvents: active ? "auto" : "none" }}
            >
              {s.video ? (
                <video
                  src={s.video}
                  poster={s.image}
                  autoPlay loop muted playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              )}

              {/* Scrim */}
              <div
                className={`absolute inset-0 z-10 ${
                  s.hasImageText
                    ? "bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                    : "bg-gradient-to-r from-black/80 via-black/40 to-transparent"
                }`}
              />

              {/* Text overlay */}
              <div
                className={`container-px absolute inset-x-0 z-20 mx-auto flex w-full max-w-[1400px] flex-col items-start text-left text-white ${
                  s.hasImageText
                    ? "bottom-0 justify-end pb-24 md:pb-32"
                    : "inset-y-0 justify-center"
                }`}
              >
                <div className="flex w-full max-w-2xl flex-col items-start">
                  {active && (
                    <Reveal variant="fade-up" className="flex w-full flex-col items-start">
                      {showOwnText && (
                        <>
                          <span className="inline-block rounded-full bg-brand px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest">
                            {s.badge}
                          </span>
                          <h1 className="mt-4 font-display text-6xl font-black leading-[1.05] tracking-tight lg:text-7xl">
                            {s.headline}
                          </h1>
                          <p className="mt-4 max-w-lg text-base text-white/85 md:text-lg">
                            {s.sub}
                          </p>
                          {s.price && (
                            <p className="mt-5 text-sm font-semibold tracking-wide text-white/70">
                              Starting at{" "}
                              <span className="text-2xl font-bold text-white">
                                ₹{s.price} Lakh
                              </span>
                              *
                            </p>
                          )}
                        </>
                      )}
                      <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                          href="/#test-drive"
                          className="rounded bg-brand px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-light"
                        >
                          Book Test Drive
                        </Link>
                        {slug && (
                          <Link
                            href={`/cars/${slug}`}
                            className="rounded border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                          >
                            Explore Model
                          </Link>
                        )}
                      </div>
                    </Reveal>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Prev / Next */}
        <button
          aria-label="Previous slide"
          onClick={() => goDesktop(-1)}
          className="absolute left-4 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-all hover:bg-black/55"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => goDesktop(1)}
          className="absolute right-4 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-all hover:bg-black/55"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={`desk-dot-${s.model}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setDesktopIndex(i)}
              className="h-1.5 overflow-hidden rounded-full bg-white/20 transition-all"
              style={{ width: i === desktopIndex ? 36 : 12 }}
            >
              <span
                className="block h-full rounded-full bg-brand"
                style={{
                  width: i === desktopIndex ? "100%" : "0%",
                  transition: i === desktopIndex ? `width ${AUTOPLAY}ms linear` : "none",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
