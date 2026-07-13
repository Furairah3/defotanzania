import type { ReactNode } from 'react';

export default function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 py-16 sm:px-10 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
