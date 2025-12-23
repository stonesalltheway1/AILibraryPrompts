"use server";

/**
 * Server Actions for AI Library Prompts
 * 
 * These server actions handle all data mutations including voting, bookmarking,
 * commenting, and prompt submission. In production, these would interact with
 * a real database through Prisma. Currently using in-memory mock data.
 */

import { revalidatePath } from "next/cache";

// Types for action responses
export interface ActionResponse<T = void> {
    success: boolean;
    data?: T;
    error?: string;
}

// In-memory storage for demo purposes (would be database in production)
const votes: Map<string, { usernumber: number; voteType: "up" | "down" | null }> = new Map();
const bookmarks: Set<string> = new Set();
const comments: Map<string, Array<{
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
}>> = new Map();

/**
 * Vote on a prompt
 * Supports upvote, downvote, and clearing a vote
 */
export async function voteOnPrompt(
    promptId: string,
    voteType: "up" | "down" | null
): Promise<ActionResponse<{ votes: number; userVote: "up" | "down" | null }>> {
    try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Get current vote state
        const currentVote = votes.get(promptId) || { usernumber: 0, voteType: null };
        let newVoteCount = currentVote.usernumber;

        // Calculate vote change
        if (currentVote.voteType === "up" && voteType !== "up") {
            newVoteCount -= 1;
        } else if (currentVote.voteType === "down" && voteType !== "down") {
            newVoteCount += 1;
        }

        if (voteType === "up" && currentVote.voteType !== "up") {
            newVoteCount += 1;
        } else if (voteType === "down" && currentVote.voteType !== "down") {
            newVoteCount -= 1;
        }

        // Store new vote
        votes.set(promptId, { usernumber: newVoteCount, voteType });

        // Revalidate the prompt page
        revalidatePath(`/prompts/${promptId}`);

        return {
            success: true,
            data: { votes: newVoteCount, userVote: voteType },
        };
    } catch (error) {
        console.error("Error voting on prompt:", error);
        return {
            success: false,
            error: "Failed to record vote. Please try again.",
        };
    }
}

/**
 * Toggle bookmark status for a prompt
 */
export async function toggleBookmark(
    promptId: string
): Promise<ActionResponse<{ isBookmarked: boolean }>> {
    try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 100));

        const key = `user-${promptId}`; // In production, would include actual user ID
        const isCurrentlyBookmarked = bookmarks.has(key);

        if (isCurrentlyBookmarked) {
            bookmarks.delete(key);
        } else {
            bookmarks.add(key);
        }

        return {
            success: true,
            data: { isBookmarked: !isCurrentlyBookmarked },
        };
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        return {
            success: false,
            error: "Failed to update bookmark. Please try again.",
        };
    }
}

/**
 * Check if a prompt is bookmarked
 */
export async function checkBookmark(
    promptId: string
): Promise<ActionResponse<{ isBookmarked: boolean }>> {
    try {
        const key = `user-${promptId}`;
        return {
            success: true,
            data: { isBookmarked: bookmarks.has(key) },
        };
    } catch (error) {
        console.error("Error checking bookmark:", error);
        return {
            success: false,
            error: "Failed to check bookmark status.",
        };
    }
}

/**
 * Add a comment to a prompt
 */
