import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
    Calendar,
    Star,
    MessageCircle,
    Eye,
    ArrowLeft,
    Globe,
    Twitter,
    Github,
    Award,
    TrendingUp,
    Bookmark,
} from "lucide-react";
import { Header, Footer, PromptCard } from "@/components";
import { Badge, Card, CardContent } from "@/components/ui";
import { mockUsers, getAllCombinedPrompts } from "@/lib/mock-data";
import { formatNumber, formatDate } from "@/lib/utils";

interface PageProps {
    params: Promise<{ username: string }>;
}

// Get user by username
function getUserByUsername(username: string) {
    return mockUsers.find((u) => u.username === username);
}

// Get prompts by user
function getPromptsByUser(userId: string) {
    return getAllCombinedPrompts().filter((p) => p.user.id === userId);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { username } = await params;
    const user = getUserByUsername(username);

    if (!user) {
        return { title: "User Not Found" };
    }

    return {
        title: `@${user.username} - AI Prompt Creator`,
        description: user.bio || `View ${user.username}'s AI prompts and contributions on AI Library Prompts.`,
        openGraph: {
            title: `@${user.username} - AI Prompt Creator`,
            description: user.bio || `View ${user.username}'s AI prompts and contributions.`,
            type: "profile",
        },
    };
}

export async function generateStaticParams() {
    return mockUsers.map((user) => ({
        username: user.username,
    }));
}

export default async function UserProfilePage({ params }: PageProps) {
    const { username } = await params;
    const user = getUserByUsername(username);

    if (!user) {
        notFound();
    }

    const userPrompts = getPromptsByUser(user.id);
    const totalVotes = userPrompts.reduce((sum, p) => sum + p.votes, 0);
    const totalViews = userPrompts.reduce((sum, p) => sum + p.views, 0);

    return (
        <>
            <Header />

            <main className="flex-1">
                <div className="container-main py-8">
                    {/* Back link */}
                    <Link
                        href="/leaderboard"
                        className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-dark-200 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Leaderboard
                    </Link>

                    {/* Profile Header */}
                    <Card variant="elevated" hover={false} className="mb-8">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Avatar */}
                                <div className="shrink-0">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.username}
                                            width={120}
                                            height={120}
                                            className="rounded-full ring-4 ring-primary-500/20"
                                        />
                                    ) : (
                                        <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-4xl font-bold text-white ring-4 ring-primary-500/20">
                                            {user.username[0].toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                {/* User Info */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h1 className="text-2xl md:text-3xl font-bold text-dark-50 mb-1">
                                                @{user.username}
                                            </h1>
                                            <div className="flex items-center gap-3 text-sm text-dark-400">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    Joined {formatDate(user.createdAt)}
                                                </span>
                                                <span className="flex items-center gap-1 text-yellow-400">
                                                    <Star className="w-4 h-4" />
                                                    {formatNumber(user.reputation)} reputation
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    {user.bio && (
                                        <p className="text-dark-300 mb-4 max-w-2xl">
                                            {user.bio}
                                        </p>
                                    )}

                                    {/* Specialties */}
                                    {user.specialty && user.specialty.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {user.specialty.map((spec) => (
                                                <Badge key={spec} variant="tag">
                                                    {spec}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    {/* Social Links */}
                                    <div className="flex flex-wrap gap-3">
                                        {user.website && (
                                            <a
                                                href={user.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm text-dark-400 hover:text-primary-400 transition-colors"
                                            >
                                                <Globe className="w-4 h-4" />
                                                Website
                                            </a>
                                        )}
                                        {user.twitter && (
                                            <a
                                                href={`https://twitter.com/${user.twitter}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm text-dark-400 hover:text-blue-400 transition-colors"
                                            >
                                                <Twitter className="w-4 h-4" />
                                                @{user.twitter}
                                            </a>
                                        )}
                                        {user.github && (
                                            <a
                                                href={`https://github.com/${user.github}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm text-dark-400 hover:text-dark-100 transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                {user.github}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <Card variant="glass" hover={false}>
                            <CardContent className="text-center py-4">
                                <div className="flex items-center justify-center gap-2 text-primary-400 mb-1">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-2xl font-bold">{userPrompts.length}</span>
                                </div>
                                <p className="text-sm text-dark-400">Prompts</p>
                            </CardContent>
                        </Card>

                        <Card variant="glass" hover={false}>
                            <CardContent className="text-center py-4">
                                <div className="flex items-center justify-center gap-2 text-green-400 mb-1">
                                    <TrendingUp className="w-5 h-5" />
                                    <span className="text-2xl font-bold">{formatNumber(totalVotes)}</span>
                                </div>
                                <p className="text-sm text-dark-400">Total Votes</p>
                            </CardContent>
                        </Card>

                        <Card variant="glass" hover={false}>
                            <CardContent className="text-center py-4">
                                <div className="flex items-center justify-center gap-2 text-blue-400 mb-1">
                                    <Eye className="w-5 h-5" />
                                    <span className="text-2xl font-bold">{formatNumber(totalViews)}</span>
                                </div>
                                <p className="text-sm text-dark-400">Total Views</p>
                            </CardContent>
                        </Card>

                        <Card variant="glass" hover={false}>
                            <CardContent className="text-center py-4">
                                <div className="flex items-center justify-center gap-2 text-yellow-400 mb-1">
                                    <Award className="w-5 h-5" />
                                    <span className="text-2xl font-bold">{userPrompts.filter(p => p.verified).length}</span>
                                </div>
                                <p className="text-sm text-dark-400">Verified</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* User's Prompts */}
                    <div>
                        <h2 className="text-xl font-bold text-dark-100 mb-6 flex items-center gap-2">
                            <Bookmark className="w-5 h-5" />
                            {user.username}&apos;s Prompts
                        </h2>

                        {userPrompts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userPrompts.map((prompt) => (
                                    <PromptCard key={prompt.id} prompt={prompt} />
                                ))}
                            </div>
                        ) : (
                            <Card variant="glass" hover={false}>
                                <CardContent className="text-center py-12">
                                    <p className="text-dark-400">
                                        {user.username} hasn&apos;t submitted any prompts yet.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
