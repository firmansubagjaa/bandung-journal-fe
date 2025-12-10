import { VerifyEmailForm } from "@/features/auth/components/VerifyEmailForm";
import { useLocation, Navigate, Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import { Mail, ArrowLeft } from "lucide-react";

export function VerifyEmailPage() {
  const location = useLocation();
  const state = location.state as { userId: string; email: string } | null;

  if (!state) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main 
      role="main" 
      className="min-h-[60vh] flex items-center justify-center px-4 py-8"
      aria-label="Verify email"
    >
      <SEO 
        title="Verify Your Email" 
        description="Enter the verification code sent to your email to complete your Bandung Journal registration."
        noindex={true}
      />
      
      <div className="w-full max-w-md space-y-6 md:space-y-8">
        {/* Header */}
        <header className="text-center space-y-3">
          <div 
            className="w-16 h-16 bg-swiss-blue mx-auto mb-4 flex items-center justify-center"
            aria-hidden="true"
          >
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h1 
            className="font-black tracking-tighter uppercase dark:text-white"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}
          >
            Check Your Inbox
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We've sent a verification code to{" "}
            <strong className="text-black dark:text-white">{state.email}</strong>
          </p>
        </header>
        
        {/* Form */}
        <div className="border-4 border-black dark:border-gray-700 p-6 md:p-8 bg-white dark:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
          <VerifyEmailForm userId={state.userId} email={state.email} />
        </div>
        
        {/* Help text */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-2">
          <p>Didn't receive the code? Check your spam folder or request a new one.</p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-swiss-blue hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2 rounded"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
