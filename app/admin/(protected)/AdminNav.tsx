'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/media/Logo';

const LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/publications', label: 'Publications' },
  { href: '/admin/team', label: 'Team' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/partners', label: 'Partners' },
  { href: '/admin/submissions', label: 'Submissions' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Logo height={32} />
          <nav className="flex flex-wrap gap-1" aria-label="Admin">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`focus-ring rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="focus-ring rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
