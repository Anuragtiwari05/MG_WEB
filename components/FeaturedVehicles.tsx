"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cars, formatINR, type CarCategory } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";
import CarModal from "./CarModal";

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
  const step = Math.min(stageWidth * 0.45, 450);

  return (
    <section
      id="cars"
      className="scroll-mt-24 overflow-hidden bg-[#f0f0f0] py-8 lg:py-10"
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
          className="relative mt-6 sm:mt-8 h-[240px] sm:h-[300px] lg:h-[360px] select-none"
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
            const scale = offset === 0 ? 1.2 : (abs > 1 ? 0.4 : 0.6);
            const opacity = offset === 0 ? 1 : (abs > 1 ? 0 : 0.25);
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
                className="absolute left-1/2 top-1/2 flex h-full w-[75%] items-center justify-center transition-all duration-[650ms] [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.15)] sm:w-[60%] lg:w-[50%]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex: 20 - abs,
                  cursor: offset !== 0 ? "pointer" : "default",
                  pointerEvents: abs > 1 ? "none" : "auto",
                }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  {/* Studio Spotlight Glow Behind the Center Car */}
                  {offset === 0 && (
                    <div className="absolute inset-0 -z-10 mx-auto aspect-square w-[75%] -translate-y-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(208,26,34,0.14)_0%,transparent_70%)] blur-2xl animate-[pulse_4s_infinite_ease-in-out]" />
                  )}

                  <Image
                    src={car.image}
                    alt={car.alt}
                    fill
                    priority={offset === 0}
                    className="object-contain px-4 transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 75vw, (max-width: 1024px) 60vw, 50vw"
                  />

                  {/* Left edge fade — matches studio grey */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#f0f0f0] to-transparent" />
                  {/* Right edge fade — matches studio grey */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[#f0f0f0] to-transparent" />
                  {/* Bottom edge fade */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#f0f0f0] to-transparent" />
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
          className="mx-auto mt-8 sm:mt-12 lg:mt-16 max-w-2xl text-center animate-[fade-up_.35s_ease-out_both]"
        >
          <Link
            href={`/cars/${active.id}`}
            className="group mx-auto inline-flex items-center gap-1 text-xl font-bold text-brand transition-colors hover:text-brand-light sm:text-2xl"
          >
            MG {active.name}
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

      {showDetails && (
        <CarModal car={active} onClose={() => setShowDetails(false)} />
      )}
    </section>
  );
}
