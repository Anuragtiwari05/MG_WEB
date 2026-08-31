"use client";

import { useState, type FormEvent, useEffect } from "react";
import { carModels, cityOptions } from "@/lib/data";
import { Check, ChevronDown, Calendar, ArrowRight, ArrowLeft } from "./icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";
import PhoneOtpGate from "@/components/PhoneOtpGate";
import ReverifyModal from "@/components/ReverifyModal";
import { submitLead } from "@/lib/submitLead";

const fieldBase =
  "w-full rounded border border-border bg-white px-3 py-2.5 text-[13px] text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

export default function HeroForm() {
  const { verifiedPhone, resetVerification, isMounted } = usePhoneVerification();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [step, setStep] = useState(1);
  const [reverifyOpen, setReverifyOpen] = useState(false);
  
  // Step 1 state
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [model, setModel] = useState("");

  // Step 2 state
  const [locationName, setLocationName] = useState(cityOptions[0] || "Malad West (Link Road)");
  const [preferredDate, setPreferredDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (9–12)");

  // Step 1 errors
  const [nameError, setNameError] = useState("");
  const [modelError, setModelError] = useState("");

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

  useEffect(() => {
    if (verifiedPhone) {
      setMobile(verifiedPhone);
    } else {
      setMobile("");
    }
  }, [verifiedPhone]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      handleNext();
      return;
    }
    setSending(true);
    try {
      await submitLead("test_drive", {
        car_model: model,
        location: locationName,
        name,
        mobile_number: mobile,
        preferred_date: preferredDate,
        preferred_time: timeSlot,
        form_source: "hero_form",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Hero form submission error:", err);
      setSubmitted(true); // fall through to success UX
    } finally {
      setSending(false);
    }
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
    const selectedModelName = model
      ? (model.toUpperCase().startsWith("MG") ? model : `MG ${model}`)
      : "MG Vehicle";
    return (
      <div className="flex w-full max-w-[340px] flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-800">
          <svg className="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-slate-900">
          Thank you for your interest!
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-600 font-normal">
          We thank you for showing an interest in test driving of the{" "}
          <strong className="font-semibold text-slate-900">{selectedModelName}</strong>.
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-600 font-normal">
          We assure you our representative will contact you shortly.
        </p>

        <div className="mt-4 w-full rounded-lg border border-amber-200/80 bg-[#FFFBEB] p-3 text-left">
          <h4 className="text-xs font-bold text-amber-900">Note</h4>
          <p className="mt-0.5 text-[11px] leading-relaxed text-amber-800">
            This is not the Test Drive confirmation. We shall check the schedule and confirm the vehicle availability.
          </p>
        </div>

        <p className="mt-4 text-xs text-slate-600 font-normal">
          We appreciate your time and patience.
        </p>
        <p className="mt-1 text-xs text-slate-600 font-normal">
          For details contact us on{" "}
          <strong className="font-bold text-slate-900">72290 51111</strong>.
        </p>

        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setName("");
            setModel("");
            setNameError("");
            setModelError("");
          }}
          className="mt-5 w-full rounded-lg border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 cursor-pointer shadow-xs"
        >
          Book another test drive
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
          formSource="hero_form"
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
                <select 
                  value={locationName} 
                  onChange={(e) => setLocationName(e.target.value)}
                  required 
                  className={`${fieldBase} appearance-none pr-8`}
                >
                  {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </label>
            <label className="block">
              <span className="sr-only">Preferred Date</span>
              <div className="relative">
                <input
                  type="date"
                  min={minDate}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  required
                  className={`${fieldBase} pr-8`}
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </label>
            <label className="block">
              <span className="sr-only">Preferred Time</span>
              <div className="relative">
                <select 
                  value={timeSlot} 
                  onChange={(e) => setTimeSlot(e.target.value)}
                  required 
                  className={`${fieldBase} appearance-none pr-8`}
                >
                  <option value="Morning (9–12)">Morning (9–12)</option>
                  <option value="Afternoon (12–4)">Afternoon (12–4)</option>
                  <option value="Evening (4–8)">Evening (4–8)</option>
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
                disabled={sending}
                className="flex w-2/3 items-center justify-center rounded bg-brand py-3 text-[13px] font-semibold text-white transition-all hover:bg-brand-light active:scale-[0.98] disabled:opacity-70"
              >
                {sending ? "Booking..." : "Book Now"}
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


