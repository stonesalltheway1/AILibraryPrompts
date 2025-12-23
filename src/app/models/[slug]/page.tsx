import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, TrendingUp, Clock, Star } from "lucide-react";
import { Header, Footer, PromptCard } from "@/components";
import { Badge, Button } from "@/components/ui";
import { getModelBySlug, getPromptsByModel, mockModels } from "@/lib/mock-data";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ sort?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const model = getModelBySlug(slug);

    if (!model) {
        return { title: "Model Not Found" };
    }

    return {
        title: `${model.name} Prompts - Godly Prompts`,
        description: `Browse ${model.promptCount} curated prompts optimized for ${model.name}. Find the best prompts for your AI assistant.`,
        openGraph: {
            title: `${model.name} Prompts`,
            description: `Browse curated prompts optimized for ${model.name}`,
        },
    };
}

export async function generateStaticParams() {
    return mockModels.map((model) => ({
        slug: model.slug,
    }));
}

export default async function ModelPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const { sort = "trending" } = await searchParams;

    const model = getModelBySlug(slug);
    if (!model) {
        notFound();
    }

    let prompts = getPromptsByModel(slug);

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

    return (
        <>
            <Header />

            <main className="flex-1">
                <div className="container-main py-8">
                    {/* Back link */}
                    <Link
                        href="/models"
                        className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-dark-200 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        All Models
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Badge variant="model" vendor={model.vendor} className="text-base px-4 py-2">
                                {model.name}
                            </Badge>
                            <span className="text-dark-400">
                                {model.promptCount} prompts available
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-dark-50 mb-2">
                            Best {model.name} Prompts
                        </h1>
                        <p className="text-dark-300 max-w-2xl">
                            Curated prompts optimized specifically for {model.name}.
                            These prompts are tested and verified to work great with this model.
                        </p>
                    </div>

                    {/* Sort Tabs */}
                    <div className="flex items-center gap-2 mb-6 border-b border-dark-700/50 pb-4">
                        <Link href={`/models/${slug}?sort=trending`}>
                            <Button
                                variant={sort === "trending" ? "primary" : "ghost"}
                                size="sm"
                            >
                                <TrendingUp className="w-4 h-4" />
                                Trending
                            </Button>
                        </Link>
                        <Link href={`/models/${slug}?sort=new`}>
                            <Button
                                variant={sort === "new" ? "primary" : "ghost"}
                                size="sm"
                            >
                                <Clock className="w-4 h-4" />
                                New
                            </Button>
                        </Link>
                        <Link href={`/models/${slug}?sort=top`}>
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
                            <p className="text-dark-400 mb-4">No prompts found for this model yet.</p>
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
