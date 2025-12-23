import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    "w-full rounded-lg border bg-dark-900/80 px-4 py-3 text-sm text-dark-50",
                    "placeholder:text-dark-500",
                    "transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "resize-none",
                    "min-h-[120px]",
                    error
                        ? "border-red-500/50 focus:ring-red-500/40 focus:border-red-500"
                        : "border-dark-600/50 hover:border-dark-500",
                    className
                )}
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };
