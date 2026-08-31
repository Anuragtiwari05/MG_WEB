"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cars, formatINR, getCarBrandedName, getCarTransparentImage, type CarCategory } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

const categories: ("All" | CarCategory)[] = [
  "All",
  "SUV",
  "Hatchback",
  "Electric",
  "Select",
];


function getFiltered(category: "All" | CarCategory) {
  return category === "All"
    ? cars
    : category === "Electric"
    ? cars.filter((c) => c.category === "Electric" || c.fuel === "Electric")
    : cars.filter((c) => c.category === category);
}

export default function FeaturedVehicles() {
  const router = useRouter();
  const [category, setCategory] = useState<"All" | CarCategory>("All");
  const [index, setIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(1000);
  // On first render and right after switching category, the left peek car
  // stays hidden — only center + right are shown. It reappears (and the
  // carousel starts wrapping both ways) the moment the user moves the
  // carousel with an arrow/swipe/wheel.
  const [hasNavigated, setHasNavigated] = useState(false);

  const filtered = getFiltered(category);
  const active = filtered[index] ?? filtered[0];

  const selectCategory = (cat: "All" | CarCategory) => {
    if (cat === category) return;
    const nextFiltered = getFiltered(cat);
    const currentId = active?.id;
    const matchIdx = nextFiltered.findIndex((c) => c.id === currentId);
    // Avoid landing on the same car that was already showing — hop to the next one instead
    const nextIndex =
      matchIdx !== -1 && nextFiltered.length > 1
        ? (matchIdx + 1) % nextFiltered.length
        : 0;
    setCategory(cat);
    setIndex(nextIndex);
    setHasNavigated(false);
  };

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setStageWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const len = filtered.length;
  const go = (dir: number) => {
    setHasNavigated(true);
    setIndex((i) => (i + dir + len) % len);
  };

  // Touch swipe: drag left/right anywhere on the stage (including on top of
  // the center car) to move to the next/previous model. Only the horizontal
  // distance at touch-end matters — no live drag-following, just a threshold
  // flick like the arrow buttons. didSwipeRef suppresses the synthetic click
  // mobile browsers fire after a touch drag, so swiping off the center car
  // doesn't also navigate to that car's detail page.
  const touchStartX = useRef<number | null>(null);
  const didSwipeRef = useRef(false);
  const SWIPE_THRESHOLD = 40;
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    didSwipeRef.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    if (Math.abs(e.touches[0].clientX - touchStartX.current) > 10) {
      didSwipeRef.current = true;
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (deltaX > SWIPE_THRESHOLD) go(-1);
    else if (deltaX < -SWIPE_THRESHOLD) go(1);
  };

  // Two-finger trackpad swipe: laptop trackpads report horizontal swipes as
  // wheel events (deltaX), not touch events, so they need a separate handler.
  // A trackpad swipe fires many wheel events in one gesture — cooldown so it
  // advances one model per swipe instead of racing through several.
  const wheelCooldownRef = useRef(false);
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    if (Math.abs(e.deltaX) < 15 || wheelCooldownRef.current) return;
    wheelCooldownRef.current = true;
    go(e.deltaX > 0 ? 1 : -1);
    setTimeout(() => {
      wheelCooldownRef.current = false;
    }, 400);
  };

  // Every car shares the same container width (widthFrac * stageWidth) and is only
  // told apart by CSS scale — object-contain never renders past that container, so
  // widthFrac*scale is a hard upper bound on any car's on-screen size regardless of
  // its image's own aspect ratio (this is what kept the wide-aspect Cyberster from
  // blowing past its neighbors). step is then derived directly from that bound so
  // the center and side cars never overlap, while still leaving the nav arrows
  // (~48px circle sitting a few px off the edge) clear of the side cars.
  const isMobile = stageWidth < 640;
  const isTablet = stageWidth >= 640 && stageWidth < 1024;
  // A bit of extra pop on the center car specifically on mobile, where the
  // stage is short and a same-scale-as-desktop car reads as too small.
  const CENTER_SCALE = isMobile ? 1.85 : 1.25;
  const SIDE_SCALE = isMobile ? 0.55 : 0.3;
  // Bigger gap between center and side cars — widthFrac is trimmed down a
  // touch alongside it so the side car's outer edge still clears the nav
  // button (which sits left-2/4/6 i.e. 8/16/24px off the edge) with margin.
  const CENTER_SIDE_GAP = 72;
  const widthFrac = isMobile ? 0.28 : isTablet ? 0.28 : 0.34;
  const step =
    (widthFrac * stageWidth * (CENTER_SCALE + SIDE_SCALE)) / 2 +
    CENTER_SIDE_GAP;

  return (
    <section
      id="cars"
      className="scroll-mt-24 overflow-x-hidden bg-white py-8 lg:py-10"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Category tabs */}
        <Reveal className="flex justify-center">
          <div className="flex gap-1 overflow-x-auto sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => selectCategory(cat)}
                className={`shrink-0 border-b-2 border-border px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                  category === cat
                    ? "text-brand"
                    : "text-muted hover:text-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Coverflow stage */}
        <div
          ref={stageRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onWheel={onWheel}
          className="relative mt-6 sm:mt-8 h-[300px] sm:h-[280px] lg:h-[340px] select-none touch-pan-y"
        >
          <button
            aria-label="Previous car"
            onClick={() => go(-1)}
            disabled={len <= 1}
            style={len <= 1 ? { opacity: 0.4, cursor: "not-allowed", color: "#cbd5e1" } : undefined}
            className="absolute left-2 sm:left-4 lg:left-6 top-[68%] sm:top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center text-slate-800 transition-all duration-200 hover:scale-110 hover:text-brand active:scale-95 sm:h-12 sm:w-12 cursor-pointer"
          >
            <ChevronLeft className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.6} />
          </button>

          <button
            aria-label="Next car"
            onClick={() => go(1)}
            disabled={len <= 1}
            style={len <= 1 ? { opacity: 0.4, cursor: "not-allowed", color: "#cbd5e1" } : undefined}
            className="absolute right-2 sm:right-4 lg:right-6 top-[68%] sm:top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center text-slate-800 transition-all duration-200 hover:scale-110 hover:text-brand active:scale-95 sm:h-12 sm:w-12 cursor-pointer"
          >
            <ChevronRight className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.6} />
          </button>

          {/* The side cars are meant to be visible at their own low
              scale/opacity - no edge fade here, it was hiding them
              almost entirely instead of just softening a hard clip. */}
          <div className="absolute inset-0">
          {filtered.map((car, i) => {
            let offset = i - index;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;
            const abs = Math.abs(offset);
            if (abs > 2) return null;
            // Before the user has ever moved the carousel, hide the left
            // peek car entirely — only center + right show.
            const hideLeft = !hasNavigated && offset < 0;
            const scale =
              offset === 0 ? CENTER_SCALE : abs === 1 ? SIDE_SCALE : SIDE_SCALE * 0.75;
            const opacity = hideLeft ? 0 : offset === 0 ? 1 : abs === 1 ? (isMobile ? 0.85 : 0.55) : 0;
            const translateX = offset * step;
            return (
              <div
                key={car.name}
                onClick={() => {
                  if (didSwipeRef.current) {
                    didSwipeRef.current = false;
                    return;
                  }
                  // Clicking any visible car — centered or a peeking side
                  // car — goes straight to its page, instead of making a
                  // side-car click just re-center it first.
                  router.push(`/cars/${car.id}`);
                }}
                className="absolute left-1/2 top-1/2 flex h-full items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group"
                style={{
                  width: `${widthFrac * 100}%`,
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex: 20 - abs,
                  cursor: "pointer",
                  pointerEvents: abs > 1 || hideLeft ? "none" : "auto",
                  willChange: "transform, opacity",
                }}
              >
                <div className="relative h-[85%] w-full flex items-center justify-center bg-transparent">
                  <Image
                    src={getCarTransparentImage(car.id)}
                    alt={car.alt}
                    title={car.alt}
                    fill
                    priority={offset === 0}
                    className={`object-contain transition-all duration-300 ${
                      offset === 0
                        ? "hover:scale-[1.03] drop-shadow-[0_12px_28px_rgba(0,0,0,0.22)]"
                        : "grayscale-[55%] saturate-[0.6] brightness-105"
                    }`}
                    sizes="(max-width: 640px) 30vw, (max-width: 1024px) 40vw, 46vw"
                  />
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Info row, keyed so it fades between models */}
        <div
          key={active.name}
          className="mx-auto mt-2 sm:mt-4 lg:mt-6 max-w-2xl text-center animate-[fade-up_.35s_ease-out_both]"
        >
          <Link
            href={`/cars/${active.id}`}
            className="group mx-auto inline-flex items-center gap-2 text-xl font-bold text-brand transition-colors hover:text-brand-light sm:text-2xl"
          >
            <Image
              src="/images/logo-mg.png"
              alt="MG Logo"
              title="MG Logo"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>{getCarBrandedName(active)}</span>
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="mt-2 grid grid-cols-1 gap-2 border-t border-border pt-2 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-muted">Starting at</p>
              <p className="mt-0.5 text-base font-semibold text-text">
                {formatINR(active.priceINR)}
              </p>
              <p className="text-xs text-faint">*Ex Showroom Price</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Engine</p>
              <p className="mt-0.5 text-sm text-text">{active.engine}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Transmission available</p>
              <p className="mt-0.5 text-sm text-text">{active.transmission}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
