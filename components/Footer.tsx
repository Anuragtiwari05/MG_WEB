"use client";

import Link from "next/link";
import Image from "next/image";
import { cars, nav, company } from "@/lib/data";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  LinkedIn,
} from "./icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Car Models", href: "/cars" },
  { label: "Service", href: "/locate-service-centre" },
  { label: "Locations", href: "/locations" },
  { label: "Test Drive", href: "/book-a-test-drive" },
  { label: "Contact Us", href: "/contact-us" },
];

const ourServices = [
  { label: "New Car Sales", href: "/cars" },
  { label: "Service & Maintenance", href: "/locate-service-centre" },
  { label: "Genuine Parts", href: "/locate-service-centre" },
];

const socials = [
  { Icon: Instagram, label: "Instagram", href: company.social.instagram },
  { Icon: Facebook, label: "Facebook", href: company.social.facebook },
  { Icon: LinkedIn, label: "LinkedIn", href: company.social.linkedin },
];

export default function Footer() {
  const { openTestDriveModal } = usePhoneVerification();
  return (
    <footer className="bg-brand-deep border-t border-white/5">
      {/* Main footer grid */}
      <div className="container-px mx-auto max-w-[1400px] pb-10 pt-14 text-white">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-white/10 pb-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.4fr]">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="group flex items-center gap-2">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white ring-1 ring-white/20">
                <Image
                  src="/images/logo-mg.png"
                  alt="MG Logo"
                  title="MG Logo"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </span>
              <Image
                src="/images/mg-select-logo.png"
                alt="MG Select"
                title="MG Select"
                width={84}
                height={16}
                className="h-4 w-auto shrink-0 object-contain invert brightness-0 filter"
              />
            </Link>
            <span className="mt-2 block font-display text-sm font-extrabold tracking-tight text-white">
              MG MOTOR MUMBAI
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.28em] text-white/60">
              Premium Dealership
            </span>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-white/60">
              MG Motor Mumbai & MG Select is an authorised JSW MG Motor India and MG Select dealership offering premium new car
              sales, professional service, and genuine MG parts in Mumbai.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow MG Motor Mumbai on ${label}`}
                  className="grid h-11 w-11 place-items-center rounded border border-white/15 text-white/60 transition-all hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((l) => {
                const isTestDrive = l.href === "/book-a-test-drive";
                return (
                  <li key={l.label}>
                    {isTestDrive ? (
                      <button
                        onClick={() => openTestDriveModal()}
                        className="text-xs font-semibold text-white/60 transition-colors hover:text-white cursor-pointer bg-transparent border-0 p-0 text-left"
                        suppressHydrationWarning
                      >
                        {l.label}
                      </button>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-xs font-semibold text-white/60 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Popular cars */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white">Popular Models</h4>
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
            <h4 className="text-xs font-bold tracking-wider text-white">Our Services</h4>
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
            <h4 className="text-xs font-bold tracking-wider text-white">Contact Us</h4>
            <ul className="mt-4 space-y-4 text-xs text-white/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span className="leading-relaxed">
                  Shakti Premises, New Link Rd, near Inorbit Mall, opposite Cloud Nine Hospital, Malad West, Mumbai – 400064
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${nav.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-white"
                  >
                    {nav.phone}
                  </a>
                  <a
                    href={`tel:${company.phoneSelect.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-white"
                  >
                    {company.phoneSelect} (MG Select)
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <div className="flex flex-col gap-1">
                  <a
                    href={`mailto:${company.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {company.email}
                  </a>
                  <a
                    href={`mailto:${company.emailSelect}`}
                    className="transition-colors hover:text-white"
                  >
                    {company.emailSelect}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <div className="flex flex-col gap-1 leading-relaxed">
                  <span>Mon–Sun 9:30 AM–6:30 PM</span>
                  <span>Mon–Sun 9:30 AM–8:00 PM (MG Select)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-[60] flex flex-col items-center justify-between gap-3 pt-8 text-[11px] text-white/40 sm:flex-row">
          <p>© 2026 MG Motor Mumbai. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs font-semibold text-white/60 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-xs font-semibold text-white/60 transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
