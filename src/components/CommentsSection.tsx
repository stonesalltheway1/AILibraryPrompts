"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, Loader2 } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button, Textarea, Card, CardContent } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { addComment, getComments } from "@/lib/actions";

interface Comment {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
    user?: {
        username: string;
        image?: string;
    };
}

interface CommentsSectionProps {
    promptId: string;
    initialComments?: Comment[];
}

/**
 * Comments section component with real-time optimistic updates.
 * Uses Clerk's useAuth() hook for client-side auth detection.
 * 
 * IMPORTANT: This component must be imported with next/dynamic({ ssr: false })
 * to prevent Clerk hooks from being called during SSG/build time.
 */
export function CommentsSection({
    promptId,
    initialComments = [],
}: CommentsSectionProps) {
    // Clerk hooks - safe to call since this component is never SSR'd
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();

    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Derive current user from Clerk user
    const currentUser = user ? {
        username: user.username || user.firstName || "User",
        image: user.imageUrl,
    } : undefined;

    // Load comments on mount
    useEffect(() => {
        async function loadComments() {
            const result = await getComments(promptId);
            if (result.success && result.data) {
                // Add mock user data for display
                const commentsWithUsers = result.data.comments.map((c) => ({
                    ...c,
                    user: {
                        username: "anonymous",
                        image: undefined,
                    },
                }));
                setComments([...initialComments, ...commentsWithUsers]);
            }
        }
        loadComments();
    }, [promptId, initialComments]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);
        setError(null);

        // Optimistic update
        const optimisticComment: Comment = {
            id: `temp-${Date.now()}`,
            content: newComment.trim(),
            userId: "current-user",
            createdAt: new Date(),
            user: currentUser || { username: "you", image: undefined },
        };

        setComments((prev) => [...prev, optimisticComment]);
        const commentToSend = newComment;
        setNewComment("");

        try {
            const result = await addComment(promptId, commentToSend);

            if (!result.success) {
                // Rollback optimistic update
                setComments((prev) => prev.filter((c) => c.id !== optimisticComment.id));
                setError(result.error || "Failed to add comment");
                setNewComment(commentToSend);
            } else if (result.data) {
                // Update with real ID
                setComments((prev) =>
                    prev.map((c) =>
                        c.id === optimisticComment.id
                            ? { ...c, id: result.data!.commentId }
                            : c
                    )
                );
            }
        } catch {
            // Rollback on error
            setComments((prev) => prev.filter((c) => c.id !== optimisticComment.id));
            setError("Failed to add comment. Please try again.");
            setNewComment(commentToSend);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show skeleton while Clerk is loading
    if (!isLoaded) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-24 bg-dark-800/50 rounded-lg mb-4" />
                    <div className="space-y-3">
                        <div className="h-16 bg-dark-800/30 rounded-lg" />
                        <div className="h-16 bg-dark-800/30 rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Comment Form */}
            {isSignedIn ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-3">
                        {currentUser?.image ? (
                            <Image
                                src={currentUser.image}
                                alt={currentUser.username}
                                width={40}
                                height={40}
                                className="rounded-full shrink-0"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-sm font-medium text-white shrink-0">
                                {currentUser?.username?.[0]?.toUpperCase() || "?"}
                            </div>
                        )}
                        <div className="flex-1">
                            <Textarea
                                ref={textareaRef}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Share your thoughts on this prompt..."
                                className="min-h-[100px] resize-none"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-400">{error}</p>
                    )}

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={!newComment.trim() || isSubmitting}
                            className="gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Post Comment
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            ) : (
                <Card variant="glass">
                    <CardContent className="text-center py-8">
                        <p className="text-dark-300 mb-4">
                            Sign in to join the conversation
                        </p>
                        <a
                            href="/sign-in"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
                        >
                            Sign In
                        </a>
                    </CardContent>
                </Card>
            )}

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-center text-dark-400 py-8">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="flex gap-3 p-4 rounded-lg bg-dark-800/30 border border-dark-700/30"
                        >
                            {comment.user?.image ? (
                                <Image
                                    src={comment.user.image}
                                    alt={comment.user.username}
                                    width={36}
                                    height={36}
                                    className="rounded-full shrink-0"
                                />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-dark-600 to-dark-700 flex items-center justify-center text-sm font-medium text-dark-300 shrink-0">
                                    {comment.user?.username?.[0]?.toUpperCase() || "?"}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-dark-100">
                                        {comment.user?.username || "Anonymous"}
                                    </span>
                                    <span className="text-xs text-dark-400">
                                        {formatDate(comment.createdAt)}
                                    </span>
                                </div>
                                <p className="text-dark-200 whitespace-pre-wrap break-words">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
