import type { Metadata } from "next";
import ContactUsClient from "./ContactUsClient";

export const metadata: Metadata = {
  title: "Contact Us | MG Motor Mumbai - Gautam Modi Group",
  description: "Get in touch with MG Motor Mumbai. Call, WhatsApp, email us, or send a message to our team for sales, service, or booking queries.",
  alternates: { canonical: "/contact-us" },
  keywords: [
    "MG Motor Mumbai contact number",
    "MG Mumbai dealer email",
    "book test drive MG Mumbai",
    "Krishiv Auto showroom contact",
  ],
};

export default function Page() {
  return <ContactUsClient />;
}
