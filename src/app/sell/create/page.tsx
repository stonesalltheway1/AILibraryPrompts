"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Save,
    Eye,
    DollarSign,
    Tag,
    Sparkles,
    CheckCircle,
    AlertCircle,
    Image as ImageIcon,
} from "lucide-react";
import { Header, Footer, PromptEditor } from "@/components";
import { Button, Input, Card, CardContent, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    { id: "coding", name: "Coding", icon: "💻" },
    { id: "marketing", name: "Marketing", icon: "📈" },
    { id: "writing", name: "Writing", icon: "✍️" },
    { id: "image-generation", name: "Image Generation", icon: "🎨" },
    { id: "business", name: "Business", icon: "💼" },
    { id: "education", name: "Education", icon: "📚" },
    { id: "productivity", name: "Productivity", icon: "⚡" },
    { id: "other", name: "Other", icon: "📦" },
];

const AI_MODELS = [
    { id: "gpt-4", name: "GPT-4" },
    { id: "gpt-35", name: "GPT-3.5" },
    { id: "claude", name: "Claude" },
    { id: "gemini", name: "Gemini" },
    { id: "midjourney", name: "Midjourney" },
    { id: "dall-e", name: "DALL-E" },
    { id: "stable-diffusion", name: "Stable Diffusion" },
    { id: "universal", name: "Universal (Any Model)" },
];

interface ProductFormData {
    title: string;
    description: string;
    content: string;
    previewContent: string;
    category: string;
    modelType: string;
    price: number;
    tags: string[];
    usageInstructions: string;
}

