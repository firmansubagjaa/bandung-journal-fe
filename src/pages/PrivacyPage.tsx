import { SEO } from "@/components/seo/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function PrivacyPage() {
  return (
    <main 
      role="main" 
      className="max-w-4xl mx-auto py-8 md:py-12 px-4 space-y-6 md:space-y-8"
      aria-label="Privacy Policy"
    >
      <SEO 
        title="Privacy Policy" 
        description="Learn how Bandung Journal collects, uses, and protects your personal information. Your privacy matters to us."
        url="/privacy"
        keywords="privacy policy, data protection, personal information, cookies"
      />

      {/* Header */}
      <header className="border-b-4 border-black dark:border-gray-700 pb-6">
        <h1 
          className="font-black tracking-tighter uppercase mb-4 dark:text-white"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
        >
          Privacy Policy
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Last updated: December 9, 2025</p>
      </header>

      {/* Content */}
      <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900">
        <CardContent className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-black uppercase mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We collect information that you provide directly to us, including when you create an account, 
              subscribe to our newsletter, or interact with our content.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">
              Personal Information:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>Name and email address</li>
              <li>Profile information and preferences</li>
              <li>Comments and interactions on articles</li>
            </ul>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Send you newsletters and updates (if you've subscribed)</li>
              <li>Personalize your experience with relevant content</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Analyze usage patterns to improve our platform</li>
            </ul>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We do not sell, trade, or rent your personal information to third parties. We may share 
              your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>With your consent or at your direction</li>
              <li>With service providers who assist in operating our platform</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
            </ul>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">4. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to collect information about your browsing 
              activities over time and across different websites.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You can control cookies through your browser settings. However, disabling cookies may affect 
              your ability to use certain features of our service.
            </p>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Unsubscribe from marketing communications</li>
            </ul>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">7. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Service is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13.
            </p>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">9. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@bandungjournal.com" className="text-swiss-blue font-bold hover:underline">
                privacy@bandungjournal.com
              </a>
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
