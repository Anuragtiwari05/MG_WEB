"use client";

import { ShieldAlert, X } from "@/components/icons";

type ReverifyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ReverifyModal({ isOpen, onClose, onConfirm }: ReverifyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <ShieldAlert className="h-7 w-7 text-brand" />
        </div>

        <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
          Change Mobile Number?
        </h3>
        <p className="mt-3 text-sm text-slate-500 font-light leading-relaxed">
          If you want to edit or change this number, you will have to re-verify using a new OTP code. Do you want to proceed?
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light cursor-pointer shadow-sm"
          >
            Yes, Re-verify
          </button>
        </div>
      </div>
    </div>
  );
}
