"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { heroSlides, type Slide } from "@/lib/data";
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

// Mobile drops slides where the car isn't the dominant, tightly-framed
// subject (baked text/graphics eat too much of the frame, or there's no car
// at all) instead of showing them letterboxed. Desktop keeps every slide.
const mobileSlides = heroSlides.filter((s) => s.mobileImage && !s.mobileExclude);

function HeroCarousel({ slides, isMobile }: { slides: Slide[]; isMobile: boolean }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY);
    return () => clearInterval(t);
  }, [count]);

  return (
    <div className="relative h-full w-full">
      {slides.map((slide, i) => {
        const isActive = i === index;
        const slug = slide.exploreSlug || getModelSlug(slide.model);
        // On mobile the baked-in banner text never survives the crop, so our
        // own badge/headline/price always render there. Desktop keeps the
        // original behaviour: hidden when hasImageText, since the full-bleed
        // desktop banner already has that copy baked in.
        const showOwnText = isMobile || !slide.hasImageText;

        return (
          <div
            key={`${slide.model}-${i}`}
            className="absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-1000 ease-out"
            style={{
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? "auto" : "none",
              zIndex: isActive ? 10 : 0,
            }}
          >
            {isMobile ? (
              <Image
                src={slide.mobileImage!}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className={slide.mobileFit === "contain" ? "object-contain object-top" : "object-cover"}
              />
            ) : slide.video ? (
              <video
                src={slide.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}

            {/* Scrim Overlay */}
            <div className={`absolute inset-0 z-10 transition-all duration-300 ${
              isMobile
                ? "bg-gradient-to-t from-black/85 via-black/20 to-transparent"
                : slide.hasImageText
                ? "bg-gradient-to-t from-black/60 via-transparent to-transparent"
                : "bg-gradient-to-r from-black/80 via-black/45 to-transparent"
            }`} />

            {/* Content Overlay */}
            <div className={`container-px absolute z-20 mx-auto flex w-full max-w-[1400px] flex-col text-white ${
              isMobile
                ? "inset-x-0 bottom-0 items-center pb-6 text-center"
                : slide.hasImageText
                ? "inset-y-0 left-0 right-0 justify-end pb-24 md:pb-28 items-start text-left"
                : "inset-y-0 left-0 right-0 justify-center items-start text-left"
            }`}>
              <div className={`flex w-full max-w-2xl flex-col ${isMobile ? "items-center" : "items-start"}`}>
                {isActive && (
                  <Reveal variant="fade-up" className={`flex w-full flex-col ${isMobile ? "items-center" : "items-start"}`}>
                    {showOwnText && (
                      <>
                        <span className="inline-block rounded-full bg-brand px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest">
                          {slide.badge}
                        </span>
                        <h1 className={`mt-2 font-display font-black tracking-tight leading-[1.05] sm:mt-4 ${
                          isMobile ? "text-[clamp(1.5rem,1rem+4vw,2.5rem)]" : "text-6xl lg:text-7xl"
                        }`}>
                          {slide.headline}
                        </h1>
                        <p className={`mt-2 text-white/85 sm:mt-4 ${
                          isMobile ? "max-w-xs text-[clamp(0.8125rem,0.75rem+0.4vw,1.125rem)]" : "max-w-2xl text-base md:text-lg"
                        }`}>
                          {slide.sub}
                        </p>
                        {slide.price && (
                          <p className="mt-2 text-xs font-semibold tracking-wide text-white/70 sm:mt-5 sm:text-sm">
                            Starting at{" "}
                            <span className={`font-bold text-white ${isMobile ? "text-[clamp(1.125rem,1rem+1vw,1.5rem)]" : "text-2xl"}`}>
                              ₹{slide.price} Lakh
                            </span>
                            *
                          </p>
                        )}
                      </>
                    )}
                    {/* Feature chips (mobile-only): stands in for whatever feature
                        row is baked into the desktop banner's own pixels — real
                        text so it reflows instead of getting cut mid-word. */}
                    {isMobile && slide.features.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
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
                    <div className={`grid w-full gap-2.5 ${isMobile ? "mt-4" : "mt-8 flex w-auto flex-wrap gap-4"} ${
                      slug ? "grid-cols-2" : "grid-cols-1 max-w-[200px]"
                    }`}>
                      <Link
                        href="/#test-drive"
                        className="block w-full rounded bg-brand px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-light sm:w-auto sm:px-6 sm:py-3"
                      >
                        Book Test Drive
                      </Link>
                      {slug && (
                        <Link
                          href={`/cars/${slug}`}
                          className="block w-full rounded border border-white/30 bg-white/10 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto sm:px-6 sm:py-3"
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

      {/* Slide navigation controls */}
      <button
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className={`absolute top-1/2 z-30 grid -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-all hover:bg-black/55 ${
          isMobile ? "left-2 h-8 w-8" : "left-4 h-10 w-10"
        }`}
      >
        <ChevronLeft className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => go(1)}
        className={`absolute top-1/2 z-30 grid -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-all hover:bg-black/55 ${
          isMobile ? "right-2 h-8 w-8" : "right-4 h-10 w-10"
        }`}
      >
        <ChevronRight className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
      </button>

      {/* Dot navigation */}
      <div className={`absolute left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 ${isMobile ? "bottom-3" : "bottom-6"}`}>
        {slides.map((s, i) => (
          <button
            key={`${s.model}-${i}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className="h-1.5 overflow-hidden rounded-full bg-white/20 transition-all"
            style={{ width: i === index ? 36 : 12 }}
          >
            <span
              className="block h-full rounded-full bg-brand"
              style={{
                width: i === index ? "100%" : "0%",
                transition: i === index ? `width ${AUTOPLAY}ms linear` : "none",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-brand-deep h-[64vh] min-h-[440px] max-h-[640px] sm:h-screen sm:h-dvh sm:min-h-0 sm:max-h-none"
    >
      <div className="block h-full w-full sm:hidden">
        <HeroCarousel slides={mobileSlides} isMobile />
      </div>
      <div className="hidden h-full w-full sm:block">
        <HeroCarousel slides={heroSlides} isMobile={false} />
      </div>
    </section>
  );
}
