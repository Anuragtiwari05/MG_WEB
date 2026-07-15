import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

/* Single-page site for now. As dedicated model, blog and location pages
   are built, add them here (each with its own unique URL). */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/cars", "/locate-service-centre", "/locations"];
  
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
