import React, { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-input px-3 py-2",
            "text-sm text-foreground placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive focus-visible:ring-offset-destructive",
            className
          )}
          {...props}
        />
        {error && <p className="text-destructive text-sm mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-muted-foreground text-sm mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export type { InputProps };
