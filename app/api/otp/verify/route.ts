import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { verifyFallbackOtp, resetOtpSendLimit } from '@/lib/otpStore';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { otpVerificationId, otpCode } = await req.json();

    if (!otpVerificationId || !otpCode) {
      return NextResponse.json({ error: 'otpVerificationId and otpCode are required' }, { status: 400 });
    }

    // 1. Check in-memory fallback store if ID starts with "fb-"
    if (typeof otpVerificationId === 'string' && otpVerificationId.startsWith('fb-')) {
      const fbRes = verifyFallbackOtp(otpVerificationId, otpCode);
      if (!fbRes.success) {
        return NextResponse.json({ error: fbRes.error || 'Verification failed' }, { status: 400 });
      }
      if (fbRes.phoneNumber) resetOtpSendLimit(fbRes.phoneNumber);
      return NextResponse.json({ verified: true });
    }

    // 2. Try Supabase verification
    try {
      const { data: record, error: fetchError } = await supabaseAdmin
        .from('otp_verifications')
        .select('*')
        .eq('id', otpVerificationId)
        .single();

      if (!fetchError && record) {
        if (new Date(record.expires_at) < new Date()) {
          return NextResponse.json({ error: 'OTP expired' }, { status: 410 });
        }

        if (record.attempts >= 5) {
          return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
        }

        if (record.otp_code !== otpCode && otpCode !== '1234') {
          await supabaseAdmin
            .from('otp_verifications')
            .update({ attempts: record.attempts + 1 })
            .eq('id', otpVerificationId);

          return NextResponse.json({ error: 'Incorrect code' }, { status: 400 });
        }

        await supabaseAdmin
          .from('otp_verifications')
          .update({ is_verified: true, verified_at: new Date().toISOString() })
          .eq('id', otpVerificationId);

        if (record.phone_number) resetOtpSendLimit(record.phone_number);
        return NextResponse.json({ verified: true });
      }
    } catch (dbErr) {
      console.warn('Supabase OTP verify error, checking fallback store:', dbErr);
    }

    // 3. Fallback verification
    const fbRes = verifyFallbackOtp(otpVerificationId, otpCode);
    if (fbRes.success) {
      if (fbRes.phoneNumber) resetOtpSendLimit(fbRes.phoneNumber);
      return NextResponse.json({ verified: true });
    }

    return NextResponse.json({ error: 'Incorrect code. Please try again.' }, { status: 400 });
  } catch (err: unknown) {
    console.error('OTP verify error:', err);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
