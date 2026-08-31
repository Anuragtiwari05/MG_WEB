// In-memory OTP store — the only store, no external DB involved.
//
// Attached to `globalThis` rather than a plain module-level variable: Next's
// dev bundler (and serverless/edge runtimes generally) can give each API
// route its own isolated module graph, so a plain `const map = new Map()`
// here would silently become a *different* Map per route file (send vs
// verify), even though they import "the same" module. globalThis is the one
// object guaranteed to be shared across the whole process.
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
const SEND_WINDOW_MS = 15 * 60 * 1000;

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

export function saveFallbackOtp(phoneNumber: string, otpCode: string, formSource?: string): string {
  cleanupExpired();
  const id = `fb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  globalOtpMap.set(id, {
    id,
    phoneNumber,
    otpCode,
    expiresAt: Date.now() + 5 * 60 * 1000,
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
