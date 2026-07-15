import type { Metadata } from "next";
import CarsClient from "./CarsClient";

export const metadata: Metadata = {
  title: "MG Cars Price List & Specifications - MG Motor Mumbai",
  description: "Explore the full Morris Garages vehicle range in Mumbai. Compare specifications, pricing, battery range, and features for Astor, Hector, ZS EV, Windsor EV, Comet EV, and Majestor.",
  alternates: { canonical: "/cars" },
  keywords: [
    "MG cars price list",
    "MG Hector price Mumbai",
    "MG Astor specifications",
    "MG ZS EV battery range",
    "MG Windsor EV price",
    "MG Comet EV dimensions",
    "MG Majestor specifications",
    "MG cars lineup Mumbai",
  ],
};

export default function Page() {
  return <CarsClient />;
}
