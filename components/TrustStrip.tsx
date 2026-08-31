import { Shield, Network, Rupee, Wrench } from "./icons";
import Reveal from "./Reveal";

const trustPoints = [
  {
    icon: Shield,
    title: "Authorised MG Dealer",
    desc: "Every car, part and accessory is 100% genuine, sourced directly from MG Motor India.",
  },
  {
    icon: Network,
    title: "Wide Sales & Service Network",
    desc: "Showrooms and service centres across Mumbai, Vasai, and surrounding areas.",
  },
  {
    icon: Rupee,
    title: "Easy Finance & Exchange",
    desc: "Flexible EMI plans, fast loan approvals, and instant exchange value on your old car.",
  },
  {
    icon: Wrench,
    title: "Expert Service",
    desc: "Factory-trained technicians who work exclusively with genuine MG parts.",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                delay={i * 80}
                variant="fade-up"
                className="flex h-full flex-col items-center px-2 text-center"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 flex min-h-[40px] items-center font-display text-sm font-semibold text-text sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted sm:text-[13px]">
                  {item.desc}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
