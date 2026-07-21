"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { nav } from "@/lib/data";
import { Menu, X, Search } from "./icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";

export default function Navbar() {
  const { openTestDriveModal } = usePhoneVerification();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Premium intersection observer to track which homepage section is currently in view
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["home", "offers", "blogs"];
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // Trigger when section is in middle of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;
  const isCarDetailPage = Boolean(pathname?.startsWith("/cars/") && pathname !== "/cars");

  const getIsActive = (href: string) => {
    if (href === "/about" && pathname === "/about") return true;
    if (href === "/cars" && pathname === "/cars") return true;
    if (href === "/locate-service-centre" && pathname === "/locate-service-centre") return true;
    if (href === "/locations" && pathname === "/locations") return true;
    if (href === "/contact-us" && pathname === "/contact-us") return true;
    if (href === "/blogs" && pathname === "/blogs") return true;
    if (pathname === "/" && href.startsWith("/#")) {
      return activeSection === href.replace("/#", "");
    }
    return false;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent h-[80px]"
          : scrolled
          ? "bg-white shadow-md h-[72px]"
          : "bg-white border-b border-border h-[80px]"
      } flex items-center`}
    >
      {/* Main nav */}
      <nav className="container-px mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <Logo dark={isTransparent} />

        {/* Desktop links */}
        <ul className="hidden items-center lg:gap-2 xl:gap-4 lg:flex">
          {nav.links.map((l) => {
            const isActive = getIsActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative rounded px-3.5 py-2 text-xs uppercase font-bold tracking-wider transition-colors duration-200 ${
                    isActive
                      ? "text-brand"
                      : isTransparent
                      ? "text-white hover:text-brand"
                      : "text-muted hover:text-brand"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-brand" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          {!isCarDetailPage && (
            <button
              onClick={() => openTestDriveModal()}
              className="hidden rounded bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-light sm:inline-block cursor-pointer"
            >
              BOOK A TEST DRIVE
            </button>
          )}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`grid h-9 w-9 place-items-center rounded border transition-colors ${
              isTransparent
                ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                : "border-border bg-bg-2 text-text"
            } lg:hidden`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 border-l border-border bg-white p-6 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <Logo />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded border border-border bg-bg-2 text-text"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {nav.links.map((l) => {
            const isActive = getIsActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive ? "bg-bg-2 text-brand" : "text-text hover:bg-bg-2 hover:text-brand"
                }`}
              >
                {l.label}
              </Link>
            );
          })}

          {!isCarDetailPage && (
            <button
              onClick={() => {
                setOpen(false);
                openTestDriveModal();
              }}
              className="mt-6 flex items-center justify-center gap-2 rounded bg-brand px-5 py-3.5 text-sm font-semibold text-white hover:bg-brand-light cursor-pointer w-full"
            >
              Book a Test Drive
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
