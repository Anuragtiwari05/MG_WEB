"use client";

import { useState } from "react";
import Image from "next/image";
import { workshops } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Calendar, CheckCircle } from "@/components/icons";

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

export default function LocateServiceCentrePage() {
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

  const carModelForDisplay =
    formData.carModel === "Other" ? formData.carModelOther : formData.carModel;

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking submission
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="mt-[80px] min-h-screen bg-bg-2">
        {/* Banner Section */}
        <section className="relative h-[280px] w-full overflow-hidden bg-brand-deep sm:h-[340px]">
          <Image
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80"
            alt="MG Motor authorized workshop bay"
            fill
            priority
            className="object-cover opacity-75"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          <div className="container-px absolute inset-x-0 bottom-10 mx-auto max-w-[1400px]">
            <Reveal variant="fade-up">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                Service
              </p>
              <h1 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl">
                Locate a Service Centre & Book a Service
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                Genuine parts, factory-trained technicians, and transparent pricing at every MG Motor Krishiv Auto service centre.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="book-service" className="scroll-mt-24 py-14 lg:py-20 bg-white border-b border-border">
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Service Appointment
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                Book a Service Online
              </h2>
              <p className="mt-3 text-sm text-muted">
                Complete the details below to reserve a service appointment slot. Our team will contact you to confirm.
              </p>
            </div>

            <div className="mx-auto max-w-3xl rounded-xl border border-border bg-bg-2 p-6 shadow-md sm:p-10">
              {submitted ? (
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
                    }}
                    className="mt-6 rounded bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-light transition-all"
                  >
                    Book Another Service
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Select Car Model */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Select Car Model</span>
                      <select
                        required
                        value={formData.carModel}
                        onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                        className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                      >
                        <option value="" disabled>Select Car Model</option>
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
                      {formData.carModel === "Other" && (
                        <input
                          type="text"
                          required
                          autoFocus
                          placeholder="Please specify your car model"
                          value={formData.carModelOther}
                          onChange={(e) => setFormData({ ...formData, carModelOther: e.target.value })}
                          className="mt-2 w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                        />
                      )}
                  </label>

                  {/* Select Service Centre */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Select Service Centre</span>
                    <select
                      required
                      value={formData.serviceCentre}
                      onChange={(e) => setFormData({ ...formData, serviceCentre: e.target.value })}
                      className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                    >
                      <option value="" disabled>Select Service Centre</option>
                      {workshops.map((w) => (
                        <option key={w.city} value={`${w.name} (${w.city})`}>
                          {w.name} ({w.city})
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Type of Service */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Type of Service</span>
                    <select
                      required
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                    >
                      <option value="" disabled>Select Service Type</option>
                      {serviceTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>

                  {/* Your Name */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                    />
                  </label>

                  {/* Mobile Number */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                    />
                  </label>

                  {/* Email */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Email Address</span>
                    <input
                      type="email"
                      required
                      placeholder="yourname@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                    />
                  </label>

                  {/* Pincode */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Pincode</span>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{6}"
                      placeholder="6-digit pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                    />
                  </label>

                  {/* Preferred Date */}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Date</span>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                    />
                  </label>

                  {/* Preferred Time Slot */}
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Time Slot</span>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeSlot: slot })}
                          className={`rounded border px-4 py-2.5 text-xs font-semibold transition-all ${
                            formData.timeSlot === slot
                              ? "bg-brand border-brand text-white"
                              : "bg-white border-border text-muted hover:bg-bg-2"
                          }`}
                        >
                          {slot.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </label>

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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="col-span-full mt-2 rounded bg-brand py-3.5 text-sm font-semibold text-white hover:bg-brand-light transition-all shadow-md"
                  >
                    Confirm Booking Request
                  </button>
                </form>
              )}
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
    </>
  );
}
