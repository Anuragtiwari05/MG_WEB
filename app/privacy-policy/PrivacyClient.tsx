"use client";

import LegalPage from "@/components/LegalPage";
import { company } from "@/lib/data";

export default function PrivacyClient() {
  return (
    <LegalPage title="Privacy Policy" updated="23 July 2026">
      <div>
        <h2>1. Information We Collect</h2>
        <p>
          When you book a test drive, request a service, or contact us through
          this website, we collect information such as your name, mobile
          number, email address, address/area, preferred showroom, and the
          vehicle model you&apos;re interested in.
        </p>
      </div>

      <div>
        <h2>2. Mobile Number &amp; OTP Verification</h2>
        <p>
          We verify your mobile number using a one-time password (OTP) before
          confirming a booking. This protects you from spam bookings and
          ensures our sales team can reach the right person. Your verified
          number is stored on your device to skip re-verification on your next
          visit, and is shared only with {company.name} and its authorised
          representatives to follow up on your request &mdash; never sold to
          third parties.
        </p>
      </div>

      <div>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To confirm and coordinate test drive or service appointments</li>
          <li>To respond to enquiries submitted via forms on this site</li>
          <li>To share relevant offers, new launches, or service reminders</li>
          <li>To improve our website experience and customer service</li>
        </ul>
      </div>

      <div>
        <h2>4. Consent to Contact</h2>
        <p>
          By submitting your details and completing OTP verification, you
          consent to being contacted by {company.name} via phone call, SMS, or
          WhatsApp regarding your enquiry, even if your number is registered
          under the National Do Not Call (DNC) or NDNC registry, solely for
          servicing the specific request you made.
        </p>
      </div>

      <div>
        <h2>5. Cookies</h2>
        <p>
          We use minimal local storage on your browser (for example, to
          remember your verified mobile number) to make the site easier to use.
          We do not use this data for third-party advertising.
        </p>
      </div>

      <div>
        <h2>6. Data Security</h2>
        <p>
          We take reasonable technical and organisational measures to protect
          your personal data from unauthorised access, alteration, or
          disclosure.
        </p>
      </div>

      <div>
        <h2>7. Your Rights</h2>
        <p>
          You can request access to, correction of, or deletion of your
          personal data held by us at any time by writing to{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </div>

      <div>
        <h2>8. Contact Us</h2>
        <p>
          For any privacy-related questions, reach us at{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a> or call{" "}
          <a href={`tel:${company.phoneE164}`}>{company.phone}</a>. See also our{" "}
          <a href="/terms-and-conditions">Terms &amp; Conditions</a>.
        </p>
      </div>
    </LegalPage>
  );
}
