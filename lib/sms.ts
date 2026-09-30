export async function sendOtpSms(phoneNumber: string, otpCode: string) {
  if (!process.env.SMS_API_KEY) {
    console.warn("[SMS OTP] API key missing in environment. Code generated:", otpCode);
    return { status: "skipped_no_creds" };
  }

  const number = phoneNumber.replace(/\D/g, "");
  const text = `Your Modi MG verification code is ${otpCode} It expires in 10 minutes. Do not share this code with anyone.`;

  const url =
    `https://alotsolutions.in/api/mt/SendSMS` +
    `?user=MGKrishiv` +
    `&apikey=${encodeURIComponent(process.env.SMS_API_KEY)}` +
    `&senderid=KRISHV` +
    `&channel=Trans` +
    `&DCS=0` +
    `&flashsms=0` +
    `&number=${encodeURIComponent(number)}` +
    `&text=${encodeURIComponent(text)}` +
    `&DLTTemplateId=1177179067510290531`;

  try {
    const res = await fetch(url, { method: 'GET' });

    const body = await res.text();
    if (!res.ok) {
      console.warn(`[SMS OTP] API call returned non-200 status (${res.status}): ${body}`);
      return { status: "error", error: body };
    }

    return { status: "sent", response: body };
  } catch (err) {
    console.warn("[SMS OTP] Network/API error:", err);
    return { status: "error", error: err instanceof Error ? err.message : String(err) };
  }
}
