"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TestDriveForm from "@/components/TestDriveForm";
import { cars } from "@/lib/data";

export default function TestDriveClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialModelParam = searchParams.get("model") || searchParams.get("car") || "";

  // When arriving from an individual car page's "Book a Test Drive" link, the
  // model query param identifies the origin car. The form then shows a dedicated
  // "Car Selected" + "More Options" layout instead of the general flat grid,
  // and "Back" returns to that car's page rather than just decrementing steps.
  const originCar = initialModelParam
    ? cars.find(
        (c) =>
          c.id.toLowerCase() === initialModelParam.toLowerCase() ||
          c.name.toLowerCase() === initialModelParam.toLowerCase()
      )
    : undefined;
  const isFromCarPage = Boolean(originCar);

  return (
    <>
      <Navbar />
      <main className="mt-[60px] min-h-screen bg-white text-slate-800">

        {/* HEADER SECTION — skipped when arriving from a car page so the form opens directly */}
        {!isFromCarPage && (
          <section className="bg-slate-50 py-10 lg:py-14 border-b border-slate-100">
            <div className="container-px mx-auto max-w-[1400px]">
              <Reveal variant="fade-up" className="mx-auto max-w-xl text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  Book a Test Drive
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                  Drive the MG You&apos;re Comparing
                </h1>
                <p className="mt-3 text-sm text-slate-500 font-light sm:text-base">
                  Choose your model, a convenient time and an MG Motor showroom location. We&apos;ll confirm the car and help you compare the right variant, without any pressure to buy.
                </p>
              </Reveal>
            </div>
          </section>
        )}

        {/* MULTI-STEP FORM SECTION */}
        <section className={`bg-white ${isFromCarPage ? "py-6 lg:py-8" : "py-10 lg:py-16"}`}>
          <div className="container-px mx-auto max-w-[1400px]">
            <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-[0_4px_32px_0_rgba(0,0,0,0.06)] sm:p-10">
              <TestDriveForm
                presetCarId={originCar?.id}
                onExit={() => originCar && router.push(`/cars/${originCar.id}`)}
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
