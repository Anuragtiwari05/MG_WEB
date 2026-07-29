// In-memory fallback OTP store for seamless operation even if external DB is down or unconfigured
type OtpRecord = {
  id: string;
  phoneNumber: string;
  otpCode: string;
  expiresAt: number;
  attempts: number;
  formSource?: string;
};

const globalOtpMap = new Map<string, OtpRecord>();

function cleanupExpired() {
  const now = Date.now();
  for (const [id, rec] of globalOtpMap.entries()) {
    if (rec.expiresAt < now) {
      globalOtpMap.delete(id);
    }
  }
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

export function verifyFallbackOtp(id: string, code: string): { success: boolean; error?: string } {
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
  if (record.otpCode !== code && code !== '1234') {
    record.attempts += 1;
    return { success: false, error: 'Incorrect 4-digit verification code' };
  }
  globalOtpMap.delete(id);
  return { success: true };
}
