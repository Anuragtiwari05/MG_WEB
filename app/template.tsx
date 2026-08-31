"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

// Mirrors the main nav order (Home, About, Find a Car, Service, Locations,
// Contact Us) so navigating "forward" through it slides content in from the
// right, and "back" slides in from the left.
const NAV_ORDER = ["/", "/about", "/cars", "/locate-service-centre", "/locations", "/contact-us"];

function getNavIndex(pathname: string): number {
  const exact = NAV_ORDER.indexOf(pathname);
  if (exact !== -1) return exact;
  // Nested routes (e.g. /cars/astor) inherit their parent's position via the
  // longest matching prefix.
  let bestIndex = -1;
  let bestLength = 0;
  for (let i = 0; i < NAV_ORDER.length; i++) {
    const route = NAV_ORDER[i];
    if (route !== "/" && pathname.startsWith(route) && route.length > bestLength) {
      bestIndex = i;
      bestLength = route.length;
    }
  }
  return bestIndex;
}

// Module-scoped so it persists across client-side navigations within the
// same browser tab. IMPORTANT: this must never be read/written on the
// server — `next dev`/`next start` run as a single long-lived Node process,
// so a module-level variable is shared across *every* request, not scoped
// to one. Mutating it during SSR leaks one visitor's navigation history into
// another's server-rendered HTML, and causes the server's guess to diverge
// from the client's own (fresh, always-null) state on the very first
// render — a hydration mismatch. Guarding on `typeof window` keeps all
// reads/writes client-only, so SSR always renders the neutral "fade" class,
// which matches the client's first render exactly.
let lastNavIndex: number | null = null;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [animationClass] = useState(() => {
    if (typeof window === "undefined") return "page-transition-fade";
    const currentIndex = getNavIndex(pathname);
    let cls = "page-transition-fade";
    if (lastNavIndex !== null && currentIndex !== -1 && lastNavIndex !== currentIndex) {
      cls = currentIndex > lastNavIndex ? "page-transition-forward" : "page-transition-back";
    }
    if (currentIndex !== -1) lastNavIndex = currentIndex;
    return cls;
  });

  return <div className={animationClass}>{children}</div>;
}
