"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { MapPin, Phone, Mail, Clock } from "@/components/icons";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function ContactUsClient() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pincode: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="mt-[80px] min-h-screen bg-bg-2">
        {/* Page Hero */}
        <section className="relative h-[240px] w-full overflow-hidden bg-brand-deep sm:h-[300px]">
          <Image
            alt="MG Cyberster"
            src="https://imgd.aeplcdn.com/1920x1080/n/cw/ec/193375/cyberster-exterior-left-rear-three-quarter.jpeg?isig=0&q=80"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="container-px absolute inset-x-0 bottom-10 mx-auto max-w-[1400px]">
            <Reveal variant="fade-up">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Contact
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Get in Touch
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                Call 98877 33000, WhatsApp us, email us, or send a message and our team will get back to you.
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
                        href="tel:+919887733000"
                        className="text-sm font-semibold text-text transition-colors hover:text-brand"
                      >
                        98877 33000
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
                        href="https://wa.me/919887733000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-text transition-colors hover:text-brand"
                      >
                        98877 33000
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted">Email Us</p>
                      <a
                        href="mailto:contact@mgmotormumbai.com"
                        className="text-sm font-semibold text-text transition-colors hover:text-brand"
                      >
                        contact@mgmotormumbai.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Clock className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted">Working Hours</p>
                      <p className="text-sm font-semibold text-text">
                        Mon to Sun, 9:00 AM to 8:00 PM
                      </p>
                    </div>
                  </li>
                </ul>
              </Reveal>

              {/* Right Column: Form */}
              <Reveal variant="slide-left" className="rounded-lg border border-border bg-white p-6 shadow-[0_4px_32px_0_rgba(228,0,43,0.06)] sm:p-8">
                {submitted ? (
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
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Mobile number"
                          className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold text-muted">Your Email</span>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold text-muted">Pincode</span>
                        <input
                          type="text"
                          required
                          pattern="[0-9]{6}"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          placeholder="6-digit pincode"
                          className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold text-muted">Subject</span>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="How can we help?"
                          className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                      </label>

                      <label className="col-span-full block">
                        <span className="mb-1.5 block text-xs font-semibold text-muted">Your Message</span>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us more..."
                          className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10 resize-none"
                        />
                      </label>

                      <button
                        type="submit"
                        className="col-span-full mt-1 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light"
                      >
                        Send Message
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
    </>
  );
}
