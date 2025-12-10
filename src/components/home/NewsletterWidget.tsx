import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterWidget() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    // TODO: Integrate with backend newsletter API when available
    // For now, just simulate subscription
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-swiss-blue dark:bg-blue-900 text-white">
       <CardContent className="p-6 text-center" role="status" aria-live="polite">
          <CheckCircle2 className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-xl font-black uppercase mb-2">Subscribed!</h3>
          <p className="text-sm text-blue-100">
            Thanks for subscribing. Check your email for confirmation.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-black dark:border-gray-700 rounded-none dark:bg-gray-900">
      <CardHeader className="border-b-2 border-black dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-black uppercase tracking-tight dark:text-white">
          <Mail className="h-5 w-5 text-swiss-blue" />
          Newsletter
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Get the latest news delivered to your inbox. No spam, just quality journalism.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-3" aria-label="Newsletter subscription">
          <div>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-base h-12 border-2 border-black dark:border-gray-600 rounded-none focus-visible:ring-swiss-blue dark:bg-gray-800 dark:text-gray-200"
              required
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={error ? "newsletter-error" : undefined}
            />
            {error && (
              <p id="newsletter-error" role="alert" className="text-sm text-red-600 dark:text-red-400 mt-2 font-semibold">
                {error}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full h-12 bg-swiss-blue hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-none"
            disabled={isLoading}
            aria-label={isLoading ? "Subscribing to newsletter" : "Subscribe to newsletter"}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          By subscribing, you agree to our Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
}
