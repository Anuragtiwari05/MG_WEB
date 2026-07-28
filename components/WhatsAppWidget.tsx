"use client";

import { useState } from "react";
import Image from "next/image";

const PHONE = "918697882371"; // 91 = India country code
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent("Hi, I wanted to book a test drive")}`;

export default function WhatsAppWidget() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2 md:bottom-6">
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
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />

        {/* Official WhatsApp logo asset (public/images/whatsapp-logo-white.svg) */}
        <Image
          src="/images/whatsapp-logo-white.svg"
          alt="WhatsApp"
          title="Chat with MG Motor Mumbai on WhatsApp"
          width={32}
          height={32}
          className="relative z-10 h-8 w-8"
        />
      </a>
    </div>
  );
}
