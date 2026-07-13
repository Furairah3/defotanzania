'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_CHAT_LINK } from '@/lib/orgInfo';

export default function WhatsAppButton() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={WHATSAPP_CHAT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DEF Tanzania on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
      className="focus-ring fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </motion.a>
  );
}
