import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deleteNewsPost } from './actions';
import ConfirmSubmitButton from '../ConfirmSubmitButton';

export const dynamic = 'force-dynamic';

export default async function AdminNewsPage() {
  const posts = await prisma.newsPost.findMany({ orderBy: { date: 'desc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-950">News Posts</h1>
        <Link
          href="/admin/news/new"
          className="focus-ring rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          New post
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="min-w-0">
              <p className="truncate font-semibold text-brand-950">{post.titleEn}</p>
              <p className="text-xs text-slate-500">
                /{post.slug} · {post.date.toISOString().slice(0, 10)} ·{' '}
                {post.published ? <span className="text-green-600">Published</span> : <span className="text-slate-400">Draft</span>}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/admin/news/${post.id}`}
                className="focus-ring rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium hover:bg-slate-50"
              >
                Edit
              </Link>
              <form action={deleteNewsPost}>
                <input type="hidden" name="id" value={post.id} />
                <ConfirmSubmitButton
                  confirmMessage={`Delete "${post.titleEn}"? This cannot be undone.`}
                  className="focus-ring rounded-full border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-sm text-slate-500">No news posts yet.</p>}
      </div>
    </div>
  );
}
