"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cars, formatINR, getCarTransparentImage, type CarCategory } from "@/lib/data";
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
  const go = (dir: number) => setIndex((i) => (i + dir + len) % len);

  // Every car shares the same container width (widthFrac * stageWidth) and is only
  // told apart by CSS scale — object-contain never renders past that container, so
  // widthFrac*scale is a hard upper bound on any car's on-screen size regardless of
  // its image's own aspect ratio (this is what kept the wide-aspect Cyberster from
  // blowing past its neighbors). step is then derived directly from that bound so
  // the center and side cars never overlap, while still leaving the nav arrows
  // (~48px circle sitting a few px off the edge) clear of the side cars.
  const CENTER_SCALE = 1.15;
  const SIDE_SCALE = 0.3;
  const CENTER_SIDE_GAP = 24;
  const isMobile = stageWidth < 640;
  const isTablet = stageWidth >= 640 && stageWidth < 1024;
  // Widths chosen so the side car's outer edge clears the nav button (which sits
  // left-2/4/6 i.e. 8/16/24px off the edge) with real margin, not just barely.
  const widthFrac = isMobile ? 0.25 : isTablet ? 0.34 : 0.42;
  const step =
    (widthFrac * stageWidth * (CENTER_SCALE + SIDE_SCALE)) / 2 +
    CENTER_SIDE_GAP;

  return (
    <section
      id="cars"
      className="scroll-mt-24 overflow-hidden bg-white py-8 lg:py-10"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Category tabs */}
        <Reveal className="flex justify-center">
          <div className="flex gap-1 overflow-x-auto sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => selectCategory(cat)}
                className={`shrink-0 border-b-2 px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                  category === cat
                    ? "border-brand text-brand"
                    : "border-transparent text-muted hover:text-text"
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
          className="relative mt-6 sm:mt-8 h-[220px] sm:h-[280px] lg:h-[340px] select-none"
        >
          <button
            aria-label="Previous car"
            onClick={() => go(-1)}
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95 sm:h-12 sm:w-12 cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6 text-slate-800" />
          </button>

          <button
            aria-label="Next car"
            onClick={() => go(1)}
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95 sm:h-12 sm:w-12 cursor-pointer"
          >
            <ChevronRight className="h-6 w-6 text-slate-800" />
          </button>

          {filtered.map((car, i) => {
            let offset = i - index;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;
            const abs = Math.abs(offset);
            if (abs > 2) return null;
            const scale =
              offset === 0 ? CENTER_SCALE : abs === 1 ? SIDE_SCALE : SIDE_SCALE * 0.75;
            const opacity = offset === 0 ? 1 : abs === 1 ? 0.55 : 0;
            const translateX = offset * step;
            return (
              <div
                key={car.name}
                onClick={() => {
                  if (offset === 0) {
                    router.push(`/cars/${car.id}`);
                  } else {
                    setIndex(i);
                  }
                }}
                className="absolute left-1/2 top-1/2 flex h-full items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group"
                style={{
                  width: `${widthFrac * 100}%`,
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex: 20 - abs,
                  cursor: offset !== 0 ? "pointer" : "default",
                  pointerEvents: abs > 1 ? "none" : "auto",
                  willChange: "transform, opacity",
                }}
              >
                <div className="relative h-[85%] w-full flex flex-col items-center justify-center bg-transparent">
                  <div className="relative w-full h-[90%] flex items-center justify-center">
                    <Image
                      src={getCarTransparentImage(car.id)}
                      alt={car.alt}
                      fill
                      priority={offset === 0}
                      className={`object-contain transition-all duration-300 ${
                        offset === 0
                          ? "hover:scale-[1.03]"
                          : "grayscale-[55%] saturate-[0.6] brightness-105"
                      }`}
                      sizes="(max-width: 640px) 30vw, (max-width: 1024px) 40vw, 46vw"
                    />
                  </div>
                  {/* Soft realistic floor shadow under tyres */}
                  {offset === 0 && (
                    <div
                      className="absolute bottom-[4%] left-1/2 h-[8px] w-[60%] -translate-x-1/2 rounded-[50%] bg-slate-950/10 blur-[4px] pointer-events-none"
                    />
                  )}
                  {/* Hover popup for side cars */}
                  {offset !== 0 && abs <= 1 && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-text px-3 py-1.5 text-xs font-bold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none z-50 shadow-lg">
                      MG {car.name}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-text" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info row, keyed so it fades between models */}
        <div
          key={active.name}
          className="mx-auto -mt-2 sm:mt-0 lg:mt-2 max-w-2xl text-center animate-[fade-up_.35s_ease-out_both]"
        >
          <Link
            href={`/cars/${active.id}`}
            className="group mx-auto inline-flex items-center gap-2 text-xl font-bold text-brand transition-colors hover:text-brand-light sm:text-2xl"
          >
            <Image
              src="/images/logo-mg.png"
              alt="MG Logo"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>MG {active.name}</span>
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

          <Link
            href={`/cars/${active.id}`}
            className="mt-4 inline-block rounded bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-light cursor-pointer"
          >
            View Details
          </Link>
        </div>
      </div>
    </section>
  );
}
