"use client";

import { useEffect, useRef, useState } from "react";
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
  const navListRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  // Track whether the underline has been placed at least once so we can skip
  // the CSS transition on first render (avoids it sliding in from position 0).
  const hasPositioned = useRef(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number; visible: boolean; skipTransition: boolean }>({
    left: 0,
    width: 0,
    visible: false,
    skipTransition: true,
  });

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
    if (href === "/") return pathname === "/" && activeSection === "home";
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

  // Sliding underline: measure the currently-active link's position within
  // the nav row and animate a single shared bar to it, instead of each link
  // mounting/unmounting its own underline (which just snapped between tabs).
  useEffect(() => {
    const activeHref = nav.links.find((l) => getIsActive(l.href))?.href;
    const activeEl = activeHref ? linkRefs.current[activeHref] : null;
    const container = navListRef.current;
    if (!activeEl || !container) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const update = () => {
      const containerRect = container.getBoundingClientRect();
      const linkRect = activeEl.getBoundingClientRect();
      const skip = !hasPositioned.current;
      // On first placement: teleport with no transition, then enable sliding.
      setIndicator({
        left: linkRect.left - containerRect.left + 14,
        width: linkRect.width - 28,
        visible: true,
        skipTransition: skip,
      });
      if (skip) {
        hasPositioned.current = true;
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, activeSection]);

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

        {/* Desktop links - xl+ only; below that (through iPad Pro width) the
            full link row + CTA + logo get too cramped, so tablet uses the
            hamburger drawer instead. */}
        <ul ref={navListRef} className="relative hidden items-center gap-1 xl:flex">
          {nav.links.map((l) => {
            const isActive = getIsActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  ref={(el) => {
                    linkRefs.current[l.href] = el;
                  }}
                  href={l.href}
                  className={`relative rounded px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-brand"
                      : isTransparent
                      ? "text-white hover:text-brand"
                      : "text-muted hover:text-brand"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          {/* Shared underline bar - animates between links instead of each
              one mounting/unmounting its own. On first render we skip the
              CSS transition so it doesn't slide in from pos 0 (Home). */}
          <span
            className="pointer-events-none absolute bottom-0 h-0.5 bg-brand"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.visible ? 1 : 0,
              transition: indicator.skipTransition
                ? "opacity 0ms"
                : "left 300ms ease-out, width 300ms ease-out, opacity 200ms",
            }}
          />
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          {!isCarDetailPage && (
            <button
              onClick={() => openTestDriveModal()}
              className="hidden rounded bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-light md:inline-block cursor-pointer"
            >
              Book a Test Drive
            </button>
          )}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`grid h-11 w-11 place-items-center rounded border transition-colors ${
              isTransparent
                ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                : "border-border bg-bg-2 text-text"
            } xl:hidden`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 xl:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open || undefined}
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
            <Logo hideSelectOnMobile={false} />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded border border-border bg-bg-2 text-text"
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
                className={`rounded px-4 py-3 text-sm font-medium tracking-wide transition-colors ${
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
