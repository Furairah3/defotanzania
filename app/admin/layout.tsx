import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'DEF Admin',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
