import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
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
import { Mail, ArrowLeft } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);
    try {
      await api.post("/auth/forgot-password", data);
      
      toast.success("Reset code sent! Check your email.");
      
      // Navigate to reset password page with email in state
      navigate(`/reset-password?email=${encodeURIComponent(data.email)}`);
      
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse<null>>;
      const message = axiosError.response?.data?.message || "We couldn't send the reset code. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main 
      role="main" 
      className="min-h-[60vh] flex items-center justify-center px-4 py-8"
      aria-label="Password recovery"
    >
      <SEO 
        title="Forgot Password" 
        description="Reset your Bandung Journal password. We'll send you a code to get back into your account."
        url="/forgot-password"
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
            style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}
          >
            Forgot Password?
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            No worries! Enter your email and we'll send you a reset code.
          </p>
        </header>

        {/* Form */}
        <div className="border-4 border-black dark:border-gray-700 p-6 md:p-8 bg-white dark:bg-gray-900">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold uppercase dark:text-gray-200">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
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
                {isLoading ? "Sending Code..." : "Send Reset Code"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-sm text-swiss-blue hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2 rounded"
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
