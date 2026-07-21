"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Shield, X } from "@/components/icons";
import { usePhoneVerification } from "@/components/PhoneVerificationContext";

const isValidPhone = (p: string) => /^[6-9]\d{9}$/.test(p);

type PhoneOtpGateProps = {
  onVerified: (phone: string) => void;
  title?: string;
  description?: string;
};

export default function PhoneOtpGate({
  onVerified,
  title = "Verify Your Number",
  description = "We'll text you a one-time code to confirm it's really you before you continue.",
}: PhoneOtpGateProps) {
  const { verifyPhone } = usePhoneVerification();
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
      onVerified(phone);
    }, 800);
  };

  return (
    <div className="flex h-full flex-col justify-center max-w-md mx-auto w-full py-4 text-left">
      <h3 className="font-display text-lg font-bold text-text">{title}</h3>
      <p className="mt-1 text-xs text-muted">{description}</p>

      <div className="mt-5">
        <span className="mb-1.5 block text-xs font-semibold text-muted">
          Mobile Number
        </span>
        <div className="flex gap-2">
          <span className="flex items-center rounded border border-border bg-bg-2 px-3.5 text-sm font-semibold text-muted">
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
            className={`w-full rounded border bg-white px-4 py-3 text-sm text-text outline-none transition-colors focus:ring-2 ${
              phoneError
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-border focus:border-brand focus:ring-brand/10"
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
          className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
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
                  className="absolute right-4 top-4 rounded-full p-1.5 text-faint transition-colors hover:bg-bg-2 hover:text-text cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Shield className="h-6 w-6" />
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-text">
                  Verify OTP
                </h3>
                <p className="mt-1.5 text-xs text-muted">
                  Enter the 4-digit code sent to{" "}
                  <span className="font-semibold text-text">+91 {phone}</span>
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
                  className={`mt-6 w-full rounded border bg-white py-3 text-center text-2xl font-bold tracking-[0.5em] pl-[0.25em] text-text outline-none transition-colors focus:ring-2 ${
                    otpError
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-border focus:border-brand focus:ring-brand/10"
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
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-brand py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
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
                  className="mt-3 text-xs font-semibold text-muted transition-colors hover:text-brand cursor-pointer"
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