export default function CreateProductPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tagInput, setTagInput] = useState("");

    const [formData, setFormData] = useState<ProductFormData>({
        title: "",
        description: "",
        content: "",
        previewContent: "",
        category: "",
        modelType: "",
        price: 4.99,
        tags: [],
        usageInstructions: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

    const updateField = <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const addTag = () => {
        const tag = tagInput.trim();
        if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
            updateField("tags", [...formData.tags, tag]);
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        updateField("tags", formData.tags.filter((t) => t !== tagToRemove));
    };

    const validateStep = (stepNum: number): boolean => {
        const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

        if (stepNum === 1) {
            if (!formData.title.trim()) newErrors.title = "Title is required";
            if (!formData.description.trim()) newErrors.description = "Description is required";
            if (!formData.content.trim()) newErrors.content = "Prompt content is required";
        }

        if (stepNum === 2) {
            if (!formData.category) newErrors.category = "Please select a category";
            if (!formData.modelType) newErrors.modelType = "Please select a model type";
            if (formData.price < 0.99) newErrors.price = "Minimum price is $0.99" as string;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep((s) => Math.min(s + 1, 3));
        }
    };

    const prevStep = () => {
        setStep((s) => Math.max(s - 1, 1));
    };

    const handleSubmit = async () => {
        if (!validateStep(3)) return;

        setIsSubmitting(true);

        try {
            // First get seller profile
            const sellerRes = await fetch("/api/marketplace/seller");
            const sellerData = await sellerRes.json();

            if (!sellerData.hasSeller) {
                setErrors({ title: "You need to set up a seller profile first" });
                return;
            }

            // Submit product
            const response = await fetch("/api/marketplace/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sellerId: sellerData.seller.id,
                    title: formData.title,
                    description: formData.description,
                    content: formData.content,
                    previewContent: formData.previewContent || formData.content.split("\n").slice(0, 10).join("\n") + "\n...",
                    usageInstructions: formData.usageInstructions,
                    price: formData.price,
                    category: formData.category,
                    modelType: formData.modelType,
                    tags: formData.tags,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create product");
            }

            // Redirect to seller dashboard
            router.push("/sell?success=true");
        } catch (error) {
            console.error("Submit error:", error);
            setErrors({ title: error instanceof Error ? error.message : "Failed to create product" });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Generate preview content from full content
    const generatePreview = () => {
        const lines = formData.content.split("\n").slice(0, 10).join("\n");
        updateField("previewContent", lines + (formData.content.split("\n").length > 10 ? "\n..." : ""));
    };

    return (
        <>
            <Header />

            <main className="flex-1 py-8">
                <div className="container-main max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/sell"
                            className="inline-flex items-center gap-1 text-sm text-dark-400 hover:text-dark-200 mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Link>

                        <h1 className="text-2xl font-bold text-dark-50 mb-2">
                            List a New Prompt
                        </h1>
                        <p className="text-dark-400">
                            Create a listing for your prompt. You keep 80% of every sale.
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-4 mb-8">
                        {[
                            { num: 1, label: "Content" },
                            { num: 2, label: "Details" },
                            { num: 3, label: "Review" },
                        ].map((s, i) => (
                            <div key={s.num} className="flex items-center gap-2">
                                <div
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                                        step >= s.num
                                            ? "bg-primary-500 text-white"
                                            : "bg-dark-700/50 text-dark-400"
                                    )}
                                >
                                    {step > s.num ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        s.num
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        "text-sm font-medium",
                                        step >= s.num ? "text-dark-200" : "text-dark-500"
                                    )}
                                >
                                    {s.label}
                                </span>
                                {i < 2 && (
                                    <div
                                        className={cn(
                                            "w-12 h-0.5 ml-2",
                                            step > s.num ? "bg-primary-500" : "bg-dark-700/50"
                                        )}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Content */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <Card variant="glass" hover={false}>
                                <CardContent className="p-6 space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-dark-200 mb-2">
                                            Title <span className="text-red-400">*</span>
                                        </label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => updateField("title", e.target.value)}
                                            placeholder="e.g., Ultimate Python Debugging Assistant"
                                            error={!!errors.title}
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-400 mt-1">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-dark-200 mb-2">
                                            Short Description <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => updateField("description", e.target.value)}
                                            placeholder="A brief description of what this prompt does..."
                                            rows={3}
                                            className={cn(
                                                "w-full px-4 py-3 rounded-lg bg-dark-800/50 border text-dark-100",
                                                "placeholder:text-dark-500 focus:outline-none focus:ring-2",
                                                errors.description
                                                    ? "border-red-500/50 focus:ring-red-500/20"
                                                    : "border-dark-700/50 focus:ring-primary-500/20 focus:border-primary-500/50"
                                            )}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-red-400 mt-1">{errors.description}</p>
                                        )}
                                    </div>

                                    {/* Prompt Content */}
                                    <div>
                                        <label className="block text-sm font-medium text-dark-200 mb-2">
                                            Prompt Content <span className="text-red-400">*</span>
                                        </label>
                                        <PromptEditor
                                            value={formData.content}
                                            onChange={(value) => updateField("content", value)}
                                            placeholder="Enter your full prompt here..."
                                        />
                                        {errors.content && (
                                            <p className="text-sm text-red-400 mt-1">{errors.content}</p>
                                        )}
                                    </div>

                                    {/* Usage Instructions */}
                                    <div>
                                        <label className="block text-sm font-medium text-dark-200 mb-2">
                                            Usage Instructions
                                        </label>
                                        <textarea
                                            value={formData.usageInstructions}
                                            onChange={(e) => updateField("usageInstructions", e.target.value)}
                                            placeholder="How should buyers use this prompt? Any special instructions?"
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/50"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Step 2: Details */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <Card variant="glass" hover={false}>
                                <CardContent className="p-6 space-y-6">
                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-dark-200 mb-3">
                                            Category <span className="text-red-400">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {CATEGORIES.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => updateField("category", cat.id)}
                                                    className={cn(
                                                        "p-3 rounded-lg border text-left transition-all",
                                                        formData.category === cat.id
                                                            ? "bg-primary-500/10 border-primary-500/50 text-primary-400"
                                                            : "bg-dark-800/30 border-dark-700/50 text-dark-300 hover:border-dark-600"
                                                    )}
                                                >
                                                    <span className="text-lg mb-1 block">{cat.icon}</span>
                                                    <span className="text-sm font-medium">{cat.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {errors.category && (
                                            <p className="text-sm text-red-400 mt-2">{errors.category}</p>
                                        )}
                                    </div>

                                    {/* AI Model */}
                                    <div>
                                        <label className="block text-sm font-medium text-dark-200 mb-3">
                                            Best AI Model <span className="text-red-400">*</span>
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {AI_MODELS.map((model) => (
                                                <button
                                                    key={model.id}
                                                    type="button"
                                                    onClick={() => updateField("modelType", model.id)}
                                                    className={cn(
                                                        "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                                                        formData.modelType === model.id
                                                            ? "bg-primary-500/10 border-primary-500/50 text-primary-400"
                                                            : "bg-dark-800/30 border-dark-700/50 text-dark-300 hover:border-dark-600"
                                                    )}
                                                >
                                                    {model.name}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.modelType && (
                                            <p className="text-sm text-red-400 mt-2">{errors.modelType}</p>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-medium text-dark-200 mb-2">
                                            Price (USD) <span className="text-red-400">*</span>
                                        </label>
                                        <div className="relative max-w-xs">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                                            <Input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => updateField("price", parseFloat(e.target.value) || 0)}
                                                step="0.01"
                                                min="0.99"
                                                max="999.99"
                                                className="pl-10"
                                            />
                                        </div>
                                        <p className="text-xs text-dark-500 mt-2">
                                            You keep 80% (${(formData.price * 0.8).toFixed(2)}) • Platform fee: 20%
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <label className="block text-sm font-medium text-dark-200 mb-2">
                                            Tags (up to 10)
                                        </label>
                                        <div className="flex gap-2 mb-3">
                                            <div className="relative flex-1">
                                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                                                <Input
                                                    value={tagInput}
                                                    onChange={(e) => setTagInput(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            addTag();
                                                        }
                                                    }}
                                                    placeholder="Add a tag..."
                                                    className="pl-10"
                                                />
                                            </div>
                                            <Button type="button" variant="secondary" onClick={addTag}>
                                                Add
                                            </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="tag"
                                                    className="cursor-pointer hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
                                                    onClick={() => removeTag(tag)}
                                                >
                                                    {tag} ×
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <Card variant="glass" hover={false}>
                                <CardContent className="p-6">
                                    <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-primary-400" />
                                        Review Your Listing
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-dark-500 uppercase mb-1">Title</p>
                                                <p className="text-dark-200">{formData.title}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-dark-500 uppercase mb-1">Price</p>
                                                <p className="text-dark-200">${formData.price.toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-dark-500 uppercase mb-1">Category</p>
                                                <p className="text-dark-200 capitalize">{formData.category.replace("-", " ")}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-dark-500 uppercase mb-1">AI Model</p>
                                                <p className="text-dark-200">
                                                    {AI_MODELS.find((m) => m.id === formData.modelType)?.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs text-dark-500 uppercase mb-1">Description</p>
                                            <p className="text-dark-300 text-sm">{formData.description}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-dark-500 uppercase mb-1">Tags</p>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.tags.map((tag) => (
                                                    <Badge key={tag} variant="tag">{tag}</Badge>
                                                ))}
                                                {formData.tags.length === 0 && (
                                                    <span className="text-dark-500 text-sm">No tags added</span>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs text-dark-500 uppercase mb-1">Prompt Preview</p>
                                            <pre className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-300 line-clamp-6 whitespace-pre-wrap">
                                                {formData.content}
                                            </pre>
                                        </div>
                                    </div>

                                    {/* Earnings Preview */}
                                    <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                        <div className="flex items-center gap-2 text-green-400 mb-2">
                                            <Sparkles className="w-4 h-4" />
                                            <span className="font-medium">Your Earnings</span>
                                        </div>
                                        <p className="text-sm text-green-300">
                                            You&apos;ll earn <strong>${(formData.price * 0.8).toFixed(2)}</strong> per sale
                                            after the 20% platform fee.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-700/50">
                        {step > 1 ? (
                            <Button variant="ghost" onClick={prevStep}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Previous
                            </Button>
                        ) : (
                            <div />
                        )}

                        {step < 3 ? (
                            <Button variant="primary" onClick={nextStep}>
                                Next
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                variant="accent"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="animate-spin mr-2">⏳</span>
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Publish Listing
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
