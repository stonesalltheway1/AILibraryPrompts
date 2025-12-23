"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

interface VoteButtonsProps {
    promptId: string;
    initialVotes: number;
    initialUserVote?: number; // -1, 0, or 1
    orientation?: "vertical" | "horizontal";
    size?: "sm" | "md" | "lg";
}

export function VoteButtons({
    promptId,
    initialVotes,
    initialUserVote = 0,
    orientation = "vertical",
    size = "md",
}: VoteButtonsProps) {
    const [votes, setVotes] = useState(initialVotes);
    const [userVote, setUserVote] = useState(initialUserVote);
    const [isAnimating, setIsAnimating] = useState<"up" | "down" | null>(null);

    const handleVote = async (value: 1 | -1) => {
        // Optimistic update
        const previousVote = userVote;
        const previousVotes = votes;

        let newUserVote: number;
        let voteDiff: number;

        if (userVote === value) {
            // Clicking the same button = remove vote
            newUserVote = 0;
            voteDiff = -value;
        } else {
            // New vote or switching
            newUserVote = value;
            voteDiff = value - userVote;
        }

        setUserVote(newUserVote);
        setVotes(votes + voteDiff);
        setIsAnimating(value === 1 ? "up" : "down");

        // Clear animation after it completes
        setTimeout(() => setIsAnimating(null), 300);

        // TODO: Call server action
        try {
            // await voteAction(promptId, value);
        } catch {
            // Rollback on error
            setUserVote(previousVote);
            setVotes(previousVotes);
        }
    };

    const sizes = {
        sm: {
            button: "w-7 h-7",
            icon: "w-3.5 h-3.5",
            text: "text-xs",
        },
        md: {
            button: "w-9 h-9",
            icon: "w-4 h-4",
            text: "text-sm",
        },
        lg: {
            button: "w-11 h-11",
            icon: "w-5 h-5",
            text: "text-base",
        },
    };

    const sizeConfig = sizes[size];

    return (
        <div
            className={cn(
                "flex items-center gap-1",
                orientation === "vertical" ? "flex-col" : "flex-row"
            )}
        >
            {/* Upvote button */}
            <button
                onClick={() => handleVote(1)}
                className={cn(
                    "flex items-center justify-center rounded-lg transition-all duration-200",
                    "border hover:scale-105 active:scale-95",
                    sizeConfig.button,
                    userVote === 1
                        ? "bg-green-500/20 border-green-500/40 text-green-400"
                        : "bg-dark-800/60 border-dark-700/50 text-dark-400 hover:text-dark-200 hover:border-dark-600",
                    isAnimating === "up" && "animate-pulse"
                )}
                aria-label="Upvote"
            >
                <ChevronUp className={cn(sizeConfig.icon, userVote === 1 && "animate-bounce")} />
            </button>

            {/* Vote count */}
            <span
                className={cn(
                    "font-semibold min-w-[2.5rem] text-center",
                    sizeConfig.text,
                    votes > 0 ? "text-green-400" : votes < 0 ? "text-red-400" : "text-dark-300"
                )}
            >
                {formatNumber(votes)}
            </span>

            {/* Downvote button */}
            <button
                onClick={() => handleVote(-1)}
                className={cn(
                    "flex items-center justify-center rounded-lg transition-all duration-200",
                    "border hover:scale-105 active:scale-95",
                    sizeConfig.button,
                    userVote === -1
                        ? "bg-red-500/20 border-red-500/40 text-red-400"
                        : "bg-dark-800/60 border-dark-700/50 text-dark-400 hover:text-dark-200 hover:border-dark-600",
                    isAnimating === "down" && "animate-pulse"
                )}
                aria-label="Downvote"
            >
                <ChevronDown className={cn(sizeConfig.icon, userVote === -1 && "animate-bounce")} />
            </button>
        </div>
    );
}
