import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [contactCount, volunteerCount, donateCount, newsCount, publicationCount] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.volunteerApplication.count(),
    prisma.donationIntent.count(),
    prisma.newsPost.count(),
    prisma.publication.count(),
  ]);

  const cards = [
    { label: 'Contact messages', count: contactCount, href: '/admin/submissions?type=contact' },
    { label: 'Volunteer applications', count: volunteerCount, href: '/admin/submissions?type=volunteer' },
    { label: 'Donation intents', count: donateCount, href: '/admin/submissions?type=donate' },
    { label: 'News posts', count: newsCount, href: '/admin/news' },
    { label: 'Publications', count: publicationCount, href: '/admin/publications' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Overview of site content and form submissions.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="focus-ring rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-3xl font-bold text-brand-700">{card.count}</p>
            <p className="mt-1 text-sm font-medium text-slate-600">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
