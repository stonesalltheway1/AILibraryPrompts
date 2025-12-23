"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, MessageCircle, Flame, Sparkles, Zap, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui";
import { Badge } from "@/components/ui/Badge";
import { VoteButtons } from "@/components/VoteButtons";
import { cn, formatNumber, formatDate, truncate } from "@/lib/utils";
import type { Prompt } from "@/lib/types";

interface PromptCardProps {
    prompt: Prompt;
    showTrendingIndicator?: boolean;
}

export function PromptCard({ prompt, showTrendingIndicator = true }: PromptCardProps) {
    // Calculate trending status
    const ageInHours = (Date.now() - prompt.createdAt.getTime()) / (1000 * 60 * 60);
    const isHot = ageInHours < 24 && prompt.votes > 100;
    const isRising = ageInHours < 72 && prompt.votes > 50;

    return (
        <Card className="group relative overflow-hidden">
            {/* Gradient border effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-secondary-500/0 to-primary-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

            <div className="relative p-5">
                {/* Header with votes and badges */}
                <div className="flex items-start gap-4 mb-4">
                    {/* Vote buttons */}
                    <VoteButtons
                        promptId={prompt.id}
                        initialVotes={prompt.votes}
                        initialUserVote={prompt.userVote}
                        size="sm"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Title */}
                        <Link
                            href={`/prompts/${prompt.slug}`}
                            className="block group/title"
                        >
                            <h3 className="text-base font-semibold text-dark-100 group-hover/title:text-primary-400 transition-colors line-clamp-2 mb-2">
                                {prompt.title}
                            </h3>
                        </Link>

                        {/* Badges row */}
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Model badge */}
                            <Badge variant="model" modelName={prompt.model.name} size="sm">
                                {prompt.model.name}
                            </Badge>

                            {/* Category badge */}
                            <Badge variant="category" size="sm">
                                {prompt.category.name}
                            </Badge>

                            {/* Trending indicators */}
                            {showTrendingIndicator && (
                                <>
                                    {prompt.featured && (
                                        <span className="flex items-center gap-1 text-xs text-primary-400">
                                            <Sparkles className="w-3 h-3" />
                                            Featured
                                        </span>
                                    )}
                                    {isHot && !prompt.featured && (
                                        <span className="flex items-center gap-1 text-xs text-amber-400">
                                            <Flame className="w-3 h-3" />
                                            Hot
                                        </span>
                                    )}
                                    {isRising && !isHot && !prompt.featured && (
                                        <span className="flex items-center gap-1 text-xs text-green-400">
                                            <Zap className="w-3 h-3" />
                                            Rising
                                        </span>
                                    )}
                                </>
                            )}

                            {/* Verified indicator */}
                            {prompt.verified && (
                                <span className="flex items-center gap-1 text-xs text-cyan-400">
                                    <CheckCircle2 className="w-3 h-3" />
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prompt preview */}
                <div className="mb-4">
                    <p className="text-sm text-dark-400 line-clamp-3">
                        {truncate(prompt.description || prompt.content.slice(0, 200), 150)}
                    </p>
                </div>

                {/* Tags */}
                {prompt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {prompt.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag.id} variant="tag" size="sm">
                                {tag.name}
                            </Badge>
                        ))}
                        {prompt.tags.length > 3 && (
                            <span className="text-xs text-dark-500">+{prompt.tags.length - 3}</span>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-dark-700/30">
                    {/* Author */}
                    <Link
                        href={`/user/${prompt.user.username}`}
                        className="flex items-center gap-2 group/author"
                    >
                        {prompt.user.image ? (
                            <Image
                                src={prompt.user.image}
                                alt={prompt.user.username}
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-xs font-medium text-white">
                                {prompt.user.username[0].toUpperCase()}
                            </div>
                        )}
                        <span className="text-sm text-dark-400 group-hover/author:text-dark-200 transition-colors">
                            @{prompt.user.username}
                        </span>
                    </Link>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-dark-500">
                        <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {formatNumber(prompt.views)}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageCircle className="w-3.5 h-3.5" />
                            {prompt.commentCount}
                        </span>
                        <span>{formatDate(prompt.createdAt)}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

// Compact variant for sidebars
export function PromptCardCompact({ prompt }: { prompt: Prompt }) {
    return (
        <Link
            href={`/prompts/${prompt.slug}`}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-dark-800/50 transition-colors group"
        >
            <span className="text-sm font-semibold text-dark-400 group-hover:text-green-400 transition-colors min-w-[40px]">
                ▲ {formatNumber(prompt.votes)}
            </span>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-dark-200 group-hover:text-dark-50 transition-colors line-clamp-2 mb-1">
                    {prompt.title}
                </h4>
                <div className="flex items-center gap-2">
                    <Badge variant="model" modelName={prompt.model.name} size="sm">
                        {prompt.model.name}
                    </Badge>
                </div>
            </div>
        </Link>
    );
}
