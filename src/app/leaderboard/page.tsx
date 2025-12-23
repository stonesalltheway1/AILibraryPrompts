import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Trophy, Medal, Award, TrendingUp, Users } from "lucide-react";
import { Header, Footer } from "@/components";
import { Card, CardContent } from "@/components/ui";
import { getTopContributors, mockPrompts } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Leaderboard - Godly Prompts",
    description: "See the top contributors to Godly Prompts. Our community members share the best AI prompts for everyone.",
};

export default function LeaderboardPage() {
    const topUsers = getTopContributors(20);

    // Calculate additional stats
    const userStats = topUsers.map((user) => {
        const userPrompts = mockPrompts.filter((p) => p.user.id === user.id);
        const totalVotes = userPrompts.reduce((sum, p) => sum + p.votes, 0);
        const totalViews = userPrompts.reduce((sum, p) => sum + p.views, 0);
        const verifiedCount = userPrompts.filter((p) => p.verified).length;

        return {
            ...user,
            promptCount: userPrompts.length,
            totalVotes,
            totalViews,
            verifiedCount,
        };
    });

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-6 h-6 text-yellow-400" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Award className="w-6 h-6 text-amber-600" />;
            default:
                return <span className="w-6 h-6 flex items-center justify-center text-dark-400 font-bold">{rank}</span>;
        }
    };

    const getRankBg = (rank: number) => {
        switch (rank) {
            case 1:
                return "bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30";
            case 2:
                return "bg-gradient-to-r from-gray-400/10 to-slate-400/10 border-gray-400/30";
            case 3:
                return "bg-gradient-to-r from-amber-600/10 to-orange-600/10 border-amber-600/30";
            default:
                return "bg-dark-800/40 border-dark-700/50";
        }
    };

    return (
        <>
            <Header />

            <main className="flex-1">
                <div className="container-main py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 mb-4">
                            <Trophy className="w-8 h-8 text-yellow-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-4">
                            Community Leaderboard
                        </h1>
                        <p className="text-lg text-dark-400 max-w-2xl mx-auto">
                            Celebrating our top contributors who share the best AI prompts with the community.
                        </p>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <Card variant="glass" hover={false}>
                            <CardContent className="p-4 text-center">
                                <Users className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-dark-100">527</div>
                                <p className="text-sm text-dark-400">Contributors</p>
                            </CardContent>
                        </Card>
                        <Card variant="glass" hover={false}>
                            <CardContent className="p-4 text-center">
                                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-dark-100">100</div>
                                <p className="text-sm text-dark-400">Total Prompts</p>
                            </CardContent>
                        </Card>
                        <Card variant="glass" hover={false}>
                            <CardContent className="p-4 text-center">
                                <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-dark-100">78</div>
                                <p className="text-sm text-dark-400">Verified Prompts</p>
                            </CardContent>
                        </Card>
                        <Card variant="glass" hover={false}>
                            <CardContent className="p-4 text-center">
                                <Award className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-dark-100">4.2K</div>
                                <p className="text-sm text-dark-400">Total Votes</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Leaderboard Table */}
                    <div className="space-y-3">
                        {userStats.map((user, index) => {
                            const rank = index + 1;

                            return (
                                <Link
                                    key={user.id}
                                    href={`/user/${user.username}`}
                                    className={`block rounded-xl border p-4 md:p-5 transition-all hover:scale-[1.01] ${getRankBg(rank)}`}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Rank */}
                                        <div className="w-10 flex items-center justify-center shrink-0">
                                            {getRankIcon(rank)}
                                        </div>

                                        {/* Avatar */}
                                        {user.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.username}
                                                width={48}
                                                height={48}
                                                className="rounded-full shrink-0"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-lg font-medium text-white shrink-0">
                                                {user.username[0].toUpperCase()}
                                            </div>
                                        )}

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-dark-50 truncate">
                                                @{user.username}
                                            </h3>
                                            <p className="text-sm text-dark-400">
                                                {user.promptCount} prompts • {user.verifiedCount} verified
                                            </p>
                                        </div>

                                        {/* Stats */}
                                        <div className="hidden md:flex items-center gap-8 text-sm">
                                            <div className="text-center">
                                                <p className="font-semibold text-dark-100">{formatNumber(user.totalVotes)}</p>
                                                <p className="text-dark-500">Votes</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-dark-100">{formatNumber(user.totalViews)}</p>
                                                <p className="text-dark-500">Views</p>
                                            </div>
                                        </div>

                                        {/* Reputation */}
                                        <div className="text-right shrink-0">
                                            <p className="text-lg font-bold text-primary-400">
                                                {formatNumber(user.reputation)}
                                            </p>
                                            <p className="text-xs text-dark-500">reputation</p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                        <p className="text-dark-400 mb-4">
                            Want to join the leaderboard? Start contributing!
                        </p>
                        <Link href="/submit">
                            <button className="btn btn-accent">Submit Your First Prompt</button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
