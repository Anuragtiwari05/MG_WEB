export async function sendOtpWhatsapp(phoneNumber: string, otpCode: string) {
  if (!process.env.WHATSAPP_ENDPOINT_URL || !process.env.WHATSAPP_API_KEY) {
    console.warn("[WhatsApp OTP] Credentials missing in environment. Code generated:", otpCode);
    return { status: "skipped_no_creds" };
  }

  // WhatsApp Cloud API expects the recipient number as plain digits, no "+".
  const to = phoneNumber.replace(/\D/g, "");

  try {
    const res = await fetch(process.env.WHATSAPP_ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.WHATSAPP_API_KEY,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'template',
        template: {
          name: 'registration',
          language: {
            code: 'en',
          },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: otpCode,
                },
              ],
            },
            {
              type: 'button',
              parameters: [
                {
                  type: 'text',
                  text: otpCode,
                },
              ],
              sub_type: 'url',
              index: '0',
            },
          ],
        },
        biz_opaque_callback_data: 'otp_verification',
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[WhatsApp OTP] API call returned non-200 status (${res.status}): ${errText}`);
      return { status: "error", error: errText };
    }

    return res.json();
  } catch (err) {
    console.warn("[WhatsApp OTP] Network/API error:", err);
    return { status: "error", error: err instanceof Error ? err.message : String(err) };
  }
}

