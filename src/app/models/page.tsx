import Link from "next/link";
import type { Metadata } from "next";
import { Header, Footer } from "@/components";
import { Badge, type Vendor } from "@/components/ui/Badge";
import { mockModels } from "@/lib/mock-data";

export const metadata: Metadata = {
    title: "AI Models & Prompts - ChatGPT, Claude, Gemini & More | AI Library Prompts",
    description: "Browse AI prompts optimized for ChatGPT (GPT-4, GPT-5), Claude (Sonnet, Opus), Google Gemini, Grok, Llama, and Mistral. Find model-specific prompt templates and best practices.",
    keywords: [
        "ChatGPT prompts",
        "Claude prompts",
        "Gemini prompts",
        "GPT-4 prompts",
        "GPT-5 prompts",
        "Claude Sonnet prompts",
        "AI model prompts",
        "Grok prompts",
        "Llama prompts",
    ],
    openGraph: {
        title: "AI Models & Optimized Prompts",
        description: "Explore prompts for ChatGPT, Claude, Gemini, and more AI models",
        type: "website",
        siteName: "AI Library Prompts",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Models & Optimized Prompts",
        description: "Explore prompts for ChatGPT, Claude, Gemini, and more",
        site: "@ailibraryprompts",
    },
    alternates: {
        canonical: "/models",
    },
};

interface VendorInfo {
    name: string;
    description: string;
    color: string;
}

const vendorInfo: Record<Vendor, VendorInfo> = {
    openai: {
        name: "OpenAI",
        description: "GPT-5 series and reasoning models",
        color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    },
    anthropic: {
        name: "Anthropic",
        description: "Claude 4 series models",
        color: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
    },
    google: {
        name: "Google",
        description: "Gemini 3 series models",
        color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
    },
    xai: {
        name: "xAI",
        description: "Grok series models",
        color: "from-red-500/20 to-orange-500/20 border-red-500/30",
    },
    meta: {
        name: "Meta",
        description: "Llama series models",
        color: "from-cyan-500/20 to-teal-500/20 border-cyan-500/30",
    },
    mistral: {
        name: "Mistral",
        description: "Mistral series models",
        color: "from-orange-500/20 to-amber-500/20 border-orange-500/30",
    },
};

// Helper to check if a string is a valid vendor
function isValidVendor(vendor: string): vendor is Vendor {
    return ["openai", "anthropic", "google", "xai", "meta", "mistral"].includes(vendor);
}

export default function ModelsPage() {
    // Group models by vendor
    const modelsByVendor = mockModels.reduce((acc, model) => {
        const vendor = model.vendor;
        if (!acc[vendor]) {
            acc[vendor] = [];
        }
        acc[vendor].push(model);
        return acc;
    }, {} as Record<string, typeof mockModels>);

    return (
        <>
            <Header />

            <main className="flex-1">
                <div className="container-main py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-4">
                            Browse by AI Model
                        </h1>
                        <p className="text-lg text-dark-400 max-w-2xl mx-auto">
                            Find prompts optimized for your preferred AI model.
                            Each prompt is tagged with the model it works best with.
                        </p>
                    </div>

                    {/* Models by Vendor */}
                    <div className="space-y-8">
                        {Object.entries(modelsByVendor).map(([vendor, models]) => {
                            // Type guard to ensure vendor is valid
                            if (!isValidVendor(vendor)) return null;

                            const info = vendorInfo[vendor];

                            return (
                                <div
                                    key={vendor}
                                    className={`rounded-2xl bg-gradient-to-br ${info.color} border p-6`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-50">{info.name}</h2>
                                            <p className="text-sm text-dark-400">{info.description}</p>
                                        </div>
                                        <Badge variant="model" vendor={vendor}>
                                            {models.reduce((sum, m) => sum + (m.promptCount || 0), 0)} prompts
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                        {models.map((model) => (
                                            <Link
                                                key={model.slug}
                                                href={`/models/${model.slug}`}
                                                className="group p-4 rounded-xl bg-dark-800/50 hover:bg-dark-800 border border-dark-700/50 hover:border-dark-600 transition-all"
                                            >
                                                <h3 className="font-semibold text-dark-100 group-hover:text-white transition-colors mb-1">
                                                    {model.name}
                                                </h3>
                                                <p className="text-xs text-dark-500">
                                                    {model.promptCount} prompts
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
