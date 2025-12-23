import Link from "next/link";
import type { Metadata } from "next";
import { Shield, Lock, Eye, Database, Cookie, Users, Mail, FileText } from "lucide-react";
import { Header, Footer } from "@/components";

export const metadata: Metadata = {
    title: "Privacy Policy | AI Library Prompts",
    description: "Learn how AI Library Prompts collects, uses, and protects your personal information. We are committed to protecting your privacy.",
};

export default function PrivacyPage() {
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
                                <Shield className="w-4 h-4" />
                                Your Privacy Matters
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Privacy <span className="gradient-text">Policy</span>
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
                                        AI Library Prompts (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                                        when you visit our website ailibraryprompts.com.
                                    </p>
                                </div>

                                {/* Sections */}
                                <div className="space-y-10">
                                    {/* Information We Collect */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
                                                <Database className="w-6 h-6 text-primary-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">Information We Collect</h2>
                                            <div className="space-y-4 text-dark-300">
                                                <p className="m-0">We may collect information about you in various ways:</p>
                                                <ul className="list-disc pl-5 space-y-2 m-0">
                                                    <li><strong className="text-dark-100">Personal Data:</strong> Name, email address, and username when you create an account or submit content.</li>
                                                    <li><strong className="text-dark-100">Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and actions taken.</li>
                                                    <li><strong className="text-dark-100">Device Data:</strong> Browser type, operating system, IP address, and device identifiers.</li>
                                                    <li><strong className="text-dark-100">Content Data:</strong> Prompts, comments, and other content you submit to our platform.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* How We Use Your Information */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                                                <Eye className="w-6 h-6 text-green-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">How We Use Your Information</h2>
                                            <ul className="list-disc pl-5 space-y-2 text-dark-300 m-0">
                                                <li>To provide and maintain our services</li>
                                                <li>To personalize your experience on our platform</li>
                                                <li>To communicate with you about updates, features, and support</li>
                                                <li>To analyze usage patterns and improve our website</li>
                                                <li>To protect against fraud and unauthorized access</li>
                                                <li>To comply with legal obligations</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Cookies */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                                <Cookie className="w-6 h-6 text-amber-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">Cookies & Tracking Technologies</h2>
                                            <p className="text-dark-300 m-0">
                                                We use cookies and similar tracking technologies to enhance your browsing experience.
                                                These include essential cookies for site functionality, analytics cookies to understand
                                                usage patterns, and preference cookies to remember your settings. You can control cookie
                                                preferences through your browser settings.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Data Security */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                                                <Lock className="w-6 h-6 text-cyan-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">Data Security</h2>
                                            <p className="text-dark-300 m-0">
                                                We implement appropriate technical and organizational security measures to protect
                                                your personal information. This includes encryption, secure servers, and regular
                                                security audits. However, no method of transmission over the Internet is 100% secure,
                                                and we cannot guarantee absolute security.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Third-Party Services */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                                <Users className="w-6 h-6 text-purple-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">Third-Party Services</h2>
                                            <p className="text-dark-300 m-0">
                                                We may use third-party services such as Clerk for authentication, Vercel for hosting,
                                                and analytics providers. These services have their own privacy policies governing
                                                data collection. We recommend reviewing their policies for more information.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Your Rights */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20">
                                                <FileText className="w-6 h-6 text-pink-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">Your Rights</h2>
                                            <p className="text-dark-300 mb-4">You have the right to:</p>
                                            <ul className="list-disc pl-5 space-y-2 text-dark-300 m-0">
                                                <li>Access and receive a copy of your personal data</li>
                                                <li>Request correction of inaccurate data</li>
                                                <li>Request deletion of your personal data</li>
                                                <li>Object to or restrict processing of your data</li>
                                                <li>Withdraw consent at any time</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0">
                                            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                                <Mail className="w-6 h-6 text-indigo-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-dark-100 mb-4 mt-0">Contact Us</h2>
                                            <p className="text-dark-300 m-0">
                                                If you have questions about this Privacy Policy or our data practices, please contact us at{" "}
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

                                {/* Changes Notice */}
                                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20">
                                    <h3 className="text-lg font-bold text-dark-100 mb-2 mt-0">Changes to This Policy</h3>
                                    <p className="text-dark-300 m-0">
                                        We may update this Privacy Policy from time to time. We will notify you of any changes by
                                        posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
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
