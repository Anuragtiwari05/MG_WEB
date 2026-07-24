import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendOtpWhatsapp } from '@/lib/whatsapp';

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, formSource } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json({ error: 'phoneNumber is required' }, { status: 400 });
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    const { data, error } = await supabaseAdmin
      .from('otp_verifications')
      .insert({
        phone_number: phoneNumber,
        otp_code: otpCode,
        form_source: formSource ?? null,
        expires_at: expiresAt,
      })
      .select('id')
      .single();

    if (error) throw error;

    await sendOtpWhatsapp(phoneNumber, otpCode);

    return NextResponse.json({ otpVerificationId: data.id });
  } catch (err: unknown) {
    console.error('OTP send error:', err);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
