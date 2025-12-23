"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, MapPin, Clock } from "lucide-react";
import { Header, Footer } from "@/components";
import { Card, CardContent, Button, Input } from "@/components/ui";

export default function ContactPage() {
    const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("sending");

        try {
            // Create mailto link with form data
            const mailtoLink = `mailto:swiftclub20@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;

            // Open default email client
            window.location.href = mailtoLink;

            // Show success state
            setFormState("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch {
            setFormState("error");
        }
    };

    return (
        <>
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden border-b border-dark-700/50">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent" />
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />

                    <div className="container-main relative py-16 lg:py-20">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm">
                                <MessageSquare className="w-4 h-4" />
                                We&apos;d love to hear from you
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Get in <span className="gradient-text">Touch</span>
                            </h1>
                            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
                                Have questions about AI prompts, want to collaborate, or just want to say hello?
                                We&apos;re here to help.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="py-16">
                    <div className="container-main">
                        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
                            {/* Contact Info */}
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-dark-100 mb-4">Contact Information</h2>
                                    <p className="text-dark-400">
                                        Fill out the form and we&apos;ll get back to you as soon as possible.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-dark-800/40 border border-dark-700/50">
                                        <div className="p-2 rounded-lg bg-primary-500/10">
                                            <Mail className="w-5 h-5 text-primary-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-dark-100 mb-1">Email Us</h3>
                                            <a href="mailto:swiftclub20@gmail.com" className="text-dark-400 hover:text-primary-400 transition-colors">
                                                swiftclub20@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-dark-800/40 border border-dark-700/50">
                                        <div className="p-2 rounded-lg bg-green-500/10">
                                            <Clock className="w-5 h-5 text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-dark-100 mb-1">Response Time</h3>
                                            <p className="text-dark-400">Usually within 24-48 hours</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-dark-800/40 border border-dark-700/50">
                                        <div className="p-2 rounded-lg bg-amber-500/10">
                                            <MapPin className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-dark-100 mb-1">Location</h3>
                                            <p className="text-dark-400">Stillwater, Oklahoma, USA</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20">
                                    <h3 className="font-semibold text-dark-100 mb-2">Quick Links</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>
                                            <Link href="/about" className="text-primary-400 hover:text-primary-300 transition-colors">
                                                → Learn about the author
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/submit" className="text-primary-400 hover:text-primary-300 transition-colors">
                                                → Submit a prompt
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="https://www.amazon.com/dp/B0FPK6Y2ZB" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">
                                                → Get &quot;The Art of the Prompt&quot; book
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-3">
                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-6 md:p-8">
                                        {formState === "success" ? (
                                            <div className="text-center py-8">
                                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                                                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                                                </div>
                                                <h3 className="text-xl font-bold text-dark-100 mb-2">Message Ready!</h3>
                                                <p className="text-dark-400 mb-6">
                                                    Your email client should open with the message. If it doesn&apos;t,
                                                    please email us directly at swiftclub20@gmail.com
                                                </p>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => setFormState("idle")}
                                                >
                                                    Send Another Message
                                                </Button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
                                                            Your Name
                                                        </label>
                                                        <Input
                                                            id="name"
                                                            type="text"
                                                            placeholder="John Doe"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                                                            Email Address
                                                        </label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="john@example.com"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="subject" className="block text-sm font-medium text-dark-200 mb-2">
                                                        Subject
                                                    </label>
                                                    <Input
                                                        id="subject"
                                                        type="text"
                                                        placeholder="How can we help?"
                                                        value={formData.subject}
                                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="message" className="block text-sm font-medium text-dark-200 mb-2">
                                                        Message
                                                    </label>
                                                    <textarea
                                                        id="message"
                                                        rows={6}
                                                        placeholder="Tell us more about your inquiry..."
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        required
                                                        className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-600/50 text-dark-100 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40 transition-all resize-none"
                                                    />
                                                </div>

                                                {formState === "error" && (
                                                    <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                                        <p className="text-sm">Something went wrong. Please try again or email us directly.</p>
                                                    </div>
                                                )}

                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                    size="lg"
                                                    className="w-full"
                                                    disabled={formState === "sending"}
                                                >
                                                    {formState === "sending" ? (
                                                        "Opening Email Client..."
                                                    ) : (
                                                        <>
                                                            <Send className="w-4 h-4" />
                                                            Send Message
                                                        </>
                                                    )}
                                                </Button>
                                            </form>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
