import Link from "next/link";
import Logo from "./Logo";
import { cars, nav, company } from "@/lib/data";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
} from "./icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Car Models", href: "/cars" },
  { label: "Service", href: "/locate-service-centre" },
  { label: "Locations", href: "/locations" },
  { label: "Test Drive", href: "/locate-service-centre" },
  { label: "Contact Us", href: "/contact-us" },
];

const ourServices = [
  { label: "New Car Sales", href: "/cars" },
  { label: "Service & Maintenance", href: "/locate-service-centre" },
  { label: "Genuine Parts", href: "/locate-service-centre" },
  { label: "Finance & Insurance", href: "/" },
  { label: "Extended Warranty", href: "/locate-service-centre" },
  { label: "Roadside Assistance", href: "/locate-service-centre" },
];

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: YouTube, label: "YouTube" },
  { Icon: LinkedIn, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-deep border-t border-white/5">
      {/* Main footer grid */}
      <div className="container-px mx-auto max-w-[1400px] pb-10 pt-14 text-white">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-white/10 pb-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.4fr]">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Logo dark />
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-white/60">
              MG Motor Mumbai is an authorised MG dealership offering premium new car
              sales, professional service, and genuine MG parts in Mumbai.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Follow MG Motor Mumbai on ${label}`}
                  className="grid h-9 w-9 place-items-center rounded border border-white/15 text-white/60 transition-all hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-xs font-semibold text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular cars */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Popular Models</h4>
            <ul className="mt-4 space-y-3">
              {cars.map((c) => (
                <li key={c.name}>
                  <Link
                    href={`/cars/${c.id}`}
                    className="text-xs font-semibold text-white/60 transition-colors hover:text-white"
                  >
                    MG {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Our Services</h4>
            <ul className="mt-4 space-y-3">
              {ourServices.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-xs font-semibold text-white/60 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact Us</h4>
            <ul className="mt-4 space-y-4 text-xs text-white/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span className="leading-relaxed">
                  5th Floor, Modi House, Link Road, Malad (West), Mumbai – 400064
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <a
                  href={`tel:${nav.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {nav.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-white"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span className="leading-relaxed">
                  Mon–Sat 10:00 AM–7:00 PM<br />
                  Sun 10:00 AM–5:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-8 text-[11px] text-white/40 sm:flex-row">
          <p>© 2024 MG Motor Mumbai. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
