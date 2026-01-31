import { InputHTMLAttributes, forwardRef, useId, useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [isShaking, setIsShaking] = useState(false);
    const [prevError, setPrevError] = useState(error);

    // Trigger shake animation when error appears
    useEffect(() => {
      if (error && error !== prevError) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 400);
      }
      setPrevError(error);
    }, [error, prevError]);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-primary mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "touch-target w-full px-4 py-3 rounded-lg border-2 text-primary",
            "placeholder:text-secondary/50",
            "transition-colors",
            error
              ? "border-accent-negative focus:border-accent-negative"
              : "border-gray-300 focus:border-primary",
            isShaking && "animate-bounce-shake",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-accent-negative"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
