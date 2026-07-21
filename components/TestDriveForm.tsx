"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cars, getCarTransparentImage, type Car } from "@/lib/data";
import { Shield, X, CheckCircle } from "@/components/icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";
import ReverifyModal from "@/components/ReverifyModal";

function CarCard({
  car,
  isSelected,
  onClick,
}: {
  car: Car;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-between gap-3 rounded-xl border-2 p-4 text-center transition-all cursor-pointer ${
        isSelected
          ? "border-brand bg-brand/5 shadow-sm ring-2 ring-brand/20"
          : "border-slate-200 hover:border-slate-400 bg-white"
      }`}
    >
      <div className="relative h-16 w-full sm:h-20">
        <Image
          src={getCarTransparentImage(car.id)}
          alt={`MG ${car.name}`}
          fill
          className="object-contain"
          sizes="140px"
        />
      </div>
      <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
        MG {car.name}
      </span>
    </button>
  );
}

const isValidPhone = (p: string) => /^[6-9]\d{9}$/.test(p);

type Props = {
  // Pre-selects this car and switches Step 1 to the "Car Selected" / "More Options"
  // layout. Pass this whenever the form is opened from that car's own page.
  presetCarId?: string;
  // Called when "Back" is pressed at Step 1 while presetCarId is set — e.g. close
  // the modal, or navigate back to the car's page. Ignored if presetCarId is unset
  // (Step 1 Back is disabled in the general flow, same as before).
  onExit?: () => void;
};

export default function TestDriveForm({ presetCarId, onExit }: Props) {
  const isFromCarPage = Boolean(presetCarId);

  /* ── PHONE + OTP GATE ── */
  const { verifiedPhone, verifyPhone, resetVerification, isMounted } = usePhoneVerification();
  const [reverifyOpen, setReverifyOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const otpInputRef = useRef<HTMLInputElement>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const verified = isMounted && Boolean(verifiedPhone);

  useEffect(() => {
    if (verifiedPhone) {
      setPhone(verifiedPhone);
    } else {
      setPhone("");
    }
  }, [verifiedPhone]);

  useEffect(() => {
    if (otpModalOpen) {
      setOtp("");
      setOtpError("");
      // autofocus once the modal has mounted
      const t = setTimeout(() => otpInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [otpModalOpen]);

  const handleSendOtp = () => {
    if (!isValidPhone(phone)) {
      setPhoneError("Enter a valid 10-digit mobile number");
      return;
    }
    setPhoneError("");
    setSendingOtp(true);
    setTimeout(() => {
      setSendingOtp(false);
      setOtpModalOpen(true);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      setOtpError("Enter the 4-digit code sent to your phone");
      return;
    }
    setOtpError("");
    setVerifyingOtp(true);
    setTimeout(() => {
      setVerifyingOtp(false);
      setOtpModalOpen(false);
      verifyPhone(phone);
    }, 800);
  };

  /* ── BOOKING WIZARD (unlocked once verified) ── */

  // Step state (1: Select Car, 2: When & Where, 3: Your Details)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form selections
  const [selectedCarId, setSelectedCarId] = useState<string>("");
  const [location, setLocation] = useState<string>("Malad West (Link Road)");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("Morning (9–12)");

  // Contact details
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Error states for Step 3 validation
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");

  // Modal & submission state
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Pre-select model if passed in
  useEffect(() => {
    if (presetCarId) {
      setSelectedCarId(presetCarId);
    }
  }, [presetCarId]);

  const [minDate, setMinDate] = useState<string>("");

  // Set default tomorrow date and minimum date constraint (disabling today & past dates)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    const tomorrowStr = `${yyyy}-${mm}-${dd}`;
    setPreferredDate(tomorrowStr);
    setMinDate(tomorrowStr);
  }, []);

  const selectedCar = cars.find((c) => c.id === selectedCarId);

  const handleNext = () => {
    if (step === 1 && selectedCarId) setStep(2);
    else if (step === 2 && preferredDate && timeSlot && location) setStep(3);
  };

  const handleBack = () => {
    if (step === 1) {
      if (isFromCarPage) onExit?.();
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Full Name: required, min 3 chars, letters and spaces only
    if (!fullName.trim()) {
      setNameError("Full name is required");
      isValid = false;
    } else if (fullName.trim().length < 3) {
      setNameError("Full name must be at least 3 characters");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(fullName.trim())) {
      setNameError("Full name must contain only letters and spaces");
      isValid = false;
    } else {
      setNameError("");
    }

    // Email Address: required, valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email address is required");
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Address: required, min 10 characters
    if (!address.trim()) {
      setAddressError("Address / Area is required");
      isValid = false;
    } else if (address.trim().length < 10) {
      setAddressError("Please enter a complete address (minimum 10 characters)");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (isValid && phone) {
      setShowSuccessModal(true);
    }
  };

  const handleReset = () => {
    setShowSuccessModal(false);
    setStep(1);
    setSelectedCarId("");
    setFullName("");
    setEmail("");
    setAddress("");
    setNotes("");
    setOtp("");
    setNameError("");
    setEmailError("");
    setAddressError("");
    resetVerification();
  };

  const showroomOptions = [
    "Malad West (Link Road)",
    "Jogeshwari East (JVLR, WEH)",
    "Prabhadevi (Century Bazaar)",
    "Vasai East (Sativali Road)",
    "Worli (MG Select Flagship)",
  ];

  const timeSlotOptions = [
    "Morning (9–12)",
    "Afternoon (12–4)",
    "Evening (4–8)",
  ];

  /* ── GATE SCREEN — shown until phone is OTP-verified ── */
  if (!verified) {
    return (
      <div className="mx-auto max-w-sm w-full py-4 text-left">
        <h3 className="font-display text-lg font-bold text-slate-900">
          Verify Your Number
        </h3>
        <p className="mt-1 text-xs text-slate-500 font-light">
          We&apos;ll text you a one-time code to confirm your test drive booking.
        </p>

        <div className="mt-6 w-full">
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Mobile Number
          </label>
          <div className="flex gap-2">
            <span className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm font-semibold text-slate-500">
              +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="98765 43210"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                if (phoneError) setPhoneError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
              className={`w-full rounded-lg border bg-white p-3 text-sm text-slate-800 outline-none transition-colors focus:ring-2 ${
                phoneError
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-brand focus:ring-brand/20"
              }`}
            />
          </div>
          {phoneError && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{phoneError}</p>
          )}

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={sendingOtp}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sendingOtp ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </div>

        {/* ── OTP VERIFICATION POPUP ── */}
        {otpModalOpen && mounted && typeof window !== "undefined"
          ? createPortal(
              <div
                className="fixed inset-0 z-[250] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setOtpModalOpen(false);
                }}
              >
                <div className="relative w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl animate-[fade-up_.3s_ease-out_both] sm:p-8">
                  <button
                    type="button"
                    onClick={() => setOtpModalOpen(false)}
                    aria-label="Close"
                    className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Shield className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                    Verify OTP
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 font-light">
                    Enter the 4-digit code sent to{" "}
                    <span className="font-semibold text-slate-800">+91 {phone}</span>
                  </p>

                  <input
                    ref={otpInputRef}
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 4));
                      if (otpError) setOtpError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                    className={`mt-6 w-full rounded-lg border bg-white py-3 text-center text-2xl font-bold tracking-[0.5em] pl-[0.25em] text-slate-900 outline-none transition-colors focus:ring-2 ${
                      otpError
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-brand focus:ring-brand/20"
                    }`}
                    placeholder="••••"
                  />
                  {otpError && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">{otpError}</p>
                  )}

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {verifyingOtp ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpModalOpen(false)}
                    className="mt-3 text-xs font-semibold text-slate-500 transition-colors hover:text-brand cursor-pointer"
                  >
                    ← Change number
                  </button>
                </div>
              </div>,
              document.body
            )
          : null}
      </div>
    );
  }

  /* ── BOOKING WIZARD ── */
  return (
    <>
      {/* STEP PROGRESS BAR */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-8">
        {/* Step 1 Indicator */}
        <div className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                step >= 1
                  ? "bg-brand text-white ring-4 ring-brand/15"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              1
            </span>
            <span className={`hidden text-center text-[10px] font-semibold sm:block ${step >= 1 ? "text-slate-900" : "text-slate-400"}`}>
              Select Car
            </span>
          </div>
          <span className={`mx-2 h-0.5 flex-1 rounded transition-colors ${step >= 2 ? "bg-brand" : "bg-slate-200"}`} />
        </div>

        {/* Step 2 Indicator */}
        <div className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                step >= 2
                  ? "bg-brand text-white ring-4 ring-brand/15"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              2
            </span>
            <span className={`hidden text-center text-[10px] font-semibold sm:block ${step >= 2 ? "text-slate-900" : "text-slate-400"}`}>
              When &amp; Where
            </span>
          </div>
          <span className={`mx-2 h-0.5 flex-1 rounded transition-colors ${step >= 3 ? "bg-brand" : "bg-slate-200"}`} />
        </div>

        {/* Step 3 Indicator */}
        <div className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                step >= 3
                  ? "bg-brand text-white ring-4 ring-brand/15"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              3
            </span>
            <span className={`hidden text-center text-[10px] font-semibold sm:block ${step >= 3 ? "text-slate-900" : "text-slate-400"}`}>
              Your Details
            </span>
          </div>
        </div>
      </div>

      {/* STEP CONTENT & FORMS */}
      <div className="mt-8">

        {/* ── STEP 1: SELECT YOUR CAR ── */}
        {step === 1 && (
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Select Your Car
            </h3>
            <p className="mt-1 text-xs text-slate-500 font-light">
              {isFromCarPage
                ? "This is the car you were viewing. Pick a different model below if you'd rather test drive that instead."
                : "Choose from our complete MG lineup for your personalized test drive."}
            </p>

            {isFromCarPage ? (
              <>
                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Car Selected
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {selectedCar && (
                    <CarCard
                      car={selectedCar}
                      isSelected
                      onClick={() => setSelectedCarId(selectedCar.id)}
                    />
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!selectedCarId}
                    onClick={handleNext}
                    className={`inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all cursor-pointer ${
                      selectedCarId
                        ? "hover:bg-brand-light shadow-sm"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Next Step
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <p className="mt-10 text-xs font-bold uppercase tracking-wider text-slate-500">
                  More Options
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {cars
                    .filter((car) => car.id !== selectedCarId)
                    .map((car) => (
                      <CarCard
                        key={car.id}
                        car={car}
                        isSelected={false}
                        onClick={() => setSelectedCarId(car.id)}
                      />
                    ))}
                </div>
              </>
            ) : (
              <>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {cars.map((car) => (
                    <CarCard
                      key={car.id}
                      car={car}
                      isSelected={selectedCarId === car.id}
                      onClick={() => setSelectedCarId(car.id)}
                    />
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                  <button
                    type="button"
                    disabled
                    className="rounded border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-400 opacity-40 cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!selectedCarId}
                    onClick={handleNext}
                    className={`inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all cursor-pointer ${
                      selectedCarId
                        ? "hover:bg-brand-light shadow-sm"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Next Step
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── STEP 2: WHEN & WHERE ── */}
        {step === 2 && (
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              When &amp; Where
            </h3>
            <p className="mt-1 text-xs text-slate-500 font-light">
              Selected vehicle: <strong className="text-slate-900 font-semibold">MG {selectedCar?.name}</strong>
            </p>

            <div className="mt-6 space-y-6">
              {/* Showroom Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Preferred Showroom
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 cursor-pointer"
                >
                  {showroomOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  min={minDate}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 cursor-pointer"
                />
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {timeSlotOptions.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`rounded-lg border p-3 text-center text-xs font-semibold transition-all cursor-pointer ${
                        timeSlot === slot
                          ? "border-brand bg-brand text-white"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="rounded border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light cursor-pointer shadow-sm"
              >
                Next Step
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: YOUR DETAILS ── */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Your Details
            </h3>
            <p className="mt-1 text-xs text-slate-500 font-light">
              Confirming test drive for <strong className="text-slate-900 font-semibold">MG {selectedCar?.name}</strong> on <strong className="text-slate-900 font-semibold">{preferredDate} ({timeSlot})</strong>.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number
                </label>
                <div 
                  className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-3 cursor-pointer transition-colors hover:bg-emerald-100/70"
                  onClick={() => setReverifyOpen(true)}
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-800">+91 {phone}</span>
                  <div className="flex items-center gap-1 rounded bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    Verified
                  </div>
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-emerald-600 hover:text-emerald-800">
                    Change
                  </span>
                </div>
                <input type="hidden" name="mobile" value={phone} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (nameError) setNameError("");
                  }}
                  className={`w-full rounded-lg border p-3 text-sm text-slate-800 outline-none transition-colors focus:ring-2 ${
                    nameError 
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100" 
                      : "border-slate-200 focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {nameError && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">{nameError}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className={`w-full rounded-lg border p-3 text-sm text-slate-800 outline-none transition-colors focus:ring-2 ${
                    emailError
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {emailError && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">{emailError}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Address / Area *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 402, Sunshine Heights, Malad West, Mumbai"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (addressError) setAddressError("");
                  }}
                  className={`w-full rounded-lg border p-3 text-sm text-slate-800 outline-none transition-colors focus:ring-2 ${
                    addressError
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {addressError && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">{addressError}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Comments / Variant Preference (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify preferred transmission, variant or any special instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="rounded border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light shadow-md cursor-pointer"
              >
                Confirm Test Drive
              </button>
            </div>
          </form>
        )}

      </div>

      {/* ── SUCCESS MODAL ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 sm:p-10 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">

            {/* Close Button */}
            <button
              type="button"
              onClick={handleReset}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Checkmark Icon Badge */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-800">
              <svg className="h-7 w-7 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Headline */}
            <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Test drive booked!
            </h3>

            {/* Confirmation Text */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 font-light">
              Thank you, <strong className="font-semibold text-slate-900">{fullName}</strong>. An MG Motor representative will call you at <strong className="font-semibold text-slate-900">+91 {phone}</strong> shortly to confirm your <strong className="font-semibold text-brand">MG {selectedCar?.name || "Vehicle"}</strong> test drive on <strong className="font-semibold text-slate-900">{preferredDate} ({timeSlot})</strong> at <strong className="font-semibold text-slate-900">{location}</strong>.
            </p>

            {/* Reset / Action Button */}
            <button
              type="button"
              onClick={handleReset}
              className="mt-8 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 cursor-pointer shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <ReverifyModal 
        isOpen={reverifyOpen}
        onClose={() => setReverifyOpen(false)}
        onConfirm={() => {
          setReverifyOpen(false);
          resetVerification();
        }}
      />
    </>
  );
}
