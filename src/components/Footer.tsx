import Link from "next/link";
import {
    Sparkles,
    Github,
    Twitter,
    Mail,
    Code2,
    Pencil,
    Briefcase,
    BookOpen,
    Palette,
    Target,
    GraduationCap,
    Megaphone
} from "lucide-react";

const categories = [
    { name: "Coding", slug: "coding", icon: Code2 },
    { name: "Writing", slug: "writing", icon: Pencil },
    { name: "Business", slug: "business", icon: Briefcase },
    { name: "Research", slug: "research", icon: BookOpen },
    { name: "Creative", slug: "creative", icon: Palette },
    { name: "Productivity", slug: "productivity", icon: Target },
    { name: "Education", slug: "education", icon: GraduationCap },
    { name: "Marketing", slug: "marketing", icon: Megaphone },
];

const aiModels = [
    { name: "ChatGPT / GPT-5", slug: "gpt-5" },
    { name: "Claude 4", slug: "claude-4" },
    { name: "Gemini 3", slug: "gemini-3" },
    { name: "Grok 4", slug: "grok-4" },
    { name: "Llama 4", slug: "llama-4" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-dark-700/50 bg-dark-900/50 mt-auto">
            <div className="container-main py-12 lg:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                                AI Library Prompts
                            </span>
                        </Link>
                        <p className="text-sm text-dark-400 mb-4 max-w-xs">
                            The largest community-driven collection of AI prompts. Find, share, and vote on prompts that actually work.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-dark-400 hover:text-dark-100 hover:bg-dark-800 rounded-lg transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-dark-400 hover:text-dark-100 hover:bg-dark-800 rounded-lg transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:hello@ailibraryprompts.com"
                                className="p-2 text-dark-400 hover:text-dark-100 hover:bg-dark-800 rounded-lg transition-colors"
                                aria-label="Email"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-sm font-semibold text-dark-100 mb-4">Categories</h4>
                        <ul className="space-y-2.5">
                            {categories.slice(0, 6).map((cat) => (
                                <li key={cat.slug}>
                                    <Link
                                        href={`/categories/${cat.slug}`}
                                        className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* AI Models */}
                    <div>
                        <h4 className="text-sm font-semibold text-dark-100 mb-4">AI Models</h4>
                        <ul className="space-y-2.5">
                            {aiModels.map((model) => (
                                <li key={model.slug}>
                                    <Link
                                        href={`/models/${model.slug}`}
                                        className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                                    >
                                        {model.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold text-dark-100 mb-4">Resources</h4>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    href="/submit"
                                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                                >
                                    Submit a Prompt
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/leaderboard"
                                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                                >
                                    Leaderboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/search"
                                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                                >
                                    Search Prompts
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="/rss.xml"
                                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                                >
                                    RSS Feed
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-dark-100 mb-4">Legal</h4>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-dark-700/50 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-dark-500">
                        © {currentYear} AI Library Prompts. All rights reserved.
                    </p>
                    <p className="text-sm text-dark-500">
                        Made with passion for the AI community
                    </p>
                </div>
            </div>
        </footer>
    );
}
