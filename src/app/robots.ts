import type { MetadataRoute } from "next";

/**
 * Robots.txt configuration for SEO
 * Next.js automatically serves this at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://godlyprompts.com";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/sign-in",
                    "/sign-up",
                    "/user/settings",
                    "/admin/",
                ],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
            },
            {
                userAgent: "Bingbot",
                allow: "/",
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
