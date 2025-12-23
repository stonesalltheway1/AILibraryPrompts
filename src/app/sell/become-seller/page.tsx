"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Store,
    DollarSign,
    Shield,
    Zap,
    CheckCircle,
    ArrowRight,
    Mail,
    User,
    FileText,
    Loader2,
} from "lucide-react";
import { Header, Footer } from "@/components";
import { Button, Input, Card, CardContent } from "@/components/ui";
import { useUser } from "@clerk/nextjs";

export default function BecomeSellerPage() {
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        displayName: "",
        bio: "",
        paypalEmail: "",
    });

    const handleSubmit = async () => {
        if (!formData.displayName || !formData.paypalEmail) {
            setError("Display name and PayPal email are required");
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.paypalEmail)) {
            setError("Please enter a valid PayPal email address");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/marketplace/seller", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create seller profile");
            }

            // Success! Redirect to seller dashboard
            router.push("/sell?welcome=true");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoaded) {
        return (
            <>
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
                </main>
                <Footer />
            </>
        );
    }

    if (!user) {
        return (
            <>
                <Header />
                <main className="flex-1 py-16">
                    <div className="container-main max-w-lg text-center">
                        <Store className="w-16 h-16 text-primary-400 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold text-dark-50 mb-4">
                            Sign In to Become a Seller
                        </h1>
                        <p className="text-dark-400 mb-8">
                            You need to create an account before you can start selling prompts.
                        </p>
                        <Link href="/sign-in">
                            <Button variant="primary" size="lg">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="flex-1 py-12">
                <div className="container-main max-w-4xl">
                    {step === 1 ? (
                        /* Step 1: Benefits */
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
                                <Store className="w-4 h-4" />
                                Become a Seller
                            </div>

                            <h1 className="text-4xl font-bold text-dark-50 mb-4">
                                Turn Your Prompts Into Income
                            </h1>
                            <p className="text-lg text-dark-400 max-w-2xl mx-auto mb-12">
                                Join our marketplace and start earning from your AI prompt expertise.
                                Keep 80% of every sale with transparent pricing and instant payouts.
                            </p>

                            {/* Benefits Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-6 text-center">
                                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                                            <DollarSign className="w-6 h-6 text-green-400" />
                                        </div>
                                        <h3 className="font-semibold text-dark-100 mb-2">
                                            80% Revenue Share
                                        </h3>
                                        <p className="text-sm text-dark-400">
                                            Keep the majority of every sale. We only take 20% to cover platform costs.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-6 text-center">
                                        <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                                            <Zap className="w-6 h-6 text-primary-400" />
                                        </div>
                                        <h3 className="font-semibold text-dark-100 mb-2">
                                            Instant Publishing
                                        </h3>
                                        <p className="text-sm text-dark-400">
                                            List your prompts in minutes with our easy-to-use editor and templates.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-6 text-center">
                                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                                            <Shield className="w-6 h-6 text-amber-400" />
                                        </div>
                                        <h3 className="font-semibold text-dark-100 mb-2">
                                            Secure Payments
                                        </h3>
                                        <p className="text-sm text-dark-400">
                                            Get paid via PayPal with secure, protected transactions.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* How It Works */}
                            <div className="bg-dark-800/30 rounded-2xl p-8 mb-12">
                                <h2 className="text-xl font-semibold text-dark-100 mb-6">
                                    How It Works
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {[
                                        { step: 1, title: "Create Profile", desc: "Add your PayPal email" },
                                        { step: 2, title: "List Prompts", desc: "Set price & upload" },
                                        { step: 3, title: "Get Sales", desc: "Buyers purchase" },
                                        { step: 4, title: "Get Paid", desc: "Money to PayPal" },
                                    ].map((item) => (
                                        <div key={item.step} className="text-center">
                                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white font-bold flex items-center justify-center mx-auto mb-3">
                                                {item.step}
                                            </div>
                                            <h4 className="font-medium text-dark-200 mb-1">{item.title}</h4>
                                            <p className="text-sm text-dark-400">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                variant="accent"
                                size="lg"
                                onClick={() => setStep(2)}
                            >
                                Get Started
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    ) : (
                        /* Step 2: Profile Setup */
                        <div className="max-w-lg mx-auto">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-dark-50 mb-2">
                                    Set Up Your Seller Profile
                                </h1>
                                <p className="text-dark-400">
                                    Just a few details to get you started
                                </p>
                            </div>

                            <Card variant="glass" hover={false}>
                                <CardContent className="p-6 space-y-6">
                                    {/* Display Name */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-dark-200 mb-2">
                                            <User className="w-4 h-4" />
                                            Display Name <span className="text-red-400">*</span>
                                        </label>
                                        <Input
                                            value={formData.displayName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, displayName: e.target.value })
                                            }
                                            placeholder="e.g., PromptMaster Pro"
                                        />
                                        <p className="text-xs text-dark-500 mt-1">
                                            This is how buyers will see you on the marketplace
                                        </p>
                                    </div>

                                    {/* Bio */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-dark-200 mb-2">
                                            <FileText className="w-4 h-4" />
                                            Bio (Optional)
                                        </label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) =>
                                                setFormData({ ...formData, bio: e.target.value })
                                            }
                                            placeholder="Tell buyers about yourself and your expertise..."
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/50"
                                        />
                                    </div>

                                    {/* PayPal Email */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-dark-200 mb-2">
                                            <Mail className="w-4 h-4" />
                                            PayPal Email <span className="text-red-400">*</span>
                                        </label>
                                        <Input
                                            type="email"
                                            value={formData.paypalEmail}
                                            onChange={(e) =>
                                                setFormData({ ...formData, paypalEmail: e.target.value })
                                            }
                                            placeholder="your-paypal@email.com"
                                        />
                                        <p className="text-xs text-dark-500 mt-1">
                                            This is where we&apos;ll send your earnings
                                        </p>
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    {/* Terms */}
                                    <div className="p-3 rounded-lg bg-dark-800/50 text-sm text-dark-400">
                                        <p className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                            By creating a seller profile, you agree to our seller terms and understand
                                            that you keep 80% of each sale.
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <Button
                                            variant="ghost"
                                            onClick={() => setStep(1)}
                                            disabled={isSubmitting}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="primary"
                                            className="flex-1"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <Store className="w-4 h-4 mr-2" />
                                                    Create Seller Profile
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
