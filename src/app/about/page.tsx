import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink, Star, BookOpen, Twitter, Github, Award, Users, Sparkles } from "lucide-react";
import { Header, Footer, BookPromoCard } from "@/components";
import { Card, CardContent, Button } from "@/components/ui";

export const metadata: Metadata = {
    title: "About Eric Keller - AI Communication Strategist & Author | AI Library Prompts",
    description: "Meet Eric Keller, founder of Keller Concepts and author of 'The Art of the Prompt'. Learn about the expert behind AI Library Prompts and his mission to help professionals master AI communication.",
    keywords: ["Eric Keller", "AI prompt expert", "The Art of the Prompt", "prompt engineering", "AI communication", "Keller Concepts"],
    openGraph: {
        title: "About Eric Keller - AI Communication Strategist & Author",
        description: "Meet the expert behind AI Library Prompts and author of 'The Art of the Prompt'.",
        type: "profile",
    },
};

export default function AboutPage() {
    return (
        <>
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden border-b border-dark-700/50">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent" />
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

                    <div className="container-main relative py-16 lg:py-24">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                                {/* Author Photo */}
                                <div className="relative shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-amber-500/20 rounded-full blur-xl" />
                                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-dark-700/50 shadow-2xl">
                                        <Image
                                            src="/images/headshot.jpg"
                                            alt="Eric Keller - AI Communication Strategist"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        Author
                                    </div>
                                </div>

                                {/* Author Info */}
                                <div className="text-center md:text-left">
                                    <p className="text-amber-400 font-medium text-sm mb-2 flex items-center justify-center md:justify-start gap-2">
                                        <Award className="w-4 h-4" />
                                        AI Communication Strategist & Prompt Engineering Expert
                                    </p>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                        Eric Keller
                                    </h1>
                                    <p className="text-lg text-dark-300 mb-4">
                                        Founder of <span className="text-primary-400">Keller Concepts</span> and creator of AI Library Prompts
                                    </p>
                                    <div className="flex items-center justify-center md:justify-start gap-4">
                                        <a
                                            href="https://twitter.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-dark-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors"
                                            aria-label="Follow on Twitter"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="https://github.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-dark-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors"
                                            aria-label="View on GitHub"
                                        >
                                            <Github className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="text-center p-4 rounded-xl bg-dark-800/40 border border-dark-700/50">
                                    <div className="text-2xl font-bold text-primary-400 mb-1">215</div>
                                    <div className="text-sm text-dark-400">Pages in Book</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-dark-800/40 border border-dark-700/50">
                                    <div className="text-2xl font-bold text-amber-400 mb-1">5.0 ⭐</div>
                                    <div className="text-sm text-dark-400">Book Rating</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-dark-800/40 border border-dark-700/50">
                                    <div className="text-2xl font-bold text-green-400 mb-1">100+</div>
                                    <div className="text-sm text-dark-400">Free Prompts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Content */}
                <section className="py-12 border-b border-dark-700/50">
                    <div className="container-main">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Bio */}
                                <div>
                                    <h2 className="text-xl font-bold text-dark-100 mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-primary-400" />
                                        About Eric
                                    </h2>
                                    <div className="prose prose-invert prose-sm">
                                        <p className="text-dark-300 leading-relaxed mb-4">
                                            Eric Keller is the founder of Keller Concepts and a recognized authority in enterprise AI communication. Currently pursuing his degree at Southern New Hampshire University, Eric combines academic rigor with real-world application.
                                        </p>
                                        <p className="text-dark-300 leading-relaxed mb-4">
                                            His systematic &quot;Prompt Architect&quot; methodology has been adopted by marketing agencies, consulting firms, and Fortune 500 companies, improving AI output quality by an average of 340%.
                                        </p>
                                        <p className="text-dark-300 leading-relaxed">
                                            Based in Stillwater, Oklahoma, Eric is passionate about mentoring business students and contributing to open-source AI education initiatives.
                                        </p>
                                    </div>
                                </div>

                                {/* Expertise */}
                                <div>
                                    <h2 className="text-xl font-bold text-dark-100 mb-4 flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-amber-400" />
                                        Expertise Areas
                                    </h2>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/40 border border-dark-700/50">
                                            <div className="w-2 h-2 rounded-full bg-primary-400" />
                                            <span className="text-dark-200">Enterprise prompt architecture</span>
                                        </li>
                                        <li className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/40 border border-dark-700/50">
                                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                                            <span className="text-dark-200">Professional workflow automation</span>
                                        </li>
                                        <li className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/40 border border-dark-700/50">
                                            <div className="w-2 h-2 rounded-full bg-green-400" />
                                            <span className="text-dark-200">AI ethics and compliance</span>
                                        </li>
                                        <li className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/40 border border-dark-700/50">
                                            <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                            <span className="text-dark-200">Cross-industry implementation strategies</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Book Promo Section */}
                <section className="py-16 border-b border-dark-700/50">
                    <div className="container-main">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-dark-100 mb-6 text-center flex items-center justify-center gap-2">
                                <BookOpen className="w-6 h-6 text-amber-400" />
                                Featured Book
                            </h2>
                            <BookPromoCard variant="featured" />
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16">
                    <div className="container-main">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl font-bold text-dark-100 mb-4">
                                The Mission Behind AI Library Prompts
                            </h2>
                            <p className="text-dark-300 leading-relaxed mb-6">
                                The gap between a casual AI user and a top-tier professional isn&apos;t knowing more tricks—it&apos;s having a system. AI Library Prompts exists to democratize access to proven prompt templates that actually work, helping everyone from students to executives get better results from AI.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/prompts">
                                    <Button variant="primary" size="lg">
                                        Browse All Prompts
                                    </Button>
                                </Link>
                                <Link href="/submit">
                                    <Button variant="secondary" size="lg">
                                        Submit Your Prompt
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
