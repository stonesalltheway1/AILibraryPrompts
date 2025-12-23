import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, icon, ...props }, ref) => {
        return (
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    ref={ref}
                    className={cn(
                        "w-full rounded-lg border bg-dark-900/80 px-4 py-2.5 text-sm text-dark-50",
                        "placeholder:text-dark-500",
                        "transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        error
                            ? "border-red-500/50 focus:ring-red-500/40 focus:border-red-500"
                            : "border-dark-600/50 hover:border-dark-500",
                        icon && "pl-10",
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
