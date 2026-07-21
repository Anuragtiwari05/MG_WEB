"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
    const stored = localStorage.getItem("verified_phone");
    if (stored) {
      setVerifiedPhone(stored);
    }
  }, []);

  const verifyPhone = (phone: string) => {
    localStorage.setItem("verified_phone", phone);
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
