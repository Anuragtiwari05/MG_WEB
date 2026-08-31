"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { MapPin, Mail, Clock, Phone } from "@/components/icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";
import PhoneOtpGate from "@/components/PhoneOtpGate";
import ReverifyModal from "@/components/ReverifyModal";
import { submitLead } from "@/lib/submitLead";
import { company } from "@/lib/data";

const brandInfo = {
  motors: {
    label: "MG Motors",
    phone: company.phone,
    phoneE164: company.phoneE164,
    email: company.email,
    address: "Shakti Premises, New Link Rd, near Inorbit Mall, opposite Cloud Nine Hospital, Malad West, Mumbai, Maharashtra 400064",
    hours: company.hours,
  },
  select: {
    label: "MG Select",
    phone: company.phoneSelect,
    phoneE164: company.phoneSelectE164,
    email: company.emailSelect,
    address: "Atur House, 87, Dr Annie Besant Rd, Tulsi Vihar, Siddharth Nagar, Worli, Mumbai, Maharashtra 400018",
    hours: company.hoursSelect,
  },
} as const;

export default function ContactUsClient() {
  const { verifiedPhone, resetVerification, isMounted } = usePhoneVerification();
  const [reverifyOpen, setReverifyOpen] = useState(false);
  const [brand, setBrand] = useState<"motors" | "select">("motors");
  const info = brandInfo[brand];
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pincode: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Field validation errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    if (verifiedPhone) {
      setFormData((prev) => ({ ...prev, phone: verifiedPhone }));
    } else {
      setFormData((prev) => ({ ...prev, phone: "" }));
    }
  }, [verifiedPhone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

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

    // Subject: required, min 4 chars
    if (!formData.subject.trim()) {
      setSubjectError("Subject is required");
      isValid = false;
    } else if (formData.subject.trim().length < 4) {
      setSubjectError("Subject must be at least 4 characters");
      isValid = false;
    } else {
      setSubjectError("");
    }

    // Message: required, min 10 chars
    if (!formData.message.trim()) {
      setMessageError("Message is required");
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      setMessageError("Message must be at least 10 characters");
      isValid = false;
    } else {
      setMessageError("");
    }

    if (isValid && formData.phone) {
      setSubmitError("");
      setSending(true);
      try {
        await submitLead("contact", {
          name: formData.name,
          mobile_number: formData.phone,
          email: formData.email,
          pincode: formData.pincode,
          subject: formData.subject,
          message: formData.message,
        });
        setSubmitted(true);
      } catch (err) {
        console.error("Contact form submission failed:", err);
        setSubmitError("Something went wrong sending your message. Please try again.");
      } finally {
        setSending(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="mt-[80px] bg-bg-2">
        {/* Page Header */}
        <section className="bg-bg-2 py-4 lg:py-5 pb-2">
          <div className="container-px mx-auto max-w-[1180px]">
            <Reveal variant="fade-up" className="mx-auto max-w-xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand">
                CONTACT US
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold text-text sm:text-3xl">
                Get in Touch
              </h1>
              <p className="mt-1.5 text-sm text-muted">
                Reach our team by call, WhatsApp, email or send a message here.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contact Content Section */}
        <section id="contact" className="scroll-mt-24 pb-4 lg:pb-6 bg-bg-2">
          <div className="container-px mx-auto max-w-[1180px]">
            <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">

              {/* Left Column: Contact info */}
              <Reveal variant="slide-right" className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-[0_2px_16px_0_rgba(0,0,0,0.03)] flex flex-col">
                <h3 className="font-display text-xl font-bold text-text">
                  Contact Information
                </h3>
                <p className="mt-2 text-sm text-muted max-w-sm leading-relaxed">
                  We are here to help with bookings, service queries, finance questions and anything else you need.
                </p>

                {/* Brand toggle */}
                <div className="mt-4 flex gap-2.5">
                  {(["motors", "select"] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setBrand(key)}
                      className={`rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        brand === key
                          ? "border-brand/30 bg-brand/10 text-brand"
                          : "border-border text-muted hover:text-brand"
                      }`}
                    >
                      {brandInfo[key].label}
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {/* Call Us */}
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Phone className="h-4.5 w-4.5" />
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 flex-1">
                      <p className="text-sm font-bold text-muted w-[70px] shrink-0">Call Us</p>
                      <a href={`tel:${info.phoneE164}`} className="text-[13px] font-medium text-text hover:text-brand block">
                        {info.phone}
                      </a>
                    </div>
                  </div>

                  <hr className="border-border/50" />

                  {/* Email Us */}
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Mail className="h-4.5 w-4.5" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
                      <p className="text-sm font-bold text-muted w-[70px] shrink-0">Email Us</p>
                      <a href={`mailto:${info.email}`} className="block min-w-0 flex-1 whitespace-nowrap text-[13px] font-medium text-text hover:text-brand">
                        {info.email}
                      </a>
                    </div>
                  </div>

                  <hr className="border-border/50" />

                  {/* Visit Us */}
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <MapPin className="h-4.5 w-4.5" />
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 flex-1">
                      <p className="text-sm font-bold text-muted w-[70px] shrink-0">Visit Us</p>
                      <p className="text-[13px] font-medium text-text leading-relaxed">
                        {info.address}
                      </p>
                    </div>
                  </div>

                  <hr className="border-border/50" />

                  {/* Working Hours */}
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Clock className="h-4.5 w-4.5" />
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 flex-1">
                      <p className="text-sm font-bold text-muted w-[70px] shrink-0">Working Hours</p>
                      <p className="text-[13px] font-medium text-text">{info.hours}</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Form */}
              <Reveal variant="slide-left" className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-[0_2px_16px_0_rgba(0,0,0,0.03)] flex flex-col items-center justify-center relative overflow-hidden [&_.text-left]:text-center [&_.text-left_h3]:text-2xl [&_.text-left_h3]:font-bold [&_.text-left_p]:text-sm">
                {isMounted && !verifiedPhone ? (
                  <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto relative z-10">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-1.5">
                      <Phone className="h-5 w-5" />
                    </div>
                    <PhoneOtpGate
                      title="Verify Your Phone"
                      description="Enter your phone number to get started."
                      formSource="contact"
                      onVerified={(phone) => setFormData((prev) => ({ ...prev, phone }))}
                    />
                  </div>
                ) : submitted ? (
                  <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="h-8 w-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-text">
                      Message Sent!
                    </h3>
                    <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted">
                      Thank you for contacting MG Motor Mumbai. Our client relationship manager will review your message and reach out to you within the next 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          pincode: "",
                          subject: "",
                          message: "",
                        });
                        setNameError("");
                        setEmailError("");
                        setPincodeError("");
                        setSubjectError("");
                        setMessageError("");
                      }}
                      className="mt-6 rounded bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-light transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-lg font-bold text-text">
                      Send Us a Message
                    </h3>
                    <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value });
                              if (nameError) setNameError("");
                            }}
                            placeholder="Your name"
                            className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-faint focus:ring-2 ${
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

                      <div className="relative block cursor-pointer" onClick={() => setReverifyOpen(true)}>
                        <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                        <div className="relative">
                          <input
                            type="tel"
                            readOnly
                            placeholder="Mobile number"
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

                      <div>
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-semibold text-muted">Your Email</span>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (emailError) setEmailError("");
                            }}
                            placeholder="you@example.com"
                            className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-faint focus:ring-2 ${
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

                      <div>
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-semibold text-muted">Pincode</span>
                          <input
                            type="text"
                            required
                            pattern="[0-9]{6}"
                            value={formData.pincode}
                            onChange={(e) => {
                              setFormData({ ...formData, pincode: e.target.value });
                              if (pincodeError) setPincodeError("");
                            }}
                            placeholder="6-digit pincode"
                            className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-faint focus:ring-2 ${
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

                      <div className="col-span-full">
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-semibold text-muted">Subject</span>
                          <input
                            type="text"
                            required
                            value={formData.subject}
                            onChange={(e) => {
                              setFormData({ ...formData, subject: e.target.value });
                              if (subjectError) setSubjectError("");
                            }}
                            placeholder="How can we help?"
                            className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-faint focus:ring-2 ${
                              subjectError 
                                ? "border-red-300 focus:border-red-400 focus:ring-red-100" 
                                : "border-border focus:border-brand focus:ring-brand/10"
                            }`}
                          />
                        </label>
                        {subjectError && (
                          <p className="mt-1 text-[11px] font-medium text-red-500">{subjectError}</p>
                        )}
                      </div>

                      <div className="col-span-full">
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-semibold text-muted">Your Message</span>
                          <textarea
                            required
                            rows={5}
                            value={formData.message}
                            onChange={(e) => {
                              setFormData({ ...formData, message: e.target.value });
                              if (messageError) setMessageError("");
                            }}
                            placeholder="Tell us more..."
                            className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-faint focus:ring-2 resize-none ${
                              messageError 
                                ? "border-red-300 focus:border-red-400 focus:ring-red-100" 
                                : "border-border focus:border-brand focus:ring-brand/10"
                            }`}
                          />
                        </label>
                        {messageError && (
                          <p className="mt-1 text-[11px] font-medium text-red-500">{messageError}</p>
                        )}
                      </div>

                      {submitError && (
                        <p className="col-span-full text-xs font-medium text-red-500">{submitError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={sending}
                        className="col-span-full mt-1 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {sending ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  </>
                )}
              </Reveal>
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

