import type { Metadata } from "next";
import LocationsClient from "./LocationsClient";

export const metadata: Metadata = {
  title: "MG Car Showrooms & Service Centers in Mumbai - Locations Map",
  description: "Find addresses, contact details, opening hours, and maps for all 4 MG Motor showrooms and 3 service workshops across Mumbai and Thane.",
  alternates: { canonical: "/locations" },
  keywords: [
    "MG showrooms Mumbai",
    "MG service centers Mumbai",
    "MG dealer contact number",
    "MG showroom address Mumbai",
    "MG workshops list",
  ],
};

export default function Page() {
  return <LocationsClient />;
}
