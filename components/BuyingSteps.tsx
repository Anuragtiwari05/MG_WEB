"use client";

import Reveal from "./Reveal";

const steps = [
  {
    num: "01",
    title: "Shortlist your MG",
    description: "Browse the full MG lineup of SUVs and electric vehicles. Compare dimensions, specifications, features, mileage, and prices in one place."
  },
  {
    num: "02",
    title: "Book a test drive",
    description: "Select a date and visit your nearest MG Motor Mumbai outlet across Malad, Thane, or Navi Mumbai, or request a doorstep test drive."
  },
  {
    num: "03",
    title: "Finalise finance & exchange",
    description: "Get a transparent trade-in valuation for your old car, and choose from competitive finance schemes with leading banks."
  },
  {
    num: "04",
    title: "Delivery & aftercare",
    description: "Take delivery of your brand new MG with a memorable celebration. Rely on our factory-trained service technicians for all future maintenance."
  }
];

export default function BuyingSteps() {
  return (
    <section id="buying-steps" className="scroll-mt-24 bg-bg-2 py-14 lg:py-20 border-b border-border">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-12 max-w-xl text-center mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            How It Works
          </p>
          <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-wide text-text sm:text-4xl">
            Buying an MG in four simple steps
          </h2>
          <p className="mt-4 text-sm text-muted">
            From shortlisting to delivery and aftercare, we make buying and owning an MG straightforward, transparent, and completely hassle-free.
          </p>
        </Reveal>

        {/* Steps Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.num}
              delay={i * 90}
              variant="scale-up"
              className="h-full"
            >
              <div className="group relative flex h-full flex-col justify-start rounded-xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md">
                {/* Step number in background styling */}
                <div className="font-display text-4xl font-black text-brand/10 transition-colors group-hover:text-brand/20">
                  {s.num}
                </div>
                
                <h3 className="mt-4 font-display text-base font-bold text-text transition-colors group-hover:text-brand">
                  {s.title}
                </h3>
                
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
                
                {/* Decorative border accent */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-transparent transition-all group-hover:bg-brand" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
