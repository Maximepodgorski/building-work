import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gamified";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, onClick, ...props }, ref) => {
    const [isPressed, setIsPressed] = useState(false);

    const baseStyles =
      "touch-target inline-flex items-center justify-center rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-primary text-background hover:bg-primary/90",
      secondary: "bg-secondary text-background hover:bg-secondary/90",
      outline: "border-2 border-primary text-primary hover:bg-background-light",
      gamified: "bg-vibrant-green text-white shadow-md btn-gamified hover:bg-vibrant-green/90 hover:shadow-xl"
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-4 text-base",
      lg: "px-8 py-5 text-lg"
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!props.disabled) {
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 150);
        onClick?.(e);
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isPressed && "animate-spring-press",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
