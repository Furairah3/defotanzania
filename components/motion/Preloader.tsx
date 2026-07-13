'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Logo from '@/components/media/Logo';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="presentation"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-950"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Logo light className="scale-150" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
