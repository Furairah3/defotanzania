import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://defotanzania.or.tz';

  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
