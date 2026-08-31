import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// UTM/campaign columns shared by every lead table in the schema.
function utmColumns(d: Record<string, unknown>) {
  return {
    utm_id: d.utm_id || null,
    utm_source: d.utm_source || null,
    utm_medium: d.utm_medium || null,
    utm_campaign: d.utm_campaign || null,
    utm_term: d.utm_term || null,
    utm_content: d.utm_content || null,
    gclid: d.gclid || null,
    fbclid: d.fbclid || null,
  };
}

function str(v: unknown): string | null {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// otp_verification_id is a uuid column, but the client falls back to a
// non-uuid synthetic id (e.g. "fb-<timestamp>") when OTP send fails on a
// network glitch, so that must be dropped rather than passed through.
function uuidOrNull(v: unknown): string | null {
  const s = str(v);
  return s && UUID_RE.test(s) ? s : null;
}

export async function POST(req: NextRequest) {
  try {
    const { formType, formData } = await req.json();
    if (!formType || !formData || typeof formData !== "object") {
      return NextResponse.json({ error: "formType and formData are required" }, { status: 400 });
    }
    const d = formData as Record<string, unknown>;
    const otpVerificationId = uuidOrNull(d.otp_verification_id) || undefined;

    let table: string;
    let row: Record<string, unknown>;

    switch (formType) {
      case "phone_capture":
        table = "numbers_only";
        row = {
          phone_number: str(d.phone_number),
          form_source: str(d.form_source),
          otp_verification_id: otpVerificationId,
          ...utmColumns(d),
        };
        break;

      case "test_drive":
        table = "test_drive";
        row = {
          car_model: str(d.car_model),
          location: str(d.location),
          name: str(d.name),
          mobile_number: str(d.mobile_number),
          email: str(d.email),
          pincode: str(d.pincode),
          address: str(d.address),
          preferred_date: str(d.preferred_date),
          preferred_time: str(d.preferred_time),
          page_source: str(d.form_source),
          otp_verification_id: otpVerificationId,
          ...utmColumns(d),
        };
        break;

      case "contact":
        table = "contact_us";
        row = {
          name: str(d.name),
          mobile_number: str(d.mobile_number),
          email: str(d.email),
          subject: str(d.subject),
          message: str(d.message),
          page_source: str(d.form_source),
          otp_verification_id: otpVerificationId,
          ...utmColumns(d),
        };
        break;

      case "service":
        table = "service_appointments";
        row = {
          car_model: str(d.car_model),
          service_centre: str(d.service_centre),
          service_type: str(d.service_type),
          name: str(d.name),
          mobile_number: str(d.mobile_number),
          email: str(d.email),
          preferred_date: str(d.preferred_date),
          preferred_time: str(d.preferred_time),
          page_source: str(d.form_source),
          otp_verification_id: otpVerificationId,
          ...utmColumns(d),
        };
        break;

      default:
        return NextResponse.json({ error: `Unknown formType "${formType}"` }, { status: 400 });
    }

    if (!row.mobile_number && !row.phone_number) {
      return NextResponse.json({ error: "mobile_number is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from(table).insert(row);
    if (error) {
      console.error(`[leads] Supabase insert into "${table}" failed:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("[leads] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
