import type { MetadataRoute } from "next";
import { SITE_URL, cars } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/cars",
    "/contact-us",
    "/book-a-test-drive",
    "/locate-service-centre",
    "/locations",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const carEntries: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${SITE_URL}/cars/${car.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...carEntries];
}
