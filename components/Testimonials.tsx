"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";
import { Star, ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

const REAL_COUNT = testimonials.length;

export default function Testimonials() {
  const [visibleCards, setVisibleCards] = useState(3);
  const [index, setIndex] = useState(0);
  const [snapping, setSnapping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Keep a ref to index so handleTransitionEnd never reads a stale closure
  const indexRef = useRef(index);
  const visibleRef = useRef(visibleCards);
  const animatingRef = useRef(isAnimating);

  useEffect(() => { indexRef.current = index; }, [index]);
  useEffect(() => { visibleRef.current = visibleCards; }, [visibleCards]);
  useEffect(() => { animatingRef.current = isAnimating; }, [isAnimating]);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);
  const draggingRef = useRef(false);

  // Responsive visible-cards
  useEffect(() => {
    const handleResize = () => {
      const next =
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      setVisibleCards((prev) => {
        if (prev !== next) {
          setIndex(0);
          setIsAnimating(false);
        }
        return next;
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dots
  const dotsCount = Math.max(1, Math.round(REAL_COUNT / visibleCards));
  const activeDot = Math.min(
    Math.round(Math.max(index, 0) / visibleCards),
    dotsCount - 1
  );

  // Extended track: [last N clones] + [all real] + [first N clones]
  const extended = [
    ...testimonials.slice(REAL_COUNT - visibleCards),
    ...testimonials,
    ...testimonials.slice(0, visibleCards),
  ];
  // translateX as % of the track (which IS the container width since each
  // card is 100/visibleCards % of container and track has no explicit width).
  // Percentage must be scaled against visibleCards (how many card-widths
  // make up the track's own box), not extendedLength (the full padded
  // card count) — dividing by extendedLength under-shifts the track by a
  // fraction of a card, which drifted further off with every auto-advance.
  const translatePercent = (index + visibleCards) * (100 / visibleCards);

  const go = (dir: number) => {
    if (animatingRef.current) return;
    setIsAnimating(true);
    setIndex((prev) => prev + dir * visibleCards);
  };

  const goToPage = (page: number) => {
    if (animatingRef.current) return;
    setIsAnimating(true);
    setIndex(page * visibleCards);
  };

  // Use ref-based index so this handler never reads stale state
  const handleTransitionEnd = () => {
    const i = indexRef.current;
    const v = visibleRef.current;
    if (i >= REAL_COUNT) {
      setSnapping(true);
      setIndex(i - REAL_COUNT);
      indexRef.current = i - REAL_COUNT;
    } else if (i <= -v) {
      setSnapping(true);
      setIndex(i + REAL_COUNT);
      indexRef.current = i + REAL_COUNT;
    }
    setIsAnimating(false);
  };

  // Re-enable transition one frame after an instant snap
  useEffect(() => {
    if (!snapping) return;
    const id = requestAnimationFrame(() => setSnapping(false));
    return () => cancelAnimationFrame(id);
  }, [snapping]);

  // Auto-advance — simple interval, just calls go() which self-guards
  useEffect(() => {
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    draggingRef.current = true;
    setIsDragging(true);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return;
    setDragOffset(e.touches[0].clientX - touchStartXRef.current);
  };
  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const width = containerRef.current?.offsetWidth || 1;
    if (dragOffset <= -width * 0.12) go(1);
    else if (dragOffset >= width * 0.12) go(-1);
    setDragOffset(0);
    setIsDragging(false);
  };

  const trackTransitionClass =
    isDragging || snapping
      ? "transition-none"
      : "transition-transform duration-500 ease-out";

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
              from real MG owners across our Mumbai showrooms.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              aria-label="Previous review"
              onClick={() => go(-1)}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next review"
              onClick={() => go(1)}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        {/* Carousel Window - overflow-hidden clips the extended track */}
        <div
          ref={containerRef}
          className="-mt-2 w-full touch-pan-y overflow-hidden pt-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={endDrag}
          onTouchCancel={endDrag}
        >
          <div
            className={`flex flex-nowrap ${trackTransitionClass}`}
            style={{
              transform: `translateX(calc(-${translatePercent}% + ${dragOffset}px))`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((t, i) => {
              const initials = t.name
                .split(" ")
                .map((n) => n[0])
                .join("");
              return (
                <div
                  key={`${t.name}-${i}`}
                  className="shrink-0 px-2.5"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 pb-9 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, rIndex) => (
                        <Star key={rIndex} className="h-4 w-4 text-amber-400" />
                      ))}
                    </div>
                    <blockquote className="mt-5 flex-1 text-sm sm:text-base leading-relaxed text-text/80">
                      &ldquo;{t.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-6">
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

        {/* Dots */}
        {dotsCount > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: dotsCount }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide page ${i + 1}`}
                onClick={() => goToPage(i)}
                className="h-1.5 rounded-full transition-all cursor-pointer"
                style={{
                  width: i === activeDot ? 24 : 8,
                  background: i === activeDot ? "var(--brand)" : "#c8cfd9",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
