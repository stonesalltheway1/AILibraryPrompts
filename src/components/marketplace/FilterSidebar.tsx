"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
    categories?: string[];
    models?: string[];
    onFiltersChange: (filters: FilterState) => void;
    className?: string;
}

export interface FilterState {
    categories: string[];
    models: string[];
    priceRange: [number, number];
    minRating: number;
    rating?: number;
    sortBy: "popular" | "newest" | "price-low" | "price-high" | "rating";
}

const DEFAULT_CATEGORIES = [
    "Coding",
    "Marketing",
    "Writing",
    "Image Generation",
    "Business",
    "Education",
    "Productivity",
];

const DEFAULT_MODELS = [
    "GPT-4",
    "GPT-3.5",
    "Claude",
    "Gemini",
    "Midjourney",
    "DALL-E",
    "Stable Diffusion",
];

const PRICE_RANGES = [
    { label: "All Prices", min: 0, max: 999 },
    { label: "Under $5", min: 0, max: 5 },
    { label: "$5 - $15", min: 5, max: 15 },
    { label: "$15 - $30", min: 15, max: 30 },
    { label: "$30+", min: 30, max: 999 },
];

const RATINGS = [
    { label: "4+ Stars", value: 4 },
    { label: "3+ Stars", value: 3 },
    { label: "2+ Stars", value: 2 },
    { label: "Any Rating", value: 0 },
];

export function FilterSidebar({
    categories = DEFAULT_CATEGORIES,
    models = DEFAULT_MODELS,
    onFiltersChange,
    className
}: FilterSidebarProps) {
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        models: [],
        priceRange: [0, 999],
        minRating: 0,
        sortBy: "popular",
    });

    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        models: true,
        price: true,
        rating: false,
    });

    const updateFilters = (updates: Partial<FilterState>) => {
        const newFilters = { ...filters, ...updates };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleCategory = (category: string) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter((c) => c !== category)
            : [...filters.categories, category];
        updateFilters({ categories: newCategories });
    };

    const toggleModel = (model: string) => {
        const newModels = filters.models.includes(model)
            ? filters.models.filter((m) => m !== model)
            : [...filters.models, model];
        updateFilters({ models: newModels });
    };

    const clearFilters = () => {
        const defaultFilters: FilterState = {
            categories: [],
            models: [],
            priceRange: [0, 999],
            minRating: 0,
            sortBy: "popular",
        };
        setFilters(defaultFilters);
        onFiltersChange(defaultFilters);
    };

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.models.length > 0 ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < 999 ||
        filters.minRating > 0;

    return (
        <aside className={cn("w-64 space-y-4", className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-dark-100">Filters</h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 text-xs text-dark-400 hover:text-primary-400 transition-colors"
                    >
                        <X className="w-3 h-3" />
                        Clear all
                    </button>
                )}
            </div>

            {/* Sort By */}
            <div className="p-3 rounded-lg bg-dark-800/50 border border-dark-700/50">
                <label className="text-xs font-medium text-dark-400 uppercase tracking-wider">
                    Sort By
                </label>
                <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilters({ sortBy: e.target.value as FilterState["sortBy"] })}
                    aria-label="Sort products by"
                    className="mt-2 w-full p-2 rounded-lg bg-dark-700/50 border border-dark-600/50 text-dark-100 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20"
                >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                </select>
            </div>

            {/* Categories */}
            <FilterSection
                title="Categories"
                isExpanded={expandedSections.categories}
                onToggle={() => toggleSection("categories")}
            >
                <div className="space-y-1">
                    {categories.map((category) => (
                        <FilterCheckbox
                            key={category}
                            label={category}
                            checked={filters.categories.includes(category)}
                            onChange={() => toggleCategory(category)}
                        />
                    ))}
                </div>
            </FilterSection>

            {/* AI Models */}
            <FilterSection
                title="AI Models"
                isExpanded={expandedSections.models}
                onToggle={() => toggleSection("models")}
            >
                <div className="space-y-1">
                    {models.map((model) => (
                        <FilterCheckbox
                            key={model}
                            label={model}
                            checked={filters.models.includes(model)}
                            onChange={() => toggleModel(model)}
                        />
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection
                title="Price Range"
                isExpanded={expandedSections.price}
                onToggle={() => toggleSection("price")}
            >
                <div className="space-y-1">
                    {PRICE_RANGES.map((range) => (
                        <FilterRadio
                            key={range.label}
                            label={range.label}
                            checked={
                                filters.priceRange[0] === range.min &&
                                filters.priceRange[1] === range.max
                            }
                            onChange={() => updateFilters({ priceRange: [range.min, range.max] })}
                        />
                    ))}
                </div>
            </FilterSection>

            {/* Rating */}
            <FilterSection
                title="Rating"
                isExpanded={expandedSections.rating}
                onToggle={() => toggleSection("rating")}
            >
                <div className="space-y-1">
                    {RATINGS.map((rating) => (
                        <FilterRadio
                            key={rating.label}
                            label={rating.label}
                            checked={filters.minRating === rating.value}
                            onChange={() => updateFilters({ minRating: rating.value })}
                        />
                    ))}
                </div>
            </FilterSection>
        </aside>
    );
}

// Collapsible section component
function FilterSection({
    title,
    isExpanded,
    onToggle,
    children,
}: {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-lg bg-dark-800/50 border border-dark-700/50 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-dark-700/30 transition-colors"
            >
                <span className="text-sm font-medium text-dark-200">{title}</span>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 text-dark-400 transition-transform",
                        isExpanded && "rotate-180"
                    )}
                />
            </button>
            {isExpanded && <div className="px-3 pb-3">{children}</div>}
        </div>
    );
}

// Checkbox component
function FilterCheckbox({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: () => void;
}) {
    return (
        <label className="flex items-center gap-2 py-1 cursor-pointer group">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 rounded border-dark-600 bg-dark-700 text-primary-500 focus:ring-primary-500/20 focus:ring-offset-0"
            />
            <span className="text-sm text-dark-300 group-hover:text-dark-100 transition-colors">
                {label}
            </span>
        </label>
    );
}

// Radio component
function FilterRadio({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: () => void;
}) {
    return (
        <label className="flex items-center gap-2 py-1 cursor-pointer group">
            <input
                type="radio"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 border-dark-600 bg-dark-700 text-primary-500 focus:ring-primary-500/20 focus:ring-offset-0"
            />
            <span className="text-sm text-dark-300 group-hover:text-dark-100 transition-colors">
                {label}
            </span>
        </label>
    );
}
