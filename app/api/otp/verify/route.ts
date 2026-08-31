import { NextRequest, NextResponse } from 'next/server';
import { verifyFallbackOtp, resetOtpSendLimit } from '@/lib/otpStore';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { otpVerificationId, otpCode } = await req.json();

    if (!otpVerificationId || !otpCode) {
      return NextResponse.json({ error: 'otpVerificationId and otpCode are required' }, { status: 400 });
    }

    const result = verifyFallbackOtp(otpVerificationId, otpCode);
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Verification failed' }, { status: 400 });
    }

    if (result.phoneNumber) resetOtpSendLimit(result.phoneNumber);
    return NextResponse.json({ verified: true });
  } catch (err: unknown) {
    console.error('OTP verify error:', err);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
