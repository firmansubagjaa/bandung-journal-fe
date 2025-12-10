import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SectionHeading } from "@/components/typography";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Send, MapPin, MessageSquare, Newspaper, Megaphone } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name (at least 2 characters)"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject should be at least 5 characters"),
  message: z.string().min(10, "Please tell us more (at least 10 characters)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const CONTACT_METHODS = [
  {
    icon: MessageSquare,
    title: "General Inquiries",
    email: "hello@bandungjournal.com",
    description: "Questions, feedback, or just want to say hi?",
  },
  {
    icon: Newspaper,
    title: "Editorial & Story Tips",
    email: "editorial@bandungjournal.com",
    description: "Have a story we should cover?",
  },
  {
    icon: Megaphone,
    title: "Advertising",
    email: "ads@bandungjournal.com",
    description: "Partner with us to reach our audience.",
  },
];

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    try {
      // Using mailto: for now
      const mailtoLink = `mailto:hello@bandungjournal.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
        `From: ${data.name} (${data.email})\n\n${data.message}`
      )}`;
      
      window.location.href = mailtoLink;
      form.reset();
      toast.success("Opening your email client...");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main 
      role="main" 
      className="max-w-5xl mx-auto space-y-8 md:space-y-12 px-4 py-6 md:py-8"
      aria-label="Contact us"
    >
      <SEO 
        title="Contact Us" 
        description="Get in touch with Bandung Journal. We'd love to hear your story tips, feedback, questions, or partnership inquiries."
        url="/contact"
        keywords="contact Bandung Journal, story tips, feedback, advertising"
      />

      {/* Hero */}
      <header className="text-center py-8 md:py-12 border-b-4 border-black dark:border-gray-700">
        <h1 
          className="font-black tracking-tighter uppercase mb-4 md:mb-6 leading-none dark:text-white"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          Let's Talk
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have a story tip, question, or feedback? We're all ears.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Form */}
        <section aria-labelledby="form-heading" className="space-y-6">
          <h2 
            id="form-heading"
            className="text-2xl md:text-3xl font-black uppercase tracking-tight dark:text-white"
          >
            Send Us a Message
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold uppercase dark:text-gray-200">Your Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="What should we call you?" 
                        className="min-h-[48px] rounded-none border-2 border-black dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold uppercase dark:text-gray-200">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Where can we reach you?" 
                        className="min-h-[48px] rounded-none border-2 border-black dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold uppercase dark:text-gray-200">Subject</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="What's this about?" 
                        className="min-h-[48px] rounded-none border-2 border-black dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold uppercase dark:text-gray-200">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us what's on your mind..." 
                        rows={6}
                        className="rounded-none border-2 border-black dark:border-gray-600 dark:bg-gray-900 dark:text-white resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-swiss-blue hover:bg-blue-800 text-white font-bold rounded-none min-h-[56px] text-base md:text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Form>
        </section>

        {/* Contact Information */}
        <section aria-labelledby="contact-info-heading" className="space-y-6 md:space-y-8">
          <h2 
            id="contact-info-heading"
            className="text-2xl md:text-3xl font-black uppercase tracking-tight dark:text-white"
          >
            Other Ways to Reach Us
          </h2>
          
          {/* Contact Methods */}
          <div className="space-y-4">
            {CONTACT_METHODS.map((method) => (
              <a
                key={method.email}
                href={`mailto:${method.email}`}
                className="block border-l-4 border-swiss-blue pl-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2 rounded-r"
              >
                <div className="flex items-start gap-3">
                  <method.icon className="h-5 w-5 text-swiss-blue shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-black uppercase text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {method.title}
                    </h3>
                    <p className="text-base md:text-lg font-bold text-black dark:text-white">
                      {method.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {method.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Social Media */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 md:p-6 border-2 border-black dark:border-gray-700">
            <h3 className="font-black uppercase text-sm mb-4 dark:text-white">Follow Us</h3>
            <div className="space-y-2 text-sm md:text-base">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Twitter:</strong>{" "}
                <a href="#" className="text-swiss-blue hover:underline focus:outline-none focus:ring-2 focus:ring-swiss-blue">@bandungjournal</a>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Instagram:</strong>{" "}
                <a href="#" className="text-swiss-blue hover:underline focus:outline-none focus:ring-2 focus:ring-swiss-blue">@bandungjournal</a>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>LinkedIn:</strong>{" "}
                <a href="#" className="text-swiss-blue hover:underline focus:outline-none focus:ring-2 focus:ring-swiss-blue">Bandung Journal</a>
              </p>
            </div>
          </div>

          {/* Office Address */}
          <address className="bg-swiss-blue text-white p-5 md:p-6 not-italic">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 shrink-0 mt-0.5 opacity-90" aria-hidden="true" />
              <div>
                <h3 className="font-black uppercase text-sm mb-2 opacity-90">Newsroom Address</h3>
                <p className="leading-relaxed">
                  Jl. Braga No. 123<br />
                  Bandung, West Java<br />
                  Indonesia 40111
                </p>
              </div>
            </div>
          </address>
        </section>
      </div>
    </main>
  );
}
