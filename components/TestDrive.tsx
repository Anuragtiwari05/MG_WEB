"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { carModels, cityOptions, testDriveImage } from "@/lib/data";
import { Calendar, Check, ChevronDown } from "./icons";
import Reveal from "./Reveal";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";
import PhoneOtpGate from "@/components/PhoneOtpGate";
import ReverifyModal from "@/components/ReverifyModal";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const timeSlots = [
  { label: "Morning (9–12)", start: 9, end: 12 },
  { label: "Afternoon (12–4)", start: 12, end: 16 },
  { label: "Evening (4–8)", start: 16, end: 20 },
];

function SelectField({
  label,
  options,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const controlled = value !== undefined;
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted">{label}</span>
      <div className="relative">
        <select
          {...(controlled
            ? { value, onChange: (e: ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value) }
            : { defaultValue: "" })}
          required
          className={`${fieldBase} appearance-none pr-10`}
        >
          <option value="" disabled className="text-faint">
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
      </div>
    </label>
  );
}

export default function TestDrive() {
  const { verifiedPhone, resetVerification, isMounted } = usePhoneVerification();
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reverifyOpen, setReverifyOpen] = useState(false);
  const minDate = new Date().toISOString().slice(0, 10);

  // Form Field States
  const [carModel, setCarModel] = useState("");
  const [carModelOther, setCarModelOther] = useState("");
  const [locationName, setLocationName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  // Error States
  const [modelError, setModelError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  const availableTimeSlots = useMemo(() => {
    if (!date || date !== minDate) return timeSlots;
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    return timeSlots.filter((s) => s.end > currentHour);
  }, [date, minDate]);

  const effectiveTime = availableTimeSlots.some((s) => s.label === time)
    ? time
    : "";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    // Car Model
    if (!carModel) {
      setModelError("Please select a car model");
      isValid = false;
    } else if (carModel === "Other" && !carModelOther.trim()) {
      setModelError("Please specify your car model");
      isValid = false;
    } else {
      setModelError("");
    }

    // Location
    if (!locationName) {
      setLocationError("Please select a showroom / location");
      isValid = false;
    } else {
      setLocationError("");
    }

    // Name
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      setNameError("Name must contain only letters and spaces");
      isValid = false;
    } else {
      setNameError("");
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Pincode
    if (!pincode.trim()) {
      setPincodeError("Pincode is required");
      isValid = false;
    } else if (!/^[0-9]{6}$/.test(pincode.trim())) {
      setPincodeError("Please enter a valid 6-digit pincode");
      isValid = false;
    } else {
      setPincodeError("");
    }

    // Date
    if (!date) {
      setDateError("Please select preferred date");
      isValid = false;
    } else {
      setDateError("");
    }

    // Time
    if (!time) {
      setTimeError("Please select preferred time slot");
      isValid = false;
    } else {
      setTimeError("");
    }

    if (isValid && verifiedPhone) {
      setSubmitted(true);
    }
  };

  return (
    <section id="test-drive" className="scroll-mt-24 bg-white py-14 lg:py-20 overflow-hidden">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="overflow-hidden rounded-lg border border-border shadow-[0_4px_32px_0_rgba(0,44,95,0.08)] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          {/* Visual side */}
          <Reveal variant="slide-right" className="relative min-h-[280px] overflow-hidden lg:min-h-full">
            <Image
              src={testDriveImage}
              alt="MG interior and dashboard"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-black/30 lg:to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Book a Test Drive
              </p>
              <h2 className="mt-2 max-w-sm font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                Take Your Favourite MG for a Spin
              </h2>
              <p className="mt-3 max-w-sm text-sm text-white/70">
                Pick a date, time and location, and we&apos;ll have the car ready,
                at our showroom or your home.
              </p>
            </div>
          </Reveal>

          {/* Form side */}
          <Reveal delay={200} variant="slide-left" className="bg-bg-2 p-8 sm:p-10 lg:p-12 flex flex-col h-full justify-center">
            {isMounted && !verifiedPhone ? (
              <PhoneOtpGate
                title="Book a Test Drive"
                description="Verify your phone number first to schedule a test drive."
                onVerified={() => {}}
              />
            ) : submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
                  <Check className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-text">
                  Booking received!
                </h3>
                <p className="mt-2 max-w-sm text-muted">
                  Thank you. A MG Motor Mumbai representative will call you shortly to confirm your test drive.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCarModel("");
                    setCarModelOther("");
                    setLocationName("");
                    setName("");
                    setEmail("");
                    setPincode("");
                    setAddress("");
                    setDate("");
                    setTime("");
                    setModelError("");
                    setLocationError("");
                    setNameError("");
                    setEmailError("");
                    setPincodeError("");
                    setDateError("");
                    setTimeError("");
                  }}
                  className="mt-6 rounded border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-bg-3"
                >
                  Book another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <SelectField
                    label="Select Car Model"
                    placeholder="Select Car Model"
                    options={[...carModels, "Other"]}
                    value={carModel}
                    onChange={(v) => {
                      setCarModel(v);
                      if (modelError) setModelError("");
                    }}
                  />
                  {modelError && (
                    <p className="mt-1 text-[11px] font-medium text-red-500">{modelError}</p>
                  )}
                </div>

                <div>
                  <SelectField
                    label="Select Location"
                    placeholder="Select Location"
                    options={cityOptions}
                    value={locationName}
                    onChange={(v) => {
                      setLocationName(v);
                      if (locationError) setLocationError("");
                    }}
                  />
                  {locationError && (
                    <p className="mt-1 text-[11px] font-medium text-red-500">{locationError}</p>
                  )}
                </div>

                {carModel === "Other" && (
                  <div className="col-span-full">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Specify Car Model</span>
                      <input
                        type="text"
                        required
                        placeholder="Enter desired car model"
                        className={fieldBase}
                        value={carModelOther}
                        onChange={(e) => setCarModelOther(e.target.value)}
                      />
                    </label>
                  </div>
                )}

                <div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                    <input 
                      type="text" 
                      required 
                      placeholder="Your name" 
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (nameError) setNameError("");
                      }}
                      className={`${fieldBase} ${nameError ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
                    />
                  </label>
                  {nameError && (
                    <p className="mt-1 text-[11px] font-medium text-red-500">{nameError}</p>
                  )}
                </div>

                <div className="relative block cursor-pointer" onClick={() => setReverifyOpen(true)}>
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                  <div className="relative">
                    <input
                      type="tel"
                      readOnly
                      placeholder="Mobile number"
                      className={`${fieldBase} border-emerald-200 bg-emerald-50/30 cursor-pointer text-emerald-800 font-semibold pr-24`}
                      value={verifiedPhone ? `+91 ${verifiedPhone}` : ""}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Verified
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Email</span>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      className={`${fieldBase} ${emailError ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
                    />
                  </label>
                  {emailError && (
                    <p className="mt-1 text-[11px] font-medium text-red-500">{emailError}</p>
                  )}
                </div>

                <div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Pincode</span>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{6}"
                      placeholder="6-digit pincode"
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value);
                        if (pincodeError) setPincodeError("");
                      }}
                      className={`${fieldBase} ${pincodeError ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
                    />
                  </label>
                  {pincodeError && (
                    <p className="mt-1 text-[11px] font-medium text-red-500">{pincodeError}</p>
                  )}
                </div>

                <label className="col-span-full block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Address (optional)</span>
                  <input
                    type="text"
                    placeholder="House no., street, area"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={fieldBase}
                  />
                </label>

                <div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Date</span>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        min={minDate}
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                          if (dateError) setDateError("");
                        }}
                        suppressHydrationWarning
                        className={`${fieldBase} pr-10 ${date ? "" : "text-transparent"} ${dateError ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
                      />
                      <Calendar className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                    </div>
                  </label>
                  {dateError && (
                    <p className="mt-1 text-[11px] font-medium text-red-500">{dateError}</p>
                  )}
                </div>

                <div>
                  <SelectField
                    label="Preferred Time"
                    placeholder={
                      date && availableTimeSlots.length === 0
                        ? "No slots left today"
                        : "Select time"
                    }
                    options={availableTimeSlots.map((s) => s.label)}
                    value={effectiveTime}
                    onChange={(v) => {
                      setTime(v);
                      if (timeError) setTimeError("");
                    }}
                  />
                  {timeError && (
                    <p className="mt-1 text-[11px] font-medium text-red-500">{timeError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="col-span-full mt-2 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light"
                >
                  Book My Test Drive
                </button>
                <p className="col-span-full text-center text-xs text-faint">
                  By submitting, you agree to be contacted by MG Motor Mumbai about
                  your test drive request. See our{" "}
                  <a href="#" className="font-medium text-brand hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      <ReverifyModal 
        isOpen={reverifyOpen}
        onClose={() => setReverifyOpen(false)}
        onConfirm={() => {
          setReverifyOpen(false);
          resetVerification();
        }}
      />
    </section>
  );
}
