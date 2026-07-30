import { getUtmParams } from "@/lib/utm";

const SHEET_ENDPOINT = process.env.NEXT_PUBLIC_SHEET_ENDPOINT;

/**
 * Sends a lead to the Google Apps Script Web App, which appends it to the
 * matching tab in Google Sheets. Uses mode: "no-cors" because Apps Script
 * doesn't return CORS headers, so the response can't be read in the browser.
 *
 * IMPORTANT: a resolved promise here only means the request reached Google's
 * servers — it does NOT confirm the Apps Script matched a sheet tab or wrote
 * a row. Cross-check the Apps Script Executions log against the payload
 * logged below to confirm rows actually land.
 */
export async function submitLead(formType: string, formData: Record<string, unknown>) {
  if (!SHEET_ENDPOINT) {
    throw new Error(
      "NEXT_PUBLIC_SHEET_ENDPOINT is not set. Add it to .env.local and restart the dev server."
    );
  }

  const utm = getUtmParams();
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  const carModel = String(formData.car_model || formData.carModel || formData.model || "");
  const location = String(formData.location || formData.showroom || "");
  const name = String(formData.name || formData.full_name || formData.fullName || "");
  const mobile = String(
    formData.mobile_number || formData.mobile || formData.phone || formData.mobileNumber || ""
  );
  const email = String(formData.email || "");
  const pincode = String(formData.pincode || "");
  const address = String(formData.address || "");
  const preferredDate = String(
    formData.preferred_date || formData.preferredDate || formData.date || ""
  );
  const preferredTime = String(
    formData.preferred_time ||
      formData.preferredTime ||
      formData.time ||
      formData.timeSlot ||
      ""
  );
  const formSource = String(formData.form_source || formData.formSource || formType);
  const notes = String(formData.notes || "");
  const subject = String(formData.subject || "");
  const message = String(formData.message || "");
  const serviceCentre = String(formData.service_centre || formData.serviceCentre || "");
  const serviceType = String(formData.service_type || formData.serviceType || "");

  const payload: Record<string, unknown> = {
    // Raw original values & UTM params
    ...utm,
    ...formData,
    form_type: formType,

    // Title Case Exact Google Sheet Column Header names
    "Car Model": carModel,
    Location: location,
    Name: name,
    "Mobile Number": mobile,
    Email: email,
    Pincode: pincode,
    Address: address,
    "Preferred Date": preferredDate,
    "Preferred Time": preferredTime,
    "Form Source": formSource,
    Timestamp: timestamp,
    Notes: notes,
    Subject: subject,
    Message: message,
    "Service Centre": serviceCentre,
    "Service Type": serviceType,

    // snake_case aliases
    car_model: carModel,
    location: location,
    name: name,
    mobile_number: mobile,
    email: email,
    pincode: pincode,
    address: address,
    preferred_date: preferredDate,
    preferred_time: preferredTime,
    form_source: formSource,
    timestamp: timestamp,
    notes: notes,
    subject: subject,
    message: message,
    service_centre: serviceCentre,
    service_type: serviceType,

    // camelCase aliases
    carModel: carModel,
    mobileNumber: mobile,
    preferredDate: preferredDate,
    preferredTime: preferredTime,
    formSource: formSource,
    serviceCentre: serviceCentre,
    serviceType: serviceType,
  };

  if (process.env.NODE_ENV === "development") {
    console.log(`[submitLead] form_type="${formType}" payload:`, payload);
  }

  // Google Sheet (marketing/ops visibility) and Supabase (system of record)
  // both get the lead. Neither should block the other — a Sheet outage
  // shouldn't lose the Supabase row and vice versa.
  const sheetRequest = fetch(SHEET_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  });

  const dbRequest = fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType, formData: { ...formData, ...utm } }),
  }).then(async (res) => {
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error(`[submitLead] Supabase insert failed for "${formType}":`, body);
    }
  });

  await Promise.all([
    sheetRequest,
    dbRequest.catch((err) => console.error(`[submitLead] /api/leads request failed:`, err)),
  ]);
}


