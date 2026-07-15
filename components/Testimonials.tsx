"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";
import { Star, ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = testimonials.length - visibleCards;
  
  // Guard active index on resize
  useEffect(() => {
    if (active > maxIndex) {
      setActive(maxIndex);
    }
  }, [visibleCards, active, maxIndex]);

  const go = (dir: number) => {
    setActive((prev) => {
      const next = prev + dir;
      if (next < 0) return 0;
      if (next > maxIndex) return maxIndex;
      return next;
    });
  };

  const dotsCount = testimonials.length - visibleCards + 1;
  const translatePercent = active * (100 / visibleCards);

  return (
    <section className="bg-white py-14 lg:py-20 overflow-hidden">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              What Our Customers Say
            </h2>
            <p className="mt-3 text-sm text-muted">
              <span className="font-semibold text-text">100% customer satisfaction</span>{" "}
              across 50,000+ MG cars sold and 120,000+ services completed.
            </p>
          </div>
          
          {/* Slider Chevrons */}
          <div className="flex gap-2">
            <button
              aria-label="Previous review"
              onClick={() => go(-1)}
              disabled={active === 0}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bg-2 disabled:hover:text-text"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next review"
              onClick={() => go(1)}
              disabled={active === maxIndex}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bg-2 disabled:hover:text-text"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        {/* Carousel Window */}
        <div className="w-full overflow-hidden">
          <div
            className="flex flex-nowrap transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${translatePercent}%)`,
            }}
          >
            {testimonials.map((t, i) => {
              const initials = t.name
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <div
                  key={t.name + i}
                  className="shrink-0 px-2.5"
                  style={{
                    width: `${100 / visibleCards}%`,
                  }}
                >
                  <figure className="flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, rIndex) => (
                        <Star key={rIndex} className="h-4 w-4 text-amber-400" />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-sm sm:text-base leading-relaxed text-text/80">
                      &ldquo;{t.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-4 border-t border-border pt-5">
                      {/* Initials Badge avatar */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold uppercase tracking-wider text-brand">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text">{t.name}</p>
                        <p className="text-xs text-muted">{t.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots Pagination */}
        {dotsCount > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: dotsCount }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide page ${i + 1}`}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === active ? 24 : 8,
                  background: i === active ? "var(--brand)" : "#c8cfd9",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
