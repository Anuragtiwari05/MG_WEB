import type { SVGProps } from "react";

/* Minimal, consistent 24px stroke icon set that keeps the bundle
   dependency-free while matching the premium line-icon aesthetic. */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Phone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const Search = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Rendered filled (not the shared stroke style) since the WhatsApp glyph is
// only recognizable as an outline shape when it's the real logo silhouette.
export const WhatsApp = (p: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 32 32" fill="currentColor" {...p}>
    <path d="M16.001 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.363.63 4.587 1.728 6.517L2 30l7.72-2.347A13.273 13.273 0 0 0 16 29.333C23.363 29.333 29.333 23.363 29.333 16S23.363 2.667 16.001 2.667zm0 2.666A10.618 10.618 0 0 1 26.667 16c0 5.88-4.787 10.667-10.666 10.667a10.62 10.62 0 0 1-5.38-1.458l-.385-.225-4.583 1.394 1.35-4.42-.252-.4A10.593 10.593 0 0 1 5.333 16c0-5.88 4.787-10.667 10.668-10.667zm-3.56 5.333c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.453 4.826 2.667 1.12 3.2 1.12 3.76 1.12.56 0 1.786-.507 2.04-1.76.253-1.253.04-2-.08-2.187-.133-.186-.213-.213-.4-.293-.186-.08-1.573-.8-1.813-.88-.24-.08-.413-.12-.587.12-.173.24-.666.88-.813 1.066-.147.187-.293.213-.533.08-.24-.133-1.013-.373-1.934-1.2-.72-.64-1.2-1.426-1.347-1.666-.147-.24-.013-.373.107-.493.107-.107.24-.28.36-.413.12-.133.16-.24.24-.4.08-.16.04-.307-.02-.427-.06-.12-.56-1.493-.787-2.013-.187-.48-.4-.44-.587-.44z" />
  </svg>
);

export const Calendar = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ChevronLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const ChevronRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const Star = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);

export const Shield = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const ShieldAlert = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const Users = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const Network = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <path d="M12 8v4M12 12H5v4M12 12h7v4" />
  </svg>
);

export const Rupee = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8 4h9M8 8h9M11 4a4 4 0 1 1 0 8h-3l6 8" />
  </svg>
);

export const Wrench = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18v3h3l6.4-6.4a4 4 0 0 0 5.3-5.4l-2.8 2.8-2.1-2.1 2.9-2.6z" />
  </svg>
);

export const Truck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M1 4h13v11H1zM14 8h4l3 3v4h-7" />
    <circle cx="5.5" cy="18.5" r="1.8" />
    <circle cx="17.5" cy="18.5" r="1.8" />
  </svg>
);

export const Road = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 22 8 2h8l4 20M12 6v2M12 12v2M12 18v2" />
  </svg>
);

export const Badge = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="9" r="6" />
    <path d="M9 14.5 8 22l4-2 4 2-1-7.5" />
  </svg>
);

export const Gift = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7S12 2 8.5 2 5 5 5 5 8 7 12 7zM12 7s0-5 3.5-5S19 5 19 5s-3 2-7 2z" />
  </svg>
);

export const Car = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13M4 17h16v-4H4zM6 17v2M18 17v2" />
    <circle cx="7.5" cy="15" r=".6" fill="currentColor" />
    <circle cx="16.5" cy="15" r=".6" fill="currentColor" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const X = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const CheckCircle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m22 4-10 10.01-3-3" />
  </svg>
);

export const ExternalLink = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* Social */
export const Facebook = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
export const Instagram = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
  </svg>
);
export const Twitter = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);
export const LinkedIn = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);
export const YouTube = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 12s0-3.5-.45-5.15a2.6 2.6 0 0 0-1.83-1.84C18.05 4.5 12 4.5 12 4.5s-6.05 0-7.72.51A2.6 2.6 0 0 0 2.45 6.85 27 27 0 0 0 2 12a27 27 0 0 0 .45 5.15 2.6 2.6 0 0 0 1.83 1.84C5.95 19.5 12 19.5 12 19.5s6.05 0 7.72-.51a2.6 2.6 0 0 0 1.83-1.84A27 27 0 0 0 22 12z" />
    <path d="m10 15 5-3-5-3z" fill="currentColor" />
  </svg>
);

export const BatteryIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
    <line x1="22" y1="11" x2="22" y2="13" />
  </svg>
);

export const WindIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2M12.59 19.59A2 2 0 1 1 14 16H2M15.19 12.02A3 3 0 1 0 18 9H2" />
  </svg>
);

export const DiscIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const iconMap = {
  shield: Shield,
  users: Users,
  network: Network,
  rupee: Rupee,
  wrench: Wrench,
  truck: Truck,
  road: Road,
  badge: Badge,
  gift: Gift,
  car: Car,
  battery: BatteryIcon,
  wind: WindIcon,
  disc: DiscIcon,
} as const;

export type IconName = keyof typeof iconMap;
