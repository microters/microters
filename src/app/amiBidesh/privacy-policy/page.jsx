import CtaBeforeFooter from "app/components/common/CTABeforeFooter";
import PageHeader from "app/components/PageHeader";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* --- Header Section --- */}
      <PageHeader
        title="Privacy Policy Of"
        highlight="amiBidesh"
        description="Effective Date: June 25, 2026 | Last Updated: June 25, 2026"
      />

      {/* --- Content Section --- */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-gray-600 text-base lg:text-lg leading-relaxed space-y-6">
            
            {/* 1. Introduction */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              1. Introduction
            </h3>
            <p>
              amiBidesh (“we,” “our,” or “the App”) is a mobile application developed by <strong>Microters LLC</strong> (“the Company”) designed to assist Bangladeshi migrant workers living abroad. The App provides tools for document tracking, live remittance rate comparison, AI-powered contract analysis, embassy information, prayer times, and access to migrant community resources.
            </p>
            <p>
              This Privacy Policy explains what information the App collects, how it is used, and what choices you have. By installing and using amiBidesh, you agree to the practices described here.
            </p>
            <p>
              <strong>Contact:</strong> <Link href="mailto:info@microters.com" className="text-[#15151e] underline hover:text-[#f35d36] transition-colors">info@microters.com</Link> <br />
              <strong>Developer:</strong> Microters LLC
            </p>

            {/* 2. Information We Collect */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              2. Information We Collect
            </h3>
            
            <h4 className="text-[#15151e] text-xl font-semibold mt-6 mb-2">2.1 Information You Provide</h4>
            <p>When you use amiBidesh, you may voluntarily provide:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Profile information:</strong> Full name, gender, phone number, address, current country of residence, profile photo (optional).</li>
              <li><strong>Document data:</strong> Photos of identification documents (passport, akama/iqama, visa, BMET card, medical certificate, driving license, NID, etc.) and the extracted text from them (document numbers, issue dates, expiry dates, issuing country).</li>
              <li><strong>Contract documents:</strong> Photos of employment contracts uploaded for AI analysis.</li>
            </ul>

            <h4 className="text-[#15151e] text-xl font-semibold mt-6 mb-2">2.2 Information Automatically Collected</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Device location (optional):</strong> Approximate GPS location, used only when you grant permission, to determine your current country for prayer times and embassy information. You can deny or revoke this permission at any time.</li>
              <li><strong>App preferences:</strong> Notification settings, app language, and other preferences you configure within the App.</li>
            </ul>

            <h4 className="text-[#15151e] text-xl font-semibold mt-6 mb-2">2.3 Information We Do NOT Collect</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not collect your contacts, call logs, SMS, or browsing history.</li>
              <li>We do not track your activity outside the App.</li>
              <li>We do not collect biometric data (fingerprint, face).</li>
              <li>We do not use advertising IDs or behavioral tracking.</li>
            </ul>

            {/* 3. How Your Information Is Stored */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              3. How Your Information Is Stored
            </h3>
            
            <h4 className="text-[#15151e] text-xl font-semibold mt-6 mb-2">3.1 Local Storage (On Your Device)</h4>
            <p>
              <strong>All personal information you provide is stored only on your device.</strong> This includes profile information, documents and their scanned data, contract analyses, notification preferences, and cached data (rates, news).
            </p>
            <p>
              We do <strong>not</strong> maintain user accounts on our servers. We do <strong>not</strong> have a database of users. If you uninstall the App or use the in-app logout feature, all locally stored data is permanently deleted.
            </p>

            <h4 className="text-[#15151e] text-xl font-semibold mt-6 mb-2">3.2 Temporary Processing by Third-Party AI</h4>
            <p>
              When you choose to scan a document or analyze an employment contract, the photo is <strong>temporarily</strong> transmitted to <strong>Google's Gemini AI</strong> for text extraction and analysis. According to Google's policies, the image is processed and discarded after the response. Google does not use this data to train its models when accessed via the paid API, and the image is <strong>not stored on our servers</strong> at any point.
            </p>

            <h4 className="text-[#15151e] text-xl font-semibold mt-6 mb-2">3.3 Server-Side Caching (Anonymous)</h4>
            <p>
              Our server-side services for remittance rates and migrant news perform their own data fetching and caching for performance. <strong>These services do not receive any personal information about you</strong> — they serve the same cached data to all users.
            </p>

            {/* 4. How We Use Information */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              4. How We Use Information
            </h3>
            <p>We use the information collected solely to operate the App's features for you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Document tracking:</strong> To show you your saved documents and remind you of upcoming expiry dates.</li>
              <li><strong>Contract analysis:</strong> To extract and present analysis of employment contracts.</li>
              <li><strong>Prayer times & embassy info:</strong> To show prayer times and embassy details relevant to your location.</li>
              <li><strong>Personalization:</strong> To greet you by name and show country-relevant information.</li>
              <li><strong>Notifications (when enabled):</strong> To remind you of document expiry dates.</li>
            </ul>
            <p>
              We do <strong>not</strong> sell, rent, or share your personal information with any third party for marketing, use your data for advertising, or profile you for behavioral targeting.
            </p>

            {/* 5. Third-Party Services */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              5. Third-Party Services
            </h3>
            <p>The App connects to the following third-party services:</p>
            
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-[#15151e]">Service</th>
                    <th className="px-4 py-3 text-left font-bold text-[#15151e]">Purpose</th>
                    <th className="px-4 py-3 text-left font-bold text-[#15151e]">Data Sent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#15151e]">Google Gemini AI (Google LLC)</td>
                    <td className="px-4 py-3">Document OCR and contract analysis</td>
                    <td className="px-4 py-3">Document/contract image only, when you initiate a scan</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#15151e]">Frankfurter API</td>
                    <td className="px-4 py-3">Live currency exchange rates</td>
                    <td className="px-4 py-3">None — only public rate data is fetched</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#15151e]">rates.pluginic.com (our server)</td>
                    <td className="px-4 py-3">Aggregated remittance rates and news</td>
                    <td className="px-4 py-3">None — only anonymous requests</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 6. Permissions Requested */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              6. Permissions Requested
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Camera:</strong> To photograph documents and contracts for scanning. You can choose gallery instead.</li>
              <li><strong>Photos & Media:</strong> To select existing photos from your gallery for document or profile use.</li>
              <li><strong>Location (optional):</strong> To determine your current country for prayer times and embassy info. You may deny this; the App will work without it.</li>
              <li><strong>Notifications (optional):</strong> To alert you about document expiry. You may disable this in settings.</li>
              <li><strong>Internet:</strong> Required to fetch live remittance rates, news, and use AI features.</li>
            </ul>

            {/* 7. Children's Privacy */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              7. Children's Privacy
            </h3>
            <p>
              amiBidesh is not directed at children under 13. We do not knowingly collect information from children. If you believe a child has provided personal information through the App, please contact us at info@microters.com and we will help remove it.
            </p>

            {/* 8. Your Rights and Choices */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              8. Your Rights and Choices
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> All your data is visible within the App at any time.</li>
              <li><strong>Edit:</strong> You can modify profile and document information through the App.</li>
              <li><strong>Delete:</strong> Use the in-app "Logout" function to permanently delete all your data from the device.</li>
              <li><strong>Uninstall:</strong> Uninstalling the App removes all local data.</li>
              <li><strong>Permission revocation:</strong> Disable camera, location, or notification permissions through device settings.</li>
            </ul>

            {/* 9. Data Security */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              9. Data Security
            </h3>
            <p>
              We take reasonable precautions to protect your information. All sensitive data remains on your device, communication uses HTTPS encryption, and photos/images are stored in the App's private sandbox storage, inaccessible to other apps. However, no system is 100% secure. We encourage you to use a device lock (PIN, fingerprint, password) for additional security.
            </p>

            {/* 10. International Users */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              10. International Users
            </h3>
            <p>
              amiBidesh is intended for Bangladeshi nationals living abroad. Your data is processed on your device (in your country of residence). When you use AI features, data is transmitted to Google's servers, which may be located in the United States or other countries. By using the App, you consent to this transmission.
            </p>

            {/* 11. Changes to This Policy */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              11. Changes to This Policy
            </h3>
            <p>
              We may update this Privacy Policy as the App evolves. Any changes will be posted at this URL with an updated "Last Updated" date. Significant changes will be communicated through an in-app notice. Continued use of the App after changes constitutes acceptance of the revised policy.
            </p>

            {/* 12. Contact Us */}
            <h3 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-2">
              12. Contact Us
            </h3>
            <p>
              For questions, concerns, or requests regarding this Privacy Policy or your data:
            </p>
            <p className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <strong>Email:</strong> <Link href="mailto:info@microters.com" className="text-[#15151e] underline hover:text-[#f35d36] transition-colors">info@microters.com</Link> <br />
              <strong>Developer:</strong> Microters LLC <br />
              <strong>App package:</strong> com.microters.amibidesh
            </p>
          </div>
        </div>
      </section>
      <CtaBeforeFooter />
    </main>
  );
}