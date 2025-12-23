import Link from "next/link";
import type { Metadata } from "next";
import {
    Code2,
    Pencil,
    Briefcase,
    BookOpen,
    Palette,
    Target,
    GraduationCap,
    Megaphone,
    ArrowRight
} from "lucide-react";
import { Header, Footer } from "@/components";
import { mockCategories } from "@/lib/mock-data";

export const metadata: Metadata = {
    title: "Browse AI Prompt Categories - ChatGPT, Claude & Gemini Prompts | AI Library Prompts",
    description: "Explore 100+ AI prompts organized by category: coding, writing, business, research, creative, productivity, education, and marketing. Find the perfect AI prompt template for your use case.",
    keywords: [
        "AI prompt categories",
        "ChatGPT prompts by category",
        "coding prompts",
        "writing AI prompts",
        "business prompts",
        "research prompts",
        "creative AI prompts",
        "productivity prompts",
    ],
    openGraph: {
        title: "Browse AI Prompt Categories",
        description: "Explore curated AI prompts organized by use case",
        type: "website",
        siteName: "AI Library Prompts",
    },
    twitter: {
        card: "summary_large_image",
        title: "Browse AI Prompt Categories",
        description: "Explore curated AI prompts organized by use case",
        site: "@ailibraryprompts",
    },
    alternates: {
        canonical: "/categories",
    },
};

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    coding: Code2,
    writing: Pencil,
    business: Briefcase,
    research: BookOpen,
    creative: Palette,
    productivity: Target,
    education: GraduationCap,
    marketing: Megaphone,
};

const categoryColors: Record<string, string> = {
    coding: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    writing: "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
    business: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
    research: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
    creative: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
    productivity: "from-cyan-500/20 to-teal-500/20 border-cyan-500/30",
    education: "from-yellow-500/20 to-lime-500/20 border-yellow-500/30",
    marketing: "from-red-500/20 to-orange-500/20 border-red-500/30",
};

export default function CategoriesPage() {
    return (
        <>
            <Header />

            <main className="flex-1">
                <div className="container-main py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-4">
                            Browse by Category
                        </h1>
                        <p className="text-lg text-dark-400 max-w-2xl mx-auto">
                            Explore our curated collection of AI prompts organized by use case.
                            Find exactly what you need for your next project.
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockCategories.map((category) => {
                            const Icon = categoryIcons[category.slug] || Code2;
                            const colorClass = categoryColors[category.slug] || "from-primary-500/20 to-secondary-500/20 border-primary-500/30";

                            return (
                                <Link
                                    key={category.slug}
                                    href={`/categories/${category.slug}`}
                                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorClass} border p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
                                >
                                    {/* Background decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />

                                    <div className="relative">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 rounded-xl bg-dark-800/50 backdrop-blur-sm">
                                                <Icon className="w-8 h-8 text-dark-100" />
                                            </div>
                                            <span className="text-sm font-medium text-dark-300 bg-dark-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
                                                {category.promptCount} prompts
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-bold text-dark-50 mb-2 group-hover:text-white transition-colors">
                                            {category.name}
                                        </h2>

                                        <p className="text-dark-300 mb-4 line-clamp-2">
                                            {category.description}
                                        </p>

                                        <span className="inline-flex items-center gap-2 text-sm font-medium text-dark-200 group-hover:text-white transition-colors">
                                            Explore prompts
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
