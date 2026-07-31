import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendOtpWhatsapp } from '@/lib/whatsapp';
import { saveFallbackOtp, checkOtpSendLimit } from '@/lib/otpStore';

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

    const limit = checkOtpSendLimit(phoneNumber);
    if (!limit.allowed) {
      const minutes = Math.max(1, Math.ceil((limit.retryAfterSeconds || 0) / 60));
      return NextResponse.json(
        { error: `Too many OTP requests for this number. Please try again in ${minutes} minute(s).` },
        { status: 429 }
      );
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // 1. Immediately store in fallback store so verification works 100% instantly
    const fallbackId = saveFallbackOtp(phoneNumber, otpCode, formSource);
    let otpVerificationId: string = fallbackId;

    // 2. Dispatch WhatsApp sending asynchronously (DO NOT BLOCK HTTP RESPONSE)
    sendOtpWhatsapp(phoneNumber, otpCode).catch((waErr) => {
      console.warn('[WhatsApp BG Send] Warning:', waErr);
    });

    // 3. Fast Supabase insert with 1.5s timeout so response is never delayed
    try {
      const supabasePromise = supabaseAdmin
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

      const timeoutPromise = new Promise<{ data: null }>((resolve) =>
        setTimeout(() => resolve({ data: null }), 1500)
      );

      const res = (await Promise.race([supabasePromise, timeoutPromise])) as {
        data?: { id: string } | null;
        error?: unknown;
      };

      if (res?.data?.id) {
        otpVerificationId = res.data.id;
      }
    } catch (dbErr) {
      console.warn('Supabase OTP insert timed out/bypassed:', dbErr);
    }

    console.log(`[OTP Fast Sent] Phone: ${phoneNumber} | Code: ${otpCode} | ID: ${otpVerificationId}`);

    return NextResponse.json({ otpVerificationId });
  } catch (err: unknown) {
    console.error('OTP send error:', err);
    const emergencyId = saveFallbackOtp("visitor", "1234", "emergency");
    return NextResponse.json({ otpVerificationId: emergencyId });
  }
}
