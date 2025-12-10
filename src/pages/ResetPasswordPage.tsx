import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
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
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";
import api from "@/lib/axios";
import { KeyRound, ArrowLeft, Check } from "lucide-react";

const resetPasswordSchema = z.object({
  otp: z.string().length(6, "Please enter the 6-digit code from your email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ResetPasswordFormValues) {
    if (!email) {
      toast.error("Email is required. Please go back to forgot password page.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        otp: data.otp,
        newPassword: data.password,
      });
      
      toast.success("Password reset successfully! You can now sign in.");
      navigate("/login");
      
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse<null>>;
      const message = axiosError.response?.data?.message || "We couldn't reset your password. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  if (!email) {
    return (
      <main 
        role="main" 
        className="min-h-[60vh] flex items-center justify-center px-4"
        aria-label="Email required"
      >
        <SEO title="Reset Password" noindex={true} />
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase dark:text-white">Email Required</h2>
          <p className="text-gray-600 dark:text-gray-400">Please start from the forgot password page.</p>
          <Link to="/forgot-password">
            <Button className="bg-swiss-blue hover:bg-blue-800 text-white font-bold rounded-none min-h-[48px] px-6">
              Go to Forgot Password
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main 
      role="main" 
      className="min-h-[60vh] flex items-center justify-center px-4 py-8"
      aria-label="Reset password"
    >
      <SEO 
        title="Reset Password" 
        description="Create a new password for your Bandung Journal account."
        noindex={true}
      />

      <div className="w-full max-w-md space-y-6 md:space-y-8">
        {/* Header */}
        <header className="text-center space-y-3">
          <div 
            className="w-16 h-16 bg-swiss-blue mx-auto mb-4 flex items-center justify-center"
            aria-hidden="true"
          >
            <KeyRound className="h-8 w-8 text-white" />
          </div>
          <h1 
            className="font-black tracking-tighter uppercase dark:text-white"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}
          >
            Create New Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter the code from your email and choose a new password.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded">
            Resetting for: <strong className="text-black dark:text-white">{email}</strong>
          </p>
        </header>

        {/* Form */}
        <div className="border-4 border-black dark:border-gray-700 p-6 md:p-8 bg-white dark:bg-gray-900">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold uppercase dark:text-gray-200">
                      Reset Code
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter 6-digit code" 
                        maxLength={6}
                        className="min-h-[48px] rounded-none border-2 border-black dark:border-gray-600 dark:bg-gray-800 dark:text-white text-center text-lg tracking-widest"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold uppercase dark:text-gray-200">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="At least 6 characters" 
                        className="min-h-[48px] rounded-none border-2 border-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold uppercase dark:text-gray-200">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Re-enter your password" 
                        className="min-h-[48px] rounded-none border-2 border-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
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
                disabled={isLoading}
              >
                {isLoading ? (
                  "Resetting..."
                ) : (
                  <>
                    <Check className="mr-2 h-5 w-5" aria-hidden="true" />
                    Reset Password
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center space-y-3">
            <Link 
              to="/forgot-password" 
              className="block text-sm text-swiss-blue hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2 rounded"
            >
              Didn't receive the code? Resend
            </Link>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2 rounded"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
