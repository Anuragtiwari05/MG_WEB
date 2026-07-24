"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { workshops } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, CheckCircle, Wrench, Shield, DiscIcon, WindIcon, Road, BatteryIcon } from "@/components/icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";
import PhoneOtpGate from "@/components/PhoneOtpGate";
import ReverifyModal from "@/components/ReverifyModal";
import { submitLead } from "@/lib/submitLead";

const serviceTypes = [
  "First Free Service",
  "Scheduled Paid Service",
  "Running Repair / Diagnostic Check",
  "Body Shop / Accident Repair",
  "Battery & Electrical Service",
];

const timeSlots = [
  "Morning (09:00 AM - 12:00 PM)",
  "Afternoon (12:00 PM - 03:00 PM)",
  "Evening (03:00 PM - 06:00 PM)",
];

const serviceCategories = [
  {
    Icon: Wrench,
    title: "General Service",
    description: "Comprehensive mechanical check-up and regular maintenance for peak performance.",
  },
  {
    Icon: Shield,
    title: "Engine Care",
    description: "Advanced diagnostics, engine tuning, and original fuel system care.",
  },
  {
    Icon: DiscIcon,
    title: "Brake Service",
    description: "Thorough inspection, pad replacement, and brake fluid flushing for maximum safety.",
  },
  {
    Icon: WindIcon,
    title: "AC Service",
    description: "Cabin cooling recharge, filter replacement, and system sanitization all year round.",
  },
  {
    Icon: Road,
    title: "Tyre & Wheel Care",
    description: "Precision alignment, balancing, and premium replacements for a smooth ride.",
  },
  {
    Icon: BatteryIcon,
    title: "Battery Service",
    description: "Battery diagnostics, terminal cleaning, and quick replacements for uninterrupted journeys.",
  },
];

