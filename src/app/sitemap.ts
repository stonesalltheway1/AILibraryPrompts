import type { MetadataRoute } from "next";
import { getAllCombinedPrompts, mockCategories, mockModels } from "@/lib/mock-data";

/**
 * Generate sitemap for SEO
 * Next.js automatically serves this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ailibraryprompts.com";
    const currentDate = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/categories`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/models`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/leaderboard`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/search`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/submit`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.3,
        },
    ];

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = mockCategories.map((category) => ({
        url: `${baseUrl}/categories/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: "daily" as const,
        priority: 0.7,
    }));

    // Model pages
    const modelPages: MetadataRoute.Sitemap = mockModels.map((model) => ({
        url: `${baseUrl}/models/${model.slug}`,
        lastModified: currentDate,
        changeFrequency: "daily" as const,
        priority: 0.7,
    }));

    // Prompt pages - includes all 100 prompts
    const promptPages: MetadataRoute.Sitemap = getAllCombinedPrompts().map((prompt) => ({
        url: `${baseUrl}/prompts/${prompt.slug}`,
        lastModified: prompt.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    return [...staticPages, ...categoryPages, ...modelPages, ...promptPages];
}
