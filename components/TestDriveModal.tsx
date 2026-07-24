"use client";

import { useEffect } from "react";
import { usePhoneVerification } from "./PhoneVerificationContext";
import TestDriveForm from "./TestDriveForm";
import { X } from "./icons";

export default function TestDriveModal() {
  const { isTestDriveModalOpen, closeTestDriveModal, presetCarId, verifiedPhone, isMounted } = usePhoneVerification();

  useEffect(() => {
    if (isTestDriveModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isTestDriveModalOpen]);

  if (!isTestDriveModalOpen) return null;

  const isVerified = isMounted && Boolean(verifiedPhone);

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeTestDriveModal();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 transition-all duration-300 ${
          isVerified ? "max-w-3xl p-6 sm:p-10" : "max-w-3xl p-0"
        }`}
      >
        <button
          type="button"
          onClick={closeTestDriveModal}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-500 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-slate-800 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <TestDriveForm presetCarId={presetCarId || undefined} onExit={closeTestDriveModal} />
      </div>
    </div>
  );
}
