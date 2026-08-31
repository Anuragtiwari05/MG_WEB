"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type Car360Config = {
  id: string;
  exteriorFrameCount: number;
  template: string; // {n} replaced with frame number
  reversed?: boolean;
  aspect?: number; // width/height of the source photos, so the viewer box matches them instead of forcing a generic 16:10 crop
};

function frameSrc(template: string, n: number): string {
  return template.replace("{n}", String(n));
}

type Props = {
  config: Car360Config;
  onClose?: () => void;
};

const DRAG_SENSITIVITY = 0.65;
// Browsers allow ~6 concurrent connections per origin. Capping background
// preloading at 4 leaves headroom for the <img> display request to slip
// through instantly when the user drags to an uncached frame — instead of
// queuing behind all N simultaneous requests like the old "fire them all"
// approach did (72 requests at once on hector/cyberster/m9).
const MAX_CONCURRENT = 4;

export default function Car360Viewer({ config, onClose }: Props) {
  const { exteriorFrameCount: totalFrames, template, reversed, aspect } = config;

  const [frame, setFrame] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [ready, setReady] = useState(false);

  const viewerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartFrame = useRef(1);
  const viewerWidth = useRef(0);
  const rafId = useRef<number | null>(null);

  /* ── Progressive preload queue ──────────────────────
     Frames load in order with limited concurrency (not all at once).
     loadedRef doubles as a "requested" set to prevent duplicate requests  - 
     a frame is added when its request is dispatched. The display <img>
     then relies on the browser cache + request coalescing for instant
     swaps to already-loaded frames. */
  const loadedRef = useRef<Set<number>>(new Set());
  const queueRef = useRef<number[]>([]);
  const activeRef = useRef(0);
  const aliveRef = useRef(true);

  const processQueue = useCallback(() => {
    if (!aliveRef.current) return;
    while (activeRef.current < MAX_CONCURRENT && queueRef.current.length > 0) {
      const n = queueRef.current.shift()!;
      if (loadedRef.current.has(n)) continue;
      loadedRef.current.add(n); // mark in-flight to avoid duplicate requests
      activeRef.current++;
      const img = new Image();
      img.onload = img.onerror = () => {
        if (!aliveRef.current) return;
        activeRef.current--;
        if (n === 1) setReady(true);
        processQueue();
      };
      img.src = frameSrc(template, n);
    }
  }, [template]);

  useEffect(() => {
    aliveRef.current = true;
    loadedRef.current = new Set();
    queueRef.current = [];
    activeRef.current = 0;
    for (let i = 1; i <= totalFrames; i++) queueRef.current.push(i);
    processQueue();
    return () => {
      aliveRef.current = false;
      queueRef.current = [];
    };
  }, [template, totalFrames, processQueue]);

  /* When the user drags toward a frame that isn't loaded yet, bump it
     (and its immediate neighbors) to the front of the queue so it loads
     next - instead of waiting behind every preceding sequential frame. */
  const prioritize = useCallback(
    (n: number) => {
      if (loadedRef.current.has(n)) return; // already loaded or in-flight
      const idx = queueRef.current.indexOf(n);
      if (idx > -1) queueRef.current.splice(idx, 1);
      // Insert target + neighbors at the front, nearest first.
      for (const f of [n - 2, n - 1, n + 1, n + 2, n]) {
        if (f >= 1 && f <= totalFrames && !loadedRef.current.has(f)) {
          queueRef.current.unshift(f);
        }
      }
      processQueue();
    },
    [totalFrames, processQueue]
  );

  /* ── Cancel any pending RAF on unmount ───────────── */
  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, []);

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
        const directionMultiplier = reversed ? 1 : -1;
        const nf = ((dragStartFrame.current - 1 + directionMultiplier * steps) % totalFrames + totalFrames) % totalFrames + 1;
        setFrame(nf);
        prioritize(nf);
      });
    },
    [isDragging, totalFrames, reversed, prioritize]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = null; }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setHasInteracted(true);
    if (e.key === "ArrowLeft") {
      const nf = ((frame - 2 + totalFrames) % totalFrames) + 1;
      setFrame(nf);
      prioritize(nf);
    }
    if (e.key === "ArrowRight") {
      const nf = (frame % totalFrames) + 1;
      setFrame(nf);
      prioritize(nf);
    }
  };

  return (
    <div
      ref={viewerRef}
      className="relative flex w-full overflow-hidden rounded-2xl bg-white shadow-xl select-none"
      style={{ aspectRatio: aspect ?? 16 / 10, touchAction: "none" }}
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
        {/* loading spinner - only on cold start */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600" />
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Frame ${frame}`}
          title={`Frame ${frame}`}
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
      </div>
    </div>
  );
}
