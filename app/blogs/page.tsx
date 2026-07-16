import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "MG Insights Blog - News, Tips & EV Guides | MG Motor Mumbai",
  description: "Stay informed with JSW MG Motor India updates, electric vehicle guides, hybrid tech advice, and car maintenance tips from authorized experts at MG Motor Mumbai.",
  alternates: { canonical: "/blogs" },
  keywords: [
    "MG Motor Mumbai blogs",
    "JSW MG Motor India news",
    "electric vehicle guides India",
    "Windsor EV news",
    "Comet EV tips",
    "MG car maintenance tips",
    "MG i-Smart technology",
  ],
};

export default function Page() {
  return <BlogsClient />;
}
