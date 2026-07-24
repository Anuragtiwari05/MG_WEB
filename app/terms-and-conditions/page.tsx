import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms & Conditions | MG Motor Mumbai",
  description:
    "Read the terms and conditions governing your use of the MG Motor Mumbai website, test drive bookings, service requests, and dealership offers.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function Page() {
  return <TermsClient />;
}
