"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Package,
    Copy,
    Check,
    Download,
    Star,
    User,
    Calendar,
    ChevronDown,
    ChevronUp,
    ShoppingBag,
    Loader2,
} from "lucide-react";
import { Header, Footer } from "@/components";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Purchase {
    id: string;
    purchasedAt: string;
    amount: number;
    currency: string;
    product: {
        id: string;
        title: string;
        slug: string;
        description: string;
        content: string;
        usageInstructions: string | null;
        category: string;
        modelType: string;
        tags: string[];
        seller: {
            id: string;
            displayName: string;
            avatarUrl: string | null;
            isVerified: boolean;
        };
    };
}

export default function PurchasesPage() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const response = await fetch("/api/marketplace/purchases");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch purchases");
            }

            setPurchases(data.purchases);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load purchases");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (id: string, content: string) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const downloadAsText = (title: string, content: string) => {
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <Header />

            <main className="flex-1 py-8">
                <div className="container-main max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <ShoppingBag className="w-6 h-6 text-primary-400" />
                            <h1 className="text-2xl font-bold text-dark-50">My Purchases</h1>
                        </div>
                        <p className="text-dark-400">
                            Access all your purchased prompts here
                        </p>
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
                        </div>
                    ) : error ? (
                        <Card variant="glass" hover={false}>
                            <CardContent className="p-8 text-center">
                                <p className="text-red-400 mb-4">{error}</p>
                                <Button variant="secondary" onClick={fetchPurchases}>
                                    Try Again
                                </Button>
                            </CardContent>
                        </Card>
                    ) : purchases.length === 0 ? (
                        <Card variant="glass" hover={false}>
                            <CardContent className="p-12 text-center">
                                <Package className="w-12 h-12 text-dark-500 mx-auto mb-4" />
                                <h2 className="text-xl font-semibold text-dark-200 mb-2">
                                    No purchases yet
                                </h2>
                                <p className="text-dark-400 mb-6">
                                    Browse our marketplace to find amazing AI prompts
                                </p>
                                <Link href="/marketplace">
                                    <Button variant="primary">Browse Marketplace</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {purchases.map((purchase) => (
                                <Card key={purchase.id} variant="glass" hover={false}>
                                    <CardContent className="p-0">
                                        {/* Header */}
                                        <div
                                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-dark-800/30 transition-colors"
                                            onClick={() =>
                                                setExpandedId(
                                                    expandedId === purchase.id ? null : purchase.id
                                                )
                                            }
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                                                    <Package className="w-6 h-6 text-primary-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-dark-100">
                                                        {purchase.product.title}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-sm text-dark-400">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {new Date(purchase.purchasedAt).toLocaleDateString()}
                                                        </span>
                                                        <span>${purchase.amount.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Badge variant="category">{purchase.product.category}</Badge>
                                                <Badge variant="model">{purchase.product.modelType}</Badge>
                                                {expandedId === purchase.id ? (
                                                    <ChevronUp className="w-5 h-5 text-dark-400" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-dark-400" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Expanded Content */}
                                        {expandedId === purchase.id && (
                                            <div className="border-t border-dark-700/50 p-4 space-y-4">
                                                {/* Seller */}
                                                <div className="flex items-center gap-2">
                                                    {purchase.product.seller.avatarUrl ? (
                                                        <img
                                                            src={purchase.product.seller.avatarUrl}
                                                            alt={purchase.product.seller.displayName}
                                                            className="w-6 h-6 rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center">
                                                            <User className="w-3 h-3 text-dark-400" />
                                                        </div>
                                                    )}
                                                    <span className="text-sm text-dark-300">
                                                        by {purchase.product.seller.displayName}
                                                    </span>
                                                    {purchase.product.seller.isVerified && (
                                                        <span className="text-xs text-primary-400">✓</span>
                                                    )}
                                                </div>

                                                {/* Full Prompt Content */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium text-dark-300">
                                                            Prompt Content
                                                        </span>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    copyToClipboard(
                                                                        purchase.id,
                                                                        purchase.product.content
                                                                    )
                                                                }
                                                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-dark-400 hover:text-dark-200 bg-dark-700/50 hover:bg-dark-700 rounded-lg transition-colors"
                                                            >
                                                                {copiedId === purchase.id ? (
                                                                    <>
                                                                        <Check className="w-4 h-4 text-green-400" />
                                                                        Copied!
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Copy className="w-4 h-4" />
                                                                        Copy
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    downloadAsText(
                                                                        purchase.product.title,
                                                                        purchase.product.content
                                                                    )
                                                                }
                                                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-dark-400 hover:text-dark-200 bg-dark-700/50 hover:bg-dark-700 rounded-lg transition-colors"
                                                            >
                                                                <Download className="w-4 h-4" />
                                                                Download
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <pre className="p-4 rounded-lg bg-dark-900/50 border border-dark-700/50 text-sm font-mono text-dark-200 whitespace-pre-wrap overflow-x-auto max-h-96">
                                                        {purchase.product.content}
                                                    </pre>
                                                </div>

                                                {/* Usage Instructions */}
                                                {purchase.product.usageInstructions && (
                                                    <div>
                                                        <span className="text-sm font-medium text-dark-300 mb-2 block">
                                                            Usage Instructions
                                                        </span>
                                                        <pre className="p-3 rounded-lg bg-dark-800/50 text-sm text-dark-300 whitespace-pre-wrap">
                                                            {purchase.product.usageInstructions}
                                                        </pre>
                                                    </div>
                                                )}

                                                {/* Tags */}
                                                {purchase.product.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {purchase.product.tags.map((tag) => (
                                                            <Badge key={tag} variant="tag">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Actions */}
                                                <div className="flex gap-3 pt-2 border-t border-dark-700/50">
                                                    <Link href={`/marketplace/${purchase.product.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            View Product Page
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="sm">
                                                        <Star className="w-4 h-4 mr-1.5" />
                                                        Leave Review
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
