import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const { otpVerificationId, otpCode } = await req.json();

    if (!otpVerificationId || !otpCode) {
      return NextResponse.json({ error: 'otpVerificationId and otpCode are required' }, { status: 400 });
    }

    const { data: record, error: fetchError } = await supabaseAdmin
      .from('otp_verifications')
      .select('*')
      .eq('id', otpVerificationId)
      .single();

    if (fetchError || !record) {
      return NextResponse.json({ error: 'Verification not found' }, { status: 404 });
    }

    if (new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 410 });
    }

    if (record.attempts >= 5) {
      return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
    }

    if (record.otp_code !== otpCode) {
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

    return NextResponse.json({ verified: true });
  } catch (err: unknown) {
    console.error('OTP verify error:', err);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
