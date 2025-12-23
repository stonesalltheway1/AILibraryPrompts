import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    title: {
        default: "AI Library Prompts - Discover AI Prompts That Actually Work",
        template: "%s | AI Library Prompts",
    },
    description:
        "The largest community-driven collection of AI prompts for ChatGPT, Claude, Gemini, and more. Find, share, and vote on the best prompts for coding, writing, business, and creativity.",
    keywords: [
        "AI prompts",
        "ChatGPT prompts",
        "Claude prompts",
        "Gemini prompts",
        "prompt engineering",
        "AI prompt library",
        "GPT-5 prompts",
        "Claude 4 prompts",
        "best AI prompts",
    ],
    authors: [{ name: "AI Library Prompts" }],
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
        title: "AI Library Prompts - Discover AI Prompts That Actually Work",
        description:
            "The largest community-driven collection of AI prompts for ChatGPT, Claude, Gemini, and more.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "AI Library Prompts",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Library Prompts - Discover AI Prompts That Actually Work",
        description:
            "The largest community-driven collection of AI prompts for ChatGPT, Claude, Gemini, and more.",
        images: ["/og-image.png"],
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
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
        },
        elements: {
            card: "bg-slate-900 border border-slate-700",
            headerTitle: "text-white",
            headerSubtitle: "text-slate-400",
            formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
            footerActionLink: "text-purple-400 hover:text-purple-300",
        }
    };

    const content = (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-dark-950 text-dark-50 antialiased">
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
