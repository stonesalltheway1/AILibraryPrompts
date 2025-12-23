import Link from "next/link";
import {
    Search,
    ArrowRight,
    Code2,
    Pencil,
    Briefcase,
    BookOpen,
    Palette,
    Target,
    GraduationCap,
    Megaphone,
    Sparkles,
    TrendingUp,
    Clock
} from "lucide-react";
import { Header, Footer, PromptCard, CategoryPill } from "@/components";
import { Button, Input } from "@/components/ui";
import {
    mockCategories,
    getTrendingPrompts,
    getFeaturedPrompts,
    getRecentPrompts
} from "@/lib/mock-data";

const categoryIcons: Record<string, React.ReactNode> = {
    coding: <Code2 className="w-4 h-4" />,
    writing: <Pencil className="w-4 h-4" />,
    business: <Briefcase className="w-4 h-4" />,
    research: <BookOpen className="w-4 h-4" />,
    creative: <Palette className="w-4 h-4" />,
    productivity: <Target className="w-4 h-4" />,
    education: <GraduationCap className="w-4 h-4" />,
    marketing: <Megaphone className="w-4 h-4" />,
};

export default function HomePage() {
    const trendingPrompts = getTrendingPrompts(6);
    const featuredPrompts = getFeaturedPrompts(3);
    const recentPrompts = getRecentPrompts(6);

    return (
        <>
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden border-b border-dark-700/50">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent" />
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

                    <div className="container-main relative py-16 lg:py-24">
                        <div className="max-w-3xl mx-auto text-center">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm">
                                <Sparkles className="w-4 h-4" />
                                Community-driven AI prompt library
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                                Discover AI Prompts That{" "}
                                <span className="gradient-text">Actually Work</span>
                            </h1>

                            {/* Subheadline */}
                            <p className="text-lg md:text-xl text-dark-300 mb-8 max-w-2xl mx-auto text-balance">
                                The largest collection of community-curated prompts for ChatGPT, Claude, Gemini, and more.
                                Find, share, and vote on prompts that deliver real results.
                            </p>

                            {/* Search bar */}
                            <form action="/search" className="max-w-xl mx-auto mb-8">
                                <div className="relative">
                                    <Input
                                        name="q"
                                        placeholder="Search for prompts by topic, model, or task..."
                                        icon={<Search className="w-5 h-5" />}
                                        className="h-14 pl-12 pr-32 text-base bg-dark-800/80 border-dark-600/50"
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

                            {/* Quick stats */}
                            <div className="flex items-center justify-center gap-8 text-sm text-dark-400">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-dark-100">100</span>
                                    <span>Prompts</span>
                                </div>
                                <div className="w-px h-8 bg-dark-700" />
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-dark-100">16</span>
                                    <span>AI Models</span>
                                </div>
                                <div className="w-px h-8 bg-dark-700" />
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-dark-100">527</span>
                                    <span>Users</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Pills */}
                <section className="border-b border-dark-700/50 bg-dark-900/30">
                    <div className="container-main py-4">
                        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary-500/20 border border-primary-500/40 text-primary-400 shrink-0"
                            >
                                All Prompts
                            </Link>
                            {mockCategories.map((category) => (
                                <CategoryPill
                                    key={category.slug}
                                    name={category.name}
                                    slug={category.slug}
                                    icon={categoryIcons[category.slug]}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Prompts */}
                {featuredPrompts.length > 0 && (
                    <section className="py-12 border-b border-dark-700/50">
                        <div className="container-main">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary-500/10">
                                        <Sparkles className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-dark-100">Featured Prompts</h2>
                                        <p className="text-sm text-dark-400">Hand-picked by our team</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredPrompts.map((prompt) => (
                                    <PromptCard key={prompt.id} prompt={prompt} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Trending Prompts */}
                <section className="py-12 border-b border-dark-700/50">
                    <div className="container-main">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-amber-500/10">
                                    <TrendingUp className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-dark-100">Trending Now</h2>
                                    <p className="text-sm text-dark-400">Most popular this week</p>
                                </div>
                            </div>
                            <Link href="/prompts?sort=trending" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
                                View all
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trendingPrompts.map((prompt) => (
                                <PromptCard key={prompt.id} prompt={prompt} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recent Prompts */}
                <section className="py-12 border-b border-dark-700/50">
                    <div className="container-main">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-500/10">
                                    <Clock className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-dark-100">Recently Added</h2>
                                    <p className="text-sm text-dark-400">Fresh prompts from the community</p>
                                </div>
                            </div>
                            <Link href="/prompts?sort=new" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
                                View all
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentPrompts.map((prompt) => (
                                <PromptCard key={prompt.id} prompt={prompt} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Browse by Category */}
                <section className="py-12 border-b border-dark-700/50">
                    <div className="container-main">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-dark-100 mb-2">Browse by Category</h2>
                            <p className="text-dark-400">Find the perfect prompt for your use case</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {mockCategories.map((category) => {
                                const Icon = {
                                    coding: Code2,
                                    writing: Pencil,
                                    business: Briefcase,
                                    research: BookOpen,
                                    creative: Palette,
                                    productivity: Target,
                                    education: GraduationCap,
                                    marketing: Megaphone,
                                }[category.slug] || Code2;

                                return (
                                    <Link
                                        key={category.slug}
                                        href={`/categories/${category.slug}`}
                                        className="group p-5 rounded-xl bg-dark-800/40 border border-dark-700/50 hover:border-primary-500/30 hover:bg-dark-800/60 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 rounded-lg bg-dark-700/50 group-hover:bg-primary-500/10 transition-colors">
                                                <Icon className="w-5 h-5 text-dark-300 group-hover:text-primary-400 transition-colors" />
                                            </div>
                                            <h3 className="font-semibold text-dark-100 group-hover:text-primary-400 transition-colors">
                                                {category.name}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-dark-400 line-clamp-2 mb-3">
                                            {category.description}
                                        </p>
                                        <span className="text-xs text-dark-500">
                                            {category.promptCount} prompts
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16">
                    <div className="container-main">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-900/50 to-secondary-900/50 border border-primary-700/30 p-8 md:p-12">
                            {/* Background effects */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />

                            <div className="relative text-center max-w-2xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                    Share Your Best Prompts
                                </h2>
                                <p className="text-dark-300 mb-6">
                                    Join thousands of prompt engineers sharing what works. Earn reputation,
                                    get featured, and help the AI community level up.
                                </p>
                                <Link href="/submit">
                                    <Button variant="accent" size="lg">
                                        Submit Your Prompt
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
