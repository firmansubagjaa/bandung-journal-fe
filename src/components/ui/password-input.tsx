import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showStrength?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrength = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [strength, setStrength] = React.useState(0);

    // Calculate password strength
    const calculateStrength = (password: string) => {
      let score = 0;
      if (!password) return 0;
      
      // Length
      if (password.length >= 8) score++;
      if (password.length >= 12) score++;
      
      // Complexity
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
      if (/\d/.test(password)) score++;
      if (/[^a-zA-Z\d]/.test(password)) score++;
      
      return Math.min(score, 5);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (showStrength) {
        setStrength(calculateStrength(value));
      }
      props.onChange?.(e);
    };

    const getStrengthColor = () => {
      if (strength <= 1) return "bg-red-500";
      if (strength <= 3) return "bg-yellow-500";
      return "bg-green-500";
    };

    const getStrengthText = () => {
      if (strength === 0) return "";
      if (strength <= 1) return "Weak";
      if (strength <= 3) return "Medium";
      return "Strong";
    };

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
          onChange={handlePasswordChange}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-500" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4 text-gray-500" aria-hidden="true" />
          )}
        </Button>

        {/* Password Strength Indicator */}
        {showStrength && props.value && (
          <div className="mt-2" role="status" aria-live="polite" aria-atomic="true">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    level <= strength ? getStrengthColor() : "bg-gray-200 dark:bg-gray-700"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            {strength > 0 && (
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Password strength: {getStrengthText()}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
