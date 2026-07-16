"use client";

import Link from "next/link";
import Reveal from "./Reveal";

const items = [
  "Periodic maintenance on the manufacturer-recommended schedule, done right the first time.",
  "Only genuine, warranty-backed MG parts and accessories — never aftermarket substitutes.",
  "Convenient free pickup and drop service for maintenance across the Mumbai and Thane region.",
  "24x7 roadside assistance and extendable warranty plans for total peace of mind on every journey."
];

export default function ServicePromo() {
  return (
    <section id="service-promo" className="scroll-mt-24 bg-white py-14 lg:py-20 border-b border-border">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column: Header & Call to Action */}
          <Reveal variant="slide-right">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Authorised Service
            </p>
            <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-wide text-text sm:text-4xl">
              Genuine MG service, close to home
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Keep your MG performing like new with factory-trained technicians, advanced diagnostic equipment, and genuine MG parts. Book online and select your preferred showroom location or pick-up service area.
            </p>
            
            <div className="mt-8">
              <Link
                href="/locate-service-centre"
                className="rounded bg-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-light hover:shadow-[0_0_16px_rgba(255,0,0,0.2)]"
              >
                Book a Service
              </Link>
            </div>
          </Reveal>

          {/* Right Column: Grid of Service Perks */}
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((text, i) => (
              <Reveal
                key={i}
                delay={i * 80}
                variant="scale-up"
                className="h-full"
              >
                <div className="flex h-full flex-col justify-center rounded-xl border border-border bg-bg-2 p-6 shadow-sm transition-all duration-300 hover:border-brand/30 hover:bg-white hover:shadow-md">
                  <p className="text-xs sm:text-sm leading-relaxed text-muted font-medium">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
