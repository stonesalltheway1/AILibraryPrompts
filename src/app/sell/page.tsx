"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
    DollarSign,
    Package,
    TrendingUp,
    Clock,
    Plus,
    Eye,
    Pencil,
    Trash2,
    Star,
    Store,
    Loader2,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { Header, Footer } from "@/components";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

interface SellerProduct {
    id: string;
    title: string;
    slug: string;
    price: number;
    salesCount: number;
    rating: number;
    reviewCount: number;
    isActive: boolean;
    createdAt: string;
}

interface SellerStats {
    monthlyEarnings: number;
    monthlySales: number;
    pendingPayout: number;
    recentSales: Array<{
        id: string;
        productTitle: string;
        amount: number;
        date: string;
    }>;
}

interface SellerData {
    id: string;
    displayName: string;
    bio: string | null;
    avatarUrl: string | null;
    paypalEmail: string;
    totalEarnings: number;
    totalSales: number;
    rating: number;
    reviewCount: number;
    isVerified: boolean;
    createdAt: string;
    products: SellerProduct[];
}

export default function SellerDashboard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, isLoaded } = useUser();

    const [seller, setSeller] = useState<SellerData | null>(null);
    const [stats, setStats] = useState<SellerStats | null>(null);
    const [hasSeller, setHasSeller] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"overview" | "products" | "analytics">("overview");
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        if (searchParams.get("welcome") === "true") {
            setShowWelcome(true);
            // Clear the param after showing
            setTimeout(() => setShowWelcome(false), 5000);
        }
    }, [searchParams]);

    useEffect(() => {
        if (isLoaded && user) {
            fetchSellerData();
        } else if (isLoaded && !user) {
            setLoading(false);
        }
    }, [isLoaded, user]);

    const fetchSellerData = async () => {
        try {
            const response = await fetch("/api/marketplace/seller");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch seller data");
            }

            setHasSeller(data.hasSeller);
            setSeller(data.seller);
            setStats(data.stats);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded || loading) {
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

    if (!user) {
        return (
            <>
                <Header />
                <main className="flex-1 py-16">
                    <div className="container-main max-w-lg text-center">
                        <Store className="w-16 h-16 text-primary-400 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold text-dark-50 mb-4">
                            Sign In to Access Dashboard
                        </h1>
                        <p className="text-dark-400 mb-8">
                            You need to sign in to access your seller dashboard.
                        </p>
                        <Link href="/sign-in">
                            <Button variant="primary" size="lg">Sign In</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!hasSeller) {
        return (
            <>
                <Header />
                <main className="flex-1 py-16">
                    <div className="container-main max-w-lg text-center">
                        <Store className="w-16 h-16 text-primary-400 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold text-dark-50 mb-4">
                            Become a Seller
                        </h1>
                        <p className="text-dark-400 mb-8">
                            You haven&apos;t set up your seller profile yet. Create one to start selling prompts.
                        </p>
                        <Link href="/sell/become-seller">
                            <Button variant="accent" size="lg">
                                <Plus className="w-5 h-5 mr-2" />
                                Create Seller Profile
                            </Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="flex-1 py-8">
                <div className="container-main">
                    {/* Welcome Banner */}
                    {showWelcome && (
                        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-green-300">
                                Welcome! Your seller profile is ready. Start by listing your first prompt.
                            </span>
                        </div>
                    )}

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-dark-50">Seller Dashboard</h1>
                            <p className="text-dark-400">Welcome back, {seller?.displayName}</p>
                        </div>
                        <Link href="/sell/create">
                            <Button variant="accent">
                                <Plus className="w-4 h-4 mr-2" />
                                List New Prompt
                            </Button>
                        </Link>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 border-b border-dark-700/50 mb-8">
                        {(["overview", "products", "analytics"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "pb-3 text-sm font-medium transition-colors relative capitalize",
                                    activeTab === tab
                                        ? "text-primary-400"
                                        : "text-dark-400 hover:text-dark-200"
                                )}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="space-y-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                                <DollarSign className="w-5 h-5 text-green-400" />
                                            </div>
                                            <span className="text-sm text-dark-400">Total Earnings</span>
                                        </div>
                                        <p className="text-2xl font-bold text-dark-50">
                                            ${seller?.totalEarnings.toFixed(2) || "0.00"}
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                                                <TrendingUp className="w-5 h-5 text-primary-400" />
                                            </div>
                                            <span className="text-sm text-dark-400">Monthly Earnings</span>
                                        </div>
                                        <p className="text-2xl font-bold text-dark-50">
                                            ${stats?.monthlyEarnings.toFixed(2) || "0.00"}
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                                <Clock className="w-5 h-5 text-amber-400" />
                                            </div>
                                            <span className="text-sm text-dark-400">Pending Payout</span>
                                        </div>
                                        <p className="text-2xl font-bold text-dark-50">
                                            ${stats?.pendingPayout.toFixed(2) || "0.00"}
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-lg bg-secondary-500/10 flex items-center justify-center">
                                                <Package className="w-5 h-5 text-secondary-400" />
                                            </div>
                                            <span className="text-sm text-dark-400">Total Products</span>
                                        </div>
                                        <p className="text-2xl font-bold text-dark-50">
                                            {seller?.products.length || 0}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Recent Sales & Top Products */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Recent Sales */}
                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-dark-100 mb-4">Recent Sales</h3>
                                        {stats?.recentSales && stats.recentSales.length > 0 ? (
                                            <div className="space-y-3">
                                                {stats.recentSales.map((sale) => (
                                                    <div key={sale.id} className="flex items-center justify-between py-2 border-b border-dark-700/50 last:border-0">
                                                        <div>
                                                            <p className="text-sm font-medium text-dark-200">{sale.productTitle}</p>
                                                            <p className="text-xs text-dark-500">
                                                                {sale.date ? new Date(sale.date).toLocaleDateString() : "Recent"}
                                                            </p>
                                                        </div>
                                                        <span className="text-sm font-semibold text-green-400">
                                                            +${sale.amount.toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-dark-500 text-sm">No sales yet</p>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Top Products */}
                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-dark-100 mb-4">Top Products</h3>
                                        {seller?.products && seller.products.length > 0 ? (
                                            <div className="space-y-3">
                                                {seller.products
                                                    .sort((a, b) => b.salesCount - a.salesCount)
                                                    .slice(0, 5)
                                                    .map((product, index) => (
                                                        <div key={product.id} className="flex items-center justify-between py-2 border-b border-dark-700/50 last:border-0">
                                                            <div className="flex items-center gap-3">
                                                                <span className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center text-xs text-dark-400">
                                                                    {index + 1}
                                                                </span>
                                                                <p className="text-sm font-medium text-dark-200">{product.title}</p>
                                                            </div>
                                                            <span className="text-sm text-dark-400">
                                                                {product.salesCount} sales
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <p className="text-dark-500 text-sm mb-4">No products yet</p>
                                                <Link href="/sell/create">
                                                    <Button variant="secondary" size="sm">
                                                        <Plus className="w-4 h-4 mr-1" />
                                                        Create First Product
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === "products" && (
                        <div>
                            {seller?.products && seller.products.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-dark-700/50">
                                                <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Product</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Price</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Sales</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Rating</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-dark-400">Status</th>
                                                <th className="text-right py-3 px-4 text-sm font-medium text-dark-400">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {seller.products.map((product) => (
                                                <tr key={product.id} className="border-b border-dark-700/30 hover:bg-dark-800/30">
                                                    <td className="py-4 px-4">
                                                        <Link href={`/marketplace/${product.id}`} className="text-dark-200 hover:text-primary-400">
                                                            {product.title}
                                                        </Link>
                                                    </td>
                                                    <td className="py-4 px-4 text-dark-300">${product.price.toFixed(2)}</td>
                                                    <td className="py-4 px-4 text-dark-300">{product.salesCount}</td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                            <span className="text-dark-300">{product.rating.toFixed(1)}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <Badge variant={product.isActive ? "category" : "tag"}>
                                                            {product.isActive ? "Active" : "Inactive"}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link href={`/marketplace/${product.id}`}>
                                                                <button className="p-2 rounded-lg hover:bg-dark-700/50 text-dark-400 hover:text-dark-200">
                                                                    <Eye className="w-4 h-4" />
                                                                </button>
                                                            </Link>
                                                            <button className="p-2 rounded-lg hover:bg-dark-700/50 text-dark-400 hover:text-dark-200">
                                                                <Pencil className="w-4 h-4" />
                                                            </button>
                                                            <button className="p-2 rounded-lg hover:bg-red-500/10 text-dark-400 hover:text-red-400">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-12 text-center">
                                        <Package className="w-12 h-12 text-dark-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-dark-200 mb-2">No products yet</h3>
                                        <p className="text-dark-400 mb-6">Create your first product to start selling</p>
                                        <Link href="/sell/create">
                                            <Button variant="primary">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Create Product
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === "analytics" && (
                        <Card variant="glass" hover={false}>
                            <CardContent className="p-12 text-center">
                                <TrendingUp className="w-12 h-12 text-dark-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-dark-200 mb-2">Analytics Coming Soon</h3>
                                <p className="text-dark-400">
                                    Detailed analytics and insights will be available here
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
