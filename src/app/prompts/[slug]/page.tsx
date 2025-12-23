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
import { Header, Footer, VoteButtons, PromptCardCompact, ArticleSchema, BreadcrumbSchema, BookPromoCard } from "@/components";
import { CopyButton, BookmarkButton, ShareButton, TryPromptButton } from "@/components/Actions";
import { Badge, Card, CardContent } from "@/components/ui";
import { getPromptBySlug, getPromptsByCategory, mockPrompts, mockUsers } from "@/lib/mock-data";
import { formatNumber, formatDate } from "@/lib/utils";
// CommentsWrapper is a Client Component that handles dynamic import with ssr:false internally
// This allows the prompt page to remain SSG/ISR while comments load after hydration
import { CommentsWrapper } from "@/components/CommentsWrapper";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const prompt = getPromptBySlug(slug);

    if (!prompt) {
        return { title: "Prompt Not Found" };
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ailibraryprompts.com";
    const canonicalUrl = `${baseUrl}/prompts/${prompt.slug}`;
    const description = prompt.description || prompt.content.slice(0, 155);

    return {
        title: `${prompt.title} - ${prompt.model.name} Prompt for ${prompt.category.name} | AI Library Prompts`,
        description: `${description} Verified ${prompt.model.name} prompt with ${prompt.votes} votes. Copy and use this AI prompt for ${prompt.category.name.toLowerCase()}.`,
        keywords: [
            prompt.model.name,
            prompt.category.name,
            ...prompt.tags.map((t) => t.name),
            "AI prompt",
            "prompt engineering",
            `${prompt.model.name} prompt`,
            `${prompt.category.name.toLowerCase()} prompt`,
            "ChatGPT prompt",
            "Claude prompt",
            "AI assistant",
            "prompt template",
        ],
        authors: [{ name: prompt.user.username }],
        openGraph: {
            title: `${prompt.title} - ${prompt.model.name} Prompt`,
            description: description,
            type: "article",
            publishedTime: prompt.createdAt.toISOString(),
            modifiedTime: prompt.updatedAt.toISOString(),
            authors: [prompt.user.username],
            tags: [
                prompt.model.name,
                prompt.category.name,
                ...prompt.tags.map((t) => t.name),
            ],
            section: prompt.category.name,
            url: canonicalUrl,
            siteName: "AI Library Prompts",
        },
        twitter: {
            card: "summary_large_image",
            title: `${prompt.title} - ${prompt.model.name} Prompt`,
            description: description,
            creator: `@${prompt.user.username}`,
            site: "@ailibraryprompts",
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

// Mock comments that sound like real human feedback
function getMockComments(promptId: string) {
    const allComments = [
        {
            id: "comment-1",
            content: "This prompt saved me hours of work! The output was exactly what I needed for my React project. Thanks for sharing! 🙌",
            userId: "user-3",
            createdAt: new Date("2025-12-21T14:30:00"),
            user: mockUsers.find(u => u.id === "user-3"),
        },
        {
            id: "comment-2",
            content: "I've tried a lot of similar prompts but this one definitely gets the best results. Pro tip: adding specific examples to the placeholder really helps.",
            userId: "user-5",
            createdAt: new Date("2025-12-20T09:15:00"),
            user: mockUsers.find(u => u.id === "user-5"),
        },
        {
            id: "comment-3",
            content: "Works great with Claude 3.5 Sonnet! Had to tweak it slightly for GPT-4 but still solid. Would love to see a version optimized for longer documents.",
            userId: "user-2",
            createdAt: new Date("2025-12-19T18:45:00"),
            user: mockUsers.find(u => u.id === "user-2"),
        },
        {
            id: "comment-4",
            content: "Just used this for a client presentation and they were impressed with the quality. Bookmarking this for sure.",
            userId: "user-8",
            createdAt: new Date("2025-12-18T11:20:00"),
            user: mockUsers.find(u => u.id === "user-8"),
        },
        {
            id: "comment-5",
            content: "Quick question - has anyone tried this with the new Gemini 2.0? Wondering if I need to adjust anything.",
            userId: "user-11",
            createdAt: new Date("2025-12-17T16:00:00"),
            user: mockUsers.find(u => u.id === "user-11"),
        },
    ];
    // Return 2-4 random comments per prompt (deterministic based on promptId)
    const hash = promptId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const count = 2 + (hash % 3);
    return allComments.slice(0, count);
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

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ailibraryprompts.com";

    // Calculate normalized rating (0-100 scale based on votes)
    const normalizedRating = Math.min(100, Math.max(0, (prompt.votes / 100) * 100 + 50));
    const reviewCount = prompt.commentCount + Math.floor(prompt.views / 50);


    return (
        <>
            <Header />

            {/* Enhanced Structured Data */}
            <ArticleSchema
                headline={prompt.title}
                description={prompt.description || prompt.content.slice(0, 155)}
                author={{
                    name: prompt.user.username,
                    url: `${baseUrl}/user/${prompt.user.username}`,
                    image: prompt.user.image || undefined,
                }}
                datePublished={prompt.createdAt.toISOString()}
                dateModified={prompt.updatedAt.toISOString()}
                aggregateRating={{
                    ratingValue: normalizedRating,
                    reviewCount: reviewCount,
                    bestRating: 100,
                    worstRating: 0,
                }}
                interactionStatistic={[
                    {
                        interactionType: "https://schema.org/LikeAction",
                        userInteractionCount: prompt.votes > 0 ? prompt.votes : 0,
                    },
                    {
                        interactionType: "https://schema.org/ViewAction",
                        userInteractionCount: prompt.views,
                    },
                    {
                        interactionType: "https://schema.org/CommentAction",
                        userInteractionCount: prompt.commentCount,
                    },
                ]}
                url={`${baseUrl}/prompts/${prompt.slug}`}
                keywords={[
                    prompt.model.name,
                    prompt.category.name,
                    ...prompt.tags.map((t) => t.name),
                ]}
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: baseUrl },
                    { name: prompt.category.name, url: `${baseUrl}/categories/${prompt.category.slug}` },
                    { name: prompt.title, url: `${baseUrl}/prompts/${prompt.slug}` },
                ]}
            />

            <main className="flex-1">

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

                                <CommentsWrapper
                                    promptId={prompt.id}
                                    initialComments={getMockComments(prompt.id)}
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Author Card - Enhanced for E-E-A-T */}
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
                                                alt={`${prompt.user.username} - AI Prompt Creator`}
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

                                    {/* Author Stats - E-E-A-T Signals */}
                                    <div className="space-y-2 mb-4 p-3 rounded-lg bg-dark-800/30 border border-dark-700/30">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-dark-400">Prompts Shared</span>
                                            <span className="text-dark-100 font-semibold">
                                                {mockPrompts.filter(p => p.user.id === prompt.user.id).length}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-dark-400">Total Votes</span>
                                            <span className="text-dark-100 font-semibold">
                                                {formatNumber(mockPrompts.filter(p => p.user.id === prompt.user.id).reduce((sum, p) => sum + p.votes, 0))}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-dark-400">Specialization</span>
                                            <span className="text-primary-400 font-semibold">
                                                {prompt.category.name}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-dark-400 mb-2">
                                        Member since {new Date(prompt.user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                    </p>

                                    {/* Verified Badge if applicable */}
                                    {prompt.user.reputation > 1000 && (
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                                            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                            <span className="text-xs text-cyan-300">Trusted Contributor</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Book Promo - From the Author */}
                            <BookPromoCard />

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
