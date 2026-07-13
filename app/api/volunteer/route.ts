import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, phone, interest, message } = data ?? {};

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }

  await prisma.volunteerApplication.create({
    data: {
      name: String(name),
      email: String(email),
      phone: phone ? String(phone) : null,
      interest: interest ? String(interest) : null,
      message: message ? String(message) : null,
    },
  });

  return NextResponse.json({ ok: true });
}
