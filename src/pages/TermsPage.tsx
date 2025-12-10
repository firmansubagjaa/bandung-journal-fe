import { SEO } from "@/components/seo/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function TermsPage() {
  return (
    <main 
      role="main" 
      className="max-w-4xl mx-auto py-8 md:py-12 px-4 space-y-6 md:space-y-8"
      aria-label="Terms and Conditions"
    >
      <SEO 
        title="Terms & Conditions" 
        description="Read the terms and conditions for using Bandung Journal. By using our service, you agree to these terms."
        url="/terms"
        keywords="terms of service, user agreement, terms and conditions"
      />

      {/* Header */}
      <header className="border-b-4 border-black dark:border-gray-700 pb-6">
        <h1 
          className="font-black tracking-tighter uppercase mb-4 dark:text-white"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
        >
          Terms & Conditions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Last updated: December 9, 2025</p>
      </header>

      {/* Content */}
      <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900">
        <CardContent className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-black uppercase mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Bandung Journal, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to these terms, please do not use 
              this service.
            </p>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">2. Use License</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Permission is granted to temporarily access the materials (information or software) on 
              Bandung Journal's website for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This license shall automatically terminate if you violate any of these restrictions and 
              may be terminated by Bandung Journal at any time.
            </p>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">3. User Account</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you create an account with us, you must provide information that is accurate, 
              complete, and current at all times.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for safeguarding the password and for all activities that occur 
              under your account.
            </p>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">4. Content</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Our Service allows you to post, link, store, share and otherwise make available certain 
              information, text, graphics, or other material. You are responsible for the Content that 
              you post on or through the Service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By posting Content, you grant us the right and license to use, modify, publicly perform, 
              publicly display, reproduce, and distribute such Content on and through the Service.
            </p>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">5. Prohibited Uses</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You may use our service only for lawful purposes and in accordance with these Terms. 
              You agree not to use the service:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>In any way that violates any applicable national or international law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material</li>
              <li>To impersonate or attempt to impersonate Bandung Journal or another user</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use of the Service</li>
            </ul>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall Bandung Journal or its suppliers be liable for any damages arising out 
              of the use or inability to use the materials on Bandung Journal's website.
            </p>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">7. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. We will provide notice 
              of any changes by posting the new Terms on this page. Your continued use of the Service 
              after any such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <Separator className="border-gray-300" />

          <section>
            <h2 className="text-2xl font-black uppercase mb-4">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:legal@bandungjournal.com" className="text-swiss-blue font-bold hover:underline">
                legal@bandungjournal.com
              </a>
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
