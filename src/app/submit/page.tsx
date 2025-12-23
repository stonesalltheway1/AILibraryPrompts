"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import { Header, Footer } from "@/components";
import { Button, Input, Textarea, Badge, Card, CardContent } from "@/components/ui";
import { mockCategories, mockModels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function SubmitPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        description: "",
        categoryId: "",
        modelId: "",
        tags: [] as string[],
    });

    const [tagInput, setTagInput] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.title.trim()) {
            setError("Title is required");
            return;
        }
        if (!formData.content.trim()) {
            setError("Prompt content is required");
            return;
        }
        if (!formData.categoryId) {
            setError("Please select a category");
            return;
        }
        if (!formData.modelId) {
            setError("Please select an AI model");
            return;
        }

        setIsSubmitting(true);

        // Simulate submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // TODO: Call server action
        // await submitPrompt(formData);

        // Redirect to success or the new prompt page
        router.push("/?submitted=true");
    };

    const addTag = () => {
        if (tagInput.trim() && formData.tags.length < 5) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }));
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    };

    return (
        <>
            <Header />

            <main className="flex-1">
                <div className="container-main py-8 max-w-3xl">
                    {/* Back link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-dark-200 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
                                <Sparkles className="w-6 h-6 text-primary-400" />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-dark-50">
                                Submit a Prompt
                            </h1>
                        </div>
                        <p className="text-dark-400">
                            Share your best AI prompts with the community. Quality prompts get verified and earn you reputation.
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-dark-200 mb-2">
                                Title <span className="text-red-400">*</span>
                            </label>
                            <Input
                                id="title"
                                placeholder="e.g., Ultimate Python Debugging Assistant"
                                value={formData.title}
                                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                                error={error?.includes("Title")}
                            />
                            <p className="mt-1 text-xs text-dark-500">
                                A clear, descriptive title that explains what your prompt does
                            </p>
                        </div>

                        {/* Prompt Content */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-dark-200 mb-2">
                                Prompt Content <span className="text-red-400">*</span>
                            </label>
                            <Textarea
                                id="content"
                                placeholder="Enter your complete prompt here..."
                                value={formData.content}
                                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                                className="min-h-[240px] font-mono text-sm"
                                error={error?.includes("content")}
                            />
                            <p className="mt-1 text-xs text-dark-500">
                                Use {"{placeholders}"} for variable parts that users should customize
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-dark-200 mb-2">
                                Description <span className="text-dark-500">(optional)</span>
                            </label>
                            <Textarea
                                id="description"
                                placeholder="Briefly explain what this prompt does and when to use it..."
                                value={formData.description}
                                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                className="min-h-[100px]"
                            />
                        </div>

                        {/* Category & Model Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-dark-200 mb-2">
                                    Category <span className="text-red-400">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {mockCategories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => setFormData((prev) => ({ ...prev, categoryId: category.id }))}
                                            className={cn(
                                                "p-3 rounded-lg text-left text-sm font-medium transition-all",
                                                "border",
                                                formData.categoryId === category.id
                                                    ? "bg-primary-500/20 border-primary-500/40 text-primary-400"
                                                    : "bg-dark-800/40 border-dark-700/50 text-dark-300 hover:border-dark-600"
                                            )}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* AI Model */}
                            <div>
                                <label htmlFor="modelId" className="block text-sm font-medium text-dark-200 mb-2">
                                    AI Model <span className="text-red-400">*</span>
                                </label>
                                <select
                                    id="modelId"
                                    name="modelId"
                                    aria-label="Select AI Model"
                                    value={formData.modelId}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, modelId: e.target.value }))}
                                    className="w-full p-3 rounded-lg bg-dark-800/80 border border-dark-700/50 text-dark-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                >
                                    <option value="">Select a model...</option>
                                    {mockModels.map((model) => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-1 text-xs text-dark-500">
                                    Which AI model does this prompt work best with?
                                </p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-dark-200 mb-2">
                                Tags <span className="text-dark-500">(up to 5)</span>
                            </label>
                            <div className="flex gap-2 mb-2">
                                <Input
                                    placeholder="Add a tag..."
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addTag();
                                        }
                                    }}
                                />
                                <Button type="button" variant="secondary" onClick={addTag}>
                                    Add
                                </Button>
                            </div>
                            {formData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag) => (
                                        <Badge key={tag} variant="tag">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 hover:text-white"
                                            >
                                                ×
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Guidelines */}
                        <Card variant="glass" hover={false}>
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-dark-100 mb-2">📝 Submission Guidelines</h3>
                                <ul className="space-y-1 text-sm text-dark-400">
                                    <li>• Make sure your prompt is original and not copied from elsewhere</li>
                                    <li>• Test your prompt before submitting to ensure it works well</li>
                                    <li>• Include clear placeholders for customizable parts</li>
                                    <li>• Add a helpful description to explain usage</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                variant="accent"
                                size="lg"
                                isLoading={isSubmitting}
                                className="flex-1"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Prompt"}
                            </Button>
                            <Link href="/">
                                <Button type="button" variant="ghost" size="lg">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}
