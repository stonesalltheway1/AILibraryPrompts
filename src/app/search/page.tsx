import Link from "next/link";
import type { Metadata } from "next";
import { Search as SearchIcon, Filter, TrendingUp, Clock, Star } from "lucide-react";
import { Header, Footer, PromptCard } from "@/components";
import { Button, Input, Badge } from "@/components/ui";
import { searchPrompts, mockCategories, mockModels } from "@/lib/mock-data";

interface PageProps {
    searchParams: Promise<{
        q?: string;
        category?: string;
        model?: string;
        tag?: string;
        sort?: string;
    }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const { q } = await searchParams;

    return {
        title: q ? `Search: ${q} - Godly Prompts` : "Search Prompts - Godly Prompts",
        description: "Search through thousands of AI prompts for ChatGPT, Claude, Gemini, and more.",
    };
}

export default async function SearchPage({ searchParams }: PageProps) {
    const { q = "", category, model, tag, sort = "trending" } = await searchParams;

    let prompts = q ? searchPrompts(q) : [];

    // Apply filters
    if (category) {
        prompts = prompts.filter((p) => p.category.slug === category);
    }
    if (model) {
        prompts = prompts.filter((p) => p.model.slug === model);
    }
    if (tag) {
        prompts = prompts.filter((p) => p.tags.some((t) => t.slug === tag));
    }

    // Sort
    switch (sort) {
        case "new":
            prompts = [...prompts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            break;
        case "top":
            prompts = [...prompts].sort((a, b) => b.votes - a.votes);
            break;
        default:
            prompts = [...prompts].sort((a, b) => {
                const ageA = (Date.now() - a.createdAt.getTime()) / (1000 * 60 * 60);
                const ageB = (Date.now() - b.createdAt.getTime()) / (1000 * 60 * 60);
                return b.votes / Math.pow(ageB + 2, 1.5) - a.votes / Math.pow(ageA + 2, 1.5);
            });
    }

    const buildUrl = (newParams: Record<string, string | undefined>) => {
        const params = new URLSearchParams();
        const merged = { q, category, model, tag, sort, ...newParams };
        Object.entries(merged).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        return `/search?${params.toString()}`;
    };

    return (
        <>
            <Header />

            <main className="flex-1">
                <div className="container-main py-8">
                    {/* Search Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-dark-50 mb-4">
                            Search Prompts
                        </h1>

                        <form action="/search" className="max-w-2xl">
                            <div className="relative">
                                <Input
                                    name="q"
                                    defaultValue={q}
                                    placeholder="Search for prompts..."
                                    icon={<SearchIcon className="w-5 h-5" />}
                                    className="h-12 pl-12 pr-28"
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
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="p-4 rounded-xl bg-dark-800/40 border border-dark-700/50">
                                <h3 className="flex items-center gap-2 font-semibold text-dark-100 mb-4">
                                    <Filter className="w-4 h-4" />
                                    Filters
                                </h3>

                                {/* Category Filter */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-dark-300 mb-2">Category</h4>
                                    <div className="space-y-1">
                                        <Link
                                            href={buildUrl({ category: undefined })}
                                            className={`block px-3 py-1.5 rounded text-sm transition-colors ${!category ? "bg-primary-500/20 text-primary-400" : "text-dark-400 hover:text-dark-200"
                                                }`}
                                        >
                                            All Categories
                                        </Link>
                                        {mockCategories.slice(0, 6).map((cat) => (
                                            <Link
                                                key={cat.slug}
                                                href={buildUrl({ category: cat.slug })}
                                                className={`block px-3 py-1.5 rounded text-sm transition-colors ${category === cat.slug ? "bg-primary-500/20 text-primary-400" : "text-dark-400 hover:text-dark-200"
                                                    }`}
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Model Filter */}
                                <div>
                                    <h4 className="text-sm font-medium text-dark-300 mb-2">AI Model</h4>
                                    <div className="space-y-1">
                                        <Link
                                            href={buildUrl({ model: undefined })}
                                            className={`block px-3 py-1.5 rounded text-sm transition-colors ${!model ? "bg-primary-500/20 text-primary-400" : "text-dark-400 hover:text-dark-200"
                                                }`}
                                        >
                                            All Models
                                        </Link>
                                        {mockModels.slice(0, 8).map((m) => (
                                            <Link
                                                key={m.slug}
                                                href={buildUrl({ model: m.slug })}
                                                className={`block px-3 py-1.5 rounded text-sm transition-colors ${model === m.slug ? "bg-primary-500/20 text-primary-400" : "text-dark-400 hover:text-dark-200"
                                                    }`}
                                            >
                                                {m.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="lg:col-span-3">
                            {/* Active filters */}
                            {(category || model || tag) && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {category && (
                                        <Badge variant="category">
                                            {mockCategories.find((c) => c.slug === category)?.name}
                                            <Link href={buildUrl({ category: undefined })} className="ml-1">×</Link>
                                        </Badge>
                                    )}
                                    {model && (
                                        <Badge variant="model" modelName={mockModels.find((m) => m.slug === model)?.name}>
                                            {mockModels.find((m) => m.slug === model)?.name}
                                            <Link href={buildUrl({ model: undefined })} className="ml-1">×</Link>
                                        </Badge>
                                    )}
                                    {tag && (
                                        <Badge variant="tag">
                                            {tag}
                                            <Link href={buildUrl({ tag: undefined })} className="ml-1">×</Link>
                                        </Badge>
                                    )}
                                </div>
                            )}

                            {/* Sort Tabs */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-sm text-dark-400">
                                    {prompts.length} {prompts.length === 1 ? "result" : "results"}
                                    {q && <> for &quot;{q}&quot;</>}
                                </span>

                                <div className="flex gap-2">
                                    <Link href={buildUrl({ sort: "trending" })}>
                                        <Button variant={sort === "trending" ? "primary" : "ghost"} size="sm">
                                            <TrendingUp className="w-4 h-4" />
                                            Trending
                                        </Button>
                                    </Link>
                                    <Link href={buildUrl({ sort: "new" })}>
                                        <Button variant={sort === "new" ? "primary" : "ghost"} size="sm">
                                            <Clock className="w-4 h-4" />
                                            New
                                        </Button>
                                    </Link>
                                    <Link href={buildUrl({ sort: "top" })}>
                                        <Button variant={sort === "top" ? "primary" : "ghost"} size="sm">
                                            <Star className="w-4 h-4" />
                                            Top
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Results Grid */}
                            {!q ? (
                                <div className="text-center py-16">
                                    <SearchIcon className="w-12 h-12 text-dark-600 mx-auto mb-4" />
                                    <h2 className="text-xl font-semibold text-dark-200 mb-2">
                                        Start Searching
                                    </h2>
                                    <p className="text-dark-400">
                                        Enter a search term to find AI prompts
                                    </p>
                                </div>
                            ) : prompts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {prompts.map((prompt) => (
                                        <PromptCard key={prompt.id} prompt={prompt} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <h2 className="text-xl font-semibold text-dark-200 mb-2">
                                        No results found
                                    </h2>
                                    <p className="text-dark-400 mb-4">
                                        Try adjusting your search or filters
                                    </p>
                                    <Link href="/submit">
                                        <Button variant="primary">Submit a Prompt</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
