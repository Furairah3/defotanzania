import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deleteProject } from './actions';
import ConfirmSubmitButton from '../ConfirmSubmitButton';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-950">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="focus-ring rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          New project
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="min-w-0">
              <p className="truncate font-semibold text-brand-950">{project.titleEn}</p>
              <p className="text-xs text-slate-500">
                {project.focusAreaEn} · {project.status} ·{' '}
                {project.published ? <span className="text-green-600">Published</span> : <span className="text-slate-400">Draft</span>}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/admin/projects/${project.id}`}
                className="focus-ring rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium hover:bg-slate-50"
              >
                Edit
              </Link>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
                <ConfirmSubmitButton
                  confirmMessage={`Delete "${project.titleEn}"? This cannot be undone.`}
                  className="focus-ring rounded-full border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-sm text-slate-500">No projects yet.</p>}
      </div>
    </div>
  );
}
