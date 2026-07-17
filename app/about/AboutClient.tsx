"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "@/components/icons";
import {
  company,
  groupInfo,
  mgIndiaFacts,
  aboutCultureImage,
} from "@/lib/data";

const stats = [
  { value: "9", label: "Decades of Legacy" },
  { value: "3,500+", label: "Global Talent" },
  { value: "35+", label: "Global Presence" },
  { value: "1 Lakh+", label: "Satisfied Customers" },
];

const dealerStats = [
  { value: company.stats.carsSold, label: "New Cars Sold" },
  { value: company.stats.usedCarsSold, label: "Used Cars Sold" },
  { value: company.stats.servicesDone, label: "Services Completed" },
  { value: company.stats.satisfaction, label: "Customer Satisfaction" },
];

function joinWithAnd(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mt-[80px] min-h-screen bg-black text-white">
        {/* Banner image */}
        <section className="relative h-[250px] w-full overflow-hidden bg-brand-deep sm:h-[320px]">
          <Image
            src="/images/about-culture.png"
            alt="MG Concept car header"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="container-px absolute inset-x-0 bottom-8 mx-auto max-w-[1400px]">
            <Reveal variant="fade-up">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                About Us
              </p>
              <h1 className="mt-1 font-display text-3xl font-black text-white sm:text-4xl">
                DECADES OF LEGACY
              </h1>
              <p className="mt-2 text-sm text-white/80 max-w-lg">
                Gautam Modi Group stands on a foundation built on trust, passion, and motoring excellence.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Stats Grid section */}
        <section className="border-b border-white/10 bg-neutral-950 py-10 lg:py-14">
          <div className="container-px mx-auto max-w-[1200px]">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal
                  key={s.label}
                  delay={i * 80}
                  variant="scale-up"
                  className="relative rounded-2xl border border-white/10 bg-neutral-900/40 p-5 text-center transition-all hover:border-brand/40"
                >
                  <p className="font-display text-3xl font-black tracking-tight text-brand sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-white/60">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Text section */}
        <section className="py-14 lg:py-20 bg-black">
          <div className="container-px mx-auto max-w-[800px] text-center">
            <Reveal variant="fade-up" className="space-y-6 text-sm leading-relaxed text-white/80 sm:text-base">
              <p>
                As we move into a new phase of growth, we remain grounded in a legacy built on trust,
                passion, and excellence. With nearly a century of progress behind us, our focus is clear to
                raise the bar in innovation and customer engagement while creating experiences that go
                beyond mobility.
              </p>
              <p>
                Our journey began in Mumbai with Hyundai, laying a strong foundation in India’s rapidly
                evolving automotive market. This growth led to the establishment of one of the region’s
                earliest premium luxury destinations, Audi Thane, where elevated design and refined service
                came together to redefine the customer experience. In 2019, our association with Morris
                Garages at the beginning of its India journey further strengthened our portfolio, bringing
                together heritage, innovation, and modern mobility.
              </p>
              <p>
                In 2023, we introduced a state-of-the-art Mahindra facility that integrates Sales and After-Sales operations, reflecting our commitment to future-ready solutions. The launch of Modi Kia in Kalyan in 2024, followed by the anticipated arrival of MG Select and electric platforms in 2025, marks the next stage of our evolution.
              </p>
            </Reveal>
          </div>
        </section>        {/* Row 1: Intro Story (About MG Motor Mumbai) */}
        <section className="border-t border-white/10 bg-neutral-950 py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <Reveal variant="slide-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  Who We Are
                </p>
                <h2 className="mt-2 font-display text-3xl font-black tracking-wide text-white sm:text-4xl">
                  About MG Motor Mumbai & Thane
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/70 sm:text-base">
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
                className="relative min-h-[300px] overflow-hidden rounded-lg lg:min-h-[400px] border border-white/10"
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
          </div>
        </section>

        {/* Row 2: Stats Strip */}
        <section className="border-t border-b border-white/10 bg-black py-10">
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="rounded-lg bg-neutral-900/40 py-10 border border-white/10">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {dealerStats.map((s, i) => (
                  <Reveal
                    key={s.label}
                    delay={i * 90}
                    variant="scale-up"
                    className="text-center"
                  >
                    <p className="font-display text-2xl font-black text-brand sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60 sm:text-sm">
                      {s.label}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Row 3: Core Values */}
        <section className="bg-neutral-950 py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="mx-auto max-w-xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                What Drives Us
              </p>
              <h3 className="mt-2 font-display text-2xl font-black tracking-wide text-white sm:text-3xl">
                Our Core Values
              </h3>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {groupInfo.values.map((v, i) => (
                <Reveal
                  key={v.title}
                  delay={i * 100}
                  variant="scale-up"
                  className="rounded-lg border border-white/10 bg-neutral-900/40 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <h4 className="text-sm font-bold tracking-wider text-white">{v.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">
                    {v.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Row 4: MG India Facts */}
        <section className="border-t border-white/10 bg-black py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="rounded-lg bg-brand-deep py-12 px-6 text-white sm:p-10 lg:p-14 border border-white/5">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                <Reveal variant="slide-right">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                    Our Brand Heritage
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-black tracking-wide sm:text-3xl">
                    JSW MG Motor India: &ldquo;{mgIndiaFacts.tagline}&rdquo;
                  </h3>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
                    <p>
                      Founded in {mgIndiaFacts.founded} in Oxford, UK, MG (Morris Garages) has a 100+ year global legacy. In India, we are pioneering the electric and connected vehicle landscape. {mgIndiaFacts.plant} {mgIndiaFacts.network}
                    </p>
                    <p>
                      {mgIndiaFacts.jswJointVenture}
                    </p>
                    <p>
                      {mgIndiaFacts.caePhilosophy}
                    </p>
                  </div>
                </Reveal>
                <div className="grid gap-4 sm:grid-cols-2">
                  {mgIndiaFacts.csr.map((c, i) => (
                    <Reveal
                      key={c.title}
                      delay={i * 100}
                      variant="fade-up"
                      className="rounded-lg border border-white/10 bg-white/5 p-6"
                    >
                      <div className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                        <div>
                          <h4 className="text-sm font-bold tracking-wider text-white">
                            {c.title}
                          </h4>
                          <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                            {c.text}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
