import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://defotanzania.or.tz";

  const pages = [
    "",
    "/about",
    "/meet-the-team",
    "/programs",
    "/projects",
    "/news",
    "/gallery",
    "/publications",
    "/partners",
    "/volunteer",
    "/donate",
    "/contact",
  ];

  const locales = ["en", "sw"];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );
}
