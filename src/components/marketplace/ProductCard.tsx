"use client";

import Link from "next/link";
import { Star, ShoppingCart, Eye, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MarketplaceProduct {
    id: string;
    title: string;
    description: string;
    previewContent?: string;
    price: number;
    currency: string;
    category: string;
    modelType: string;
    thumbnailUrl?: string;
    salesCount: number;
    rating: number;
    reviewCount: number;
    isFeatured: boolean;
    seller: {
        id: string;
        displayName: string;
        avatarUrl?: string;
        isVerified: boolean;
    };
}

interface ProductCardProps {
    product: MarketplaceProduct;
    variant?: "default" | "compact" | "featured";
    onAddToCart?: (product: MarketplaceProduct) => void;
}

export function ProductCard({ product, variant = "default", onAddToCart }: ProductCardProps) {
    const isFeatured = variant === "featured" || product.isFeatured;

    return (
        <div
            className={cn(
                "group relative rounded-xl overflow-hidden transition-all duration-300",
                "bg-gradient-to-br from-dark-800/80 to-dark-900/80",
                "border hover:border-primary-500/40",
                isFeatured
                    ? "border-amber-500/30 shadow-lg shadow-amber-500/5"
                    : "border-dark-700/50",
                variant === "compact" ? "p-3" : "p-4"
            )}
        >
            {/* Featured Badge */}
            {isFeatured && (
                <div className="absolute top-3 right-3 z-10">
                    <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-dark-900 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        Featured
                    </span>
                </div>
            )}

            {/* Thumbnail */}
            {product.thumbnailUrl ? (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-dark-700">
                    <img
                        src={product.thumbnailUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                </div>
            ) : (
                <div className="aspect-video rounded-lg mb-3 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center">
                    <div className="text-4xl opacity-50">✨</div>
                </div>
            )}

            {/* Content */}
            <div className="space-y-2">
                {/* Category & Model */}
                <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                        {product.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-dark-700/50 text-dark-400 border border-dark-600/30">
                        {product.modelType}
                    </span>
                </div>

                {/* Title */}
                <Link href={`/marketplace/${product.id}`}>
                    <h3 className="font-semibold text-dark-100 group-hover:text-primary-400 transition-colors line-clamp-2">
                        {product.title}
                    </h3>
                </Link>

                {/* Description */}
                {variant !== "compact" && (
                    <p className="text-sm text-dark-400 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Seller */}
                <div className="flex items-center gap-2">
                    {product.seller.avatarUrl ? (
                        <img
                            src={product.seller.avatarUrl}
                            alt={product.seller.displayName}
                            className="w-5 h-5 rounded-full"
                        />
                    ) : (
                        <div className="w-5 h-5 rounded-full bg-dark-700 flex items-center justify-center">
                            <User className="w-3 h-3 text-dark-400" />
                        </div>
                    )}
                    <span className="text-xs text-dark-400">
                        {product.seller.displayName}
                    </span>
                    {product.seller.isVerified && (
                        <span className="text-xs text-primary-400">✓</span>
                    )}
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between pt-2 border-t border-dark-700/50">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-dark-200">
                            {product.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-dark-500">
                            ({product.reviewCount})
                        </span>
                    </div>

                    {/* Sales */}
                    <div className="flex items-center gap-1 text-xs text-dark-400">
                        <Eye className="w-3.5 h-3.5" />
                        {product.salesCount} sold
                    </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-dark-50">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-dark-500">{product.currency}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {onAddToCart && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onAddToCart(product);
                                }}
                                className="p-2 rounded-lg bg-dark-700/50 hover:bg-dark-700 text-dark-400 hover:text-dark-100 transition-colors"
                                title="Add to cart"
                            >
                                <ShoppingCart className="w-4 h-4" />
                            </button>
                        )}
                        <Link
                            href={`/marketplace/${product.id}`}
                            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors"
                        >
                            Buy Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Compact version for sidebar/related products
export function ProductCardCompact({ product }: { product: MarketplaceProduct }) {
    return (
        <Link
            href={`/marketplace/${product.id}`}
            className="flex gap-3 p-3 rounded-lg bg-dark-800/50 hover:bg-dark-800 border border-dark-700/50 hover:border-dark-600/50 transition-all"
        >
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center shrink-0">
                <span className="text-2xl">✨</span>
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-dark-100 text-sm line-clamp-1">{product.title}</h4>
                <p className="text-xs text-dark-400 line-clamp-1">{product.seller.displayName}</p>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold text-primary-400">${product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-dark-400">{product.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
