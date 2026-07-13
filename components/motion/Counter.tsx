'use client';

import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Counter({
  value,
  suffix = '',
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(shouldReduceMotion ? value : value);
    }
  }, [isInView, motionValue, shouldReduceMotion, value]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <motion.span ref={ref} aria-label={`${value}${suffix}`}>
      {shouldReduceMotion ? value : display}
      {suffix}
    </motion.span>
  );
}
