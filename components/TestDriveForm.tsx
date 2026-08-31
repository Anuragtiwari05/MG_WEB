"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cars, company, getCarBrandedName, getCarTransparentImage, type Car } from "@/lib/data";
import { CheckCircle } from "@/components/icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";
import ReverifyModal from "@/components/ReverifyModal";
import PhoneOtpGate from "@/components/PhoneOtpGate";
import { countryCodes } from "@/lib/countryCodes";
import { submitLead } from "@/lib/submitLead";

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
          alt={getCarBrandedName(car)}
          title={getCarBrandedName(car)}
          fill
          className="object-contain"
          sizes="140px"
        />
      </div>
      <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
        {getCarBrandedName(car)}
      </span>
    </button>
  );
}

const gateImage = "/images/cybie-kmi-desktop.webp";

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

  /* ── PHONE VERIFICATION GATE ── */
  const { verifiedPhone, resetVerification, isMounted } = usePhoneVerification();
  const [reverifyOpen, setReverifyOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const country = countryCodes[0];
  const [otpVerificationId, setOtpVerificationId] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    mountedRef.current = true;
    setMounted(true);
    return () => { mountedRef.current = false; };
  }, []);

  const verified = isMounted && Boolean(verifiedPhone);

  useEffect(() => {
    if (verifiedPhone) {
      setPhone(verifiedPhone);
    } else {
      setPhone("");
    }
  }, [verifiedPhone]);

  const handleVerified = (verifiedNumber: string) => {
    setPhone(verifiedNumber);
    setOtpVerificationId(`otp-verified-${Date.now()}`);
  };

  /* ── BOOKING WIZARD (unlocked once verified) ── */

  // Step state (1: Select Car, 2: When & Where, 3: Your Details).
  // Skip straight to step 2 when arriving with a car already chosen from that car's page.
  const [step, setStep] = useState<1 | 2 | 3>(isFromCarPage ? 2 : 1);

  // Form selections
  const [selectedCarId, setSelectedCarId] = useState<string>(presetCarId || "");
  const [location, setLocation] = useState<string>("Malad West (Link Road)");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("Morning (9–12)");

  // Contact details
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Error states for Step 3 validation
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [pincodeError, setPincodeError] = useState<string>("");

  // Modal & submission state
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
    else if (step === 2 && preferredDate && preferredDate >= minDate && timeSlot && location) setStep(3);
  };

  // Step 1 skips the extra "Next Step" click — picking a car advances immediately.
  const selectCarAndAdvance = (carId: string) => {
    setSelectedCarId(carId);
    setStep(2);
  };

  const handleBack = () => {
    if (step === 1) {
      if (isFromCarPage) onExit?.();
    } else if (step === 2) {
      if (isFromCarPage) {
        onExit?.();
      } else {
        setStep(1);
      }
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    // Pincode: required, 6 digits
    if (!pincode.trim()) {
      setPincodeError("Pincode is required");
      isValid = false;
    } else if (!/^[0-9]{6}$/.test(pincode.trim())) {
      setPincodeError("Please enter a valid 6-digit pincode");
      isValid = false;
    } else {
      setPincodeError("");
    }

    if (isValid && phone) {
      setSubmitError("");
      setSending(true);
      try {
        await submitLead("test_drive", {
          car_model: selectedCar?.name || "",
          location,
          name: fullName,
          mobile_number: phone,
          email,
          pincode,
          preferred_date: preferredDate,
          preferred_time: timeSlot,
          notes,
          form_source: isFromCarPage ? `test_drive_${presetCarId}` : "test_drive_pop_up",
          otp_verification_id: otpVerificationId,
        });
        if (!mountedRef.current) return;
        setShowSuccessModal(true);
      } catch (err) {
        console.error("Test drive form submission failed:", err);
        if (!mountedRef.current) return;
        setSubmitError("Something went wrong booking your test drive. Please try again.");
      } finally {
        if (mountedRef.current) setSending(false);
      }
    }
  };

  const handleReset = () => {
    setShowSuccessModal(false);
    setStep(1);
    setSelectedCarId("");
    setFullName("");
    setEmail("");
    setPincode("");
    setNotes("");
    setNameError("");
    setEmailError("");
    setPincodeError("");
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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
        {/* Visual side */}
        <div className="relative hidden min-h-[460px] overflow-hidden lg:block lg:min-h-full">
          <Image
            src={gateImage}
            alt="MG Cyberster on a race track"
            fill
            sizes="420px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
              MG Motor Mumbai
            </p>
            <h4 className="mt-2 font-display text-xl font-bold leading-snug text-white">
              Experience MG, First-Hand
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              Verify your number to lock in a test drive slot at your nearest showroom.
            </p>
          </div>
        </div>

        {/* Form side */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12">
          <PhoneOtpGate
            title="Verify to Unlock Your Test Drive"
            description="We'll text you a one-time code to confirm it's really you before unlocking the booking form."
            formSource={isFromCarPage ? `test_drive_${presetCarId}` : "test_drive_pop_up"}
            onVerified={handleVerified}
          />
        </div>

      </div>
    );
  }

  /* ── BOOKING WIZARD ── */
  return (
    <>
      {/* STEP PROGRESS BAR */}
      {/* pr-14 keeps the last step's circle clear of the modal's absolutely
          positioned close button (h-11 w-11 at right-4 top-4). */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-8 pr-14">
        {/* Step 1 Indicator */}
        <div className="flex flex-1 items-start last:flex-none">
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
          <span className={`mx-2 mt-[15px] h-0.5 flex-1 rounded transition-colors ${step >= 2 ? "bg-brand" : "bg-slate-200"}`} />
        </div>

        {/* Step 2 Indicator */}
        <div className="flex flex-1 items-start last:flex-none">
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
          <span className={`mx-2 mt-[15px] h-0.5 flex-1 rounded transition-colors ${step >= 3 ? "bg-brand" : "bg-slate-200"}`} />
        </div>

        {/* Step 3 Indicator */}
        <div className="flex flex-1 items-start last:flex-none">
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
                      onClick={() => selectCarAndAdvance(selectedCar.id)}
                    />
                  )}
                </div>

                <div className="sticky bottom-0 -mx-6 mt-8 flex items-center border-t border-slate-100 bg-white px-6 pt-6 pb-6 sm:-mx-10 sm:px-10">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
                  >
                    Back
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
                        onClick={() => selectCarAndAdvance(car.id)}
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
                      onClick={() => selectCarAndAdvance(car.id)}
                    />
                  ))}
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
              Selected vehicle: <strong className="text-slate-900 font-semibold">{selectedCar ? getCarBrandedName(selectedCar) : ""}</strong>
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
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val && minDate && val < minDate) {
                      setPreferredDate(minDate);
                      return;
                    }
                    setPreferredDate(val);
                  }}
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

            <div className="sticky bottom-0 -mx-6 mt-8 flex items-center justify-between border-t border-slate-100 bg-white px-6 pt-6 pb-6 sm:-mx-10 sm:px-10">
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
              Confirming test drive for <strong className="text-slate-900 font-semibold">{selectedCar ? getCarBrandedName(selectedCar) : ""}</strong> on <strong className="text-slate-900 font-semibold">{preferredDate} ({timeSlot})</strong>.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  Mobile Number
                </label>
                <div
                  className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-3 cursor-pointer transition-colors hover:bg-emerald-100/70"
                  onClick={() => setReverifyOpen(true)}
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-800">{country.dial} {phone}</span>
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
                  Pincode *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="e.g. 400001"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    if (pincodeError) setPincodeError("");
                  }}
                  className={`w-full rounded-lg border p-3 text-sm text-slate-800 outline-none transition-colors focus:ring-2 ${
                    pincodeError
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-brand focus:ring-brand/20"
                  }`}
                />
                {pincodeError && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">{pincodeError}</p>
                )}
              </div>

              <div className="sm:col-span-2">
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

            {submitError && (
              <p className="mt-4 text-xs font-medium text-red-500">{submitError}</p>
            )}

            <div className="sticky bottom-0 -mx-6 mt-8 flex items-center justify-between border-t border-slate-100 bg-white px-6 pt-6 pb-6 sm:-mx-10 sm:px-10">
              <button
                type="button"
                onClick={handleBack}
                className="rounded border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light shadow-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? "Booking..." : "Confirm Test Drive"}
              </button>
            </div>
          </form>
        )}

      </div>

      {/* ── SUCCESS MODAL ── */}
      {showSuccessModal && mounted && typeof window !== "undefined"
        ? createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">

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
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-800">
              <svg className="h-7 w-7 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Headline */}
            <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Thank you for your interest!
            </h3>

            {/* Main Text */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
              We thank you for showing an interest in test driving of the{" "}
              <strong className="font-semibold text-slate-900">
                {selectedCar ? getCarBrandedName(selectedCar) : "MG Vehicle"}
              </strong>.
            </p>

            <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
              We assure you our representative will contact you shortly.
            </p>

            {/* Note Box */}
            <div className="mt-5 rounded-xl border border-amber-200/80 bg-[#FFFBEB] p-4 text-left shadow-xs">
              <h4 className="text-sm font-bold text-amber-900">Note</h4>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-amber-800 font-normal">
                This is not the Test Drive confirmation. We shall check the schedule and confirm the vehicle availability.
              </p>
            </div>

            {/* Further Info & Contact */}
            <p className="mt-5 text-sm text-slate-600 font-normal">
              We appreciate your time and patience.
            </p>
            <p className="mt-2 text-sm text-slate-600 font-normal">
              For any further details you may contact us on{" "}
              <strong className="whitespace-nowrap font-bold text-slate-900">{company.phone}</strong>.
            </p>

            {/* Reset / Action Button */}
            <button
              type="button"
              onClick={handleReset}
              className="mt-6 w-full rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 cursor-pointer shadow-xs"
            >
              Book another test drive
            </button>
          </div>
        </div>,
        document.body
      )
        : null}

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
