"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Search,
    Store,
    Sparkles,
    TrendingUp,
    ArrowRight,
    Loader2,
} from "lucide-react";
import { Header, Footer } from "@/components";
import { ProductCard, ProductCardCompact, FilterSidebar, type MarketplaceProduct, type FilterState } from "@/components/marketplace";
import { Button, Input, Badge, Card, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils";

const POPULAR_TAGS = ["GPT-4", "Midjourney", "Claude", "Coding", "Marketing", "Writing"];

export default function MarketplacePage() {
    const [products, setProducts] = useState<MarketplaceProduct[]>([]);
    const [featuredProducts, setFeaturedProducts] = useState<MarketplaceProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        models: [],
        priceRange: [0, 100],
        rating: 0,
        sortBy: "popular",
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch featured products
    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    // Fetch products when filters change
    useEffect(() => {
        fetchProducts();
    }, [filters, searchQuery, page]);

    const fetchFeaturedProducts = async () => {
        try {
            const response = await fetch("/api/marketplace/products?featured=true&limit=4");
            const data = await response.json();
            if (data.products) {
                setFeaturedProducts(data.products);
            }
        } catch (error) {
            console.error("Error fetching featured products:", error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            if (searchQuery) params.append("search", searchQuery);
            if (filters.categories.length === 1) params.append("category", filters.categories[0]);
            if (filters.models.length === 1) params.append("model", filters.models[0]);
            if (filters.priceRange[0] > 0) params.append("minPrice", filters.priceRange[0].toString());
            if (filters.priceRange[1] < 100) params.append("maxPrice", filters.priceRange[1].toString());
            if (filters.rating > 0) params.append("minRating", filters.rating.toString());
            params.append("sortBy", filters.sortBy);
            params.append("page", page.toString());
            params.append("limit", "12");

            const response = await fetch(`/api/marketplace/products?${params.toString()}`);
            const data = await response.json();

            if (data.products) {
                setProducts(data.products);
                setTotalPages(data.pagination?.totalPages || 1);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchProducts();
    };

    return (
        <>
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-16 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_50%)]" />

                    <div className="container-main relative">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
                                <Store className="w-4 h-4" />
                                Premium AI Prompt Marketplace
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-dark-50 mb-4 leading-tight">
                                Buy & Sell
                                <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                                    {" "}AI Prompts
                                </span>
                            </h1>

                            <p className="text-lg text-dark-400 mb-8 max-w-2xl mx-auto">
                                Discover battle-tested prompts from expert creators or sell your own.
                                Keep 80% of every sale with instant PayPal payouts.
                            </p>

                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                                    <Input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search prompts..."
                                        className="pl-12 pr-24 h-14 text-lg"
                                    />
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                    >
                                        Search
                                    </Button>
                                </div>
                            </form>

                            {/* Popular Tags */}
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                <span className="text-sm text-dark-500">Popular:</span>
                                {POPULAR_TAGS.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => setSearchQuery(tag)}
                                        className="px-3 py-1 text-sm rounded-full bg-dark-800/50 border border-dark-700/50 text-dark-300 hover:bg-dark-700/50 hover:text-dark-100 transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                {featuredProducts.length > 0 && (
                    <section className="py-12 border-y border-dark-700/50">
                        <div className="container-main">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-dark-50">Featured Prompts</h2>
                                        <p className="text-sm text-dark-400">Hand-picked by our team</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {featuredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        variant="featured"
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Main Content */}
                <section className="py-12">
                    <div className="container-main">
                        <div className="flex gap-8">
                            {/* Sidebar */}
                            <aside className="hidden lg:block w-64 shrink-0">
                                <FilterSidebar onFiltersChange={setFilters} />
                            </aside>

                            {/* Products Grid */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-dark-100">
                                        {loading ? "Loading..." : `${products.length} Prompts Available`}
                                    </h2>
                                </div>

                                {loading ? (
                                    <div className="flex items-center justify-center py-20">
                                        <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
                                    </div>
                                ) : products.length === 0 ? (
                                    <Card variant="glass" hover={false}>
                                        <CardContent className="p-12 text-center">
                                            <Store className="w-12 h-12 text-dark-500 mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold text-dark-200 mb-2">
                                                No prompts found
                                            </h3>
                                            <p className="text-dark-400 mb-6">
                                                Try adjusting your search or filters
                                            </p>
                                            <Button variant="secondary" onClick={() => {
                                                setSearchQuery("");
                                                setFilters({
                                                    categories: [],
                                                    models: [],
                                                    priceRange: [0, 100],
                                                    rating: 0,
                                                    sortBy: "popular",
                                                });
                                            }}>
                                                Clear Filters
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {products.map((product) => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <div className="flex items-center justify-center gap-2 mt-8">
                                                <Button
                                                    variant="ghost"
                                                    disabled={page === 1}
                                                    onClick={() => setPage(p => p - 1)}
                                                >
                                                    Previous
                                                </Button>
                                                <span className="text-sm text-dark-400">
                                                    Page {page} of {totalPages}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    disabled={page === totalPages}
                                                    onClick={() => setPage(p => p + 1)}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 border-t border-dark-700/50">
                    <div className="container-main">
                        <Card variant="glass" hover={false} className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 md:p-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-4">
                                            <TrendingUp className="w-4 h-4" />
                                            Keep 80% of every sale
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-dark-50 mb-4">
                                            Start Selling Your Prompts Today
                                        </h2>
                                        <p className="text-dark-400 mb-6">
                                            Turn your AI expertise into income. Create once, earn forever.
                                            Instant PayPal payouts to your account.
                                        </p>
                                        <Link href="/sell/become-seller">
                                            <Button variant="accent" size="lg">
                                                Become a Seller
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="hidden md:block relative bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Store className="w-32 h-32 text-primary-400/20" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
