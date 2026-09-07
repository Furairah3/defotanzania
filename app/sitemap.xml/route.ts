import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://defotanzania.or.tz";

  const pages = [
    "",
    "/about",
    "/team",
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

  const urls = locales.flatMap((locale) =>
    pages.map((page) => `${baseUrl}/${locale}${page}`)
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
