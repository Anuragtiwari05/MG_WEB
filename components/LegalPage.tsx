"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "@/components/icons";

function BackButton({ variant }: { variant: "ghost" | "solid" }) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  if (variant === "solid") {
    return (
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-2 rounded border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-bg-2 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 transition-colors hover:text-white cursor-pointer"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mt-[60px] min-h-screen bg-white">
        <section className="border-b border-white/10 bg-brand-deep py-14 text-white sm:py-16">
          <div className="container-px mx-auto max-w-[1400px]">
            <BackButton variant="ghost" />
            <h1 className="mt-5 font-display text-3xl font-black tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-xs font-medium text-white/50">
              Last updated: {updated}
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-px mx-auto max-w-[860px] space-y-8 text-sm leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-text [&_h2]:mb-2 [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:leading-relaxed [&_a]:font-semibold [&_a]:text-brand [&_a]:hover:underline">
            {children}
          </div>

          <div className="container-px mx-auto mt-12 max-w-[860px]">
            <BackButton variant="solid" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
