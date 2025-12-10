import { SEO } from "@/components/seo/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone, Shield, Heart, Users, Lightbulb } from "lucide-react";

const VALUES = [
  {
    icon: Shield,
    title: "Independence",
    description: "We maintain editorial independence from commercial and political interests, ensuring our journalism serves the public interest.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We uphold the highest standards of accuracy, fairness, and transparency in all our reporting.",
  },
  {
    icon: Users,
    title: "Diversity",
    description: "We amplify diverse voices and perspectives, creating space for underrepresented communities to tell their stories.",
  },
  {
    icon: Lightbulb,
    title: "Impact",
    description: "We focus on stories that matter, diving deep into issues that affect our readers' lives and communities.",
  },
];

export function AboutPage() {
  return (
    <main 
      role="main" 
      className="max-w-4xl mx-auto py-8 md:py-12 px-4 space-y-8 md:space-y-12"
      aria-label="About Bandung Journal"
    >
      <SEO 
        title="About Us" 
        description="Learn more about Bandung Journal - A critical voice for urban culture, progressive thought, and quality journalism in West Java."
        url="/about"
        keywords="about Bandung Journal, journalism, West Java news, mission, values"
      />

      {/* Header */}
      <header className="border-b-4 border-black dark:border-gray-700 pb-6 md:pb-8">
        <h1 
          className="font-black tracking-tighter uppercase mb-4 md:mb-6 dark:text-white"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
        >
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          A critical voice for urban culture and progressive thought in West Java.
        </p>
      </header>

      {/* Mission */}
      <section aria-labelledby="mission-heading">
        <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
          <CardContent className="p-6 md:p-8 space-y-4 md:space-y-6">
            <h2 
              id="mission-heading"
              className="text-2xl md:text-3xl font-black uppercase tracking-tight dark:text-white"
            >
              Our Mission
            </h2>
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                Bandung Journal is committed to delivering in-depth journalism, cultural critique, 
                and investigative reporting that matters to our community. We believe in the power 
                of storytelling to spark conversation, challenge assumptions, and inspire change.
              </p>
              <p>
                Founded with a vision to create a platform for critical thinking and diverse voices, 
                we cover politics, technology, culture, business, and lifestyle with a focus on 
                quality over quantity.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading">
        <h2 
          id="values-heading"
          className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 dark:text-white"
        >
          Our Values
        </h2>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {VALUES.map((value, index) => (
            <Card 
              key={value.title}
              className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] transition-shadow"
            >
              <CardContent className="p-4 md:p-6">
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 bg-swiss-blue flex items-center justify-center mb-3 md:mb-4"
                  aria-hidden="true"
                >
                  <value.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase mb-2 md:mb-3 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="border-2 border-black dark:border-gray-700" />

      {/* Contact Info */}
      <section aria-labelledby="contact-heading">
        <Card className="border-4 border-swiss-blue dark:border-blue-600 rounded-none bg-swiss-blue/5 dark:bg-blue-900/20">
          <CardContent className="p-6 md:p-8">
            <h2 
              id="contact-heading"
              className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 md:mb-6 dark:text-white"
            >
              Get in Touch
            </h2>
            <address className="space-y-3 md:space-y-4 not-italic">
              <a 
                href="mailto:hello@bandungjournal.com" 
                className="flex items-center gap-3 font-semibold text-gray-800 dark:text-gray-200 hover:text-swiss-blue dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2 rounded"
              >
                <Mail className="h-5 w-5 text-swiss-blue dark:text-blue-400 shrink-0" aria-hidden="true" />
                <span>hello@bandungjournal.com</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-swiss-blue dark:text-blue-400 shrink-0" aria-hidden="true" />
                <span className="font-semibold text-gray-800 dark:text-gray-200">Bandung, West Java, Indonesia</span>
              </div>
              <a 
                href="tel:+62XXXXXXXXX" 
                className="flex items-center gap-3 font-semibold text-gray-800 dark:text-gray-200 hover:text-swiss-blue dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2 rounded"
              >
                <Phone className="h-5 w-5 text-swiss-blue dark:text-blue-400 shrink-0" aria-hidden="true" />
                <span>+62 XXX XXX XXXX</span>
              </a>
            </address>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
