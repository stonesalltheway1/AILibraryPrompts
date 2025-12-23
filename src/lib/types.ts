// Mock data types used across the application
export interface User {
    id: string;
    username: string;
    reputation: number;
    createdAt: Date;
    image?: string;
    bio?: string;
    website?: string;
    twitter?: string;
    github?: string;
    specialty?: string[];
    promptCount?: number;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    promptCount?: number;
}

export interface AIModel {
    id: string;
    name: string;
    slug: string;
    vendor: "openai" | "anthropic" | "google" | "xai" | "meta" | "mistral";
    promptCount?: number;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
}

export interface Prompt {
    id: string;
    title: string;
    slug: string;
    content: string;
    description?: string;
    user: User;
    category: Category;
    model: AIModel;
    tags: Tag[];
    votes: number;
    userVote?: number; // -1, 0, or 1
    views: number;
    commentCount: number;
    verified: boolean;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: string;
    content: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
