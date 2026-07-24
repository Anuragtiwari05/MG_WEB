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

  const payload = { form_type: formType, ...formData };
  console.log(`[submitLead] form_type="${formType}" payload:`, payload);

  await fetch(SHEET_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  });
}
