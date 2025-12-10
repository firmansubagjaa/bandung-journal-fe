import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
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
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";

const verifySchema = z.object({
  code: z.string().length(6, "Verification code must be 6 digits"),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

interface VerifyEmailFormProps {
  userId: string;
  email: string;
}

export function VerifyEmailForm({ userId, email }: VerifyEmailFormProps) {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: VerifyFormValues) {
    setIsLoading(true);
    try {
      await verifyEmail({
        userId,
        code: data.code,
      });
      
      toast.success("Email verified successfully! Please login.");
      navigate("/login");
      
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse<null>>;
      const message = axiosError.response?.data?.message || "Verification failed. Invalid code.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          We sent a verification code to <strong>{email}</strong>.
          <br />
          Please enter it below to verify your account.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="123456" 
                    className="text-center text-2xl tracking-widest" 
                    maxLength={6}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-swiss-blue hover:bg-blue-800 text-white font-bold rounded-none h-12 text-lg" 
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
