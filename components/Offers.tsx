import Image from "next/image";
import { Shield, Gift, Car } from "./icons";
import Reveal from "./Reveal";

const currentOffers = [
  {
    icon: Gift,
    title: "EXCITING CASH BENEFITS",
    text: "Up to ₹ 1,00,000*",
  },
  {
    icon: Car,
    title: "EXCHANGE BONUS",
    text: "Up to ₹ 75,000*",
  },
  {
    icon: Shield,
    title: "EXTENDED WARRANTY",
    text: "Upto 3 Years*",
  },
];

export default function Offers() {
  return (
    <section
      id="offers"
      className="relative overflow-hidden bg-brand-deep py-16 text-white"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Offer Details (Left) */}
          <Reveal variant="slide-right" className="z-10 flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Special Promotion
            </p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-wide sm:text-4xl">
              CURRENT OFFERS
            </h2>
            <div className="mt-8 space-y-6">
              {currentOffers.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                        {item.title}
                      </p>
                      <p className="font-display text-lg font-black tracking-tight sm:text-xl">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8">
              <a
                href="/test-drive"
                className="inline-flex items-center justify-center rounded bg-brand px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-light"
              >
                EXPLORE OFFERS
              </a>
            </div>
          </Reveal>

          {/* Hector Showcase Image (Right) */}
          <Reveal
            variant="slide-left"
            delay={150}
            className="relative h-[250px] overflow-hidden rounded-lg sm:h-[350px] lg:h-[400px]"
          >
            {/* Background image placeholder */}
            <Image
              src="/images/promo-offer.jpg"
              alt="MG ZS Promo Offer"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            {/* Ambient Red glow overlay to make it look futuristic */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-brand/10" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
