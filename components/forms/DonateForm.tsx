'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { labelClass, inputClass } from '@/components/forms/fieldStyles';

export default function DonateForm() {
  const t = useTranslations('donate.form');
  const common = useTranslations('common');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = new FormData(e.currentTarget);
    await fetch('/api/donate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    setStatus('sent');
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex items-center gap-3 rounded-xl bg-brand-50 p-6 text-brand-900">
        <CheckCircle2 className="h-6 w-6 shrink-0 text-brand-600" aria-hidden="true" />
        <p>{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="font-display text-xl font-bold text-brand-950">{t('title')}</h2>
      <div>
        <label className={labelClass} htmlFor="d-name">
          {t('name')}
        </label>
        <input id="d-name" name="name" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="d-email">
          {t('email')}
        </label>
        <input id="d-email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="d-amount">
          {t('amount')}
        </label>
        <input id="d-amount" name="amount" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="d-message">
          {t('message')}
        </label>
        <textarea id="d-message" name="message" rows={3} className={inputClass} />
      </div>
      <Button type="submit" variant="primary">
        {status === 'sending' ? common('sending') : common('submit')}
      </Button>
    </form>
  );
}
