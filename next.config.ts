import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",   // required for Docker – emits .next/standalone/server.js
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgd.aeplcdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bunny-wp-pullzone-cghvklkcns.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "www.mgmotor.co.in",
      },
      {
        protocol: "https",
        hostname: "mgmotor.scene7.com",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
      {
        protocol: "https",
        hostname: "www.motorbeam.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "media.zigcdn.com",
      },
      {
        protocol: "https",
        hostname: "etimg.etb2bimg.com",
      },
      {
        protocol: "https",
        hostname: "www.carandbike.com",
      },
      {
        protocol: "https",
        hostname: "www.marketresearchintellect.com",
      },
      {
        protocol: "https",
        hostname: "images.here.com",
      },
      {
        protocol: "https",
        hostname: "spn-sta.spinny.com",
      },
      {
        protocol: "https",
        hostname: "stimg2.cardekho.com",
      },
      {
        protocol: "https",
        hostname: "www.entrepreneurindia.com",
      },
    ],
  },
};

export default nextConfig;
