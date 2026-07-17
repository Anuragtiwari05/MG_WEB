"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cars, formatINR, type CarCategory } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";
import CarModal from "./CarModal";

function getTransparentImage(id: string): string {
  switch (id) {
    case "astor": return "/images/models/model-astor-transparent.png";
    case "hector": return "/images/models/model-hector-transparent.png";
    case "zs-ev": return "/images/models/model-zs-ev-transparent.png";
    case "windsor-ev": return "/images/models/model-windsor-transparent.png";
    case "comet-ev": return "/images/models/model-comet-transparent.png";
    case "majestor": return "/images/models/model-majestor-transparent.png";
    case "m9": return "/images/models/model-m9-transparent.png";
    case "cyberster": return "/images/models/model-cyberster-transparent.png";
    default: return `/images/models/model-${id}-transparent.png`;
  }
}

const categories: ("All" | CarCategory)[] = [
  "All",
  "SUV",
  "Hatchback",
  "Electric",
  "Select",
];

export default function FeaturedVehicles() {
  const router = useRouter();
  const [category, setCategory] = useState<"All" | CarCategory>("All");
  const [index, setIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(1000);
  const [prevCategory, setPrevCategory] = useState(category);

  const filtered =
    category === "All"
      ? cars
      : category === "Electric"
      ? cars.filter((c) => c.category === "Electric" || c.fuel === "Electric")
      : cars.filter((c) => c.category === category);
  const active = filtered[index] ?? filtered[0];

  if (category !== prevCategory) {
    setPrevCategory(category);
    setIndex(0);
  }

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

  // Spacing proportional to stage width
  const isMobile = stageWidth < 640;
  const isTablet = stageWidth >= 640 && stageWidth < 1024;
  const step = isMobile
    ? stageWidth * 0.34
    : isTablet
    ? stageWidth * 0.42
    : Math.min(stageWidth * 0.56, 560);

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
                onClick={() => setCategory(cat)}
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
            className="absolute left-0 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center text-text transition-opacity sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {filtered.map((car, i) => {
            let offset = i - index;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;
            if (Math.abs(offset) > 2) return null;
            const abs = Math.abs(offset);
            const scale = offset === 0 ? 1.28 : (abs > 1 ? 0.32 : 0.4);
            const opacity = offset === 0 ? 1 : (abs > 1 ? 0.45 : 0.7);
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
                className="absolute left-1/2 top-1/2 flex h-full w-[75%] items-center justify-center transition-all duration-[650ms] [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.15)] sm:w-[60%] lg:w-[50%] group"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex: 20 - abs,
                  cursor: offset !== 0 ? "pointer" : "default",
                  pointerEvents: abs > 1 ? "none" : "auto",
                }}
              >
                <div className="relative h-[85%] w-full flex flex-col items-center justify-center bg-transparent">
                  <div className="relative w-full h-[90%] flex items-center justify-center">
                    <Image
                      src={getTransparentImage(car.id)}
                      alt={car.alt}
                      fill
                      priority={offset === 0}
                      className={`object-contain transition-all duration-300 ${
                        offset === 0 ? "hover:scale-[1.03]" : "grayscale"
                      }`}
                      sizes="(max-width: 640px) 75vw, (max-width: 1024px) 60vw, 50vw"
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

          <button
            aria-label="Next car"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center text-text transition-opacity sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
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

          <button
            onClick={() => setShowDetails(true)}
            className="mt-4 rounded bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-light cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>

      {showDetails && (
        <CarModal car={active} onClose={() => setShowDetails(false)} />
      )}
    </section>
  );
}
