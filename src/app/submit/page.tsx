"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Sparkles,
    AlertCircle,
    Zap,
    BookOpen,
    GraduationCap,
    Code,
    FileJson,
    MessageSquare,
    Table,
    Palette
} from "lucide-react";
import { Header, Footer } from "@/components";
import { PromptEditor } from "@/components/PromptEditor";
import { Button, Input, Textarea, Badge, Card, CardContent } from "@/components/ui";
import { mockCategories, mockModels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// Difficulty levels
const DIFFICULTY_LEVELS = [
    { id: "beginner", name: "Beginner", icon: BookOpen, color: "text-green-400 bg-green-500/10 border-green-500/20" },
    { id: "intermediate", name: "Intermediate", icon: GraduationCap, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { id: "advanced", name: "Advanced", icon: Zap, color: "text-red-400 bg-red-500/10 border-red-500/20" },
];

// Output types
const OUTPUT_TYPES = [
    { id: "text", name: "Text", icon: MessageSquare },
    { id: "code", name: "Code", icon: Code },
    { id: "json", name: "JSON", icon: FileJson },
    { id: "table", name: "Table", icon: Table },
    { id: "creative", name: "Creative", icon: Palette },
];

export default function SubmitPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        description: "",
        categoryId: "",
        modelId: "",
        difficulty: "beginner",
        outputType: "text",
        tags: [] as string[],
    });

    const [tagInput, setTagInput] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.title.trim()) {
            setError("Title is required");
            setCurrentStep(1);
            return;
        }
        if (!formData.content.trim()) {
            setError("Prompt content is required");
            setCurrentStep(1);
            return;
        }
        if (!formData.categoryId) {
            setError("Please select a category");
            setCurrentStep(2);
            return;
        }
        if (!formData.modelId) {
            setError("Please select an AI model");
            setCurrentStep(2);
            return;
        }

        setIsSubmitting(true);

        // Simulate submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Clear draft on successful submission
        localStorage.removeItem("prompt-draft");

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

    // Check if step is complete
    const isStep1Complete = !!(formData.title.trim() && formData.content.trim());
    const isStep2Complete = !!(formData.categoryId && formData.modelId);

    return (
        <>
            <Header />

            <main className="flex-1">
                <div className="container-main py-8 max-w-4xl">
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
                            <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30">
                                <Sparkles className="w-6 h-6 text-primary-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-dark-50">
                                    Submit a Prompt
                                </h1>
                                <p className="text-dark-400">
                                    Share your best AI prompts with the community
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-4 mb-8">
                        <StepIndicator
                            number={1}
                            title="Content"
                            isActive={currentStep === 1}
                            isComplete={isStep1Complete}
                            onClick={() => setCurrentStep(1)}
                        />
                        <div className="flex-1 h-px bg-dark-700" />
                        <StepIndicator
                            number={2}
                            title="Details"
                            isActive={currentStep === 2}
                            isComplete={isStep2Complete}
                            onClick={() => setCurrentStep(2)}
                        />
                        <div className="flex-1 h-px bg-dark-700" />
                        <StepIndicator
                            number={3}
                            title="Review"
                            isActive={currentStep === 3}
                            isComplete={false}
                            onClick={() => isStep1Complete && isStep2Complete && setCurrentStep(3)}
                        />
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Step 1: Content */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-fadeIn">
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
                                        error={!!error && error.includes("Title")}
                                        className="text-lg"
                                    />
                                    <p className="mt-1.5 text-xs text-dark-500">
                                        A clear, descriptive title that explains what your prompt does
                                    </p>
                                </div>

                                {/* Prompt Content - Rich Editor */}
                                <div>
                                    <label className="block text-sm font-medium text-dark-200 mb-2">
                                        Prompt Content <span className="text-red-400">*</span>
                                    </label>
                                    <PromptEditor
                                        value={formData.content}
                                        onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
                                        placeholder="Enter your complete prompt here... Use markdown for formatting and {placeholders} for variables."
                                        error={!!error && error.includes("content")}
                                    />
                                    <p className="mt-1.5 text-xs text-dark-500">
                                        Supports Markdown and HTML. Use {"{placeholders}"} for variable parts that users should customize.
                                    </p>
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-dark-200 mb-2">
                                        Description <span className="text-dark-500">(optional)</span>
                                    </label>
                                    <Textarea
                                        id="description"
                                        placeholder="Briefly explain what this prompt does, when to use it, and any tips for best results..."
                                        value={formData.description}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                        className="min-h-[100px]"
                                    />
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="primary"
                                        onClick={() => setCurrentStep(2)}
                                        disabled={!isStep1Complete}
                                    >
                                        Continue to Details →
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Details */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-fadeIn">
                                {/* Category & Model Row */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-dark-200 mb-3">
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
                                        <label htmlFor="modelId" className="block text-sm font-medium text-dark-200 mb-3">
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
                                        <p className="mt-1.5 text-xs text-dark-500">
                                            Which AI model does this prompt work best with?
                                        </p>
                                    </div>
                                </div>

                                {/* Difficulty Level */}
                                <div>
                                    <label className="block text-sm font-medium text-dark-200 mb-3">
                                        Difficulty Level
                                    </label>
                                    <div className="flex gap-3">
                                        {DIFFICULTY_LEVELS.map((level) => (
                                            <button
                                                key={level.id}
                                                type="button"
                                                onClick={() => setFormData((prev) => ({ ...prev, difficulty: level.id }))}
                                                className={cn(
                                                    "flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all",
                                                    formData.difficulty === level.id
                                                        ? level.color
                                                        : "bg-dark-800/40 border-dark-700/50 text-dark-400 hover:border-dark-600"
                                                )}
                                            >
                                                <level.icon className="w-4 h-4" />
                                                {level.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Output Type */}
                                <div>
                                    <label className="block text-sm font-medium text-dark-200 mb-3">
                                        Expected Output Type
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {OUTPUT_TYPES.map((type) => (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => setFormData((prev) => ({ ...prev, outputType: type.id }))}
                                                className={cn(
                                                    "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
                                                    formData.outputType === type.id
                                                        ? "bg-primary-500/20 border-primary-500/40 text-primary-400"
                                                        : "bg-dark-800/40 border-dark-700/50 text-dark-400 hover:border-dark-600"
                                                )}
                                            >
                                                <type.icon className="w-4 h-4" />
                                                {type.name}
                                            </button>
                                        ))}
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

                                {/* Navigation */}
                                <div className="flex justify-between">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setCurrentStep(1)}
                                    >
                                        ← Back
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="primary"
                                        onClick={() => setCurrentStep(3)}
                                        disabled={!isStep2Complete}
                                    >
                                        Review Submission →
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-fadeIn">
                                <Card variant="glass" hover={false}>
                                    <CardContent className="p-6">
                                        <h2 className="text-lg font-semibold text-dark-100 mb-4">Review Your Submission</h2>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs text-dark-500 uppercase tracking-wide mb-1">Title</p>
                                                <p className="text-dark-100 font-medium">{formData.title}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-dark-500 uppercase tracking-wide mb-1">Category & Model</p>
                                                <div className="flex gap-2">
                                                    <Badge variant="category">
                                                        {mockCategories.find(c => c.id === formData.categoryId)?.name}
                                                    </Badge>
                                                    <Badge variant="model">
                                                        {mockModels.find(m => m.id === formData.modelId)?.name}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-xs text-dark-500 uppercase tracking-wide mb-1">Difficulty & Output</p>
                                                <div className="flex gap-2">
                                                    <span className={cn(
                                                        "text-xs px-2 py-1 rounded border",
                                                        DIFFICULTY_LEVELS.find(d => d.id === formData.difficulty)?.color
                                                    )}>
                                                        {DIFFICULTY_LEVELS.find(d => d.id === formData.difficulty)?.name}
                                                    </span>
                                                    <span className="text-xs px-2 py-1 rounded bg-dark-700/50 text-dark-300 border border-dark-600/50">
                                                        {OUTPUT_TYPES.find(o => o.id === formData.outputType)?.name} Output
                                                    </span>
                                                </div>
                                            </div>

                                            {formData.tags.length > 0 && (
                                                <div>
                                                    <p className="text-xs text-dark-500 uppercase tracking-wide mb-1">Tags</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {formData.tags.map((tag) => (
                                                            <Badge key={tag} variant="tag" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <p className="text-xs text-dark-500 uppercase tracking-wide mb-1">Prompt Preview</p>
                                                <div className="p-3 rounded-lg bg-dark-800/50 border border-dark-700/50 max-h-48 overflow-y-auto">
                                                    <pre className="text-sm text-dark-300 whitespace-pre-wrap font-mono">
                                                        {formData.content.substring(0, 500)}
                                                        {formData.content.length > 500 && "..."}
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

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

                                {/* Submit Buttons */}
                                <div className="flex justify-between">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setCurrentStep(2)}
                                    >
                                        ← Back
                                    </Button>
                                    <div className="flex gap-3">
                                        <Link href="/">
                                            <Button type="button" variant="ghost">
                                                Cancel
                                            </Button>
                                        </Link>
                                        <Button
                                            type="submit"
                                            variant="accent"
                                            size="lg"
                                            isLoading={isSubmitting}
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Prompt"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}

// Step indicator component
function StepIndicator({
    number,
    title,
    isActive,
    isComplete,
    onClick
}: {
    number: number;
    title: string;
    isActive: boolean;
    isComplete: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 transition-colors",
                isActive || isComplete ? "cursor-pointer" : "cursor-default"
            )}
        >
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                isComplete
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : isActive
                        ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                        : "bg-dark-800/50 text-dark-500 border border-dark-700/50"
            )}>
                {isComplete ? "✓" : number}
            </div>
            <span className={cn(
                "text-sm font-medium hidden sm:block",
                isActive ? "text-dark-100" : "text-dark-500"
            )}>
                {title}
            </span>
        </button>
    );
}
