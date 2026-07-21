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
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 sm:p-10 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 transition-all duration-300 ${
          isVerified ? "max-w-3xl" : "max-w-md"
        }`}
      >
        <button
          type="button"
          onClick={closeTestDriveModal}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <TestDriveForm presetCarId={presetCarId || undefined} onExit={closeTestDriveModal} />
      </div>
    </div>
  );
}
