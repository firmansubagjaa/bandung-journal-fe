import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/seo/SEO";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const benefits = [
    "Save articles to your reading list",
    "Join discussions and share your thoughts",
    "Get personalized content recommendations",
  ];

  return (
    <main 
      role="main" 
      className="min-h-[80vh] flex items-center justify-center py-8 md:py-12 px-4"
      aria-label="Create account"
    >
      <SEO 
        title="Create Account" 
        description="Join Bandung Journal today. Create a free account to save articles, join discussions, and get personalized content."
        url="/register"
        noindex={true}
      />
      
      <div className="w-full max-w-xl space-y-6 md:space-y-8">
        {/* Header */}
        <header className="text-center space-y-3 md:space-y-4">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase dark:text-white"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)' }}
          >
            Join the Journal
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Create your free account and become part of our community.
          </p>
        </header>

        {/* Benefits List */}
        <ul className="space-y-2 max-w-md mx-auto" aria-label="Account benefits">
          {benefits.map((benefit, index) => (
            <li 
              key={index}
              className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
            >
              <CheckCircle className="h-5 w-5 text-swiss-blue shrink-0" aria-hidden="true" />
              <span className="text-sm md:text-base">{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Register Card */}
        <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
          <CardHeader className="border-b-2 border-black dark:border-gray-700">
            <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tight dark:text-white">
              Create Your Free Account
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              It only takes a minute to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <RegisterForm />
          </CardContent>
        </Card>

        {/* Social Auth */}
        <SocialAuthButtons />

        {/* Login Link - Touch friendly */}
        <div className="text-center pt-4 border-t-2 border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="font-bold text-swiss-blue hover:underline focus:outline-none focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2 rounded"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