export async function addComment(
    promptId: string,
    content: string
): Promise<ActionResponse<{ commentId: string }>> {
    try {
        // Validate content
        if (!content || content.trim().length < 3) {
            return {
                success: false,
                error: "Comment must be at least 3 characters long.",
            };
        }

        if (content.length > 2000) {
            return {
                success: false,
                error: "Comment must be less than 2000 characters.",
            };
        }

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 150));

        const commentId = `cmt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newComment = {
            id: commentId,
            content: content.trim(),
            userId: "demo-user", // In production, would use actual user ID
            createdAt: new Date(),
        };

        const existingComments = comments.get(promptId) || [];
        comments.set(promptId, [...existingComments, newComment]);

        // Revalidate the prompt page to show new comment
        revalidatePath(`/prompts/${promptId}`);

        return {
            success: true,
            data: { commentId },
        };
    } catch (error) {
        console.error("Error adding comment:", error);
        return {
            success: false,
            error: "Failed to add comment. Please try again.",
        };
    }
}

/**
 * Delete a comment (only by owner)
 */
export async function deleteComment(
    promptId: string,
    commentId: string
): Promise<ActionResponse> {
    try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 100));

        const existingComments = comments.get(promptId) || [];
        const commentIndex = existingComments.findIndex((c) => c.id === commentId);

        if (commentIndex === -1) {
            return {
                success: false,
                error: "Comment not found.",
            };
        }

        // In production, would verify the user owns this comment
        existingComments.splice(commentIndex, 1);
        comments.set(promptId, existingComments);

        revalidatePath(`/prompts/${promptId}`);

        return { success: true };
    } catch (error) {
        console.error("Error deleting comment:", error);
        return {
            success: false,
            error: "Failed to delete comment. Please try again.",
        };
    }
}

/**
 * Get comments for a prompt
 */
export async function getComments(
    promptId: string
): Promise<ActionResponse<{ comments: typeof comments extends Map<string, infer V> ? V : never }>> {
    try {
        const promptComments = comments.get(promptId) || [];
        return {
            success: true,
            data: { comments: promptComments },
        };
    } catch (error) {
        console.error("Error fetching comments:", error);
        return {
            success: false,
            error: "Failed to load comments.",
        };
    }
}

/**
 * Submit a new prompt
 */
export async function submitPrompt(data: {
    title: string;
    content: string;
    description?: string;
    categoryId: string;
    modelId: string;
    tags: string[];
}): Promise<ActionResponse<{ promptId: string; slug: string }>> {
    try {
        // Validation
        if (!data.title || data.title.trim().length < 5) {
            return {
                success: false,
                error: "Title must be at least 5 characters long.",
            };
        }

        if (!data.content || data.content.trim().length < 20) {
            return {
                success: false,
                error: "Prompt content must be at least 20 characters long.",
            };
        }

        if (!data.categoryId) {
            return {
                success: false,
                error: "Please select a category.",
            };
        }

        if (!data.modelId) {
            return {
                success: false,
                error: "Please select an AI model.",
            };
        }

        if (data.tags.length > 5) {
            return {
                success: false,
                error: "Maximum 5 tags allowed.",
            };
        }

        // Simulate network delay for "saving"
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Generate unique ID and slug
        const promptId = `prm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        // In production, this would insert into the database via Prisma
        // const prompt = await prisma.prompt.create({ data: { ... } });

        // Revalidate relevant pages
        revalidatePath("/");
        revalidatePath("/categories");
        revalidatePath("/models");

        return {
            success: true,
            data: { promptId, slug },
        };
    } catch (error) {
        console.error("Error submitting prompt:", error);
        return {
            success: false,
            error: "Failed to submit prompt. Please try again.",
        };
    }
}

/**
 * Report a prompt for moderation
 */
export async function reportPrompt(
    promptId: string,
    reason: "spam" | "inappropriate" | "copyright" | "other",
    details?: string
): Promise<ActionResponse> {
    try {
        // Validate
        if (!reason) {
            return {
                success: false,
                error: "Please select a reason for reporting.",
            };
        }

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 200));

        // In production, this would create a moderation queue entry
        console.log(`Report submitted for prompt ${promptId}: ${reason}`, details);

        return { success: true };
    } catch (error) {
        console.error("Error reporting prompt:", error);
        return {
            success: false,
            error: "Failed to submit report. Please try again.",
        };
    }
}

/**
 * Track prompt view (for analytics)
 */
export async function trackPromptView(promptId: string): Promise<void> {
    try {
        // In production, this would increment the view count in the database
        // await prisma.prompt.update({ where: { id: promptId }, data: { views: { increment: 1 } } });
        console.log(`View tracked for prompt: ${promptId}`);
    } catch (error) {
        // Silent fail for analytics - don't block the user
        console.error("Error tracking view:", error);
    }
}

/**
 * Search prompts with autocomplete
 */
export async function searchPromptsAutocomplete(
    query: string
): Promise<ActionResponse<{ suggestions: Array<{ title: string; slug: string; category: string }> }>> {
    try {
        if (!query || query.length < 2) {
            return {
                success: true,
                data: { suggestions: [] },
            };
        }

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 50));

        // In production, this would query the database with full-text search
        // For now, return mock suggestions
        const mockSuggestions = [
            { title: "Python Code Debugger", slug: "python-code-debugger", category: "Coding" },
            { title: "Blog Post Writer", slug: "blog-post-writer", category: "Writing" },
            { title: "Marketing Copy Generator", slug: "marketing-copy-generator", category: "Marketing" },
        ].filter((s) => s.title.toLowerCase().includes(query.toLowerCase()));

        return {
            success: true,
            data: { suggestions: mockSuggestions.slice(0, 5) },
        };
    } catch (error) {
        console.error("Error searching prompts:", error);
        return {
            success: false,
            error: "Search failed. Please try again.",
        };
    }
}
