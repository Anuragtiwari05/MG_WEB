import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/data";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const title = "MG Motor Mumbai: Premium Dealership - Test Drives & Service";
const description =
  "Book a free test drive or service at MG Motor Mumbai, a premium authorised MG dealership in Malad, Andheri, Thane, and Navi Mumbai. Compare Majestor, Windsor EV, Hector and ZS EV.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | MG Motor Mumbai",
  },
  description,
  applicationName: "MG Motor Mumbai",
  keywords: [
    "MG Motor Mumbai",
    "MG dealer Mumbai",
    "MG showroom Mumbai",
    "MG test drive",
    "MG service Mumbai",
    "MG Windsor EV price",
    "MG Majestor price",
    "MG Hector",
    "MG ZS EV",
    "authorised MG dealer Thane",
    "authorised MG dealer Navi Mumbai",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: "MG Motor Mumbai",
    title,
    description,
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

import FloatingActions from "@/components/FloatingActions";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <JsonLd />
        {children}
        <FloatingActions />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
