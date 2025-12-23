"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, Bookmark, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
    text: string;
    variant?: "icon" | "button";
}

export function CopyButton({ text, variant = "button" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    if (variant === "icon") {
        return (
            <button
                onClick={handleCopy}
                className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    copied
                        ? "bg-green-500/20 text-green-400"
                        : "bg-dark-700/50 text-dark-400 hover:text-dark-200 hover:bg-dark-700"
                )}
                aria-label={copied ? "Copied!" : "Copy to clipboard"}
            >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
        );
    }

    return (
        <Button
            onClick={handleCopy}
            variant={copied ? "primary" : "secondary"}
            className={cn(
                "transition-all duration-200",
                copied && "bg-green-500/20 border-green-500/40 text-green-400"
            )}
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4" />
                    Copied!
                </>
            ) : (
                <>
                    <Copy className="w-4 h-4" />
                    Copy Prompt
                </>
            )}
        </Button>
    );
}

interface BookmarkButtonProps {
    promptId: string;
    initialBookmarked?: boolean;
}

export function BookmarkButton({ promptId, initialBookmarked = false }: BookmarkButtonProps) {
    const [bookmarked, setBookmarked] = useState(initialBookmarked);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleBookmark = async () => {
        setIsAnimating(true);
        setBookmarked(!bookmarked);
        setTimeout(() => setIsAnimating(false), 300);

        // TODO: Call server action
        // await toggleBookmark(promptId);
    };

    return (
        <Button
            onClick={handleBookmark}
            variant="ghost"
            className={cn(
                "transition-all duration-200",
                bookmarked && "text-amber-400",
                isAnimating && "scale-110"
            )}
        >
            <Bookmark
                className={cn("w-4 h-4", bookmarked && "fill-current")}
            />
            {bookmarked ? "Saved" : "Save"}
        </Button>
    );
}

interface ShareButtonProps {
    url: string;
    title: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
    const [shared, setShared] = useState(false);

    const handleShare = async () => {
        const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    url: fullUrl,
                });
                setShared(true);
                setTimeout(() => setShared(false), 2000);
            } catch {
                // User cancelled share
            }
        } else {
            // Fallback: copy URL
            await navigator.clipboard.writeText(fullUrl);
            setShared(true);
            setTimeout(() => setShared(false), 2000);
        }
    };

    return (
        <Button
            onClick={handleShare}
            variant="ghost"
            className={cn(shared && "text-green-400")}
        >
            {shared ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {shared ? "Copied!" : "Share"}
        </Button>
    );
}

interface CategoryPillProps {
    name: string;
    slug: string;
    icon?: React.ReactNode;
    active?: boolean;
}

export function CategoryPill({ name, slug, icon, active }: CategoryPillProps) {
    return (
        <Link
            href={`/categories/${slug}`}
            className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                "border transition-all duration-200",
                active
                    ? "bg-primary-500/20 border-primary-500/40 text-primary-400"
                    : "bg-dark-800/60 border-dark-700/50 text-dark-300 hover:text-dark-100 hover:border-dark-600"
            )}
        >
            {icon}
            {name}
        </Link>
    );
}

interface TryPromptButtonProps {
    prompt: string;
    model: string;
}

export function TryPromptButton({ prompt, model }: TryPromptButtonProps) {
    const getModelUrl = () => {
        const modelLower = model.toLowerCase();
        if (modelLower.includes("gpt") || modelLower.includes("o3") || modelLower.includes("o4")) {
            return "https://chat.openai.com";
        }
        if (modelLower.includes("claude")) {
            return "https://claude.ai";
        }
        if (modelLower.includes("gemini")) {
            return "https://gemini.google.com";
        }
        if (modelLower.includes("grok")) {
            return "https://grok.x.ai";
        }
        return "https://chat.openai.com";
    };

    const handleTry = async () => {
        // Copy prompt first
        await navigator.clipboard.writeText(prompt);
        // Open model in new tab
        window.open(getModelUrl(), "_blank");
    };

    return (
        <Button onClick={handleTry} variant="accent">
            <ExternalLink className="w-4 h-4" />
            Try in {model.split(" ")[0]}
        </Button>
    );
}
