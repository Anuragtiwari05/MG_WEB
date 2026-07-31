"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";
import { Star, ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

const REAL_COUNT = testimonials.length;

export default function Testimonials() {
  const [visibleCards, setVisibleCards] = useState(3);
  // Logical window-start index. Not clamped to [0, maxIndex] — it can run
  // past either end into the cloned cards below, which is what lets the
  // track keep sliding in the same direction instead of jump-cutting back
  // to the start. Once it fully reaches a clone (which is pixel-identical
  // to the real slide on the other end) we snap back with the transition
  // switched off, so the loop is invisible.
  const [index, setIndex] = useState(0);
  const [snapping, setSnapping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  // The clone buffer only holds one extra page's worth of cards on each
  // side. A click landing mid-slide (before the previous move snapped back)
  // can push `index` past that buffer, which renders as a card cut off
  // mid-card instead of a clean tile. Blocking new moves while one is
  // still animating keeps `index` inside the buffer at all times.
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);
  const draggingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const next = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      // The clone regions are sized to `visibleCards`, so a change here
      // invalidates the current index — reset to a known-good slide
      // rather than trying to remap it.
      setVisibleCards((prev) => {
        if (prev !== next) setIndex(0);
        return next;
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Page by a full visible group at a time, not one card at a time — so
  // clicking a chevron slides the whole row of cards aside as a unit.
  const dotsCount = Math.max(1, Math.round(REAL_COUNT / visibleCards));
  const activeDot = Math.min(Math.round(Math.max(index, 0) / visibleCards), dotsCount - 1);

  const go = (dir: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => prev + dir * visibleCards);
  };

  const goToPage = (page: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(page * visibleCards);
  };

  // Extended track = [last N real cards] + [all real cards] + [first N real
  // cards], where N = visibleCards. Sliding one step past the last real
  // window lands on the head clone, which shows the same cards as index 0 —
  // so the "first one comes next in the same direction" instead of teleporting.
  const extended = [
    ...testimonials.slice(REAL_COUNT - visibleCards),
    ...testimonials,
    ...testimonials.slice(0, visibleCards),
  ];
  const extendedLength = extended.length;
  const translatePercent = (index + visibleCards) * (100 / extendedLength);

  const handleTransitionEnd = () => {
    if (index >= REAL_COUNT) {
      setSnapping(true);
      setIndex((i) => i - REAL_COUNT);
    } else if (index <= -visibleCards) {
      setSnapping(true);
      setIndex((i) => i + REAL_COUNT);
    }
    setIsAnimating(false);
  };

  // Re-enable the transition on the frame after an instant snap, so the
  // snap itself renders with no animation but subsequent moves still slide.
  useEffect(() => {
    if (!snapping) return;
    const id = requestAnimationFrame(() => setSnapping(false));
    return () => cancelAnimationFrame(id);
  }, [snapping]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    draggingRef.current = true;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return;
    const dx = e.touches[0].clientX - touchStartXRef.current;
    setDragOffset(dx);
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const width = containerRef.current?.offsetWidth || 1;
    const threshold = width * 0.12;
    if (dragOffset <= -threshold) {
      go(1);
    } else if (dragOffset >= threshold) {
      go(-1);
    }
    setDragOffset(0);
    setIsDragging(false);
  };

  const trackTransitionClass =
    isDragging || snapping ? "transition-none" : "transition-transform duration-500 ease-out";

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

          {/* Slider Chevrons — the loop is infinite, so these are never
              permanently disabled, only briefly locked mid-slide */}
          <div className="flex gap-2">
            <button
              aria-label="Previous review"
              onClick={() => go(-1)}
              disabled={isAnimating}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next review"
              onClick={() => go(1)}
              disabled={isAnimating}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-bg-2 text-text transition-colors hover:bg-bg-3 hover:text-brand disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        {/* Carousel Window — overflow-hidden only needs to clip horizontally
            (for the slide), but it clips vertically too, cutting off the
            top of a card's border when hover lifts it. pt-2 -mt-2 gives the
            lift room without shifting anything else's position. */}
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
                  style={{
                    width: `${100 / visibleCards}%`,
                  }}
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
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: dotsCount }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide page ${i + 1}`}
                onClick={() => goToPage(i)}
                className="h-1.5 rounded-full transition-all cursor-pointer disabled:cursor-not-allowed"
                disabled={isAnimating}
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
