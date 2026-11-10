import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["th", "en"].map((l) => ({
    url: `${site.url}/${l}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: l === "th" ? 1 : 0.9,
    alternates: { languages: { th: `${site.url}/th`, en: `${site.url}/en` } },
  }));
}
