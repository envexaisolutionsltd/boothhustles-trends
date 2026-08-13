import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/azotea";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/azotea", priority: 1, changeFrequency: "weekly" },
  { path: "/azotea/menus", priority: 0.9, changeFrequency: "weekly" },
  { path: "/azotea/book-a-table", priority: 0.9, changeFrequency: "monthly" },
  { path: "/azotea/group-bookings", priority: 0.8, changeFrequency: "monthly" },
  { path: "/azotea/story", priority: 0.6, changeFrequency: "monthly" },
  { path: "/azotea/find", priority: 0.7, changeFrequency: "monthly" },
  { path: "/azotea/faqs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/azotea/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/azotea/careers", priority: 0.4, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
