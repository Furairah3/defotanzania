import Link from 'next/link';
import Image from 'next/image';
import { Building2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { deletePartner } from './actions';
import ConfirmSubmitButton from '../ConfirmSubmitButton';

export const dynamic = 'force-dynamic';

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-950">Partners</h1>
        <Link
          href="/admin/partners/new"
          className="focus-ring rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          New partner
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {partners.map((partner) => (
          <div key={partner.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-slate-400">
                {partner.logoUrl ? (
                  <Image src={partner.logoUrl} alt="" width={44} height={44} className="h-full w-full object-contain" />
                ) : (
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-brand-950">{partner.name}</p>
                <p className="text-xs text-slate-500">
                  {partner.published ? <span className="text-green-600">Published</span> : <span className="text-slate-400">Draft</span>}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/admin/partners/${partner.id}`}
                className="focus-ring rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium hover:bg-slate-50"
              >
                Edit
              </Link>
              <form action={deletePartner}>
                <input type="hidden" name="id" value={partner.id} />
                <ConfirmSubmitButton
                  confirmMessage={`Delete "${partner.name}"? This cannot be undone.`}
                  className="focus-ring rounded-full border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
        {partners.length === 0 && <p className="text-sm text-slate-500">No partners yet.</p>}
      </div>
    </div>
  );
}
