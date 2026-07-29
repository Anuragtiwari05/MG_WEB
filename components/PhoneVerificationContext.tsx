"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Verified phone expires after this many milliseconds (24 hours).
// After expiry the stored value is silently discarded on next load,
// so returning users have to re-verify rather than having their old
// phone number silently pre-filled in every form.
const PHONE_TTL_MS = 24 * 60 * 60 * 1000;

type StoredPhone = { phone: string; expiresAt: number };

function readStoredPhone(): string | null {
  try {
    const raw = localStorage.getItem("verified_phone");
    if (!raw) return null;
    // Legacy format: plain string (before expiry was added) — treat as expired
    if (!raw.startsWith("{")) {
      localStorage.removeItem("verified_phone");
      return null;
    }
    const { phone, expiresAt }: StoredPhone = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem("verified_phone");
      return null;
    }
    return phone;
  } catch {
    localStorage.removeItem("verified_phone");
    return null;
  }
}

type PhoneVerificationContextType = {
  verifiedPhone: string | null;
  verifyPhone: (phone: string) => void;
  resetVerification: () => void;
  isMounted: boolean;
  isTestDriveModalOpen: boolean;
  presetCarId: string | null;
  openTestDriveModal: (carId?: string) => void;
  closeTestDriveModal: () => void;
};

const PhoneVerificationContext = createContext<PhoneVerificationContextType | undefined>(undefined);

export function PhoneVerificationProvider({ children }: { children: React.ReactNode }) {
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false);
  const [presetCarId, setPresetCarId] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const phone = readStoredPhone();
    if (phone) setVerifiedPhone(phone);
  }, []);

  const verifyPhone = (phone: string) => {
    const payload: StoredPhone = { phone, expiresAt: Date.now() + PHONE_TTL_MS };
    localStorage.setItem("verified_phone", JSON.stringify(payload));
    setVerifiedPhone(phone);
  };

  const resetVerification = () => {
    localStorage.removeItem("verified_phone");
    setVerifiedPhone(null);
  };

  const openTestDriveModal = (carId?: string) => {
    if (carId) setPresetCarId(carId);
    else setPresetCarId(null);
    setIsTestDriveModalOpen(true);
  };

  const closeTestDriveModal = () => {
    setIsTestDriveModalOpen(false);
    setPresetCarId(null);
  };

  return (
    <PhoneVerificationContext.Provider
      value={{
        verifiedPhone,
        verifyPhone,
        resetVerification,
        isMounted,
        isTestDriveModalOpen,
        presetCarId,
        openTestDriveModal,
        closeTestDriveModal,
      }}
    >
      {children}
    </PhoneVerificationContext.Provider>
  );
}

export function usePhoneVerification() {
  const context = useContext(PhoneVerificationContext);
  if (!context) {
    throw new Error("usePhoneVerification must be used within a PhoneVerificationProvider");
  }
  return context;
}
