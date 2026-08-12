"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { MapPin, Phone, Mail, Clock } from "@/components/icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";
import PhoneOtpGate from "@/components/PhoneOtpGate";
import ReverifyModal from "@/components/ReverifyModal";
import { submitLead } from "@/lib/submitLead";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
    <path d="M16.001 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.363.63 4.587 1.728 6.517L2 30l7.72-2.347A13.273 13.273 0 0 0 16 29.333C23.363 29.333 29.333 23.363 29.333 16S23.363 2.667 16.001 2.667zm0 2.666A10.618 10.618 0 0 1 26.667 16c0 5.88-4.787 10.667-10.666 10.667a10.62 10.62 0 0 1-5.38-1.458l-.385-.225-4.583 1.394 1.35-4.42-.252-.4A10.593 10.593 0 0 1 5.333 16c0-5.88 4.787-10.667 10.668-10.667zm-3.56 5.333c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.453 4.826 2.667 1.12 3.2 1.12 3.76 1.12.56 0 1.786-.507 2.04-1.76.253-1.253.04-2-.08-2.187-.133-.186-.213-.213-.4-.293-.186-.08-1.573-.8-1.813-.88-.24-.08-.413-.12-.587.12-.173.24-.666.88-.813 1.066-.147.187-.293.213-.533.08-.24-.133-1.013-.373-1.934-1.2-.72-.64-1.2-1.426-1.347-1.666-.147-.24-.013-.373.107-.493.107-.107.24-.28.36-.413.12-.133.16-.24.24-.4.08-.16.04-.307-.02-.427-.06-.12-.56-1.493-.787-2.013-.187-.48-.4-.44-.587-.44z" />
  </svg>
);

export default function ContactUsClient() {
  const { verifiedPhone, resetVerification, isMounted } = usePhoneVerification();
  const [reverifyOpen, setReverifyOpen] = useState(false);
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
      <main className="mt-[80px] min-h-screen bg-bg-2">
        {/* Page Hero */}
        <section className="relative h-[280px] w-full overflow-hidden bg-neutral-950 sm:h-[380px] lg:h-[420px]">
          {/* Background Image */}
          <Image
            alt="Global connectivity"
            title="MG Motor Mumbai"
            src="/images/contact-hero-suv.jpg"
            fill
            className="object-cover opacity-80 z-0"
            priority
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/70 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/15 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-brand/40 to-transparent z-20" />
          
          <div className="container-px absolute inset-x-0 bottom-12 z-30 mx-auto max-w-[1400px]">
            <Reveal variant="fade-up">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Contact
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Get in Touch
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                Call 72290 51111, WhatsApp us, email us, or send a message and our team will get back to you.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contact Content Section */}
        <section id="contact" className="scroll-mt-24 py-14 lg:py-20 bg-white">
          <div className="container-px mx-auto max-w-[1180px]">
            <Reveal variant="fade-up" className="mx-auto mb-10 max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Contact Us
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                Get in Touch
              </h2>
              <p className="mt-3 text-sm text-muted">
                Reach our team by call, WhatsApp, email, or send a message here.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Left Column: Contact info */}
              <Reveal variant="slide-right" className="rounded-lg border border-border bg-bg-2 p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-text">
                  Contact Information
                </h3>
                <p className="mt-1 text-sm text-muted">
                  We are here to help with bookings, service queries, finance questions and anything else you need.
                </p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted">Call Us</p>
                      <a
                        href="tel:+917229051111"
                        className="text-sm font-semibold text-text transition-colors hover:text-brand"
                      >
                        72290 51111
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <WhatsAppIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted">WhatsApp</p>
                      <a
                        href="https://wa.me/918655918814"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-text transition-colors hover:text-brand"
                      >
                        86559 18814
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted">Email Us</p>
                      <div className="flex flex-col gap-1.5 mt-0.5">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted font-bold">MG Motors</p>
                          <a
                            href="mailto:mumbaiwest.marketingmanager@mgdealer.co.in"
                            className="text-sm font-semibold text-text transition-colors hover:text-brand"
                          >
                            mumbaiwest.marketingmanager@mgdealer.co.in
                          </a>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted font-bold">MG Select (Premium/Worli)</p>
                          <a
                            href="mailto:cem.krishiv.mum@mgselectdealer.co.in"
                            className="text-sm font-semibold text-text transition-colors hover:text-brand"
                          >
                            cem.krishiv.mum@mgselectdealer.co.in
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-text">
                        Shakti Premises, New Link Rd, near Inorbit Mall, opposite Cloud Nine Hospital, Malad West, Mumbai, Maharashtra 400064
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Clock className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted">Working Hours</p>
                      <p className="text-sm font-semibold text-text">
                        Mon to Sun, 9:30 AM to 6:30 PM (MG Motors)
                      </p>
                    </div>
                  </li>
                </ul>
              </Reveal>

              {/* Right Column: Form */}
              <Reveal variant="slide-left" className="rounded-lg border border-border bg-white p-6 shadow-[0_4px_32px_0_rgba(228,0,43,0.06)] sm:p-8 flex flex-col h-full justify-center">
                {isMounted && !verifiedPhone ? (
                  <PhoneOtpGate
                    title="Send Us a Message"
                    description="Verify your phone number first to send a message."
                    formSource="contact"
                    onVerified={(phone) => setFormData((prev) => ({ ...prev, phone }))}
                  />
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

                      <div>
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

