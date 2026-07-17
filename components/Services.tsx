"use client";

import Link from "next/link";
import { services } from "@/lib/data";
import { iconMap, ArrowRight, type IconName } from "./icons";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="service" className="scroll-mt-24 bg-[#0B0D11] border-t border-b border-white/[0.04] py-14 lg:py-20 text-white">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Care &amp; Maintenance
            </p>
            <h2 className="mt-2 font-display text-2xl font-black tracking-wide text-white sm:text-3xl">
              Service That Cares
            </h2>
            <p className="mt-3 max-w-xl text-xs sm:text-sm text-white/60 leading-relaxed">
              From routine maintenance to roadside help, our factory-trained team
              keeps your MG running the way it should, with genuine parts,
              transparent pricing, and state-of-the-art service centres.
            </p>
          </div>
          <Link
            href="/locate-service-centre"
            className="group inline-flex shrink-0 items-center gap-2 rounded border border-brand bg-brand/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand hover:text-white hover:shadow-[0_0_16px_rgba(255,0,0,0.2)]"
          >
            Book a Service Appointment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        {/* 6-column clean single row layout for perfect balance */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon as IconName];
            return (
              <Reveal key={s.title} delay={i * 80} variant="scale-up" className="h-full">
                <div className="group relative flex h-full flex-col items-center justify-between p-5 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-sm text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_8px_32px_0_rgba(255,0,0,0.1)] overflow-hidden">
                  
                  {/* Decorative glowing background accent */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand/5 rounded-full blur-xl group-hover:bg-brand/10 transition-all duration-500" />
                  
                  <div className="flex flex-col items-center flex-1">
                    {/* Premium high-contrast icon wrapper */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/90 group-hover:scale-110 group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all duration-500 shadow-md shadow-black/20">
                      {Icon && <Icon className="h-5 w-5" />}
                    </div>
                    
                    <h3 className="mt-4 text-xs sm:text-sm font-bold tracking-wide text-white transition-colors group-hover:text-brand">
                      {s.title}
                    </h3>
                    
                    <p className="mt-2 text-[10px] sm:text-xs leading-relaxed text-white/50">
                      {s.text}
                    </p>
                  </div>

                  {/* Red bottom accent bar animation */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
