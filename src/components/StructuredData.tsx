"use client";

import Script from "next/script";

interface OrganizationSchemaProps {
    name?: string;
    url?: string;
    logo?: string;
    description?: string;
}

interface WebSiteSchemaProps {
    name?: string;
    url?: string;
    description?: string;
}

interface ItemListSchemaProps {
    name: string;
    description: string;
    items: Array<{
        name: string;
        url: string;
        position: number;
    }>;
}

interface HowToSchemaProps {
    name: string;
    description: string;
    step: string;
}

// Organization Schema - for brand identity in search
export function OrganizationSchema({
    name = "AI Library Prompts",
    url = "https://ailibraryprompts.com",
    logo = "https://ailibraryprompts.com/logo.png",
    description = "The largest community-driven collection of AI prompts for ChatGPT, Claude, Gemini, and more.",
}: OrganizationSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name,
        url,
        logo,
        description,
        sameAs: [
            "https://twitter.com/ailibraryprompts",
            "https://github.com/ailibraryprompts",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "support@ailibraryprompts.com",
        },
    };

    return (
        <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// WebSite Schema with SearchAction - enables site search in Google
export function WebSiteSchema({
    name = "AI Library Prompts",
    url = "https://ailibraryprompts.com",
    description = "Discover AI prompts that actually work. Browse prompts for ChatGPT, Claude, Gemini, and more.",
}: WebSiteSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name,
        url,
        description,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${url}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ItemList Schema - for category pages with multiple prompts
export function ItemListSchema({ name, description, items }: ItemListSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        description,
        numberOfItems: items.length,
        itemListElement: items.map((item) => ({
            "@type": "ListItem",
            position: item.position,
            name: item.name,
            url: item.url,
        })),
    };

    return (
        <Script
            id="itemlist-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// HowTo Schema - for individual prompt pages
export function HowToSchema({ name, description, step }: HowToSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        step: [
            {
                "@type": "HowToStep",
                text: "Copy the prompt template below",
            },
            {
                "@type": "HowToStep",
                text: "Paste into your AI assistant (ChatGPT, Claude, Gemini, etc.)",
            },
            {
                "@type": "HowToStep",
                text: step,
            },
        ],
        tool: [
            {
                "@type": "HowToTool",
                name: "AI Assistant (ChatGPT, Claude, Gemini)",
            },
        ],
    };

    return (
        <Script
            id="howto-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// BreadcrumbList Schema - for navigation hierarchy
export function BreadcrumbSchema({
    items
}: {
    items: Array<{ name: string; url: string }>
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <Script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQ Schema - for pages with questions/answers
export function FAQSchema({
    questions
}: {
    questions: Array<{ question: string; answer: string }>
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: q.answer,
            },
        })),
    };

    return (
        <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
