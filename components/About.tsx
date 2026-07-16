"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { Check } from "./icons";
import {
  company,
  groupInfo,
  mgIndiaFacts,
  aboutCultureImage,
} from "@/lib/data";

const stats = [
  { value: company.stats.carsSold, label: "New Cars Sold" },
  { value: company.stats.usedCarsSold, label: "Used Cars Sold" },
  { value: company.stats.servicesDone, label: "Services Completed" },
  { value: company.stats.satisfaction, label: "Customer Satisfaction" },
];

function joinWithAnd(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export default function About() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  return (
    <section id="about" className="scroll-mt-24 bg-white py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Row 1: Intro Story */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <Reveal variant="slide-right">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Who We Are
            </p>
            <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-wide text-text sm:text-4xl">
              About MG Motor Mumbai
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                MG Motor Mumbai is an authorised MG dealership, owned and
                operated by the {groupInfo.name}. We run state-of-the-art showrooms and
                service centres across Mumbai and Thane, and we have served over{" "}
                {company.stats.happyCustomers} happy customers.
              </p>
              <p>
                The {groupInfo.name} represents leading automotive brands
                in India, alongside {joinWithAnd(groupInfo.ventures.map((v) => v.name))}.{" "}
                {groupInfo.founded} {groupInfo.growth}
              </p>
            </div>
          </Reveal>
          <Reveal
            variant="slide-left"
            delay={150}
            className="relative min-h-[300px] overflow-hidden rounded-lg lg:min-h-[400px] border border-border"
          >
            <Image
              src={aboutCultureImage}
              alt="MG Motor Mumbai team culture"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        {/* Row 2: Stats Strip */}
        <div className="mt-14 rounded-lg bg-bg-2 py-10 border border-border">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 90}
                variant="scale-up"
                className="text-center"
              >
                <p className="font-display text-2xl font-black text-brand sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted sm:text-sm">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Row 3: Core Values */}
        <div className="mt-16 lg:mt-24">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              What Drives Us
            </p>
            <h3 className="mt-2 font-display text-2xl font-black uppercase tracking-wide text-text sm:text-3xl">
              Our Core Values
            </h3>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {groupInfo.values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 100}
                variant="scale-up"
                className="rounded-lg border border-border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h4 className="text-sm font-bold uppercase tracking-wider text-text">{v.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {v.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Row 4: MG India Facts */}
        <div className="mt-16 rounded-lg bg-brand-deep py-12 px-6 text-white sm:p-10 lg:p-14 lg:mt-24 border border-white/5">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <Reveal variant="slide-right">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Our Brand Heritage
              </p>
              <h3 className="mt-2 font-display text-2xl font-black uppercase tracking-wide sm:text-3xl">
                MG Motor India: &ldquo;{mgIndiaFacts.tagline}&rdquo;
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Founded in {mgIndiaFacts.founded}, MG (Morris Garages) has a 100+ year global legacy. In India, we are pioneering the electric and connected vehicle landscape. {mgIndiaFacts.plant} {mgIndiaFacts.network}
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {mgIndiaFacts.csr.map((c, i) => (
                <Reveal
                  key={c.title}
                  delay={i * 100}
                  variant="fade-up"
                >
                  <button
                    type="button"
                    onClick={() => setActiveCard(i)}
                    className="group w-full rounded-lg border border-white/10 bg-white/5 p-6 text-left transition-all duration-200 hover:border-brand/60 hover:bg-white/10 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand transition-transform group-hover:scale-110" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-brand transition-colors">
                          {c.title}
                        </h4>
                        <p className="mt-1.5 text-xs leading-relaxed text-white/70 line-clamp-2">
                          {c.text}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand/70 group-hover:text-brand transition-colors">
                          Learn more
                          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CSR CARD MODAL POPUP ───────────────────────────────── */}
      {activeCard !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveCard(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Card */}
          <div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top red accent */}
            <div className="h-1.5 w-full bg-brand" />

            <div className="p-7">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
                    <Check className="h-5 w-5 text-brand" />
                  </span>
                  <h3 className="font-display text-xl font-black uppercase tracking-wide text-text">
                    {mgIndiaFacts.csr[activeCard].title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCard(null)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <p className="mt-5 text-sm leading-relaxed text-muted">
                {mgIndiaFacts.csr[activeCard].text}
              </p>

              {/* Close button */}
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => setActiveCard(null)}
                  className="w-full rounded-lg bg-brand py-3 text-sm font-bold text-white transition-all hover:bg-brand/90 cursor-pointer"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
