import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
    ArrowLeft,
    Eye,
    Calendar,
    CheckCircle2,
    MessageCircle,
    ChevronRight
} from "lucide-react";
import { Header, Footer, VoteButtons, PromptCardCompact } from "@/components";
import { CopyButton, BookmarkButton, ShareButton, TryPromptButton } from "@/components/Actions";
import { Badge, Card, CardContent } from "@/components/ui";
import { getPromptBySlug, getPromptsByCategory, mockPrompts } from "@/lib/mock-data";
import { formatNumber, formatDate } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const prompt = getPromptBySlug(slug);

    if (!prompt) {
        return { title: "Prompt Not Found" };
    }

    return {
        title: `${prompt.title} - ${prompt.model.name} Prompt`,
        description: prompt.description || prompt.content.slice(0, 155),
        keywords: [
            prompt.model.name,
            prompt.category.name,
            ...prompt.tags.map((t) => t.name),
            "AI prompt",
            "prompt engineering",
        ],
        openGraph: {
            title: prompt.title,
            description: prompt.description || prompt.content.slice(0, 155),
            type: "article",
            publishedTime: prompt.createdAt.toISOString(),
            authors: [prompt.user.username],
        },
        alternates: {
            canonical: `/prompts/${prompt.slug}`,
        },
    };
}

export async function generateStaticParams() {
    return mockPrompts.map((prompt) => ({
        slug: prompt.slug,
    }));
}

