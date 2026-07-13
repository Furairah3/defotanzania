'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: 'div' | 'span' | 'li';
}) {
  const shouldReduceMotion = useReducedMotion();
  const offset = offsets[direction];
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