export default function LocateServiceCentrePage() {
  const { verifiedPhone, resetVerification, isMounted } = usePhoneVerification();
  const [reverifyOpen, setReverifyOpen] = useState(false);
  const [formData, setFormData] = useState({
    carModel: "",
    carModelOther: "",
    serviceCentre: "",
    serviceType: "",
    name: "",
    phone: "",
    email: "",
    pincode: "",
    address: "",
    date: "",
    timeSlot: "",
    notes: "",
  });

  // Validation errors
  const [modelError, setModelError] = useState("");
  const [centreError, setCentreError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [dateError, setDateError] = useState("");
  const [slotError, setSlotError] = useState("");

  useEffect(() => {
    if (verifiedPhone) {
      setFormData((prev) => ({ ...prev, phone: verifiedPhone }));
    } else {
      setFormData((prev) => ({ ...prev, phone: "" }));
    }
  }, [verifiedPhone]);

  const carModelForDisplay =
    formData.carModel === "Other" ? formData.carModelOther : formData.carModel;

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Car Model
    if (!formData.carModel) {
      setModelError("Please select your car model");
      isValid = false;
    } else if (formData.carModel === "Other" && !formData.carModelOther.trim()) {
      setModelError("Please specify your car model");
      isValid = false;
    } else {
      setModelError("");
    }

    // Service Centre
    if (!formData.serviceCentre) {
      setCentreError("Please select a service centre");
      isValid = false;
    } else {
      setCentreError("");
    }

    // Service Type
    if (!formData.serviceType) {
      setTypeError("Please select service type");
      isValid = false;
    } else {
      setTypeError("");
    }

    // Name: required, min 3 chars, letters/spaces only
    if (!formData.name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      setNameError("Name must be at least 3 characters");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      setNameError("Name must contain only letters and spaces");
      isValid = false;
    } else {
      setNameError("");
    }

    // Email: required, valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      setEmailError("Email address is required");
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Pincode: required, 6 digits
    if (!formData.pincode.trim()) {
      setPincodeError("Pincode is required");
      isValid = false;
    } else if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
      setPincodeError("Please enter a valid 6-digit pincode");
      isValid = false;
    } else {
      setPincodeError("");
    }

    // Date
    if (!formData.date) {
      setDateError("Please select preferred date");
      isValid = false;
    } else {
      setDateError("");
    }

    // Time slot
    if (!formData.timeSlot) {
      setSlotError("Please select preferred time slot");
      isValid = false;
    } else {
      setSlotError("");
    }

    if (isValid && formData.phone) {
      setSubmitError("");
      setSending(true);
      try {
        await submitLead("service", {
          car_model: carModelForDisplay,
          service_centre: formData.serviceCentre,
          service_type: formData.serviceType,
          name: formData.name,
          mobile_number: formData.phone,
          email: formData.email,
          pincode: formData.pincode,
          address: formData.address,
          preferred_date: formData.date,
          preferred_time: formData.timeSlot,
          notes: formData.notes,
          form_source: "service",
        });
        setSubmitted(true);
      } catch (err) {
        console.error("Service booking submission failed:", err);
        setSubmitError("Something went wrong submitting your booking. Please try again.");
      } finally {
        setSending(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="mt-[80px] min-h-screen bg-bg-2">
        {/* Banner Section */}
        <section className="relative h-[460px] w-full overflow-hidden bg-brand-deep sm:h-[620px]">
          <Image
            src="/images/service-centre-hero.jpg"
            alt="MG Motor authorized workshop bay"
            fill
            priority
            className="object-cover opacity-70 animate-kenburns"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          <div className="container-px absolute inset-x-0 top-14 mx-auto max-w-[1400px] sm:top-20">
            <Reveal variant="fade-up">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                Service
              </p>
              <h1 className="mt-2 font-display text-3xl font-black text-white sm:text-5xl lg:text-6xl">
                Locate a Service Centre &amp; Book a Service
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                Genuine parts, factory-trained technicians, and transparent pricing at every MG Motor Krishiv Auto service centre.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Booking Form Section — floats up over the hero, Kia-style */}
        <section id="book-service" className="scroll-mt-24 relative z-10 px-4 pb-14 lg:pb-24">
          <Reveal
            variant="scale-up"
            className="container-px relative -mt-32 mx-auto max-w-[1400px] sm:-mt-48"
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 -z-10 h-24 rounded-full bg-brand/40 blur-3xl sm:h-32" />
            <div className="mx-auto max-w-[1140px] overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] sm:p-12">
              <div className="mb-10 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  Service Appointment
                </p>
                <h2 className="mt-3 font-display text-2xl font-black text-text sm:text-4xl">
                  Book a Service Appointment
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
                  Choose your nearest service centre and a slot that works for you. Our team will confirm your booking shortly.
                </p>
              </div>

              {isMounted && !verifiedPhone ? (
                <PhoneOtpGate
                  title="Book a Service Appointment"
                  description="Verify your phone number first to secure your slot."
                  formSource="service"
                  onVerified={(phone) => setFormData((prev) => ({ ...prev, phone }))}
                />
              ) : submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <CheckCircle className="h-16 w-16 text-[#00ad8a]" />
                  <h3 className="mt-4 font-display text-xl font-bold text-text">
                    Booking Request Submitted!
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-muted">
                    Thank you, <span className="font-semibold text-text">{formData.name}</span>. Your service booking request for your <span className="font-semibold text-text">MG {carModelForDisplay}</span> has been logged. Our representative will contact you at <span className="font-semibold text-text">{formData.phone}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        carModel: "",
                        carModelOther: "",
                        serviceCentre: "",
                        serviceType: "",
                        name: "",
                        phone: "",
                        email: "",
                        pincode: "",
                        address: "",
                        date: "",
                        timeSlot: "",
                        notes: "",
                      });
                      setModelError("");
                      setCentreError("");
                      setTypeError("");
                      setNameError("");
                      setEmailError("");
                      setPincodeError("");
                      setDateError("");
                      setSlotError("");
                    }}
                    className="mt-6 rounded bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-light transition-all"
                  >
                    Book Another Service
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Select Car Model */}
                  <div>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Select Car Model</span>
                      <select
                        required
                        value={formData.carModel}
                        onChange={(e) => {
                          setFormData({ ...formData, carModel: e.target.value });
                          if (modelError) setModelError("");
                        }}
                        className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none focus:ring-2 ${
                          modelError 
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100" 
                            : "border-border focus:border-brand focus:ring-brand/10"
                        }`}
                      >
                        <option value="" disabled className="text-muted">Select Car Model</option>
                        <option value="COMET EV">COMET EV</option>
                        <option value="ASTOR">ASTOR</option>
                        <option value="HECTOR">HECTOR</option>
                        <option value="ZS EV">ZS EV</option>
                        <option value="WINDSOR EV">WINDSOR EV</option>
                        <option value="MAJESTOR">MAJESTOR</option>
                        <option value="M9">M9</option>
                        <option value="CYBERSTER">CYBERSTER</option>
                        <option value="Other">Other</option>
                      </select>
                    </label>
                    {formData.carModel === "Other" && (
                      <input
                        type="text"
                        required
                        autoFocus
                        placeholder="Please specify your car model"
                        value={formData.carModelOther}
                        onChange={(e) => {
                          setFormData({ ...formData, carModelOther: e.target.value });
                          if (modelError) setModelError("");
                        }}
                        className={`mt-2 w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none focus:ring-2 ${
                          modelError 
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100" 
                            : "border-border focus:border-brand focus:ring-brand/10"
                        }`}
                      />
                    )}
                    {modelError && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">{modelError}</p>
                    )}
                  </div>

                  {/* Select Service Centre */}
                  <div>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Select Service Centre</span>
                      <select
                        required
                        value={formData.serviceCentre}
                        onChange={(e) => {
                          setFormData({ ...formData, serviceCentre: e.target.value });
                          if (centreError) setCentreError("");
                        }}
                        className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none focus:ring-2 ${
                          centreError 
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100" 
                            : "border-border focus:border-brand focus:ring-brand/10"
                        }`}
                      >
                        <option value="" disabled className="text-muted">Select Service Centre</option>
                        {workshops.map((w) => (
                          <option key={w.city} value={`${w.name} (${w.city})`}>
                            {w.name} ({w.city})
                          </option>
                        ))}
                      </select>
                    </label>
                    {centreError && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">{centreError}</p>
                    )}
                  </div>

                  {/* Type of Service */}
                  <div>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Type of Service</span>
                      <select
                        required
                        value={formData.serviceType}
                        onChange={(e) => {
                          setFormData({ ...formData, serviceType: e.target.value });
                          if (typeError) setTypeError("");
                        }}
                        className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none focus:ring-2 ${
                          typeError 
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100" 
                            : "border-border focus:border-brand focus:ring-brand/10"
                        }`}
                      >
                        <option value="" disabled className="text-muted">Select Service Type</option>
                        {serviceTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </label>
                    {typeError && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">{typeError}</p>
                    )}
                  </div>

                  {/* Your Name */}
                  <div>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (nameError) setNameError("");
                        }}
                        className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none focus:ring-2 ${
                          nameError 
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100" 
                            : "border-border focus:border-brand focus:ring-brand/10"
                        }`}
                      />
                    </label>
                    {nameError && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">{nameError}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="relative block cursor-pointer" onClick={() => setReverifyOpen(true)}>
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                    <div className="relative">
                      <input
                        type="tel"
                        readOnly
                        placeholder="10-digit mobile number"
                        value={formData.phone ? `+91 ${formData.phone}` : ""}
                        className="w-full rounded border border-emerald-200 bg-emerald-50/30 px-4 py-3 text-sm text-emerald-800 font-semibold outline-none cursor-pointer pr-24"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Verified
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Email Address</span>
                      <input
                        type="email"
                        required
                        placeholder="yourname@email.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (emailError) setEmailError("");
                        }}
                        className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none focus:ring-2 ${
                          emailError 
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100" 
                            : "border-border focus:border-brand focus:ring-brand/10"
                        }`}
                      />
                    </label>
                    {emailError && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">{emailError}</p>
                    )}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Pincode</span>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        placeholder="6-digit pincode"
                        value={formData.pincode}
                        onChange={(e) => {
                          setFormData({ ...formData, pincode: e.target.value });
                          if (pincodeError) setPincodeError("");
                        }}
                        className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none focus:ring-2 ${
                          pincodeError 
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100" 
                            : "border-border focus:border-brand focus:ring-brand/10"
                        }`}
                      />
                    </label>
                    {pincodeError && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">{pincodeError}</p>
                    )}
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Date</span>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (dateError) setDateError("");
                        }}
                        className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none focus:ring-2 ${
                          dateError 
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100" 
                            : "border-border focus:border-brand focus:ring-brand/10"
                        }`}
                      />
                    </label>
                    {dateError && (
                      <p className="mt-1 text-[11px] font-medium text-red-500">{dateError}</p>
                    )}
                  </div>

                  {/* Preferred Time Slot */}
                  <div className="block sm:col-span-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Time Slot</span>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, timeSlot: slot });
                              if (slotError) setSlotError("");
                            }}
                            className={`rounded border px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                              formData.timeSlot === slot
                                ? "bg-brand border-brand text-white shadow-sm"
                                : "bg-white border-border text-muted hover:bg-bg-2"
                            }`}
                          >
                            {slot.split(" ")[0]}
                          </button>
                        ))}
                      </div>
                    </label>
                    {slotError && (
                      <p className="mt-1.5 text-[11px] font-medium text-red-500">{slotError}</p>
                    )}
                  </div>

                  {/* Address */}
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Pick-up / Drop Address (Optional)</span>
                    <input
                      type="text"
                      placeholder="Enter house no., street, area"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                    />
                  </label>

                  {submitError && (
                    <p className="col-span-full text-xs font-medium text-red-500">{submitError}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="col-span-full mt-2 rounded bg-brand py-3.5 text-sm font-semibold text-white hover:bg-brand-light transition-all shadow-md disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sending ? "Submitting..." : "Confirm Booking Request"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </section>

        {/* Service Categories Section */}
        <section className="bg-neutral-950 py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal variant="fade-up" className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Care &amp; Maintenance
              </p>
              <h2 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">
                Service That Cares
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                From routine maintenance to roadside help, our factory-trained team keeps your MG running the way it should, with genuine parts, transparent pricing, and state-of-the-art service centres.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {serviceCategories.map(({ Icon, title, description }, i) => (
                <Reveal
                  key={title}
                  delay={i * 80}
                  variant="scale-up"
                  className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-white/[0.06] hover:shadow-[0_8px_30px_rgba(228,0,43,0.15)]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">
                    {description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Locate Centres Section */}
        <section className="py-14 lg:py-20 bg-bg-2">
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Our Presence
              </p>
              <h2 className="mt-1 font-display text-2xl font-black tracking-wide sm:text-3xl text-text">
                MG AUTHORISED WORKSHOPS
              </h2>
              <p className="mt-2 text-sm text-muted">
                Visit our state-of-the-art service centres across Mumbai.
              </p>
            </div>

            {/* Service Centres Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[1100px] mx-auto">
              {workshops.map((w, i) => (
                <Reveal
                  key={w.city + i}
                  delay={i * 80}
                  variant="slide-left"
                  className="w-full"
                >
                  <article className="group relative flex h-[340px] flex-col justify-end overflow-hidden rounded-xl border border-border bg-white shadow-md">
                    <Image
                      src={w.image}
                      alt={`MG Motor ${w.name} ${w.city}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
                    <div className="relative p-5 text-white">
                      <span className="mb-2 inline-block rounded bg-brand px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                        {w.type}
                      </span>
                      <h3 className="font-display text-base font-extrabold leading-snug text-white">
                        {w.name} ({w.city})
                      </h3>
                      <p className="mt-2 flex items-start gap-1.5 text-[11px] text-white/70">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                        <span className="line-clamp-2">{w.address}</span>
                      </p>
                      <a
                        href={`tel:${w.phone.replace(/[^0-9+]/g, "")}`}
                        className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-white/80 transition-colors hover:text-white"
                      >
                        <Phone className="h-3.5 w-3.5 shrink-0 text-brand" />
                        {w.phone}
                      </a>
                      <div className="mt-4">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(w.name + " " + w.city + " " + w.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded bg-[#00ad8a] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#009677] hover:shadow-[0_0_12px_rgba(0,173,138,0.3)]"
                        >
                          <MapPin className="h-3 w-3" />
                          Google Maps
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

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
