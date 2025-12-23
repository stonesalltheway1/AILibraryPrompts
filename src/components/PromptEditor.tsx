"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import DOMPurify from "isomorphic-dompurify";
import {
    Bold,
    Italic,
    Code,
    CodeSquare,
    List,
    ListOrdered,
    Heading2,
    Heading3,
    Link2,
    Minus,
    Braces,
    Eye,
    Edit3,
    Copy,
    Check,
    FileText,
    Sparkles,
    MessageSquare,
    Target,
    Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: boolean;
}

// Prompt templates for quick start
const PROMPT_TEMPLATES = [
    {
        id: "chain-of-thought",
        name: "Chain of Thought",
        icon: Layers,
        description: "Step-by-step reasoning template",
        content: `# Task
{Describe the task you want the AI to accomplish}

# Instructions
Let's approach this step by step:

1. First, analyze {the input/problem}
2. Then, consider {relevant factors}
3. Next, evaluate {options/approaches}
4. Finally, provide {the solution/recommendation}

# Context
{Add any relevant context or constraints here}

# Expected Output
Provide your response in the following format:
- Analysis: ...
- Reasoning: ...
- Conclusion: ...`
    },
    {
        id: "role-play",
        name: "Expert Role Play",
        icon: MessageSquare,
        description: "\"Act as a...\" pattern",
        content: `You are an expert {profession/role} with {X} years of experience in {field}.

Your expertise includes:
- {Skill 1}
- {Skill 2}
- {Skill 3}

## Your Task
{Describe what you need the expert to do}

## Guidelines
- Maintain a {professional/friendly/technical} tone
- Provide {detailed/concise} explanations
- Include {examples/references} where helpful

## Context
{Provide relevant background information}

Please respond as this expert would, drawing on deep domain knowledge.`
    },
    {
        id: "structured-output",
        name: "Structured Output",
        icon: Target,
        description: "JSON/Format-specified template",
        content: `# Request
{Describe what you need}

# Output Format
Please provide your response in the following JSON structure:

\`\`\`json
{
  "summary": "Brief summary of the result",
  "details": {
    "key1": "value1",
    "key2": "value2"
  },
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2"
  ],
  "confidence": "high/medium/low"
}
\`\`\`

# Input
{Your input data here}

# Additional Instructions
- Ensure all JSON is valid and properly formatted
- Include all required fields
- Use consistent naming conventions`
    },
    {
        id: "multi-shot",
        name: "Multi-Shot Examples",
        icon: FileText,
        description: "Example-based learning template",
        content: `# Task Description
{Explain the task}

# Examples

## Example 1
**Input:** {example input 1}
**Output:** {example output 1}

## Example 2
**Input:** {example input 2}
**Output:** {example output 2}

## Example 3
**Input:** {example input 3}
**Output:** {example output 3}

# Your Turn
Now apply the same pattern to:

**Input:** {your actual input}
**Output:**`
    }
];

