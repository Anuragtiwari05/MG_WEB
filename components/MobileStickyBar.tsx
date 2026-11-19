"use client";

import { Calendar } from "./icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";

export default function MobileStickyBar() {
  const { openTestDriveModal } = usePhoneVerification();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-1 border-t border-border bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden">
      <button
        type="button"
        onClick={() => openTestDriveModal()}
        className="flex items-center justify-center gap-2 bg-brand py-3.5 text-sm font-bold text-white transition-colors active:bg-brand-light cursor-pointer"
      >
        <Calendar className="h-5 w-5" />
        Test Drive
      </button>
    </div>
  );
}
