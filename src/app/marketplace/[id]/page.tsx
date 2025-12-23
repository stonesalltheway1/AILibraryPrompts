"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    Star,
    Eye,
    Heart,
    Share2,
    User,
    CheckCircle,
    Copy,
    MessageSquare,
    Shield,
    Zap,
    ChevronDown,
    Loader2,
    Download,
} from "lucide-react";
import { Header, Footer } from "@/components";
import { CheckoutButton, ProductCardCompact, type MarketplaceProduct } from "@/components/marketplace";
import { Button, Badge, Card, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ProductDetails extends MarketplaceProduct {
    content?: string | null;
    usageInstructions?: string;
    tags?: string[];
    reviews?: Array<{
        id: string;
        rating: number;
        title: string | null;
        content: string | null;
        isVerified: boolean;
        createdAt: string;
        buyer: {
            displayName: string | null;
            avatarUrl: string | null;
        };
    }>;
}

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;

    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [hasPurchased, setHasPurchased] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showFullPreview, setShowFullPreview] = useState(false);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`/api/marketplace/products/${productId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch product");
            }

            setProduct(data.product);
            setHasPurchased(data.hasPurchased);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load product");
        } finally {
            setLoading(false);
        }
    };

    const copyContent = () => {
        const contentToCopy = hasPurchased && product?.content
            ? product.content
            : product?.previewContent;
        if (contentToCopy) {
            navigator.clipboard.writeText(contentToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const downloadContent = () => {
        if (hasPurchased && product?.content) {
            const blob = new Blob([product.content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${product.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    const handlePurchaseSuccess = (details: { orderId: string; productId: string; productContent?: string }) => {
        console.log("Purchase successful!", details);
        setHasPurchased(true);
        if (details.productContent) {
            setProduct((prev) => prev ? { ...prev, content: details.productContent } : prev);
        }
        // Refresh to get full content
        fetchProduct();
    };

    if (loading) {
        return (
            <>
                <Header />
                <main className="flex-1 flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
                </main>
                <Footer />
            </>
        );
    }

    if (error || !product) {
        return (
            <>
                <Header />
                <main className="flex-1 py-20">
                    <div className="container-main text-center">
                        <h1 className="text-2xl font-bold text-dark-100 mb-4">Product Not Found</h1>
                        <p className="text-dark-400 mb-6">{error || "This product doesn't exist."}</p>
                        <Link href="/marketplace">
                            <Button variant="primary">Back to Marketplace</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Extract variables from preview content
    const variables = product.previewContent?.match(/\{[^}]+\}/g) || [];

    return (
        <>
            <Header />

            <main className="flex-1 py-8">
                <div className="container-main">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-dark-400 mb-6">
                        <Link href="/marketplace" className="hover:text-dark-200 flex items-center gap-1">
                            <ArrowLeft className="w-4 h-4" />
                            Marketplace
                        </Link>
                        <span>/</span>
                        <span className="text-dark-300">{product.category}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge variant="category">{product.category}</Badge>
                                    <Badge variant="model">{product.modelType}</Badge>
                                    {product.isFeatured && (
                                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                                            ⭐ Featured
                                        </Badge>
                                    )}
                                    {hasPurchased && (
                                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                            ✓ Purchased
                                        </Badge>
                                    )}
                                </div>

                                <h1 className="text-3xl font-bold text-dark-50 mb-4">
                                    {product.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        <span className="font-medium text-dark-100">{product.rating?.toFixed(1) || "0.0"}</span>
                                        <span className="text-dark-400">({product.reviewCount || 0} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-dark-400">
                                        <Eye className="w-4 h-4" />
                                        {product.salesCount} purchases
                                    </div>
                                </div>
                            </div>

                            {/* Prompt Content */}
                            <Card variant="glass" hover={false}>
                                <CardContent className="p-0">
                                    <div className="flex items-center justify-between p-4 border-b border-dark-700/50">
                                        <span className="text-sm font-medium text-dark-300">
                                            {hasPurchased ? "Full Prompt Content" : "Prompt Preview"}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={copyContent}
                                                className="flex items-center gap-1.5 text-sm text-dark-400 hover:text-dark-200 transition-colors"
                                            >
                                                {copied ? (
                                                    <>
                                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-4 h-4" />
                                                        Copy
                                                    </>
                                                )}
                                            </button>
                                            {hasPurchased && (
                                                <button
                                                    onClick={downloadContent}
                                                    className="flex items-center gap-1.5 text-sm text-dark-400 hover:text-dark-200 transition-colors"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4 relative">
                                        <pre className={cn(
                                            "text-sm font-mono text-dark-300 whitespace-pre-wrap",
                                            !showFullPreview && !hasPurchased && "line-clamp-6"
                                        )}>
                                            {hasPurchased && product.content
                                                ? product.content
                                                : product.previewContent}
                                        </pre>

                                        {!hasPurchased && !showFullPreview && (
                                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark-800 to-transparent pointer-events-none" />
                                        )}
                                    </div>
                                    {!hasPurchased && (
                                        <div className="px-4 pb-4">
                                            <button
                                                onClick={() => setShowFullPreview(!showFullPreview)}
                                                className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300"
                                            >
                                                {showFullPreview ? "Show less" : "Show more preview"}
                                                <ChevronDown className={cn(
                                                    "w-4 h-4 transition-transform",
                                                    showFullPreview && "rotate-180"
                                                )} />
                                            </button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Variables Detected */}
                            {variables.length > 0 && (
                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-4">
                                        <h3 className="font-medium text-dark-200 mb-3">Variables to Customize</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {variables.map((variable, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1.5 text-sm font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-lg"
                                                >
                                                    {variable}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Tabs */}
                            <div>
                                <div className="flex gap-4 border-b border-dark-700/50 mb-6">
                                    <button
                                        onClick={() => setActiveTab("description")}
                                        className={cn(
                                            "pb-3 text-sm font-medium transition-colors relative",
                                            activeTab === "description"
                                                ? "text-primary-400"
                                                : "text-dark-400 hover:text-dark-200"
                                        )}
                                    >
                                        Description
                                        {activeTab === "description" && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("reviews")}
                                        className={cn(
                                            "pb-3 text-sm font-medium transition-colors relative flex items-center gap-2",
                                            activeTab === "reviews"
                                                ? "text-primary-400"
                                                : "text-dark-400 hover:text-dark-200"
                                        )}
                                    >
                                        Reviews
                                        <span className="px-1.5 py-0.5 text-xs rounded-full bg-dark-700/50">
                                            {product.reviewCount || 0}
                                        </span>
                                        {activeTab === "reviews" && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400" />
                                        )}
                                    </button>
                                </div>

                                {activeTab === "description" ? (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold text-dark-100 mb-3">About this prompt</h3>
                                            <p className="text-dark-300 leading-relaxed">
                                                {product.description}
                                            </p>
                                        </div>

                                        {product.usageInstructions && (
                                            <div>
                                                <h3 className="font-semibold text-dark-100 mb-3">How to use</h3>
                                                <div className="p-4 rounded-lg bg-dark-800/50 border border-dark-700/50">
                                                    <pre className="text-sm text-dark-300 whitespace-pre-wrap">
                                                        {product.usageInstructions}
                                                    </pre>
                                                </div>
                                            </div>
                                        )}

                                        {product.tags && product.tags.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold text-dark-100 mb-3">Tags</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.tags.map((tag) => (
                                                        <Badge key={tag} variant="tag">{tag}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {product.reviews && product.reviews.length > 0 ? (
                                            product.reviews.map((review) => (
                                                <Card key={review.id} variant="glass" hover={false}>
                                                    <CardContent className="p-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center">
                                                                    <User className="w-4 h-4 text-dark-400" />
                                                                </div>
                                                                <span className="font-medium text-dark-200">
                                                                    {review.buyer.displayName || "Anonymous"}
                                                                </span>
                                                                {review.isVerified && (
                                                                    <span className="text-xs text-green-400 flex items-center gap-1">
                                                                        <CheckCircle className="w-3 h-3" />
                                                                        Verified Purchase
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-0.5">
                                                                {Array.from({ length: 5 }).map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={cn(
                                                                            "w-4 h-4",
                                                                            i < review.rating
                                                                                ? "text-amber-400 fill-amber-400"
                                                                                : "text-dark-600"
                                                                        )}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {review.title && (
                                                            <h4 className="font-medium text-dark-100 mb-1">{review.title}</h4>
                                                        )}
                                                        {review.content && (
                                                            <p className="text-sm text-dark-400">{review.content}</p>
                                                        )}
                                                        <p className="text-xs text-dark-500 mt-2">
                                                            {new Date(review.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        ) : (
                                            <Card variant="glass" hover={false}>
                                                <CardContent className="p-8 text-center">
                                                    <MessageSquare className="w-8 h-8 text-dark-500 mx-auto mb-3" />
                                                    <p className="text-dark-400">No reviews yet</p>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Purchase Card */}
                            <Card variant="glass" hover={false} className="sticky top-4">
                                <CardContent className="p-6">
                                    {hasPurchased ? (
                                        <div className="text-center py-4">
                                            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                                            <h3 className="text-lg font-semibold text-dark-100 mb-2">
                                                You Own This Prompt
                                            </h3>
                                            <p className="text-sm text-dark-400 mb-4">
                                                Full content is available above
                                            </p>
                                            <Button variant="secondary" className="w-full" onClick={downloadContent}>
                                                <Download className="w-4 h-4 mr-2" />
                                                Download Prompt
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-baseline gap-2 mb-4">
                                                <span className="text-3xl font-bold text-dark-50">
                                                    ${product.price.toFixed(2)}
                                                </span>
                                                <span className="text-dark-400">{product.currency}</span>
                                            </div>

                                            {/* PayPal Checkout */}
                                            <div className="mb-4">
                                                <CheckoutButton
                                                    productId={product.id}
                                                    productTitle={product.title}
                                                    price={product.price}
                                                    currency={product.currency}
                                                    onSuccess={handlePurchaseSuccess}
                                                />
                                            </div>

                                            {/* Trust Badges */}
                                            <div className="space-y-2 pt-4 border-t border-dark-700/50">
                                                <div className="flex items-center gap-2 text-sm text-dark-400">
                                                    <Shield className="w-4 h-4 text-green-400" />
                                                    <span>Secure checkout with PayPal</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-dark-400">
                                                    <Zap className="w-4 h-4 text-amber-400" />
                                                    <span>Instant access after purchase</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-dark-400">
                                                    <MessageSquare className="w-4 h-4 text-primary-400" />
                                                    <span>Support included</span>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-4 border-t border-dark-700/50 mt-4">
                                        <button className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg bg-dark-700/50 hover:bg-dark-700 text-dark-400 hover:text-dark-200 transition-colors">
                                            <Heart className="w-4 h-4" />
                                            <span className="text-sm">Save</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg bg-dark-700/50 hover:bg-dark-700 text-dark-400 hover:text-dark-200 transition-colors">
                                            <Share2 className="w-4 h-4" />
                                            <span className="text-sm">Share</span>
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Seller Card */}
                            <Card variant="glass" hover={false}>
                                <CardContent className="p-4">
                                    <h3 className="text-sm font-medium text-dark-400 uppercase tracking-wider mb-3">
                                        About the Seller
                                    </h3>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                                            {product.seller.avatarUrl ? (
                                                <img
                                                    src={product.seller.avatarUrl}
                                                    alt={product.seller.displayName}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <User className="w-6 h-6 text-primary-400" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-dark-100">
                                                    {product.seller.displayName}
                                                </span>
                                                {product.seller.isVerified && (
                                                    <span className="text-primary-400 text-xs flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Verified
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/seller/${product.seller.id}`}
                                        className="block w-full text-center py-2 rounded-lg bg-dark-700/50 hover:bg-dark-700 text-dark-300 hover:text-dark-100 text-sm transition-colors"
                                    >
                                        View Profile
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
