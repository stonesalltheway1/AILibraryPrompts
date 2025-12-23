import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "accent" | "danger";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading = false,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        const variants = {
            primary:
                "bg-gradient-to-r from-primary-700 to-primary-600 text-white shadow-lg shadow-primary-700/30 hover:shadow-primary-700/50 hover:-translate-y-0.5",
            secondary:
                "bg-dark-700/50 text-dark-100 border border-dark-600 hover:bg-dark-700 hover:border-dark-500",
            ghost: "text-dark-400 hover:text-dark-100 hover:bg-dark-700/50",
            accent:
                "bg-gradient-to-r from-accent-500 to-accent-600 text-dark-900 font-semibold shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 hover:-translate-y-0.5",
            danger:
                "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-xs",
            md: "px-4 py-2 text-sm",
            lg: "px-6 py-3 text-base",
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
