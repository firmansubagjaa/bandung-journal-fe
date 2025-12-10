import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
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
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";
import { Loader2, Mail } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      await login(data);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse<null>>;
      const message = axiosError.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-label="Login form">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold uppercase text-xs tracking-widest">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" aria-hidden="true" />
                  <Input 
                    id="login-email"
                    type="email"
                    placeholder="name@example.com" 
                    className="pl-10 text-base border-2 border-black dark:border-gray-600 rounded-none focus-visible:ring-swiss-blue dark:bg-gray-800 dark:text-gray-200 h-12" 
                    aria-required="true"
                    aria-invalid={!!form.formState.errors.email}
                    aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage id="email-error" role="alert" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold uppercase text-xs tracking-widest">Password</FormLabel>
              <FormControl>
                <PasswordInput 
                  id="login-password"
                  placeholder="••••••••" 
                  className="border-2 border-black dark:border-gray-600 rounded-none focus-visible:ring-swiss-blue dark:bg-gray-800 dark:text-gray-200 h-12"
                  aria-required="true"
                  aria-invalid={!!form.formState.errors.password}
                  aria-describedby={form.formState.errors.password ? "password-error" : undefined}
                  {...field} 
                />
              </FormControl>
              <FormMessage id="password-error" role="alert" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-2 border-black rounded-none data-[state=checked]:bg-swiss-blue data-[state=checked]:border-swiss-blue"
                  />
                </FormControl>
                <FormLabel className="font-semibold text-sm cursor-pointer">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />

          <Link 
            to="/forgot-password" 
            className="text-sm font-bold text-swiss-blue hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-swiss-blue hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-none h-12 text-lg uppercase tracking-wide" 
          disabled={isLoading}
          aria-label={isLoading ? "Logging in, please wait" : "Login to your account"}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
