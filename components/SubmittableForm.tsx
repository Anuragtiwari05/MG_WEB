"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Check } from "@/components/icons";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmittableFormProps = {
  // Validated against EMAIL_REGEX on submit; blocks submission with an inline error if invalid.
  email: string;
  // Called once validation passes, right before the success state is shown.
  onSubmit: () => void;
  successTitle: string;
  successMessage: ReactNode;
  submitLabel: string;
  // Called when "Done" is pressed on the success screen, to clear the parent's field state.
  onReset: () => void;
  children: ReactNode;
  className?: string;
};

export default function SubmittableForm({
  email,
  onSubmit,
  successTitle,
  successMessage,
  submitLabel,
  onReset,
  children,
  className = "mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2",
}: SubmittableFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }
    setEmailError("");
    onSubmit();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-10 text-center">
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="font-display text-xl font-bold text-text">{successTitle}</h3>
        <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted">
          {successMessage}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            onReset();
          }}
          className="mt-6 rounded bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-light cursor-pointer"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
      {emailError && (
        <p className="col-span-full -mt-2 text-xs font-medium text-red-500">
          {emailError}
        </p>
      )}
      <button
        type="submit"
        className="col-span-full mt-1 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light cursor-pointer"
      >
        {submitLabel}
      </button>
    </form>
  );
}
