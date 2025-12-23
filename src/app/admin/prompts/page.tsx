"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui";
import { Button } from "@/components/ui";
import { getAllCombinedPrompts, mockCategories, mockModels } from "@/lib/mock-data";
import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    CheckCircle2,
    Star,
    Eye,
    ThumbsUp,
} from "lucide-react";

export default function AdminPromptsPage() {
    const allPrompts = getAllCombinedPrompts();
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    // Filter prompts
    const filteredPrompts = allPrompts.filter((prompt) => {
        const matchesSearch =
            prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prompt.user.username.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            categoryFilter === "all" || prompt.category.slug === categoryFilter;
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "verified" && prompt.verified) ||
            (statusFilter === "featured" && prompt.featured) ||
            (statusFilter === "pending" && !prompt.verified);
        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-dark-50 mb-2">Prompts</h1>
                    <p className="text-dark-400">
                        Manage all {allPrompts.length} prompts in your library
                    </p>
                </div>
                <Link href="/admin/prompts/new">
                    <Button variant="primary">
                        <Plus className="w-4 h-4" />
                        Add Prompt
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <Card variant="glass" hover={false}>
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-4">
                        {/* Search */}
                        <div className="flex-1 min-w-[250px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                                <input
                                    type="text"
                                    placeholder="Search prompts or authors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-dark-400" />
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                            >
                                <option value="all">All Categories</option>
                                {mockCategories.map((cat) => (
                                    <option key={cat.slug} value={cat.slug}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        >
                            <option value="all">All Status</option>
                            <option value="verified">Verified</option>
                            <option value="featured">Featured</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Results Count */}
            <p className="text-sm text-dark-400">
                Showing {filteredPrompts.length} of {allPrompts.length} prompts
            </p>

            {/* Prompts Table */}
            <Card variant="glass" hover={false}>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="border-b border-dark-700/50">
                            <tr>
                                <th className="text-left text-sm font-medium text-dark-400 px-4 py-3">
                                    Title
                                </th>
                                <th className="text-left text-sm font-medium text-dark-400 px-4 py-3">
                                    Category
                                </th>
                                <th className="text-left text-sm font-medium text-dark-400 px-4 py-3">
                                    Model
                                </th>
                                <th className="text-left text-sm font-medium text-dark-400 px-4 py-3">
                                    Author
                                </th>
                                <th className="text-center text-sm font-medium text-dark-400 px-4 py-3">
                                    <ThumbsUp className="w-4 h-4 inline" />
                                </th>
                                <th className="text-center text-sm font-medium text-dark-400 px-4 py-3">
                                    <Eye className="w-4 h-4 inline" />
                                </th>
                                <th className="text-center text-sm font-medium text-dark-400 px-4 py-3">
                                    Status
                                </th>
                                <th className="text-right text-sm font-medium text-dark-400 px-4 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPrompts.slice(0, 20).map((prompt) => (
                                <tr
                                    key={prompt.id}
                                    className="border-b border-dark-700/30 last:border-0 hover:bg-dark-800/30"
                                >
                                    <td className="px-4 py-3">
                                        <div>
                                            <Link
                                                href={`/prompts/${prompt.slug}`}
                                                target="_blank"
                                                className="text-dark-100 hover:text-primary-400 transition-colors font-medium"
                                            >
                                                {prompt.title}
                                            </Link>
                                            {prompt.featured && (
                                                <Star className="w-4 h-4 inline ml-2 text-yellow-400 fill-yellow-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-dark-400">
                                        {prompt.category.name}
                                    </td>
                                    <td className="px-4 py-3 text-dark-400">
                                        {prompt.model.name}
                                    </td>
                                    <td className="px-4 py-3 text-dark-400">
                                        @{prompt.user.username}
                                    </td>
                                    <td className="px-4 py-3 text-center text-dark-400">
                                        {prompt.votes}
                                    </td>
                                    <td className="px-4 py-3 text-center text-dark-400">
                                        {prompt.views}
                                    </td>
                                    <td className="px-4 py-3 text-center">
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
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                className="p-2 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-primary-400 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-2 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            {filteredPrompts.length > 20 && (
                <p className="text-sm text-dark-400 text-center">
                    Showing first 20 results. Use filters to narrow down.
                </p>
            )}
        </div>
    );
}
