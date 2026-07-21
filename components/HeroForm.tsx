"use client";

import { useState, type FormEvent, useEffect } from "react";
import { carModels, cityOptions } from "@/lib/data";
import { Check, ChevronDown, Calendar, ArrowRight, ArrowLeft } from "./icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";
import PhoneOtpGate from "@/components/PhoneOtpGate";
import ReverifyModal from "@/components/ReverifyModal";

const fieldBase =
  "w-full rounded border border-border bg-white px-3 py-2.5 text-[13px] text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

export default function HeroForm() {
  const { verifiedPhone, resetVerification, isMounted } = usePhoneVerification();
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [reverifyOpen, setReverifyOpen] = useState(false);
  
  // Step 1 state
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [model, setModel] = useState("");

  // Step 1 errors
  const [nameError, setNameError] = useState("");
  const [modelError, setModelError] = useState("");

  useEffect(() => {
    if (verifiedPhone) {
      setMobile(verifiedPhone);
    } else {
      setMobile("");
    }
  }, [verifiedPhone]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNext = () => {
    let isValid = true;
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      setNameError("Name must contain only letters");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!model) {
      setModelError("Please select a car model");
      isValid = false;
    } else {
      setModelError("");
    }

    if (isValid && mobile) {
      setStep(2);
    }
  };

  if (submitted) {
    return (
      <div className="flex h-[340px] w-full max-w-[340px] flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-2xl">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-lg font-bold text-text">Booking received!</h3>
        <p className="mt-2 text-xs text-muted">We will call you shortly to confirm.</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setName("");
            setModel("");
            setNameError("");
            setModelError("");
          }}
          className="mt-6 rounded border border-border px-4 py-2 text-xs font-semibold text-text transition-colors hover:bg-bg-2"
        >
          Book another
        </button>
      </div>
    );
  }

  if (isMounted && !verifiedPhone) {
    return (
      <div className="w-full max-w-[340px] rounded-lg bg-white p-6 shadow-2xl">
        <PhoneOtpGate
          title="Book a Test Drive"
          description="Verify your phone number first to schedule a test drive."
          onVerified={(phone) => setMobile(phone)}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[340px] rounded-lg bg-white p-6 shadow-2xl">
      <h3 className="font-display text-xl font-bold text-text">Book a Test Drive</h3>
      <p className="mt-1 text-xs text-muted">
        {step === 1 ? "Step 1: Your Details" : "Step 2: Time & Location"}
      </p>
      
      <form onSubmit={onSubmit} className="mt-5 overflow-hidden">
        <div 
          className="flex w-[200%] transition-transform duration-500 ease-in-out"
          style={{ transform: step === 1 ? "translateX(0)" : "translateX(-50%)" }}
        >
          {/* Step 1 */}
          <div className="w-1/2 shrink-0 flex flex-col gap-3 pr-4">
            <div>
              <label className="block">
                <span className="sr-only">Your Name</span>
                <input 
                  type="text" 
                  required 
                  placeholder="Your Name" 
                  className={`${fieldBase} ${nameError ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    if (nameError) setNameError("");
                  }}
                />
              </label>
              {nameError && (
                <p className="mt-1 text-[10px] font-medium text-red-500">{nameError}</p>
              )}
            </div>

            <div className="relative cursor-pointer" onClick={() => setReverifyOpen(true)}>
              <span className="sr-only">Mobile Number</span>
              <input 
                type="tel" 
                readOnly
                placeholder="Mobile Number" 
                className={`${fieldBase} border-emerald-200 bg-emerald-50/30 cursor-pointer text-emerald-800 font-semibold pr-24`}
                value={mobile ? `+91 ${mobile}` : ""}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Verified
              </div>
            </div>

            <div>
              <label className="block">
                <span className="sr-only">Select Car Model</span>
                <div className="relative">
                  <select 
                    required 
                    className={`${fieldBase} appearance-none pr-8 ${modelError ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
                    value={model}
                    onChange={e => {
                      setModel(e.target.value);
                      if (modelError) setModelError("");
                    }}
                  >
                    <option value="" disabled className="text-faint">Select Car Model</option>
                    {carModels.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                </div>
              </label>
              {modelError && (
                <p className="mt-1 text-[10px] font-medium text-red-500">{modelError}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="mt-2 group flex w-full items-center justify-center gap-2 rounded bg-brand py-3 text-[13px] font-semibold text-white transition-all hover:bg-brand-light active:scale-[0.98]"
            >
              Next
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-center text-[11px] text-faint">
              Takes less than 30 seconds.
            </p>
          </div>

          {/* Step 2 */}
          <div className="w-1/2 shrink-0 flex flex-col gap-3 pl-4">
            <label className="block">
              <span className="sr-only">Select Location</span>
              <div className="relative">
                <select defaultValue="" required className={`${fieldBase} appearance-none pr-8`}>
                  <option value="" disabled className="text-faint">Select Location</option>
                  {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </label>
            <label className="block">
              <span className="sr-only">Preferred Date</span>
              <div className="relative">
                <input type="date" required className={`${fieldBase} pr-8`} />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </label>
            <label className="block">
              <span className="sr-only">Preferred Time</span>
              <div className="relative">
                <select defaultValue="" required className={`${fieldBase} appearance-none pr-8`}>
                  <option value="" disabled className="text-faint">Select Time</option>
                  <option value="Morning">Morning (9–12)</option>
                  <option value="Afternoon">Afternoon (12–4)</option>
                  <option value="Evening">Evening (4–8)</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </label>
            
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="group flex w-1/3 items-center justify-center rounded border border-border bg-bg-2 py-3 text-[13px] font-semibold text-text transition-colors hover:bg-bg-3"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                type="submit"
                className="flex w-2/3 items-center justify-center rounded bg-brand py-3 text-[13px] font-semibold text-white transition-all hover:bg-brand-light active:scale-[0.98]"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </form>

      <ReverifyModal 
        isOpen={reverifyOpen}
        onClose={() => setReverifyOpen(false)}
        onConfirm={() => {
          setReverifyOpen(false);
          resetVerification();
        }}
      />
    </div>
  );
}
