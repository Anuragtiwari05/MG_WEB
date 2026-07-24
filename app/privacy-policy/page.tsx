import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | MG Motor Mumbai",
  description:
    "Learn how MG Motor Mumbai collects, uses, and protects your personal data when you book a test drive, request a service, or contact our dealership.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <PrivacyClient />;
}