export default async function PromptPage({ params }: PageProps) {
    const { slug } = await params;
    const prompt = getPromptBySlug(slug);

    if (!prompt) {
        notFound();
    }

    // Get related prompts from same category
    const relatedPrompts = getPromptsByCategory(prompt.category.slug)
        .filter((p) => p.id !== prompt.id)
        .slice(0, 4);

    // JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: prompt.title,
        description: prompt.description || prompt.content.slice(0, 155),
        author: {
            "@type": "Person",
            name: prompt.user.username,
        },
        datePublished: prompt.createdAt.toISOString(),
        dateModified: prompt.updatedAt.toISOString(),
        publisher: {
            "@type": "Organization",
            name: "AI Library Prompts",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://ailibraryprompts.com/prompts/${prompt.slug}`,
        },
    };

    return (
        <>
            <Header />

            <main className="flex-1">
                {/* JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <div className="container-main py-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-dark-400 mb-6">
                        <Link href="/" className="hover:text-dark-200 transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link
                            href={`/categories/${prompt.category.slug}`}
                            className="hover:text-dark-200 transition-colors"
                        >
                            {prompt.category.name}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-dark-300 truncate max-w-[200px]">{prompt.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Back link - mobile */}
                            <Link
                                href={`/categories/${prompt.category.slug}`}
                                className="lg:hidden inline-flex items-center gap-2 text-sm text-dark-400 hover:text-dark-200 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to {prompt.category.name} Prompts
                            </Link>

                            {/* Title and Meta */}
                            <div>
                                <div className="flex items-start gap-4 mb-4">
                                    <VoteButtons
                                        promptId={prompt.id}
                                        initialVotes={prompt.votes}
                                        initialUserVote={prompt.userVote}
                                        size="lg"
                                    />

                                    <div className="flex-1">
                                        <h1 className="text-2xl md:text-3xl font-bold text-dark-50 mb-3">
                                            {prompt.title}
                                        </h1>

                                        {/* Author and stats */}
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400">
                                            <Link
                                                href={`/user/${prompt.user.username}`}
                                                className="flex items-center gap-2 hover:text-dark-200 transition-colors"
                                            >
                                                {prompt.user.image ? (
                                                    <Image
                                                        src={prompt.user.image}
                                                        alt={prompt.user.username}
                                                        width={28}
                                                        height={28}
                                                        className="rounded-full"
                                                    />
                                                ) : (
                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-sm font-medium text-white">
                                                        {prompt.user.username[0].toUpperCase()}
                                                    </div>
                                                )}
                                                <span>@{prompt.user.username}</span>
                                            </Link>

                                            <span className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {formatNumber(prompt.views)} views
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(prompt.createdAt)}
                                            </span>

                                            {prompt.verified && (
                                                <span className="flex items-center gap-1 text-cyan-400">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge variant="model" modelName={prompt.model.name}>
                                        {prompt.model.name}
                                    </Badge>
                                    <Badge variant="category">
                                        {prompt.category.name}
                                    </Badge>
                                    {prompt.tags.map((tag) => (
                                        <Link key={tag.id} href={`/search?tag=${tag.slug}`}>
                                            <Badge variant="tag">{tag.name}</Badge>
                                        </Link>
                                    ))}
                                </div>

                                {/* Description */}
                                {prompt.description && (
                                    <p className="text-dark-300">{prompt.description}</p>
                                )}
                            </div>

                            {/* Prompt Content */}
                            <Card variant="elevated" hover={false}>
                                <CardContent className="p-0">
                                    <div className="flex items-center justify-between p-4 border-b border-dark-700/50">
                                        <span className="text-sm font-medium text-dark-300">Prompt</span>
                                        <CopyButton text={prompt.content} variant="icon" />
                                    </div>
                                    <div className="p-5">
                                        <pre className="whitespace-pre-wrap font-mono text-sm text-dark-100 leading-relaxed">
                                            {prompt.content}
                                        </pre>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                <CopyButton text={prompt.content} />
                                <TryPromptButton prompt={prompt.content} model={prompt.model.name} />
                                <BookmarkButton promptId={prompt.id} />
                                <ShareButton url={`/prompts/${prompt.slug}`} title={prompt.title} />
                            </div>

                            {/* Tips Section */}
                            <Card variant="glass" hover={false}>
                                <CardContent>
                                    <h3 className="font-semibold text-dark-100 mb-3">💡 Tips for Best Results</h3>
                                    <ul className="space-y-2 text-sm text-dark-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-400">•</span>
                                            Works best with <strong className="text-dark-100">{prompt.model.name}</strong> or similar models
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-400">•</span>
                                            Replace placeholders in {"{curly braces}"} with your specific content
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-400">•</span>
                                            For better results, be as specific as possible with your inputs
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Comments Section */}
                            <div>
                                <h2 className="text-xl font-bold text-dark-100 mb-4 flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    Comments ({prompt.commentCount})
                                </h2>

                                <Card variant="glass" hover={false}>
                                    <CardContent className="text-center py-8">
                                        <p className="text-dark-400 mb-4">
                                            Sign in to join the conversation
                                        </p>
                                        <Link href="/sign-in">
                                            <button className="btn btn-secondary">Sign In</button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Author Card */}
                            <Card variant="glass" hover={false}>
                                <CardContent>
                                    <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wide mb-4">
                                        About the Author
                                    </h3>
                                    <Link
                                        href={`/user/${prompt.user.username}`}
                                        className="flex items-center gap-3 mb-4 group"
                                    >
                                        {prompt.user.image ? (
                                            <Image
                                                src={prompt.user.image}
                                                alt={prompt.user.username}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-lg font-medium text-white">
                                                {prompt.user.username[0].toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-dark-100 group-hover:text-primary-400 transition-colors">
                                                @{prompt.user.username}
                                            </p>
                                            <p className="text-sm text-dark-400">
                                                {formatNumber(prompt.user.reputation)} reputation
                                            </p>
                                        </div>
                                    </Link>
                                    <p className="text-sm text-dark-400">
                                        Member since {new Date(prompt.user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Related Prompts */}
                            {relatedPrompts.length > 0 && (
                                <Card variant="glass" hover={false}>
                                    <CardContent>
                                        <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wide mb-4">
                                            Related Prompts
                                        </h3>
                                        <div className="space-y-1">
                                            {relatedPrompts.map((relatedPrompt) => (
                                                <PromptCardCompact key={relatedPrompt.id} prompt={relatedPrompt} />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Quick Links */}
                            <Card variant="glass" hover={false}>
                                <CardContent>
                                    <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wide mb-4">
                                        Explore More
                                    </h3>
                                    <div className="space-y-2">
                                        <Link
                                            href={`/categories/${prompt.category.slug}`}
                                            className="block p-3 rounded-lg bg-dark-800/50 hover:bg-dark-700/50 transition-colors"
                                        >
                                            <span className="text-sm text-dark-200">
                                                More {prompt.category.name} prompts →
                                            </span>
                                        </Link>
                                        <Link
                                            href={`/models/${prompt.model.slug}`}
                                            className="block p-3 rounded-lg bg-dark-800/50 hover:bg-dark-700/50 transition-colors"
                                        >
                                            <span className="text-sm text-dark-200">
                                                All {prompt.model.name} prompts →
                                            </span>
                                        </Link>
                                    </div>
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
