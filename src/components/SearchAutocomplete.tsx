"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, ArrowRight, Loader2, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchPromptsAutocomplete } from "@/lib/actions";

interface SearchResult {
    title: string;
    slug: string;
    category: string;
}

interface SearchAutocompleteProps {
    className?: string;
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    onSearch?: (query: string) => void;
}

/**
 * Search component with autocomplete suggestions
 * Features debounced search, keyboard navigation, and recent searches
 */
export function SearchAutocomplete({
    className,
    placeholder = "Search prompts...",
    size = "md",
    onSearch,
}: SearchAutocompleteProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();

    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    // Load recent searches from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("recentSearches");
            if (saved) {
                try {
                    setRecentSearches(JSON.parse(saved).slice(0, 5));
                } catch {
                    // Invalid JSON, ignore
                }
            }
        }
    }, []);

    // Save recent searches
    const saveRecentSearch = useCallback((searchQuery: string) => {
        if (!searchQuery.trim()) return;

        const updated = [
            searchQuery,
            ...recentSearches.filter((s) => s !== searchQuery),
        ].slice(0, 5);

        setRecentSearches(updated);
        if (typeof window !== "undefined") {
            localStorage.setItem("recentSearches", JSON.stringify(updated));
        }
    }, [recentSearches]);

    // Debounced search
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);
            const result = await searchPromptsAutocomplete(query);
            if (result.success && result.data) {
                setSuggestions(result.data.suggestions);
            }
            setIsLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, [query]);

    // Get all items for keyboard navigation
    const getNavigableItems = () => {
        if (suggestions.length > 0) {
            return suggestions.map((s) => ({ type: "suggestion" as const, ...s }));
        }
        return recentSearches.map((s) => ({ type: "recent" as const, title: s, slug: "", category: "" }));
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const items = getNavigableItems();
        const hasSearchAll = query.length >= 2;
        const totalItems = items.length + (hasSearchAll ? 1 : 0);

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, totalItems - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, -1));
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    const item = items[selectedIndex];
                    if (item.type === "suggestion") {
                        router.push(`/prompts/${item.slug}`);
                        setIsOpen(false);
                    } else {
                        setQuery(item.title);
                        handleSearch(item.title);
                    }
                } else {
                    handleSearch(query);
                }
                break;
            case "Escape":
                setIsOpen(false);
                inputRef.current?.blur();
                break;
        }
    };

    const handleSearch = (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        saveRecentSearch(searchQuery);
        setIsOpen(false);

        if (onSearch) {
            onSearch(searchQuery);
        } else {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const sizeClasses = {
        sm: "h-9 text-sm",
        md: "h-10",
        lg: "h-12 text-lg",
    };

    const showDropdown = isOpen && (suggestions.length > 0 || recentSearches.length > 0 || isLoading);

    return (
        <div ref={containerRef} className={cn("relative", className)}>
            {/* Search Input */}
            <div className="relative">
                <Search
                    className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none",
                        size === "lg" ? "w-5 h-5" : "w-4 h-4"
                    )}
                    aria-hidden="true"
                />
                <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                        setSelectedIndex(-1);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={cn(
                        "w-full pl-10 pr-10 rounded-lg",
                        "bg-dark-800/80 border border-dark-700/50",
                        "text-dark-100 placeholder:text-dark-500",
                        "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                        "transition-all outline-none",
                        sizeClasses[size]
                    )}
                    aria-label="Search prompts"
                    aria-expanded={showDropdown}
                    aria-controls={showDropdown ? listboxId : undefined}
                    aria-autocomplete="list"
                    autoComplete="off"
                />

                {/* Clear button */}
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setSuggestions([]);
                            inputRef.current?.focus();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200"
                        aria-label="Clear search"
                    >
                        <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                )}
            </div>

            {/* Dropdown */}
            {showDropdown && (
                <div
                    id={listboxId}
                    className={cn(
                        "absolute top-full left-0 right-0 mt-2 z-50",
                        "bg-dark-800 border border-dark-700/50 rounded-lg shadow-xl",
                        "overflow-hidden"
                    )}
                >
                    {/* Loading state */}
                    {isLoading && (
                        <div className="flex items-center gap-2 px-4 py-3 text-dark-400">
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                            <span>Searching...</span>
                        </div>
                    )}

                    {/* Suggestions */}
                    {!isLoading && suggestions.length > 0 && (
                        <div>
                            <div className="px-3 py-2 text-xs font-medium text-dark-500 uppercase tracking-wide bg-dark-850">
                                <TrendingUp className="w-3 h-3 inline mr-1" aria-hidden="true" />
                                Suggestions
                            </div>
                            {suggestions.map((suggestion, index) => (
                                <Link
                                    key={suggestion.slug}
                                    href={`/prompts/${suggestion.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center justify-between px-4 py-3",
                                        "hover:bg-dark-700/50 transition-colors",
                                        selectedIndex === index && "bg-dark-700/50"
                                    )}
                                >
                                    <span className="font-medium text-dark-100">{suggestion.title}</span>
                                    <span className="text-xs text-dark-500 px-2 py-0.5 rounded bg-dark-700">
                                        {suggestion.category}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Recent searches (when no suggestions) */}
                    {!isLoading && suggestions.length === 0 && recentSearches.length > 0 && (
                        <div>
                            <div className="px-3 py-2 text-xs font-medium text-dark-500 uppercase tracking-wide bg-dark-850">
                                <Clock className="w-3 h-3 inline mr-1" aria-hidden="true" />
                                Recent Searches
                            </div>
                            {recentSearches.map((search, index) => (
                                <button
                                    key={search}
                                    type="button"
                                    onClick={() => {
                                        setQuery(search);
                                        handleSearch(search);
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 text-left",
                                        "hover:bg-dark-700/50 transition-colors",
                                        selectedIndex === index && "bg-dark-700/50"
                                    )}
                                >
                                    <Clock className="w-4 h-4 text-dark-500" aria-hidden="true" />
                                    <span className="text-dark-200">{search}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Search all link */}
                    {query.length >= 2 && (
                        <button
                            type="button"
                            onClick={() => handleSearch(query)}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-3",
                                "bg-dark-850 hover:bg-dark-700/50 transition-colors",
                                "border-t border-dark-700/50"
                            )}
                        >
                            <span className="text-dark-300">
                                Search for &quot;{query}&quot;
                            </span>
                            <ArrowRight className="w-4 h-4 text-primary-400" aria-hidden="true" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchAutocomplete;
