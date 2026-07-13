import { NextResponse } from 'next/server';
import { checkPassword, createSessionToken, ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE } from '@/lib/auth';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (typeof password !== 'string' || !checkPassword(password)) {
    return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}
