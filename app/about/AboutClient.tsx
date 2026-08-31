"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { ArrowRight } from "@/components/icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";
import {
  groupInfo,
  aboutFaqData,
} from "@/lib/data";

export default function AboutPage() {
  const { openTestDriveModal } = usePhoneVerification();
  return (
    <>
      <Navbar />
      <main className="mt-[60px] min-h-screen bg-white text-text">
        
        {/* BANNER / HERO SECTION */}
        <section className="relative min-h-[420px] w-full overflow-hidden bg-neutral-950 sm:min-h-[480px] flex items-center border-b border-white/10">
          <Image
            src="/images/dealer-jogeshwari.jpg"
            alt="MG Motor Mumbai Showroom"
            title="MG Motor Mumbai Showroom"
            fill
            priority
            className="object-cover object-[68%_15%] opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          
          <div className="container-px relative z-10 mx-auto w-full max-w-[1400px] py-16">
            <Reveal variant="fade-up" className="max-w-2xl text-left">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Gautam Modi Group
              </p>
              <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                DECADES OF LEGACY
              </h1>
              <p className="mt-4 text-base font-light leading-relaxed text-white/80 sm:text-lg">
                Grounded in a legacy built on trust, passion, and motoring excellence. With nearly a century of progress behind us, we raise the bar in innovation and customer engagement.
              </p>
            </Reveal>
          </div>
        </section>

        {/* WHO WE ARE SECTION (Featuring Gautam Modi Group photo) */}
        <section className="bg-white py-16 lg:py-24">
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <Reveal variant="slide-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  Who We Are
                </p>
                <h2 className="mt-2 font-display text-3xl font-black tracking-wide text-text sm:text-4xl">
                  About MG Motor Mumbai &amp; Gautam Modi Group
                </h2>
                <div className="mt-5 space-y-4 text-sm font-light leading-relaxed text-muted sm:text-base">
                  <p>
                    MG Motor Mumbai is an authorized JSW MG Motor India dealership, owned and operated by the <strong className="text-text font-semibold">{groupInfo.name}</strong>. We run state-of-the-art showrooms and service centers across Mumbai, Vasai, and Worli, serving satisfied owners across the region.
                  </p>
                  <p>
                    From iconic British heritage and intelligent connected SUVs to zero-emission electric vehicles and luxury MPVs, our mission is to deliver unmatched customer satisfaction, transparent advice, and factory-trained technical support.
                  </p>
                </div>
              </Reveal>

              <Reveal
                variant="slide-left"
                delay={150}
                className="relative min-h-[340px] overflow-hidden rounded-2xl lg:min-h-[440px] border border-border shadow-xl"
              >
                <Image
                  src="https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/05/GNP01423.JPG-2048x1365.jpeg"
                  alt="Gautam Modi Group Headquarters & Team"
                  title="Gautam Modi Group Headquarters & Team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand">Pioneering Excellence</p>
                  <p className="text-sm font-semibold text-white mt-1">Gautam Modi Group Corporate &amp; Showroom Network</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* LOCAL COMMITMENT */}
        <section className="bg-brand-deep py-16 lg:py-20 text-white">
          <div className="container-px mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal variant="fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Our Local Commitment
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                Here for every milestone on the road.
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={100}>
              <p className="text-sm leading-relaxed text-white/75 sm:text-base">
                Whether you are buying your first MG, upgrading to an electric SUV, or arranging routine service, our showroom and service teams provide practical help close to home. Visit MG Motor Mumbai across the city for new MG cars, test drives, genuine parts, and expert service support.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Malad", "Jogeshwari", "Prabhadevi", "Vasai", "Worli"].map((loc) => (
                  <span
                    key={loc}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/90"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="bg-white py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="mx-auto max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                What Drives Us
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                Our Core Values
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {groupInfo.values.map((v, i) => (
                <Reveal
                  key={v.title}
                  delay={i * 100}
                  variant="scale-up"
                  className="rounded-lg border border-border bg-white p-6 text-center transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_0_rgba(228,0,43,0.12)]"
                >
                  <h3 className="text-sm font-semibold text-text">{v.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {v.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ id="about-faq" data={aboutFaqData} />

        {/* READY TO VISIT A SHOWROOM */}
        <section className="bg-white py-14 lg:py-16">
          <div className="container-px mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-black tracking-tight text-text sm:text-4xl">
              Ready to visit a showroom?
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Book a free test drive or find your nearest MG Motor Mumbai showroom and service centre.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openTestDriveModal()}
                className="inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light cursor-pointer"
              >
                Book a Test Drive
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 rounded border border-border bg-white px-6 py-3 text-sm font-semibold text-text transition-all hover:border-brand hover:text-brand"
              >
                Find a Showroom
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
