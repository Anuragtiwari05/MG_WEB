"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";

const AUTOPLAY = 7000;

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
      className="relative overflow-hidden bg-brand-deep"
      style={{ marginTop: "72px" }}
    >
      <div className="relative h-[420px] w-full sm:h-[480px] lg:h-[540px] xl:h-[580px] md:h-[620px]">
        {/* Carousel Images - Simple, no text overlays or scrims */}
        {heroSlides.map((slide, i) => (
          <Image
            key={`${slide.model}-${i}`}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover transition-opacity duration-1000 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}

        {/* Slide navigation controls */}
        <button
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-all hover:bg-black/55"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-all hover:bg-black/55"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot navigation */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
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
