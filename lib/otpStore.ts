// In-memory OTP store — the only store, no external DB involved.
//
// Attached to `globalThis` rather than a plain module-level variable: Next's
// dev bundler (and serverless/edge runtimes generally) can give each API
// route its own isolated module graph, so a plain `const map = new Map()`
// here would silently become a *different* Map per route file (send vs
// verify), even though they import "the same" module. globalThis is the one
// object guaranteed to be shared across the whole process.
import { createHmac, timingSafeEqual } from 'crypto';

type OtpRecord = {
  id: string;
  phoneNumber: string;
  otpCode: string;
  expiresAt: number;
  attempts: number;
  formSource?: string;
};
type SendAttempts = { count: number; windowStart: number };

const g = globalThis as unknown as {
  __otpMap?: Map<string, OtpRecord>;
  __otpSendAttempts?: Map<string, SendAttempts>;
};

const globalOtpMap: Map<string, OtpRecord> = g.__otpMap ?? (g.__otpMap = new Map());

function cleanupExpired() {
  const now = Date.now();
  for (const [id, rec] of globalOtpMap.entries()) {
    if (rec.expiresAt < now) {
      globalOtpMap.delete(id);
    }
  }
}

// Caps how many OTP codes can be requested for one phone number in a single
// go. Resets once the window passes or the number is successfully verified.
const sendAttemptsMap: Map<string, SendAttempts> = g.__otpSendAttempts ?? (g.__otpSendAttempts = new Map());
const MAX_OTP_SENDS = 3;
const SEND_WINDOW_MS = 60 * 60 * 1000;

export function checkOtpSendLimit(phoneNumber: string): {
  allowed: boolean;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const rec = sendAttemptsMap.get(phoneNumber);

  if (!rec || now - rec.windowStart > SEND_WINDOW_MS) {
    sendAttemptsMap.set(phoneNumber, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (rec.count >= MAX_OTP_SENDS) {
    const retryAfterSeconds = Math.ceil((rec.windowStart + SEND_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  rec.count += 1;
  return { allowed: true };
}

export function resetOtpSendLimit(phoneNumber: string) {
  sendAttemptsMap.delete(phoneNumber);
}

// On Netlify, /api/otp/send and /api/otp/verify often run on *different*
// serverless instances (or after a cold start), so the in-memory map above
// is empty at verify time. To survive that, the verification id handed to the
// client is a signed, self-contained token (phone + expiry + HMAC of the code),
// which any instance can check without shared state.
const OTP_TTL_MS = 5 * 60 * 1000;

function otpSecret(): string {
  return (
    process.env.OTP_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SMS_API_KEY ||
    'mg-otp-dev-secret'
  );
}

function sign(phoneNumber: string, otpCode: string, expiresAt: number): string {
  return createHmac('sha256', otpSecret())
    .update(`${phoneNumber}|${otpCode}|${expiresAt}`)
    .digest('base64url');
}

function encodeToken(phoneNumber: string, expiresAt: number, sig: string): string {
  return `t.${Buffer.from(JSON.stringify({ p: phoneNumber, e: expiresAt })).toString('base64url')}.${sig}`;
}

function verifyToken(
  token: string,
  code: string
): { success: boolean; error?: string; phoneNumber?: string } {
  const [, payload, sig] = token.split('.');
  let data: { p: string; e: number };
  try {
    data = JSON.parse(Buffer.from(payload, 'base64url').toString());
  } catch {
    return { success: false, error: 'Verification code expired or not found. Please request a new code.' };
  }
  if (!data?.p || typeof data.e !== 'number' || data.e < Date.now()) {
    return { success: false, error: 'OTP has expired. Please request a new code.' };
  }
  const expected = Buffer.from(sign(data.p, code, data.e));
  const given = Buffer.from(sig || '');
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return { success: false, error: 'Incorrect 4-digit verification code' };
  }
  return { success: true, phoneNumber: data.p };
}

export function saveFallbackOtp(phoneNumber: string, otpCode: string, formSource?: string): string {
  cleanupExpired();
  const expiresAt = Date.now() + OTP_TTL_MS;
  const id = encodeToken(phoneNumber, expiresAt, sign(phoneNumber, otpCode, expiresAt));
  globalOtpMap.set(id, {
    id,
    phoneNumber,
    otpCode,
    expiresAt,
    attempts: 0,
    formSource,
  });
  return id;
}

export function verifyFallbackOtp(
  id: string,
  code: string
): { success: boolean; error?: string; phoneNumber?: string } {
  cleanupExpired();
  const record = globalOtpMap.get(id);
  if (!record) {
    // Different/cold instance — fall back to the stateless signed token.
    if (id.startsWith('t.')) return verifyToken(id, code);
    return { success: false, error: 'Verification code expired or not found. Please request a new code.' };
  }
  if (record.expiresAt < Date.now()) {
    globalOtpMap.delete(id);
    return { success: false, error: 'OTP has expired. Please request a new code.' };
  }
  if (record.attempts >= 5) {
    globalOtpMap.delete(id);
    return { success: false, error: 'Too many incorrect attempts. Please request a new code.' };
  }
  if (record.otpCode !== code) {
    record.attempts += 1;
    return { success: false, error: 'Incorrect 4-digit verification code' };
  }
  globalOtpMap.delete(id);
  return { success: true, phoneNumber: record.phoneNumber };
}
