import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'def_admin_session';
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set');
  return secret;
}

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function createSessionToken() {
  const expires = Date.now() + ADMIN_COOKIE_MAX_AGE * 1000;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return false;

  return Number(payload) > Date.now();
}

export function checkPassword(candidate: string): boolean {
  const actual = process.env.ADMIN_PASSWORD;
  if (!actual) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(actual);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
