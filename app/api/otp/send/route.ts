import { NextRequest, NextResponse } from 'next/server';
import { sendOtpSms } from '@/lib/sms';
import { saveFallbackOtp, checkOtpSendLimit } from '@/lib/otpStore';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneNumber, formSource } = body;

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

    // Store in the in-memory OTP store — no external DB dependency.
    const otpVerificationId = saveFallbackOtp(phoneNumber, otpCode, formSource);

    // AWAIT the SMS sending.
    // In serverless environments (like Netlify), returning a response immediately kills any background promises.
    // We must wait for the fetch to complete, and we'll log the exact output.
    try {
      const smsResponse = await sendOtpSms(phoneNumber, otpCode);
      console.log(`[SMS API Response]`, JSON.stringify(smsResponse));
    } catch (smsErr) {
      console.error('[SMS API Fatal Error]:', smsErr);
    }

    console.log(`[OTP Sent] Phone: ${phoneNumber} | Code: ${otpCode} | ID: ${otpVerificationId}`);

    return NextResponse.json({ otpVerificationId });
  } catch (err: unknown) {
    console.error('OTP send error:', err);
    return NextResponse.json({ error: 'Unable to send OTP right now. Please try again.' }, { status: 500 });
  }
}
