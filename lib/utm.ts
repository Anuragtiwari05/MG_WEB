const UTM_KEYS = [
  "utm_id",
  "campaign_id",
  "utm_source",
  "campaign_source",
  "utm_medium",
  "campaign_medium",
  "utm_campaign",
  "campaign_name",
  "utm_term",
  "campaign_term",
  "utm_content",
  "campaign_content",
  "gclid",
  "fbclid",
] as const;

const STORAGE_KEY = "mg_utm_params";

/**
 * Reads utm_* and campaign_* query params off the current URL and persists them for the
 * session, so they're still available later when the visitor submits a form
 * on a different page than the one they landed on from the ad.
 */
export function captureUtmParams() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  if (Object.keys(found).length > 0) {
    // Preserve existing session params if new URL doesn't specify them
    const existingRaw = sessionStorage.getItem(STORAGE_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : {};
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...found }));
  }
}

/**
 * Returns UTM and Campaign parameters formatted in all common key styles:
 * - utm_* (standard Google Analytics keys)
 * - campaign_* (snake_case database keys)
 * - "Campaign *" (Title Case exact Google Sheet column header names)
 */
export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    let rawObj: Record<string, string> = {};
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        rawObj = JSON.parse(raw);
      } catch {
        rawObj = {};
      }
    }

    // Always check current window.location.search in real-time as well
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) rawObj[key] = value;
    }

    const id = rawObj.utm_id || rawObj.campaign_id || "";
    const source = rawObj.utm_source || rawObj.campaign_source || "";
    const medium = rawObj.utm_medium || rawObj.campaign_medium || "";
    const name = rawObj.utm_campaign || rawObj.campaign_name || "";
    const term = rawObj.utm_term || rawObj.campaign_term || "";
    const content = rawObj.utm_content || rawObj.campaign_content || "";
    const gclid = rawObj.gclid || "";
    const fbclid = rawObj.fbclid || "";


    const result: Record<string, string> = {};

    // Standard utm_*
    if (id) result.utm_id = id;
    if (source) result.utm_source = source;
    if (medium) result.utm_medium = medium;
    if (name) result.utm_campaign = name;
    if (term) result.utm_term = term;
    if (content) result.utm_content = content;
    if (gclid) result.gclid = gclid;
    if (fbclid) result.fbclid = fbclid;

    // Database campaign_*
    if (id) result.campaign_id = id;
    if (source) result.campaign_source = source;
    if (medium) result.campaign_medium = medium;
    if (name) result.campaign_name = name;
    if (term) result.campaign_term = term;
    if (content) result.campaign_content = content;

    // Exact Google Sheet Column Header names
    if (id) result["Campaign ID"] = id;
    if (source) result["Campaign Source"] = source;
    if (medium) result["Campaign Medium"] = medium;
    if (name) result["Campaign Name"] = name;
    if (term) result["Campaign Term"] = term;
    if (content) result["Campaign Content"] = content;
    if (gclid) result["Gclid"] = gclid;
    if (fbclid) result["Fbclid"] = fbclid;

    return result;
  } catch {
    return {};
  }
}

