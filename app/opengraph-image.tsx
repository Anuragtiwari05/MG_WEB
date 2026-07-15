import { ImageResponse } from "next/og";

export const alt =
  "MG Motor Mumbai, authorised MG dealer in Mumbai and Thane";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Branded social-share card, generated at build so we ship no binary
   asset. Replace with real dealership photography for launch if desired. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0c0a09 0%, #1c1917 55%, #e4002b 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e4002b",
              fontSize: 28,
              fontWeight: 900,
            }}
          >
            MG
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#fff" }}>
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>
              MG MOTOR MUMBAI
            </span>
            <span
              style={{
                fontSize: 16,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#ef4444",
              }}
            >
              Premium Dealership
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", color: "#fff" }}>
          <span style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            New MG Cars, Test Drives &amp; Service
          </span>
          <span style={{ fontSize: 34, color: "#f4f4f5", marginTop: 12 }}>
            Authorised MG dealer in Mumbai &amp; Thane
          </span>
        </div>

        <div style={{ display: "flex", gap: 40, color: "#e4e4e7", fontSize: 24 }}>
          <span>50,000+ Happy Customers</span>
          <span>100% Customer Satisfaction</span>
          <span>Windsor EV · Hector · ZS EV</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
