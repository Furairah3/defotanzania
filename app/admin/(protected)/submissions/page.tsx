import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const TABS = [
  { key: 'contact', label: 'Contact' },
  { key: 'volunteer', label: 'Volunteer' },
  { key: 'donate', label: 'Donate' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

function formatDate(date: Date) {
  return date.toISOString().slice(0, 16).replace('T', ' ');
}

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const type: TabKey = TABS.some((t) => t.key === searchParams.type) ? (searchParams.type as TabKey) : 'contact';

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Submissions</h1>

      <div className="mt-4 flex gap-2 border-b border-slate-200">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={`/admin/submissions?type=${tab.key}`}
            className={`focus-ring -mb-px border-b-2 px-4 py-2 text-sm font-medium ${
              type === tab.key ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:text-brand-700'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="mt-6">
        {type === 'contact' && <ContactTable />}
        {type === 'volunteer' && <VolunteerTable />}
        {type === 'donate' && <DonateTable />}
      </div>
    </div>
  );
}

async function ContactTable() {
  const rows = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } });
  if (rows.length === 0) return <EmptyState />;
  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.id} className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold text-brand-950">
              {row.name} <span className="font-normal text-slate-500">· {row.email}</span>
            </p>
            <time className="text-xs text-slate-400">{formatDate(row.createdAt)}</time>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-700">{row.subject}</p>
          <p className="mt-1 text-sm text-slate-600">{row.message}</p>
        </div>
      ))}
    </div>
  );
}

async function VolunteerTable() {
  const rows = await prisma.volunteerApplication.findMany({ orderBy: { createdAt: 'desc' } });
  if (rows.length === 0) return <EmptyState />;
  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.id} className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold text-brand-950">
              {row.name} <span className="font-normal text-slate-500">· {row.email}</span>
              {row.phone && <span className="font-normal text-slate-500"> · {row.phone}</span>}
            </p>
            <time className="text-xs text-slate-400">{formatDate(row.createdAt)}</time>
          </div>
          {row.interest && <p className="mt-1 text-sm font-medium text-slate-700">Interest: {row.interest}</p>}
          {row.message && <p className="mt-1 text-sm text-slate-600">{row.message}</p>}
        </div>
      ))}
    </div>
  );
}

async function DonateTable() {
  const rows = await prisma.donationIntent.findMany({ orderBy: { createdAt: 'desc' } });
  if (rows.length === 0) return <EmptyState />;
  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.id} className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold text-brand-950">
              {row.name} <span className="font-normal text-slate-500">· {row.email}</span>
            </p>
            <time className="text-xs text-slate-400">{formatDate(row.createdAt)}</time>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-700">Amount: {row.amount}</p>
          {row.message && <p className="mt-1 text-sm text-slate-600">{row.message}</p>}
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return <p className="text-sm text-slate-500">No submissions yet.</p>;
}
