"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type Car360Config = {
  id: string;
  exteriorFrameCount: number;
  template: string; // {n} replaced with frame number
};

function frameSrc(template: string, n: number): string {
  return template.replace("{n}", String(n));
}

type Props = {
  config: Car360Config;
  onClose?: () => void;
};

const DRAG_SENSITIVITY = 0.65;

export default function Car360Viewer({ config, onClose }: Props) {
  const { exteriorFrameCount: totalFrames, template } = config;

  const [frame, setFrame] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [ready, setReady] = useState(false);

  const viewerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartFrame = useRef(1);
  const viewerWidth = useRef(0);
  const rafId = useRef<number | null>(null);
  const preloaded = useRef(false);

  /* ── Preload all frames on mount ─────────────────── */
  useEffect(() => {
    if (preloaded.current) return;
    preloaded.current = true;

    let loaded = 0;
    const urls: string[] = [];
    for (let i = 1; i <= totalFrames; i++) urls.push(frameSrc(template, i));

    // load frame 1 eagerly
    const first = new Image();
    first.onload = first.onerror = () => {
      loaded++;
      if (loaded >= 1) setReady(true);
    };
    first.src = urls[0];

    // load rest in idle time
    const loadRest = () => {
      for (let i = 1; i < urls.length; i++) {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded >= totalFrames) setReady(true);
        };
        img.src = urls[i];
      }
    };

    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(loadRest, { timeout: 3000 });
    } else {
      setTimeout(loadRest, 0);
    }
  }, [template, totalFrames]);

  const src = frameSrc(template, frame);

  /* ── Drag ────────────────────────────────────────── */
  const handleDragStart = useCallback(
    (clientX: number) => {
      setIsDragging(true);
      setHasInteracted(true);
      dragStartX.current = clientX;
      dragStartFrame.current = frame;
      if (viewerRef.current) viewerWidth.current = viewerRef.current.clientWidth;
    },
    [frame]
  );

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const dx = clientX - dragStartX.current;
        const rotPx = viewerWidth.current * DRAG_SENSITIVITY || 400;
        const steps = Math.round((dx / rotPx) * totalFrames);
        const nf = ((dragStartFrame.current - 1 - steps) % totalFrames + totalFrames) % totalFrames + 1;
        setFrame(nf);
      });
    },
    [isDragging, totalFrames]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = null; }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setHasInteracted(true);
    if (e.key === "ArrowLeft") setFrame((p) => ((p - 2 + totalFrames) % totalFrames) + 1);
    if (e.key === "ArrowRight") setFrame((p) => (p % totalFrames) + 1);
  };

  return (
    <div
      ref={viewerRef}
      className="relative flex w-full overflow-hidden rounded-2xl bg-white shadow-xl select-none"
      style={{ aspectRatio: "16/10", touchAction: "none" }}
      onPointerDown={(e) => { e.preventDefault(); handleDragStart(e.clientX); }}
      onPointerMove={(e) => handleDragMove(e.clientX)}
      onPointerUp={handleDragEnd}
      onPointerLeave={handleDragEnd}
      onTouchStart={(e) => { if (e.touches.length === 1) handleDragStart(e.touches[0].clientX); }}
      onTouchMove={(e) => { if (e.touches.length === 1) handleDragMove(e.touches[0].clientX); }}
      onTouchEnd={handleDragEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label="360 exterior view"
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 flex items-center gap-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur px-3.5 py-1.5 text-[11px] font-bold cursor-pointer transition-all"
          aria-label="Close 360 view"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Close
        </button>
      )}

      <div className={`relative w-full h-full flex items-center justify-center bg-white ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
        {/* loading spinner — only on cold start */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600" />
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Frame ${frame}`}
          draggable={false}
          className="object-contain w-full h-full pointer-events-none"
          style={{ opacity: ready ? 1 : 0 }}
        />

        {/* Drag hint */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-white pointer-events-none transition-opacity duration-300 ${
            hasInteracted ? "opacity-0" : "opacity-100"
          }`}
        >
          <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 12h8M8 17h8" />
          </svg>
          Drag horizontally to rotate
        </div>

        {/* Frame counter */}
        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-black/25 pointer-events-none">
          {frame}/{totalFrames}
        </div>
      </div>
    </div>
  );
}
