import { mockPrompts } from "@/lib/mock-data";

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://godlyprompts.com";

    // Get all prompts sorted by date
    const sortedPrompts = [...mockPrompts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const rssItems = sortedPrompts.map((prompt) => `
    <item>
      <title><![CDATA[${prompt.title}]]></title>
      <link>${baseUrl}/prompts/${prompt.slug}</link>
      <guid isPermaLink="true">${baseUrl}/prompts/${prompt.slug}</guid>
      <description><![CDATA[${prompt.description}]]></description>
      <pubDate>${new Date(prompt.createdAt).toUTCString()}</pubDate>
      <category>${prompt.category.name}</category>
      <author>${prompt.user.username}</author>
    </item>`).join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Godly Prompts - Latest AI Prompts</title>
    <link>${baseUrl}</link>
    <description>Discover the latest AI prompts for ChatGPT, Claude, Gemini, and more. Community-curated prompts that actually work.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Godly Prompts</title>
      <link>${baseUrl}</link>
    </image>
    <copyright>© ${new Date().getFullYear()} Godly Prompts. All rights reserved.</copyright>
    <managingEditor>swiftclub20@gmail.com (Eric Keller)</managingEditor>
    <webMaster>swiftclub20@gmail.com (Eric Keller)</webMaster>
    <ttl>60</ttl>
${rssItems}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
    });
}
