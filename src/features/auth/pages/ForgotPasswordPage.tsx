import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authService } from "../services/authService";
import { ArrowLeft, Mail } from "lucide-react";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset code");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="w-full max-w-md border-4 border-black dark:border-gray-700 rounded-none">
          <CardHeader>
            <CardTitle className="text-2xl font-black uppercase">Check Your Email</CardTitle>
            <CardDescription>
              If an account exists with {email}, we've sent a password reset code.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-2 border-green-600 bg-green-50 dark:bg-green-950">
              <Mail className="h-4 w-4" />
              <AlertDescription>
                Check your inbox for the 6-digit reset code and use it to reset your password.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              onClick={() => navigate('/reset-password', { state: { email } })}
              className="w-full"
            >
              Continue to Reset Password
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md border-4 border-black dark:border-gray-700 rounded-none">
        <CardHeader>
          <CardTitle className="text-2xl font-black uppercase">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a code to reset your password.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="border-2 border-black dark:border-gray-600 rounded-none"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/login')}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
