import Link from "next/link";
import type { Metadata } from "next";
import { Scale, FileCheck, AlertTriangle, BookOpen, Shield, Users, Gavel, Mail } from "lucide-react";
import { Header, Footer } from "@/components";

export const metadata: Metadata = {
    title: "Terms of Service | Godly Prompts",
    description: "Read the Terms of Service for Godly Prompts. Understand your rights and responsibilities when using our platform.",
};

export default function TermsPage() {
    const lastUpdated = "December 23, 2025";

    return (
        <>
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden border-b border-dark-700/50">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent" />
                    <div className="container-main relative py-16">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm">
                                <Scale className="w-4 h-4" />
                                Legal Agreement
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Terms of <span className="gradient-text">Service</span>
                            </h1>
                            <p className="text-dark-400">
                                Last updated: {lastUpdated}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16">
                    <div className="container-main">
                        <div className="max-w-4xl mx-auto">
                            <div className="prose prose-invert prose-lg max-w-none">
                                {/* Introduction */}
                                <div className="p-6 rounded-2xl bg-dark-800/40 border border-dark-700/50 mb-8">
                                    <p className="text-dark-300 leading-relaxed m-0">
                                        Welcome to Godly Prompts. By accessing or using our website at godlyprompts.com,
                                        you agree to be bound by these Terms of Service. Please read them carefully before using our services.
                                    </p>
                                </div>

                                {/* Sections */}
                                <div className="space-y-10">
                                    {/* Acceptance of Terms */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
                                                <FileCheck className="w-6 h-6 text-primary-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">1. Acceptance of Terms</h2>
                                            <p className="text-dark-300 m-0">
                                                By accessing and using Godly Prompts, you accept and agree to be bound by these Terms of Service
                                                and our Privacy Policy. If you do not agree to these terms, you must not use our services.
                                                We reserve the right to modify these terms at any time, and your continued use constitutes acceptance
                                                of any changes.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description of Service */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                                                <BookOpen className="w-6 h-6 text-green-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">2. Description of Service</h2>
                                            <p className="text-dark-300 m-0">
                                                Godly Prompts provides a community-driven platform for sharing, discovering, and voting on
                                                AI prompts for various language models including ChatGPT, Claude, Gemini, and others. Our service
                                                includes prompt browsing, user accounts, voting systems, comments, and prompt submission features.
                                            </p>
                                        </div>
                                    </div>

                                    {/* User Accounts */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                                <Users className="w-6 h-6 text-amber-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">3. User Accounts</h2>
                                            <div className="space-y-4 text-dark-300">
                                                <p className="m-0">When you create an account, you agree to:</p>
                                                <ul className="list-disc pl-5 space-y-2 m-0">
                                                    <li>Provide accurate, current, and complete information</li>
                                                    <li>Maintain the security of your account credentials</li>
                                                    <li>Accept responsibility for all activities under your account</li>
                                                    <li>Notify us immediately of any unauthorized access</li>
                                                    <li>Not create multiple accounts or share account access</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Content */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                                                <Gavel className="w-6 h-6 text-cyan-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">4. User Content & Intellectual Property</h2>
                                            <div className="space-y-4 text-dark-300">
                                                <p className="m-0">
                                                    By submitting prompts, comments, or other content to our platform, you grant us a non-exclusive,
                                                    worldwide, royalty-free license to use, display, and distribute your content on our platform.
                                                </p>
                                                <p className="m-0">You represent and warrant that:</p>
                                                <ul className="list-disc pl-5 space-y-2 m-0">
                                                    <li>You own or have rights to the content you submit</li>
                                                    <li>Your content does not infringe on any third-party rights</li>
                                                    <li>Your content is not illegal, harmful, or offensive</li>
                                                    <li>Your content does not contain malicious code or spam</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prohibited Conduct */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                                                <AlertTriangle className="w-6 h-6 text-red-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">5. Prohibited Conduct</h2>
                                            <p className="text-dark-300 mb-4">You agree not to:</p>
                                            <ul className="list-disc pl-5 space-y-2 text-dark-300 m-0">
                                                <li>Violate any applicable laws or regulations</li>
                                                <li>Harass, abuse, or harm other users</li>
                                                <li>Submit false, misleading, or deceptive content</li>
                                                <li>Attempt to gain unauthorized access to our systems</li>
                                                <li>Interfere with or disrupt our services</li>
                                                <li>Scrape or collect data without permission</li>
                                                <li>Use automated systems to access our platform without consent</li>
                                                <li>Impersonate others or misrepresent your affiliation</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Disclaimer */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                                <Shield className="w-6 h-6 text-purple-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">6. Disclaimer of Warranties</h2>
                                            <p className="text-dark-300 m-0">
                                                Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind,
                                                either express or implied. We do not guarantee that prompts will work with specific AI models,
                                                produce specific results, or be suitable for any particular purpose. The effectiveness of prompts
                                                may vary based on AI model versions, settings, and other factors beyond our control.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Limitation of Liability */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                                <Scale className="w-6 h-6 text-indigo-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">7. Limitation of Liability</h2>
                                            <p className="text-dark-300 m-0">
                                                To the maximum extent permitted by law, Godly Prompts and its owners, operators, and affiliates
                                                shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
                                                including but not limited to loss of profits, data, or other intangible losses resulting from
                                                your use of our services.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20">
                                                <Mail className="w-6 h-6 text-pink-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">8. Contact Information</h2>
                                            <p className="text-dark-300 m-0">
                                                If you have any questions about these Terms of Service, please contact us at{" "}
                                                <a href="mailto:swiftclub20@gmail.com" className="text-primary-400 hover:text-primary-300">
                                                    swiftclub20@gmail.com
                                                </a>{" "}
                                                or visit our{" "}
                                                <Link href="/contact" className="text-primary-400 hover:text-primary-300">
                                                    Contact page
                                                </Link>
                                                .
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Agreement Notice */}
                                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20">
                                    <h3 className="text-lg font-bold text-dark-100 mb-2 mt-0">By Using Godly Prompts</h3>
                                    <p className="text-dark-300 m-0">
                                        You acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                                        If you do not agree to these terms, you should not use our services.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
