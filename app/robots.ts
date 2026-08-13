import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/lts/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The trends dashboard shares this deployment but is not public content.
      disallow: ["/api/", "/dashboard"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
