import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth';
import AdminNav from './AdminNav';

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) redirect('/admin/login');

  return (
    <div className="min-h-screen">
      <AdminNav />
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
