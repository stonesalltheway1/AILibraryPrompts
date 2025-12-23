"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui";
import { Button } from "@/components/ui";
import { mockUsers } from "@/lib/mock-data";
import {
    Search,
    Star,
    MessageCircle,
    Eye,
    Calendar,
    ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Sort users by reputation
    const sortedUsers = [...mockUsers].sort((a, b) => b.reputation - a.reputation);

    // Filter users
    const filteredUsers = sortedUsers.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-dark-50 mb-2">Users</h1>
                <p className="text-dark-400">
                    Manage {mockUsers.length} registered users
                </p>
            </div>

            {/* Search */}
            <Card variant="glass" hover={false}>
                <CardContent className="p-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                    <Card key={user.id} variant="glass">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.username}
                                        width={56}
                                        height={56}
                                        className="rounded-full shrink-0"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-xl font-bold text-white shrink-0">
                                        {user.username[0].toUpperCase()}
                                    </div>
                                )}

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-dark-100 truncate">
                                            @{user.username}
                                        </h3>
                                        <Link
                                            href={`/user/${user.username}`}
                                            target="_blank"
                                            className="text-dark-400 hover:text-primary-400"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-dark-400 mb-2">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            {user.reputation}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    {user.bio && (
                                        <p className="text-sm text-dark-400 line-clamp-2">
                                            {user.bio}
                                        </p>
                                    )}

                                    {/* Specialties */}
                                    {user.specialty && user.specialty.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {user.specialty.slice(0, 2).map((spec) => (
                                                <span
                                                    key={spec}
                                                    className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-dark-300"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                            {user.specialty.length > 2 && (
                                                <span className="text-xs px-2 py-0.5 text-dark-500">
                                                    +{user.specialty.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <Card variant="glass" hover={false}>
                    <CardContent className="text-center py-12">
                        <p className="text-dark-400">No users found matching your search.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
