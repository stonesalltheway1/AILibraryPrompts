import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glass" | "elevated";
    hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", hover = true, ...props }, ref) => {
        const variants = {
            default: "bg-dark-800/60 border-dark-700/50",
            glass: "bg-dark-800/40 backdrop-blur-xl border-dark-600/30",
            elevated: "bg-dark-800 border-dark-700 shadow-xl shadow-black/20",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-xl border transition-all duration-300",
                    variants[variant],
                    hover && [
                        "hover:border-primary-500/30",
                        "hover:shadow-lg hover:shadow-primary-500/5",
                        "hover:-translate-y-0.5",
                    ],
                    className
                )}
                {...props}
            />
        );
    }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex flex-col space-y-1.5 p-5 pb-0", className)}
            {...props}
        />
    )
);

CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("p-5", className)} {...props} />
    )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex items-center p-5 pt-0", className)}
            {...props}
        />
    )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
