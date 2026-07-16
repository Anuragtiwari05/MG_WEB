"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { company } from "@/lib/data";

const stats = [
  { value: company.stats.carsSold, label: "New cars delivered" },
  { value: company.stats.usedCarsSold, label: "Pre-owned cars sold" },
  { value: company.stats.servicesDone, label: "Services completed" },
  { value: company.stats.satisfaction, label: "Customer satisfaction" }
];

export default function WhyMG() {
  return (
    <section id="why-mg" className="scroll-mt-24 bg-white py-14 lg:py-20 border-b border-border">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column: Text Content */}
          <Reveal variant="slide-right">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Why MG Motor Mumbai
            </p>
            <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-wide text-text sm:text-4xl">
              Your authorised MG dealer across the Mumbai region
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                MG Motor Mumbai (Gautam Modi Group) is an authorised MG dealership serving Mumbai, Thane, Navi Mumbai, and surrounding regions. Every new car, genuine part, and accessory is sourced directly from MG Motor India, backed by manufacturer warranty and professional service.
              </p>
              <p>
                With over {company.stats.carsSold} new cars delivered and {company.stats.servicesDone} services completed, our team brings decades of automotive expertise to guide you through test drives, transparent finance schemes, and hassle-free maintenance.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#test-drive"
                className="rounded bg-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-light hover:shadow-[0_0_16px_rgba(255,0,0,0.2)]"
              >
                Book a Test Drive
              </Link>
              <Link
                href="/about"
                className="rounded border border-border bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-text transition-all hover:bg-bg-2 hover:border-brand"
              >
                About MG Motor Mumbai
              </Link>
            </div>
          </Reveal>

          {/* Right column: Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 80}
                variant="scale-up"
                className="h-full"
              >
                <div className="flex h-full flex-col justify-center rounded-xl border border-border bg-bg-2 p-6 shadow-sm text-center sm:text-left transition-all duration-300 hover:border-brand/30 hover:bg-white hover:shadow-md">
                  <span className="font-display text-3xl font-black tracking-tight text-brand sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="mt-2 text-xs font-bold uppercase tracking-wider text-muted">
                    {s.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
