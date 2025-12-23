import { Card, CardContent } from "@/components/ui";
import { getAllCombinedPrompts, mockUsers, mockCategories } from "@/lib/mock-data";
import {
    FileText,
    Users,
    FolderOpen,
    TrendingUp,
    Eye,
    ThumbsUp,
    Clock,
    CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Admin Dashboard - AI Library Prompts",
};

export default function AdminDashboard() {
    const allPrompts = getAllCombinedPrompts();
    const totalVotes = allPrompts.reduce((sum, p) => sum + p.votes, 0);
    const totalViews = allPrompts.reduce((sum, p) => sum + p.views, 0);
    const verifiedCount = allPrompts.filter((p) => p.verified).length;
    const featuredCount = allPrompts.filter((p) => p.featured).length;

    // Recent prompts
    const recentPrompts = [...allPrompts]
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 5);

    const stats = [
        {
            label: "Total Prompts",
            value: allPrompts.length,
            icon: FileText,
            color: "text-primary-400",
            bgColor: "bg-primary-500/10",
        },
        {
            label: "Total Users",
            value: mockUsers.length,
            icon: Users,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
        },
        {
            label: "Categories",
            value: mockCategories.length,
            icon: FolderOpen,
            color: "text-green-400",
            bgColor: "bg-green-500/10",
        },
        {
            label: "Total Votes",
            value: totalVotes.toLocaleString(),
            icon: ThumbsUp,
            color: "text-yellow-400",
            bgColor: "bg-yellow-500/10",
        },
        {
            label: "Total Views",
            value: totalViews.toLocaleString(),
            icon: Eye,
            color: "text-cyan-400",
            bgColor: "bg-cyan-500/10",
        },
        {
            label: "Verified Prompts",
            value: verifiedCount,
            icon: CheckCircle2,
            color: "text-emerald-400",
            bgColor: "bg-emerald-500/10",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-dark-50 mb-2">Dashboard</h1>
                <p className="text-dark-400">
                    Overview of your AI Library Prompts platform
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} variant="glass" hover={false}>
                            <CardContent className="p-4">
                                <div className={`inline-flex p-2 rounded-lg ${stat.bgColor} mb-3`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <div className="text-2xl font-bold text-dark-50">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-dark-400">{stat.label}</div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/admin/prompts/new">
                    <Card variant="elevated" className="cursor-pointer group">
                        <CardContent className="p-6 text-center">
                            <div className="inline-flex p-3 rounded-full bg-primary-500/10 mb-4 group-hover:bg-primary-500/20 transition-colors">
                                <FileText className="w-6 h-6 text-primary-400" />
                            </div>
                            <h3 className="font-semibold text-dark-100 mb-1">Add New Prompt</h3>
                            <p className="text-sm text-dark-400">Create a new prompt manually</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/import">
                    <Card variant="elevated" className="cursor-pointer group">
                        <CardContent className="p-6 text-center">
                            <div className="inline-flex p-3 rounded-full bg-green-500/10 mb-4 group-hover:bg-green-500/20 transition-colors">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="font-semibold text-dark-100 mb-1">Import Prompts</h3>
                            <p className="text-sm text-dark-400">Bulk import from JSON file</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/prompts">
                    <Card variant="elevated" className="cursor-pointer group">
                        <CardContent className="p-6 text-center">
                            <div className="inline-flex p-3 rounded-full bg-blue-500/10 mb-4 group-hover:bg-blue-500/20 transition-colors">
                                <CheckCircle2 className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="font-semibold text-dark-100 mb-1">Manage Prompts</h3>
                            <p className="text-sm text-dark-400">Edit, verify, or delete prompts</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Recent Prompts */}
            <div>
                <h2 className="text-xl font-bold text-dark-100 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Prompts
                </h2>
                <Card variant="glass" hover={false}>
                    <CardContent className="p-0">
                        <table className="w-full">
                            <thead className="border-b border-dark-700/50">
                                <tr>
                                    <th className="text-left text-sm font-medium text-dark-400 px-4 py-3">
                                        Title
                                    </th>
                                    <th className="text-left text-sm font-medium text-dark-400 px-4 py-3">
                                        Category
                                    </th>
                                    <th className="text-left text-sm font-medium text-dark-400 px-4 py-3">
                                        Author
                                    </th>
                                    <th className="text-left text-sm font-medium text-dark-400 px-4 py-3">
                                        Votes
                                    </th>
                                    <th className="text-right text-sm font-medium text-dark-400 px-4 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentPrompts.map((prompt) => (
                                    <tr
                                        key={prompt.id}
                                        className="border-b border-dark-700/30 last:border-0 hover:bg-dark-800/30"
                                    >
                                        <td className="px-4 py-3">
                                            <Link
                                                href={`/admin/prompts/${prompt.id}`}
                                                className="text-dark-100 hover:text-primary-400 transition-colors font-medium"
                                            >
                                                {prompt.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-dark-400">
                                            {prompt.category.name}
                                        </td>
                                        <td className="px-4 py-3 text-dark-400">
                                            @{prompt.user.username}
                                        </td>
                                        <td className="px-4 py-3 text-dark-400">{prompt.votes}</td>
                                        <td className="px-4 py-3 text-right">
                                            {prompt.verified ? (
                                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="text-xs px-2 py-1 rounded-full bg-dark-700 text-dark-400">
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