export function PromptEditor({ value, onChange, placeholder, error }: PromptEditorProps) {
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
    const [showTemplates, setShowTemplates] = useState(false);
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Character and word count
    const charCount = value.length;
    const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

    // Extract variables from content
    const variables = value.match(/\{[^}]+\}/g) || [];
    const uniqueVariables = [...new Set(variables)];

    // Auto-save to localStorage
    useEffect(() => {
        const saveTimeout = setTimeout(() => {
            if (value) {
                localStorage.setItem("prompt-draft", value);
            }
        }, 1000);
        return () => clearTimeout(saveTimeout);
    }, [value]);

    // Load draft on mount
    useEffect(() => {
        const draft = localStorage.getItem("prompt-draft");
        if (draft && !value) {
            onChange(draft);
        }
    }, []);

    const insertText = useCallback((before: string, after: string = "", placeholder: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end) || placeholder;

        const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
        onChange(newValue);

        // Set cursor position after insertion
        setTimeout(() => {
            textarea.focus();
            const newPos = start + before.length + selectedText.length;
            textarea.setSelectionRange(newPos, newPos);
        }, 0);
    }, [value, onChange]);

    const handleToolbarAction = (action: string) => {
        switch (action) {
            case "bold":
                insertText("**", "**", "bold text");
                break;
            case "italic":
                insertText("*", "*", "italic text");
                break;
            case "code":
                insertText("`", "`", "code");
                break;
            case "codeblock":
                insertText("\n```\n", "\n```\n", "code block");
                break;
            case "h2":
                insertText("\n## ", "", "Heading");
                break;
            case "h3":
                insertText("\n### ", "", "Subheading");
                break;
            case "ul":
                insertText("\n- ", "", "List item");
                break;
            case "ol":
                insertText("\n1. ", "", "List item");
                break;
            case "link":
                insertText("[", "](url)", "link text");
                break;
            case "hr":
                insertText("\n---\n", "", "");
                break;
            case "variable":
                insertText("{", "}", "variable_name");
                break;
        }
    };

    const loadTemplate = (template: typeof PROMPT_TEMPLATES[0]) => {
        onChange(template.content);
        setShowTemplates(false);
        setActiveTab("edit");
    };

    const copyContent = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearDraft = () => {
        localStorage.removeItem("prompt-draft");
        onChange("");
    };

    // Highlight variables in preview
    const highlightedContent = DOMPurify.sanitize(value).replace(
        /\{([^}]+)\}/g,
        '<span class="variable-highlight">{$1}</span>'
    );

    return (
        <div className={cn(
            "rounded-xl border overflow-hidden",
            error ? "border-red-500/50" : "border-dark-700/50"
        )}>
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-dark-800/60 border-b border-dark-700/50 px-3 py-2">
                {/* Formatting buttons */}
                <div className="flex items-center gap-1">
                    <ToolbarButton icon={Bold} label="Bold" onClick={() => handleToolbarAction("bold")} />
                    <ToolbarButton icon={Italic} label="Italic" onClick={() => handleToolbarAction("italic")} />
                    <div className="w-px h-5 bg-dark-600 mx-1" />
                    <ToolbarButton icon={Code} label="Inline Code" onClick={() => handleToolbarAction("code")} />
                    <ToolbarButton icon={CodeSquare} label="Code Block" onClick={() => handleToolbarAction("codeblock")} />
                    <div className="w-px h-5 bg-dark-600 mx-1" />
                    <ToolbarButton icon={Heading2} label="Heading 2" onClick={() => handleToolbarAction("h2")} />
                    <ToolbarButton icon={Heading3} label="Heading 3" onClick={() => handleToolbarAction("h3")} />
                    <div className="w-px h-5 bg-dark-600 mx-1" />
                    <ToolbarButton icon={List} label="Bullet List" onClick={() => handleToolbarAction("ul")} />
                    <ToolbarButton icon={ListOrdered} label="Numbered List" onClick={() => handleToolbarAction("ol")} />
                    <div className="w-px h-5 bg-dark-600 mx-1" />
                    <ToolbarButton icon={Link2} label="Link" onClick={() => handleToolbarAction("link")} />
                    <ToolbarButton icon={Minus} label="Horizontal Rule" onClick={() => handleToolbarAction("hr")} />
                    <ToolbarButton
                        icon={Braces}
                        label="Insert Variable"
                        onClick={() => handleToolbarAction("variable")}
                        className="text-amber-400 hover:text-amber-300"
                    />
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-primary-400 hover:text-primary-300 bg-primary-500/10 hover:bg-primary-500/20 rounded-lg transition-colors"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Templates
                    </button>
                    <button
                        type="button"
                        onClick={copyContent}
                        className="p-1.5 text-dark-400 hover:text-dark-200 transition-colors"
                        title="Copy content"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Templates dropdown */}
            {showTemplates && (
                <div className="bg-dark-800/80 border-b border-dark-700/50 p-3">
                    <p className="text-xs text-dark-400 mb-2">Start with a template:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {PROMPT_TEMPLATES.map((template) => (
                            <button
                                key={template.id}
                                type="button"
                                onClick={() => loadTemplate(template)}
                                className="flex items-center gap-2 p-3 rounded-lg bg-dark-700/50 hover:bg-dark-700 border border-dark-600/50 hover:border-primary-500/30 transition-all text-left"
                            >
                                <template.icon className="w-4 h-4 text-primary-400 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-dark-100 truncate">{template.name}</p>
                                    <p className="text-xs text-dark-400 truncate">{template.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab switcher */}
            <div className="flex items-center gap-1 bg-dark-800/40 border-b border-dark-700/50 px-3 py-1">
                <button
                    type="button"
                    onClick={() => setActiveTab("edit")}
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                        activeTab === "edit"
                            ? "bg-dark-700/50 text-dark-100"
                            : "text-dark-400 hover:text-dark-200"
                    )}
                >
                    <Edit3 className="w-4 h-4" />
                    Edit
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                        activeTab === "preview"
                            ? "bg-dark-700/50 text-dark-100"
                            : "text-dark-400 hover:text-dark-200"
                    )}
                >
                    <Eye className="w-4 h-4" />
                    Preview
                </button>

                {/* Stats */}
                <div className="ml-auto flex items-center gap-4 text-xs text-dark-500">
                    <span>{charCount} characters</span>
                    <span>{wordCount} words</span>
                    {uniqueVariables.length > 0 && (
                        <span className="text-amber-400">{uniqueVariables.length} variables</span>
                    )}
                </div>
            </div>

            {/* Editor / Preview */}
            <div className="min-h-[320px]">
                {activeTab === "edit" ? (
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full h-full min-h-[320px] p-4 bg-dark-800/30 text-dark-100 placeholder:text-dark-500 font-mono text-sm resize-none focus:outline-none"
                        style={{ tabSize: 2 }}
                    />
                ) : (
                    <div className="p-4 prose prose-invert prose-sm max-w-none min-h-[320px] bg-dark-800/20">
                        {value ? (
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    // Custom rendering to highlight variables
                                    p: ({ children }) => (
                                        <p dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                String(children).replace(
                                                    /\{([^}]+)\}/g,
                                                    '<span class="bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded text-xs font-mono">{$1}</span>'
                                                )
                                            )
                                        }} />
                                    )
                                }}
                            >
                                {highlightedContent}
                            </ReactMarkdown>
                        ) : (
                            <p className="text-dark-500 italic">Nothing to preview yet...</p>
                        )}
                    </div>
                )}
            </div>

            {/* Variables panel */}
            {uniqueVariables.length > 0 && (
                <div className="bg-dark-800/40 border-t border-dark-700/50 px-4 py-3">
                    <p className="text-xs font-medium text-dark-400 mb-2">
                        Detected variables ({uniqueVariables.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {uniqueVariables.map((variable, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded"
                            >
                                {variable}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Draft indicator */}
            {value && (
                <div className="flex items-center justify-between bg-dark-800/30 border-t border-dark-700/50 px-4 py-2">
                    <span className="text-xs text-dark-500">
                        ✓ Draft auto-saved
                    </span>
                    <button
                        type="button"
                        onClick={clearDraft}
                        className="text-xs text-dark-500 hover:text-red-400 transition-colors"
                    >
                        Clear draft
                    </button>
                </div>
            )}
        </div>
    );
}

// Toolbar button component
function ToolbarButton({
    icon: Icon,
    label,
    onClick,
    className
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    onClick: () => void;
    className?: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={label}
            className={cn(
                "p-1.5 rounded-md text-dark-400 hover:text-dark-100 hover:bg-dark-700/50 transition-colors",
                className
            )}
        >
            <Icon className="w-4 h-4" />
        </button>
    );
}
