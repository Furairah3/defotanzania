import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// TODO: wire up a real payment provider once one is chosen; this currently
// only records the donor's intent so the team can follow up manually.
export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, amount, message } = data ?? {};

  if (!name || !email || !amount) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }

  await prisma.donationIntent.create({
    data: {
      name: String(name),
      email: String(email),
      amount: String(amount),
      message: message ? String(message) : null,
    },
  });

  return NextResponse.json({ ok: true });
}
