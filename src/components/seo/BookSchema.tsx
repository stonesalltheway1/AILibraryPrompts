import Script from "next/script";

interface BookSchemaProps {
    className?: string;
}

/**
 * Schema.org Book structured data for SEO
 * Helps with rich snippets in Google search results
 */
export function BookSchema({ className }: BookSchemaProps) {
    const bookData = {
        "@context": "https://schema.org",
        "@type": "Book",
        "name": "The Art of the Prompt: A Professional's Guide to Mastering AI Communication and Amplifying Your Work",
        "author": {
            "@type": "Person",
            "name": "Eric Keller",
            "url": "https://ailibraryprompts.com/about"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Keller Concepts"
        },
        "datePublished": "2025-09-02",
        "isbn": "B0FPK6Y2ZB",
        "numberOfPages": 315,
        "bookFormat": "https://schema.org/EBook",
        "inLanguage": "en",
        "description": "Stop Getting Generic Answers. Start Building Your Professional Future. The gap between a casual user and a top-tier professional isn't knowing more AI tricks; it's having a system. The Prompt Architect is a systematic, no-fluff guide that transforms you from a simple AI user into a designer of sophisticated, AI-augmented workflows.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "1",
            "bestRating": "5",
            "worstRating": "1"
        },
        "offers": [
            {
                "@type": "Offer",
                "price": "17.99",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://www.amazon.com/dp/B0FPK6Y2ZB",
                "seller": {
                    "@type": "Organization",
                    "name": "Amazon"
                }
            },
            {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://www.amazon.com/dp/B0FPK6Y2ZB",
                "description": "Free with Kindle Unlimited"
            }
        ],
        "sameAs": [
            "https://www.amazon.com/dp/B0FPK6Y2ZB"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(bookData) }}
        />
    );
}
