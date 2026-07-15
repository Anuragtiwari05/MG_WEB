import type { Metadata } from "next";
import ServiceCentreClient from "./ServiceCentreClient";

export const metadata: Metadata = {
  title: "Book MG Car Service Appointment Online - MG Motor Mumbai",
  description: "Schedule your MG car service online at our authorized service workshops in Jogeshwari, Kandivali, and Cotton Green. Book scheduled maintenance and repairs.",
  alternates: { canonical: "/locate-service-centre" },
  keywords: [
    "MG car service booking",
    "book MG service online Mumbai",
    "MG authorized workshop Mumbai",
    "MG repair centre Kandivali",
    "MG service appointment",
  ],
};

export default function Page() {
  return <ServiceCentreClient />;
}
