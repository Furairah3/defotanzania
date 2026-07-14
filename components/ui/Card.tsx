import type { ReactNode } from 'react';

export default function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`group rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-brand-900/10 ${className}`}
    >
      {children}
    </div>
  );
}
