import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

// Define vendor types as a const for type safety
export const VENDORS = ["openai", "anthropic", "google", "xai", "meta", "mistral"] as const;
export type Vendor = (typeof VENDORS)[number];

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "outline" | "model" | "category" | "tag";
    vendor?: Vendor;
    modelName?: string;
    size?: "sm" | "md";
}

/**
 * Detect vendor from model name string
 */
function getVendorFromModelName(modelName: string): Vendor | undefined {
    const name = modelName.toLowerCase();
    if (name.includes("gpt") || name.includes("o3") || name.includes("o4")) return "openai";
    if (name.includes("claude")) return "anthropic";
    if (name.includes("gemini")) return "google";
    if (name.includes("grok")) return "xai";
    if (name.includes("llama")) return "meta";
    if (name.includes("mistral")) return "mistral";
    return undefined;
}

/**
 * Badge component for displaying labels, model names, categories, and tags
 * with appropriate styling based on variant and vendor
 */
export function Badge({
    className,
    variant = "default",
    vendor,
    modelName,
    size = "md",
    children,
    ...props
}: BadgeProps) {
    // Auto-detect vendor from model name if not provided
    const resolvedVendor = vendor || (modelName ? getVendorFromModelName(modelName) : undefined);

    const baseStyles = "inline-flex items-center gap-1.5 font-medium rounded-full transition-colors";

    const sizes: Record<string, string> = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-xs",
    };

    const variants: Record<string, string> = {
        default: "bg-dark-700/60 text-dark-200 border border-dark-600/50",
        outline: "border border-dark-500 text-dark-300",
        category: "bg-dark-700/40 text-dark-300 border border-dark-600/30",
        tag: "bg-primary-500/10 text-primary-400 border border-primary-500/20",
        model: "", // Will be overridden by vendor
    };

    const vendorStyles: Record<Vendor, string> = {
        openai: "bg-green-500/15 text-green-400 border border-green-500/30",
        anthropic: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
        google: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
        xai: "bg-red-500/15 text-red-400 border border-red-500/30",
        meta: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",
        mistral: "bg-orange-500/15 text-orange-400 border border-orange-500/30",
    };

    // Determine the final styles based on variant and vendor
    let finalVariant: string;
    if (variant === "model" && resolvedVendor) {
        finalVariant = vendorStyles[resolvedVendor];
    } else {
        finalVariant = variants[variant];
    }

    return (
        <span
            className={cn(baseStyles, sizes[size], finalVariant, className)}
            {...props}
        >
            {children}
        </span>
    );
}
