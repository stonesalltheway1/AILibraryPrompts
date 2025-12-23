// ============================================================================
// ALL PROMPTS - Combines base prompts and extended library
// Import from this file to get all prompts
// ============================================================================

import { mockPrompts } from "./mock-data";
import { getExtendedPrompts } from "./prompt-library";
import type { Prompt } from "./types";

// Combined array of all prompts - uses lazy getter
export function getAllPrompts(): Prompt[] {
    return [...mockPrompts, ...getExtendedPrompts()];
}

// Helper functions that work with all prompts
export function getAllPromptsByCategory(categorySlug: string): Prompt[] {
    return getAllPrompts().filter((p) => p.category.slug === categorySlug);
}

export function getAllPromptsByModel(modelSlug: string): Prompt[] {
    return getAllPrompts().filter((p) => p.model.slug === modelSlug);
}

export function getAllTrendingPrompts(limit = 6): Prompt[] {
    return [...getAllPrompts()]
        .sort((a, b) => {
            const ageA = (Date.now() - a.createdAt.getTime()) / (1000 * 60 * 60);
            const ageB = (Date.now() - b.createdAt.getTime()) / (1000 * 60 * 60);
            const scoreA = a.votes / Math.pow(ageA + 2, 1.5);
            const scoreB = b.votes / Math.pow(ageB + 2, 1.5);
            return scoreB - scoreA;
        })
        .slice(0, limit);
}

export function getAllFeaturedPrompts(limit = 3): Prompt[] {
    return getAllPrompts().filter((p) => p.featured).slice(0, limit);
}

export function getAllRecentPrompts(limit = 6): Prompt[] {
    return [...getAllPrompts()]
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, limit);
}

export function getAllTopPrompts(limit = 10): Prompt[] {
    return [...getAllPrompts()]
        .sort((a, b) => b.votes - a.votes)
        .slice(0, limit);
}

export function searchAllPrompts(query: string): Prompt[] {
    const lowerQuery = query.toLowerCase();
    return getAllPrompts().filter(
        (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.description?.toLowerCase().includes(lowerQuery) ||
            p.content.toLowerCase().includes(lowerQuery) ||
            p.tags.some((t) => t.name.toLowerCase().includes(lowerQuery))
    );
}
