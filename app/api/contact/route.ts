import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, subject, message } = data ?? {};

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }

  await prisma.contactSubmission.create({
    data: { name: String(name), email: String(email), subject: String(subject), message: String(message) },
  });

  return NextResponse.json({ ok: true });
}
