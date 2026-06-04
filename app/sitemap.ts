import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n-config";

const BASE_URL = "https://lunalegallab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "es" ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
  }));
}
