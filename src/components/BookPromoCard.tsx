"use client";

import Image from "next/image";
import { ExternalLink, Star, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui";

interface BookPromoCardProps {
    variant?: "default" | "compact" | "featured";
    className?: string;
}

const BOOK_DATA = {
    title: "The Art of the Prompt",
    subtitle: "A Professional's Guide to Mastering AI Communication and Amplifying Your Work",
    author: "Eric Keller",
    amazonUrl: "https://www.amazon.com/dp/B0FPK6Y2ZB",
    coverImage: "/images/bookcover.jpg",
    rating: 5.0,
    pages: 215,
    kindlePrice: "$17.99",
    isKindleUnlimited: true,
};

export function BookPromoCard({ variant = "default", className = "" }: BookPromoCardProps) {
    if (variant === "compact") {
        return (
            <a
                href={BOOK_DATA.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all ${className}`}
            >
                <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark-100 truncate">Get the Book</p>
                    <p className="text-xs text-dark-400 truncate">{BOOK_DATA.title}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-dark-400 group-hover:text-amber-400 transition-colors shrink-0" />
            </a>
        );
    }

    if (variant === "featured") {
        return (
            <section className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-dark-700/50 ${className}`}>
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-full blur-3xl" />

                <div className="relative p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Book Cover */}
                        <div className="relative shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg blur-xl" />
                            <div className="relative w-40 md:w-48 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl border border-dark-600/50">
                                <Image
                                    src={BOOK_DATA.coverImage}
                                    alt={BOOK_DATA.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {BOOK_DATA.isKindleUnlimited && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                    FREE
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-amber-400 font-medium text-sm mb-2 flex items-center justify-center md:justify-start gap-2">
                                <BookOpen className="w-4 h-4" />
                                From the Creator of Godly Prompts
                            </p>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                {BOOK_DATA.title}
                            </h2>
                            <p className="text-dark-300 mb-4 max-w-xl">
                                {BOOK_DATA.subtitle}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <span className="text-dark-300 text-sm">{BOOK_DATA.rating} rating • {BOOK_DATA.pages} pages</span>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                                <a
                                    href={BOOK_DATA.amazonUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
                                >
                                    Read Free with Kindle Unlimited
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <span className="text-dark-400 text-sm">
                                    or buy for {BOOK_DATA.kindlePrice}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Default variant - sidebar card
    return (
        <Card variant="glass" hover={false} className={className}>
            <CardContent className="p-4">
                <div className="flex gap-4">
                    {/* Book Cover */}
                    <div className="relative shrink-0 w-20 aspect-[2/3] rounded-md overflow-hidden shadow-lg">
                        <Image
                            src={BOOK_DATA.coverImage}
                            alt={BOOK_DATA.title}
                            fill
                            className="object-cover"
                        />
                        {BOOK_DATA.isKindleUnlimited && (
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold text-center py-0.5">
                                FREE
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <p className="text-amber-400 text-xs font-medium mb-1">From the Author</p>
                        <h3 className="font-semibold text-dark-100 text-sm leading-tight mb-1">
                            {BOOK_DATA.title}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <a
                            href={BOOK_DATA.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
                        >
                            Get on Amazon
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
