import Link from 'next/link';
import Image from 'next/image';
import { UserRound } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { deleteTeamMember } from './actions';
import ConfirmSubmitButton from '../ConfirmSubmitButton';

export const dynamic = 'force-dynamic';

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-950">Team Members</h1>
        <Link
          href="/admin/team/new"
          className="focus-ring rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          New team member
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-400">
                {member.photoUrl ? (
                  <Image src={member.photoUrl} alt="" width={44} height={44} className="h-full w-full object-cover" />
                ) : (
                  <UserRound className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-brand-950">{member.name}</p>
                <p className="text-xs text-slate-500">
                  {member.roleEn} · {member.published ? <span className="text-green-600">Published</span> : <span className="text-slate-400">Draft</span>}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/admin/team/${member.id}`}
                className="focus-ring rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium hover:bg-slate-50"
              >
                Edit
              </Link>
              <form action={deleteTeamMember}>
                <input type="hidden" name="id" value={member.id} />
                <ConfirmSubmitButton
                  confirmMessage={`Remove "${member.name}" (${member.roleEn})? This cannot be undone.`}
                  className="focus-ring rounded-full border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
        {members.length === 0 && <p className="text-sm text-slate-500">No team members yet.</p>}
      </div>
    </div>
  );
}
