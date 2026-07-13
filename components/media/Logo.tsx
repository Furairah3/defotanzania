import Image from 'next/image';
import logoFull from '@/public/images/brand/logo-full.png';

export default function Logo({ className = '', light = false, height = 40 }: { className?: string; light?: boolean; height?: number }) {
  const width = Math.round((height * logoFull.width) / logoFull.height);

  const img = (
    <Image
      src={logoFull}
      alt="Disability Enlightenment Foundation (DEF Tanzania)"
      height={height}
      width={width}
      priority
      className="h-full w-auto"
    />
  );

  if (!light) {
    return (
      <span className={`inline-flex items-center ${className}`} style={{ height }}>
        {img}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-xl bg-white px-3 py-2 shadow-sm ${className}`}
      style={{ height: height + 16 }}
    >
      {img}
    </span>
  );
}
