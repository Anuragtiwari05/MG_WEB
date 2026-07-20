import Image from "next/image";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "@/components/icons";
import {
  company,
  groupInfo,
  mgIndiaFacts,
} from "@/lib/data";

const gmgStats = [
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

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mt-[60px] min-h-screen bg-black text-white">
        
        {/* BANNER / HERO SECTION */}
        <section className="relative min-h-[360px] w-full overflow-hidden bg-neutral-950 sm:min-h-[420px] flex items-center border-b border-white/10">
          <Image
            src="https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/05/GNP01423.JPG-2048x1365.jpeg"
            alt="Gautam Modi Group Legacy"
            fill
            priority
            className="object-cover opacity-40 filter grayscale contrast-125"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          
          <div className="container-px relative z-10 mx-auto max-w-[1400px] py-16">
            <Reveal variant="fade-up" className="max-w-2xl">
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

        {/* STATS GRID SECTION (Exact numbers from gautammodigroup.com) */}
        <section className="border-b border-white/10 bg-neutral-950 py-12 lg:py-16">
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {gmgStats.map((s, i) => (
                <Reveal
                  key={s.label}
                  delay={i * 80}
                  variant="scale-up"
                  className="relative rounded-2xl border border-white/10 bg-neutral-900/60 p-6 text-center transition-all hover:border-brand/50 hover:bg-neutral-900"
                >
                  <p className="font-display text-3xl font-black tracking-tight text-brand sm:text-4xl lg:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-white/70">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNEY NARRATIVE SECTION */}
        <section className="py-14 lg:py-20 bg-black border-b border-white/10">
          <div className="container-px mx-auto max-w-[850px] text-center">
            <Reveal variant="fade-up" className="space-y-6 text-base leading-relaxed text-white/80 font-light sm:text-lg">
              <p className="text-xl font-medium text-white sm:text-2xl leading-snug font-display">
                &ldquo;As we move into a new phase of growth, we remain grounded in a legacy built on trust, passion, and excellence.&rdquo;
              </p>
              <p>
                With nearly a century of progress behind us, our focus is clear: to raise the bar in innovation and customer engagement while creating experiences that go beyond mobility.
              </p>
              <p>
                Our journey began in Mumbai with Hyundai, laying a strong foundation in India&apos;s rapidly evolving automotive market. This growth led to the establishment of one of the region&apos;s earliest premium luxury destinations, Audi Thane, where elevated design and refined service came together to redefine the customer experience.
              </p>
              <p>
                In 2019, our association with Morris Garages (MG Motor) at the beginning of its India journey further strengthened our portfolio, bringing together heritage, innovation, and modern connected mobility.
              </p>
              <p className="text-sm text-white/60">
                In 2023, we introduced a state-of-the-art Mahindra facility integrating Sales and After-Sales operations. The launch of Modi Kia in Kalyan in 2024, followed by the arrival of MG Select at Worli, marks the next stage of our evolution.
              </p>
            </Reveal>
          </div>
        </section>

        {/* WHO WE ARE SECTION (Featuring Gautam Modi Group photo) */}
        <section className="bg-neutral-950 py-16 lg:py-24 border-b border-white/10">
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <Reveal variant="slide-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  Who We Are
                </p>
                <h2 className="mt-2 font-display text-3xl font-black tracking-wide text-white sm:text-4xl">
                  About MG Motor Mumbai &amp; Gautam Modi Group
                </h2>
                <div className="mt-5 space-y-4 text-sm font-light leading-relaxed text-white/75 sm:text-base">
                  <p>
                    MG Motor Mumbai is an authorized JSW MG Motor India dealership, owned and operated by the <strong className="text-white font-semibold">{groupInfo.name}</strong>. We run state-of-the-art showrooms and service centers across Mumbai, Thane, Vasai, and Worli, serving over <strong className="text-white font-semibold">{company.stats.happyCustomers}</strong> satisfied owners.
                  </p>
                  <p>
                    From iconic British heritage and intelligent connected SUVs to zero-emission electric vehicles and luxury MPVs, our mission is to deliver unmatched customer satisfaction, transparent advice, and factory-trained technical support.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-xs font-bold uppercase tracking-wider text-white">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand" />
                      Authorized MG Dealer
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand" />
                      100% Genuine Parts
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand" />
                      Multi-Location Support
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand" />
                      Certified Technicians
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal
                variant="slide-left"
                delay={150}
                className="relative min-h-[340px] overflow-hidden rounded-2xl lg:min-h-[440px] border border-white/10 shadow-2xl"
              >
                <Image
                  src="https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/05/GNP01423.JPG-2048x1365.jpeg"
                  alt="Gautam Modi Group Headquarters & Team"
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

        {/* DEALER STATS STRIP */}
        <section className="border-b border-white/10 bg-neutral-950 py-12">
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="rounded-2xl bg-neutral-900/60 py-10 px-6 border border-white/10">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {dealerStats.map((s, i) => (
                  <Reveal
                    key={s.label}
                    delay={i * 90}
                    variant="scale-up"
                    className="text-center"
                  >
                    <p className="font-display text-2xl font-black text-brand sm:text-3xl lg:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-white/60">
                      {s.label}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="bg-black py-16 lg:py-24 border-b border-white/10">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="mx-auto max-w-xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                What Drives Us
              </p>
              <h3 className="mt-2 font-display text-3xl font-black tracking-wide text-white sm:text-4xl">
                Our Core Values
              </h3>
            </Reveal>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {groupInfo.values.map((v, i) => (
                <Reveal
                  key={v.title}
                  delay={i * 100}
                  variant="scale-up"
                  className="flex flex-col justify-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(20%-20px)] rounded-2xl border border-white/10 bg-neutral-900/40 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
                >
                  <h4 className="text-base font-bold tracking-wider text-white font-display">{v.title}</h4>
                  <p className="mt-3 text-xs leading-relaxed text-white/60 font-light">
                    {v.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BRAND HERITAGE SECTION */}
        <section className="bg-neutral-950 py-16 lg:py-24">
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="rounded-2xl bg-brand-deep py-12 px-6 text-white sm:p-10 lg:p-14 border border-white/10">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                <Reveal variant="slide-right">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                    Brand Heritage
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-black tracking-wide sm:text-3xl">
                    JSW MG Motor India: &ldquo;{mgIndiaFacts.tagline}&rdquo;
                  </h3>
                  <div className="mt-4 space-y-3 text-sm font-light leading-relaxed text-white/75">
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
                      className="rounded-xl border border-white/10 bg-white/5 p-6"
                    >
                      <div className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                        <div>
                          <h4 className="text-sm font-bold tracking-wider text-white">
                            {c.title}
                          </h4>
                          <p className="mt-1.5 text-xs leading-relaxed text-white/70 font-light">
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
