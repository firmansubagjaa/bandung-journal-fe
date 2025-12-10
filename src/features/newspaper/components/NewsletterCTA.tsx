/**
 * NewsletterCTA Component - Swiss Design Enhanced
 * Geometric forms, bold contrasts, minimal decoration
 */

import { useState } from 'react';
import { Mail, Check, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNewsletterSubscribe } from '../hooks/useNewspaper';
import { toast } from 'sonner';

interface NewsletterCTAProps {
  variant?: 'default' | 'compact' | 'hero';
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterCTA({
  variant = 'default',
  title = "Newsletter",
  description = "Get stories delivered to your inbox. No spam.",
  className = "",
}: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: subscribe, isPending } = useNewsletterSubscribe();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    subscribe(email.trim(), {
      onSuccess: () => {
        setIsSuccess(true);
        setEmail('');
        toast.success('You\'re subscribed!');
      },
      onError: (error: Error) => {
        if (error.message.includes('409') || error.message.includes('already')) {
          toast.info('You\'re already subscribed!');
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      },
    });
  };

  // Compact variant (sidebar/footer)
  if (variant === 'compact') {
    return (
      <div className={`p-6 border-4 border-black dark:border-white bg-white dark:bg-neutral-950 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
            <Mail className="w-4 h-4 text-white dark:text-black" aria-hidden="true" />
          </div>
          <h3 className="font-black uppercase tracking-wide text-black dark:text-white">{title}</h3>
        </div>
        
        {isSuccess ? (
          <div className="flex items-center gap-2 py-3 px-4 bg-black dark:bg-white text-white dark:text-black">
            <Check className="w-5 h-5" aria-hidden="true" />
            <span className="font-bold">Subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              aria-label="Email address"
              className="min-h-[48px] rounded-none border-4 border-black dark:border-white focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white"
            />
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full min-h-[48px] rounded-none bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wide hover:bg-neutral-800 dark:hover:bg-neutral-200"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>
        )}
      </div>
    );
  }

  // Hero variant (full-width banner) - Swiss geometric
  if (variant === 'hero') {
    return (
      <section
        className={`relative py-16 px-4 bg-black dark:bg-white text-white dark:text-black border-y-4 border-black dark:border-white ${className}`}
        aria-labelledby="newsletter-heading-hero"
      >
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Geometric icon */}
            <div className="inline-flex w-16 h-16 bg-white dark:bg-black items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-black dark:text-white" aria-hidden="true" />
            </div>

            <h2 
              id="newsletter-heading-hero"
              className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight"
            >
              {title}
            </h2>

            <p className="text-lg opacity-80 max-w-lg mx-auto">
              {description}
            </p>

            {isSuccess ? (
              <div className="inline-flex items-center gap-3 py-4 px-8 bg-white dark:bg-black text-black dark:text-white font-black uppercase">
                <Check className="w-6 h-6" aria-hidden="true" />
                You're in!
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  aria-label="Email address for newsletter"
                  className="flex-1 min-h-[56px] rounded-none border-4 border-white dark:border-black bg-transparent placeholder:opacity-60 focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="min-h-[56px] px-8 rounded-none bg-white dark:bg-black text-black dark:text-white font-black uppercase tracking-wide hover:bg-neutral-200 dark:hover:bg-neutral-800 border-4 border-white dark:border-black border-l-0 sm:border-l-4"
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Default variant (card) - Swiss geometric
  return (
    <div
      className={`p-6 border-4 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black ${className}`}
      role="region"
      aria-labelledby="newsletter-heading"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-white dark:bg-black flex items-center justify-center shrink-0">
          <Mail className="w-6 h-6 text-black dark:text-white" aria-hidden="true" />
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h3 
              id="newsletter-heading" 
              className="text-xl font-black uppercase tracking-wide"
            >
              {title}
            </h3>
            <p className="opacity-80 text-sm mt-1">
              {description}
            </p>
          </div>

          {isSuccess ? (
            <div className="flex items-center gap-2 py-3 px-4 bg-white dark:bg-black text-black dark:text-white">
              <Check className="w-5 h-5" aria-hidden="true" />
              <span className="font-bold">Subscribed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                aria-label="Email address"
                className="min-h-[48px] rounded-none border-4 border-white dark:border-black bg-transparent placeholder:opacity-60 focus-visible:ring-0 focus-visible:border-white dark:focus-visible:border-black"
              />
              <Button
                type="submit"
                disabled={isPending}
                className="w-full min-h-[48px] rounded-none bg-white dark:bg-black text-black dark:text-white font-black uppercase tracking-wide hover:bg-neutral-200 dark:hover:bg-neutral-800"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsletterCTA;
