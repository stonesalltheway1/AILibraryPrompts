import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
    Code2,
    Pencil,
    Briefcase,
    BookOpen,
    Palette,
    Target,
    GraduationCap,
    Megaphone,
    ArrowLeft,
    TrendingUp,
    Clock,
    Star
} from "lucide-react";
import { Header, Footer, PromptCard, ItemListSchema, BreadcrumbSchema } from "@/components";
import { Button } from "@/components/ui";
import { getCategoryBySlug, getPromptsByCategory, mockCategories } from "@/lib/mock-data";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ sort?: string }>;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    coding: Code2,
    writing: Pencil,
    business: Briefcase,
    research: BookOpen,
    creative: Palette,
    productivity: Target,
    education: GraduationCap,
    marketing: Megaphone,
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) {
        return { title: "Category Not Found" };
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://godlyprompts.com";
    const canonicalUrl = `${baseUrl}/categories/${slug}`;

    return {
        title: `Best ${category.name} AI Prompts for ChatGPT, Claude & Gemini | Godly Prompts`,
        description: `${category.description} Browse ${category.promptCount} curated ${category.name.toLowerCase()} prompts with examples, ratings, and user reviews. Free AI prompt templates for ${category.name.toLowerCase()}.`,
        keywords: [
            `${category.name.toLowerCase()} prompts`,
            `${category.name.toLowerCase()} AI prompts`,
            `ChatGPT ${category.name.toLowerCase()}`,
            `Claude ${category.name.toLowerCase()} prompts`,
            `best ${category.name.toLowerCase()} prompts`,
            "AI prompt library",
            "prompt engineering",
            "AI assistant prompts",
        ],
        openGraph: {
            title: `${category.name} AI Prompts - ${category.promptCount} Curated Templates`,
            description: category.description,
            type: "website",
            url: canonicalUrl,
            siteName: "Godly Prompts",
        },
        twitter: {
            card: "summary_large_image",
            title: `${category.name} AI Prompts`,
            description: category.description,
            site: "@godlyprompts",
        },
        alternates: {
            canonical: `/categories/${slug}`,
        },
    };
}

export async function generateStaticParams() {
    return mockCategories.map((category) => ({
        slug: category.slug,
    }));
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const { sort = "trending" } = await searchParams;

    const category = getCategoryBySlug(slug);
    if (!category) {
        notFound();
    }

    const Icon = categoryIcons[slug] || Code2;
    let prompts = getPromptsByCategory(slug);

    // Sort prompts
    switch (sort) {
        case "new":
            prompts = [...prompts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            break;
        case "top":
            prompts = [...prompts].sort((a, b) => b.votes - a.votes);
            break;
        default: // trending
            prompts = [...prompts].sort((a, b) => {
                const ageA = (Date.now() - a.createdAt.getTime()) / (1000 * 60 * 60);
                const ageB = (Date.now() - b.createdAt.getTime()) / (1000 * 60 * 60);
                return b.votes / Math.pow(ageB + 2, 1.5) - a.votes / Math.pow(ageA + 2, 1.5);
            });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ailibraryprompts.com";

    return (
        <>
            <Header />

            {/* Structured Data */}
            <ItemListSchema
                name={`${category.name} AI Prompts`}
                description={category.description}
                items={prompts.slice(0, 10).map((prompt, index) => ({
                    name: prompt.title,
                    url: `${baseUrl}/prompts/${prompt.slug}`,
                    position: index + 1,
                    description: prompt.description || prompt.content.slice(0, 100),
                }))}
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: baseUrl },
                    { name: "Categories", url: `${baseUrl}/categories` },
                    { name: category.name, url: `${baseUrl}/categories/${slug}` },
                ]}
            />

            <main className="flex-1">
                <div className="container-main py-8">
                    {/* Back link */}
                    <Link
                        href="/categories"
                        className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-dark-200 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        All Categories
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
                                <Icon className="w-8 h-8 text-primary-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-dark-50">
                                    {category.name} Prompts
                                </h1>
                                <p className="text-dark-400">
                                    {category.promptCount} prompts available
                                </p>
                            </div>
                        </div>
                        <p className="text-dark-300 max-w-2xl">
                            {category.description}
                        </p>
                    </div>

                    {/* Sort Tabs */}
                    <div className="flex items-center gap-2 mb-6 border-b border-dark-700/50 pb-4">
                        <Link href={`/categories/${slug}?sort=trending`}>
                            <Button
                                variant={sort === "trending" ? "primary" : "ghost"}
                                size="sm"
                            >
                                <TrendingUp className="w-4 h-4" />
                                Trending
                            </Button>
                        </Link>
                        <Link href={`/categories/${slug}?sort=new`}>
                            <Button
                                variant={sort === "new" ? "primary" : "ghost"}
                                size="sm"
                            >
                                <Clock className="w-4 h-4" />
                                New
                            </Button>
                        </Link>
                        <Link href={`/categories/${slug}?sort=top`}>
                            <Button
                                variant={sort === "top" ? "primary" : "ghost"}
                                size="sm"
                            >
                                <Star className="w-4 h-4" />
                                Top Rated
                            </Button>
                        </Link>
                    </div>

                    {/* Prompts Grid */}
                    {prompts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {prompts.map((prompt) => (
                                <PromptCard key={prompt.id} prompt={prompt} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-dark-400 mb-4">No prompts found in this category yet.</p>
                            <Link href="/submit">
                                <Button variant="primary">Submit the First Prompt</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
