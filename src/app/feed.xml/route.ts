import { mockPrompts } from "@/lib/mock-data";

/**
 * RSS Feed for AI Library Prompts
 * Accessible at /feed.xml
 */
export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ailibraryprompts.com";

    // Get latest prompts sorted by date
    const latestPrompts = [...mockPrompts]
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 50);

    const rssItems = latestPrompts.map((prompt) => {
        // Escape XML special characters
        const escapeXml = (str: string) =>
            str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&apos;");

        return `
    <item>
      <title>${escapeXml(prompt.title)}</title>
      <link>${baseUrl}/prompts/${prompt.slug}</link>
      <guid isPermaLink="true">${baseUrl}/prompts/${prompt.slug}</guid>
      <description>${escapeXml(prompt.description || prompt.content.slice(0, 200) + "...")}</description>
      <author>${escapeXml(prompt.user.username)}</author>
      <category>${escapeXml(prompt.category.name)}</category>
      <pubDate>${prompt.createdAt.toUTCString()}</pubDate>
    </item>`;
    }).join("");

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>AI Library Prompts</title>
    <link>${baseUrl}</link>
    <description>Discover AI prompts that actually work. The largest community-driven collection of prompts for ChatGPT, Claude, Gemini, and more.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>AI Library Prompts</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rssFeed, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
