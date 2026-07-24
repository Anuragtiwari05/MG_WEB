"use client";

import LegalPage from "@/components/LegalPage";
import { company } from "@/lib/data";

export default function TermsClient() {
  return (
    <LegalPage title="Terms & Conditions" updated="23 July 2026">
      <div>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the {company.name} website, or by submitting an
          enquiry, booking a test drive, or requesting a service, you agree to be
          bound by these Terms &amp; Conditions. If you do not agree, please
          discontinue use of the site and its services.
        </p>
      </div>

      <div>
        <h2>2. Test Drives &amp; Bookings</h2>
        <p>
          Test drive and service bookings made through this website are requests,
          not confirmed appointments, until a {company.name} representative
          contacts you to confirm the date, time, and location. Vehicle
          availability, showroom timings, and eligibility (valid driving licence,
          minimum age) are subject to change and dealership discretion.
        </p>
      </div>

      <div>
        <h2>3. Mobile Number Verification &amp; Consent</h2>
        <p>
          To confirm bookings and enquiries, we verify your mobile number using a
          one-time password (OTP). By submitting your number and completing OTP
          verification, you consent to being contacted by {company.name} and its
          representatives via call, SMS, or WhatsApp regarding your enquiry, even
          if your number is registered under the National Do Not Call (DNC) or
          NDNC registry, solely for the purpose of servicing this request.
        </p>
      </div>

      <div>
        <h2>4. Pricing &amp; Offers</h2>
        <p>
          Prices, offers, and specifications displayed on this website are
          indicative, ex-showroom figures that may change without prior notice
          and can vary by variant, colour, location, and ongoing promotions.
          Please confirm final on-road pricing with your nearest {company.name}
          {" "}showroom before making a purchase decision.
        </p>
      </div>

      <div>
        <h2>5. Intellectual Property</h2>
        <p>
          All content on this website, including text, images, logos, and
          design, is the property of {company.name} or its licensors (including
          MG Motor India) and may not be reproduced or used without prior
          written permission.
        </p>
      </div>

      <div>
        <h2>6. Limitation of Liability</h2>
        <p>
          {company.name} makes reasonable efforts to keep information on this
          site accurate and up to date but does not guarantee completeness or
          error-free content. We are not liable for any indirect or
          consequential loss arising from reliance on information found on this
          website.
        </p>
      </div>

      <div>
        <h2>7. Governing Law</h2>
        <p>
          These terms are governed by the laws of India, and any disputes will
          be subject to the exclusive jurisdiction of the courts in Mumbai,
          Maharashtra.
        </p>
      </div>

      <div>
        <h2>8. Contact Us</h2>
        <p>
          For questions about these Terms &amp; Conditions, write to us at{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a> or call{" "}
          <a href={`tel:${company.phoneE164}`}>{company.phone}</a>. See also our{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </div>
    </LegalPage>
  );
}
