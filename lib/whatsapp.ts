export async function sendOtpWhatsapp(phoneNumber: string, otpCode: string) {
  // WhatsApp Cloud API expects the recipient number as plain digits, no "+".
  const to = phoneNumber.replace(/\D/g, "");

  const res = await fetch(process.env.WHATSAPP_ENDPOINT_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.WHATSAPP_API_KEY!,
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
    throw new Error(`WhatsApp send failed: ${res.status} ${errText}`);
  }

  return res.json();
}
