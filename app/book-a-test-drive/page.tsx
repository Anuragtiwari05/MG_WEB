import type { Metadata } from "next";
import { Suspense } from "react";
import TestDriveClient from "./TestDriveClient";

export const metadata: Metadata = {
  title: "Book a Test Drive | MG Motor Mumbai",
  description: "Book a no-obligation MG test drive in Mumbai, Thane, or Navi Mumbai. Choose your model, preferred time and showroom or doorstep location online.",
  alternates: { canonical: "/book-a-test-drive" },
  keywords: [
    "MG test drive Mumbai",
    "book MG Hector test drive",
    "MG Windsor EV test drive",
    "MG Astor test drive",
    "doorstep test drive Mumbai",
  ],
};

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 text-sm">
        Loading test drive booking...
      </div>
    }>
      <TestDriveClient />
    </Suspense>
  );
}
