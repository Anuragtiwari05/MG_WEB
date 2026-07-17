"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/lib/data";
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

export default function Hero() {
  const [index, setIndex] = useState(0);
  const count = heroSlides.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-brand-deep h-screen w-full"
    >
      <div className="relative h-full w-full">
        {/* Carousel Images & Videos */}
        {heroSlides.map((slide, i) => {
          const isActive = i === index;
          const slug = slide.exploreSlug || getModelSlug(slide.model);
          
          return (
            <div
              key={`${slide.model}-${i}`}
              className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                zIndex: isActive ? 10 : 0
              }}
            >
              {slide.video ? (
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
                slide.hasImageText 
                  ? "bg-gradient-to-t from-black/60 via-transparent to-transparent" 
                  : "bg-gradient-to-r from-black/80 via-black/45 to-transparent"
              }`} />
              
              {/* Content Overlay */}
              <div className={`container-px absolute inset-y-0 left-0 right-0 z-20 mx-auto flex max-w-[1400px] flex-col text-white ${
                slide.hasImageText ? "justify-end pb-24 md:pb-28" : "justify-center"
              }`}>
                <div className="max-w-2xl">
                  {isActive && (
                    <Reveal variant="fade-up">
                      {!slide.hasImageText && (
                        <>
                          <span className="inline-block rounded-full bg-brand px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest">
                            {slide.badge}
                          </span>
                          <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                            {slide.headline}
                          </h1>
                          <p className="mt-4 text-sm text-white/85 sm:text-base md:text-lg">
                            {slide.sub}
                          </p>
                          {slide.price && (
                            <p className="mt-5 text-sm font-semibold tracking-wide text-white/70">
                              Starting at{" "}
                              <span className="text-xl font-bold text-white sm:text-2xl">
                                ₹{slide.price} Lakh
                              </span>
                              *
                            </p>
                          )}
                        </>
                      )}
                      <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                          href="/#test-drive"
                          className="rounded bg-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-light"
                        >
                          Book Test Drive
                        </Link>
                        {slug && (
                          <Link
                            href={`/cars/${slug}`}
                            className="rounded border border-white/30 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20"
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
          className="absolute left-4 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-all hover:bg-black/55"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-all hover:bg-black/55"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot navigation */}
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
          {heroSlides.map((s, i) => (
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
    </section>
  );
}
