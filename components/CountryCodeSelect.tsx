"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { countryCodes, flagUrl, type Country } from "@/lib/countryCodes";
import { ChevronDown, Search } from "@/components/icons";

type Props = {
  value: Country;
  onChange: (c: Country) => void;
};

export default function CountryCodeSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const update = () => {
      const r = btnRef.current?.getBoundingClientRect();
      if (r) setRect({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 260) });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const onClick = (e: MouseEvent) => {
      if (
        btnRef.current?.contains(e.target as Node) ||
        panelRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = countryCodes.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.dial.includes(q);
  });

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Select country code"
        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 cursor-pointer"
      >
        <img
          src={flagUrl(value.iso2)}
          alt=""
          aria-hidden
          className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover"
        />
        {value.dial}
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && mounted && rect
        ? createPortal(
            <div
              ref={panelRef}
              style={{ position: "fixed", top: rect.top, left: rect.left, width: rect.width }}
              className="z-[300] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="border-b border-slate-100 p-2">
                <div className="flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-2.5 py-1.5">
                  <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search country or code"
                    className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div className="max-h-56 overflow-y-auto py-1">
                {filtered.length === 0 ? (
                  <p className="px-3 py-4 text-center text-xs text-slate-400">No matches</p>
                ) : (
                  filtered.map((c) => (
                    <button
                      key={c.iso2}
                      type="button"
                      onClick={() => {
                        onChange(c);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors hover:bg-slate-50 cursor-pointer ${
                        c.iso2 === value.iso2 ? "bg-brand/5 font-semibold text-brand" : "text-slate-700"
                      }`}
                    >
                      <img
                        src={flagUrl(c.iso2)}
                        alt=""
                        aria-hidden
                        className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover"
                      />
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-slate-400">{c.dial}</span>
                    </button>
                  ))
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
