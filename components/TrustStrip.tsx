import { Shield, Users, Check, Star } from "./icons";
import Reveal from "./Reveal";

const trustStats = [
  {
    icon: Shield,
    stat: "100+",
    label: "Years of Legacy",
  },
  {
    icon: Users,
    stat: "3.5K+",
    label: "Happy Customers",
  },
  {
    icon: Check,
    stat: "100%",
    label: "Customer Satisfaction",
  },
  {
    icon: Star,
    stat: "Award Winning",
    label: "Service Excellence",
  },
  {
    icon: Shield,
    stat: "Trusted",
    label: "MG Dealership",
  },
];

export default function TrustStrip() {
  return (
    <section className="border-b border-border bg-white py-6 md:py-8">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 gap-y-6 divide-x divide-border sm:grid-cols-3 lg:grid-cols-5">
          {trustStats.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.label}
                delay={i * 80}
                variant="scale-up"
                className="flex flex-col items-center justify-center px-4 text-center first:border-l-0 lg:divide-x-0"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="text-left">
                    <p className="font-display text-lg font-black tracking-tight text-text sm:text-xl">
                      {item.stat}
                    </p>
                    <p className="text-xs font-semibold text-muted">
                      {item.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
