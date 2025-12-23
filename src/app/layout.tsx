import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { OrganizationSchema, WebSiteSchema } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    title: {
        default: "AI Library Prompts - 100+ Best ChatGPT, Claude & Gemini Prompts That Actually Work",
        template: "%s | AI Library Prompts",
    },
    description:
        "Discover 100+ free AI prompts for ChatGPT, Claude Sonnet, Gemini, and GPT-4. Community-curated prompt library for coding, writing, business, research, and creative tasks. Copy, vote, and share the best AI prompt templates.",
    keywords: [
        "AI prompts",
        "ChatGPT prompts",
        "Claude prompts",
        "Gemini prompts",
        "prompt engineering",
        "AI prompt library",
        "GPT-4 prompts",
        "Claude Sonnet prompts",
        "best AI prompts",
        "free AI prompts",
        "prompt templates",
        "AI assistant prompts",
        "coding prompts",
        "writing prompts AI",
        "business AI prompts",
    ],
    authors: [{ name: "AI Library Prompts Team" }],
    creator: "AI Library Prompts",
    publisher: "AI Library Prompts",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "AI Library Prompts",
        title: "100+ Best AI Prompts for ChatGPT, Claude & Gemini That Actually Work",
        description:
            "Free community-driven AI prompt library. Browse, copy, and vote on 100+ tested prompts for coding, writing, business, and creativity.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "AI Library Prompts - Community AI Prompt Library",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "100+ Best AI Prompts for ChatGPT, Claude & Gemini",
        description:
            "Free community-driven AI prompt library with tested prompts for coding, writing, business, and more.",
        images: ["/og-image.png"],
        site: "@ailibraryprompts",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    alternates: {
        canonical: "/",
    },
};

export const viewport: Viewport = {
    themeColor: "#0a0a0f",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Only wrap with ClerkProvider if the publishable key is available
    // This allows the site to build even if Clerk isn't configured
    const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    const clerkAppearance = {
        variables: {
            colorPrimary: "#7c3aed",
            colorBackground: "#0f172a",
            colorInputBackground: "#1e293b",
            colorInputText: "#f8fafc",
            colorText: "#f8fafc",
            colorTextSecondary: "#94a3b8",
            colorTextOnPrimaryBackground: "#ffffff",
            colorDanger: "#ef4444",
            colorSuccess: "#22c55e",
            colorWarning: "#f59e0b",
            colorNeutral: "#f8fafc",
        },
        elements: {
            // Card/modal styling
            card: "bg-slate-900 border border-slate-700 shadow-xl",
            headerTitle: "text-white",
            headerSubtitle: "text-slate-400",
            // Form elements
            formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
            formFieldInput: "bg-slate-800 border-slate-600 text-white placeholder-slate-400",
            formFieldLabel: "text-slate-300",
            footerActionLink: "text-purple-400 hover:text-purple-300",
            // User button (profile dropdown)
            userButtonPopoverCard: "bg-slate-900 border border-slate-700",
            userButtonPopoverActionButton: "text-slate-200 hover:bg-slate-800",
            userButtonPopoverActionButtonText: "text-slate-200",
            userButtonPopoverActionButtonIcon: "text-slate-400",
            userButtonPopoverFooter: "border-slate-700",
            // User preview (name/email in dropdown)
            userPreviewMainIdentifier: "text-white font-medium",
            userPreviewSecondaryIdentifier: "text-slate-400",
            // Development mode banner
            badge: "bg-orange-500 text-white",
            dividerLine: "bg-slate-700",
            // Menu items
            menuButton: "text-slate-200 hover:bg-slate-800",
            menuItem: "text-slate-200 hover:bg-slate-800",
        }
    };

    const content = (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-dark-950 text-dark-50 antialiased">
                {/* Global SEO Structured Data */}
                <OrganizationSchema />
                <WebSiteSchema />
                <div className="relative flex min-h-screen flex-col">
                    {children}
                </div>
            </body>
        </html>
    );

    // Wrap with ClerkProvider only if key is available
    if (clerkPublishableKey) {
        return (
            <ClerkProvider
                publishableKey={clerkPublishableKey}
                appearance={clerkAppearance}
            >
                {content}
            </ClerkProvider>
        );
    }

    // Return without Clerk if key is not configured
    return content;
}
