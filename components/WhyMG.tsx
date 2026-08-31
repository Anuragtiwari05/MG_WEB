"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export default function WhyMG() {
  return (
    <section id="why-mg" className="scroll-mt-24 bg-brand-deep py-14 lg:py-20 text-white">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column: Text Content */}
          <Reveal variant="slide-right">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Why MG Motor Mumbai
            </p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-wide text-white sm:text-4xl">
              Your authorised MG dealer across the Mumbai region
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70 sm:text-base">
              <p>
                MG Motor Mumbai (Gautam Modi Group) is an authorised MG dealership serving Mumbai, Vasai, and surrounding regions. Every new car, genuine part, and accessory is sourced directly from MG Motor India, backed by manufacturer warranty and professional service.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#test-drive"
                className="rounded bg-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-light hover:shadow-[0_0_16px_rgba(255,0,0,0.2)]"
              >
                Book a Test Drive
              </Link>
              <Link
                href="/about"
                className="rounded border border-white/20 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10 hover:border-white/40"
              >
                About MG Motor Mumbai
              </Link>
            </div>
          </Reveal>

          {/* Right column: Showcase Image */}
          <div className="grid grid-cols-1 gap-4">
            <Reveal variant="scale-up" className="h-full">
              <div className="relative h-[320px] w-full overflow-hidden rounded-xl bg-black shadow-lg sm:h-[420px]">
                <Image
                  src="/images/promo-offer.jpg"
                  alt="MG Motor Mumbai"
                  title="MG Motor Mumbai"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-brand/10" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
