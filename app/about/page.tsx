import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Gautam Modi Group & MG Motor Mumbai - Decades of Legacy",
  description: "Learn about Gautam Modi Group's legacy since 1932, our MG, Audi & Kia partnerships, and MG Motor Mumbai's commitment to trust and service.",
  alternates: { canonical: "/about" },
  keywords: [
    "Gautam Modi Group history",
    "Gautam Modi Group legacy",
    "MG Motor Mumbai partner",
    "Krishiv Auto history",
    "automotive dealerships Mumbai",
  ],
};

export default function Page() {
  return <AboutClient />;
}
