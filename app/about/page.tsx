import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Gautam Modi Group & MG Motor Mumbai - Decades of Legacy",
  description: "Learn about the history of Gautam Modi Group starting in 1932, leading to partnerships with Audi, MG Motor, and Kia. Explore our legacy of trust and service.",
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
