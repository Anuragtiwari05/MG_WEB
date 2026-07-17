"use client";

import { useState } from "react";

const PHONE = "918697882371"; // 91 = India country code
const WA_URL = `https://wa.me/${PHONE}?text=Hi%20MG%20Motor%20Mumbai!%20I%27d%20like%20to%20know%20more%20about%20your%20cars.`;

export default function WhatsAppWidget() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div
        className={`pointer-events-none flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg ring-1 ring-slate-100 transition-all duration-300 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <span className="text-xs font-bold text-slate-700">Chat with us</span>
        <span className="text-[10px] text-slate-400">+91 86978 82371</span>
      </div>

      {/* WhatsApp Bubble */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with MG Motor Mumbai on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95"
        style={{ background: "#25D366" }}
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-30"
          style={{ background: "#25D366" }}
        />
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: "#25D366" }}
        />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="relative z-10 h-7 w-7 fill-white"
        >
          <path d="M16.001 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.363.63 4.587 1.728 6.517L2 30l7.72-2.347A13.273 13.273 0 0 0 16 29.333C23.363 29.333 29.333 23.363 29.333 16S23.363 2.667 16.001 2.667zm0 2.666A10.618 10.618 0 0 1 26.667 16c0 5.88-4.787 10.667-10.666 10.667a10.62 10.62 0 0 1-5.38-1.458l-.385-.225-4.583 1.394 1.35-4.42-.252-.4A10.593 10.593 0 0 1 5.333 16c0-5.88 4.787-10.667 10.668-10.667zm-3.56 5.333c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.453 4.826 2.667 1.12 3.2 1.12 3.76 1.12.56 0 1.786-.507 2.04-1.76.253-1.253.04-2-.08-2.187-.133-.186-.213-.213-.4-.293-.186-.08-1.573-.8-1.813-.88-.24-.08-.413-.12-.587.12-.173.24-.666.88-.813 1.066-.147.187-.293.213-.533.08-.24-.133-1.013-.373-1.934-1.2-.72-.64-1.2-1.426-1.347-1.666-.147-.24-.013-.373.107-.493.107-.107.24-.28.36-.413.12-.133.16-.24.24-.4.08-.16.04-.307-.02-.427-.06-.12-.56-1.493-.787-2.013-.187-.48-.4-.44-.587-.44z" />
        </svg>
      </a>
    </div>
  );
}
