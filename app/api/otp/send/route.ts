import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendOtpWhatsapp } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneNumber, formSource } = body;

    const utm_id = body.utm_id || body.campaign_id || body["Campaign ID"] || null;
    const utm_source = body.utm_source || body.campaign_source || body["Campaign Source"] || null;
    const utm_medium = body.utm_medium || body.campaign_medium || body["Campaign Medium"] || null;
    const utm_campaign = body.utm_campaign || body.campaign_name || body["Campaign Name"] || null;
    const utm_term = body.utm_term || body.campaign_term || body["Campaign Term"] || null;
    const utm_content = body.utm_content || body.campaign_content || body["Campaign Content"] || null;
    const gclid = body.gclid || body["Gclid"] || null;
    const fbclid = body.fbclid || body["Fbclid"] || null;

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
        utm_id: utm_id ?? null,
        utm_source: utm_source ?? null,
        utm_medium: utm_medium ?? null,
        utm_campaign: utm_campaign ?? null,
        utm_term: utm_term ?? null,
        utm_content: utm_content ?? null,
        gclid: gclid ?? null,
        fbclid: fbclid ?? null,
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
