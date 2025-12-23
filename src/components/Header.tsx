"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useAuth,
} from "@clerk/nextjs";
import {
    Search,
    Plus,
    Menu,
    X,
    Code2,
    Pencil,
    Briefcase,
    BookOpen,
    Palette,
    Target,
    GraduationCap,
    Megaphone,
    ChevronDown
} from "lucide-react";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

const categories = [
    { name: "Coding", slug: "coding", icon: Code2 },
    { name: "Writing", slug: "writing", icon: Pencil },
    { name: "Business", slug: "business", icon: Briefcase },
    { name: "Research", slug: "research", icon: BookOpen },
    { name: "Creative", slug: "creative", icon: Palette },
    { name: "Productivity", slug: "productivity", icon: Target },
    { name: "Education", slug: "education", icon: GraduationCap },
    { name: "Marketing", slug: "marketing", icon: Megaphone },
];

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [isClerkAvailable, setIsClerkAvailable] = useState(false);

    // Check if Clerk is available
    useEffect(() => {
        setIsClerkAvailable(!!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-dark-700/50 bg-dark-950/80 backdrop-blur-xl">
            <div className="container-main">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <Image
                            src="/logo.png"
                            alt="AI Library Prompts"
                            width={1200}
                            height={300}
                            className="h-10 w-auto md:h-12"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <Link
                            href="/"
                            className={cn(
                                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                pathname === "/"
                                    ? "text-primary-400 bg-primary-500/10"
                                    : "text-dark-300 hover:text-dark-100 hover:bg-dark-800/50"
                            )}
                        >
                            Home
                        </Link>

                        {/* Categories Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setCategoriesOpen(!categoriesOpen)}
                                className={cn(
                                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                    pathname.startsWith("/categories")
                                        ? "text-primary-400 bg-primary-500/10"
                                        : "text-dark-300 hover:text-dark-100 hover:bg-dark-800/50"
                                )}
                            >
                                Categories
                                <ChevronDown className={cn("h-4 w-4 transition-transform", categoriesOpen && "rotate-180")} />
                            </button>

                            {categoriesOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setCategoriesOpen(false)} />
                                    <div className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-dark-700/50 bg-dark-800/95 backdrop-blur-xl shadow-xl z-20 py-2">
                                        {categories.map((cat) => {
                                            const Icon = cat.icon;
                                            return (
                                                <Link
                                                    key={cat.slug}
                                                    href={`/categories/${cat.slug}`}
                                                    onClick={() => setCategoriesOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-200 hover:text-dark-50 hover:bg-dark-700/50 transition-colors"
                                                >
                                                    <Icon className="h-4 w-4 text-dark-400" />
                                                    {cat.name}
                                                </Link>
                                            );
                                        })}
                                        <div className="border-t border-dark-700/50 mt-2 pt-2">
                                            <Link
                                                href="/categories"
                                                onClick={() => setCategoriesOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary-400 hover:bg-dark-700/50 transition-colors"
                                            >
                                                View all categories
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <Link
                            href="/models"
                            className={cn(
                                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                pathname.startsWith("/models")
                                    ? "text-primary-400 bg-primary-500/10"
                                    : "text-dark-300 hover:text-dark-100 hover:bg-dark-800/50"
                            )}
                        >
                            AI Models
                        </Link>
                        <Link
                            href="/leaderboard"
                            className={cn(
                                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                pathname === "/leaderboard"
                                    ? "text-primary-400 bg-primary-500/10"
                                    : "text-dark-300 hover:text-dark-100 hover:bg-dark-800/50"
                            )}
                        >
                            Leaderboard
                        </Link>
                        <Link
                            href="/marketplace"
                            className={cn(
                                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                pathname.startsWith("/marketplace")
                                    ? "text-primary-400 bg-primary-500/10"
                                    : "text-dark-300 hover:text-dark-100 hover:bg-dark-800/50"
                            )}
                        >
                            🛒 Marketplace
                        </Link>
                    </nav>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-md">
                        <form action="/search" className="w-full">
                            <Input
                                name="q"
                                placeholder="Search prompts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                icon={<Search className="h-4 w-4" />}
                                className="w-full bg-dark-800/50 border-dark-700/50"
                            />
                        </form>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link href="/submit" className="hidden sm:block">
                            <Button variant="accent" size="sm">
                                <Plus className="h-4 w-4" />
                                Submit Prompt
                            </Button>
                        </Link>

                        {/* Auth - Only render if Clerk is available */}
                        {isClerkAvailable && (
                            <>
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <Button variant="ghost" size="sm">
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton
                                        afterSignOutUrl="/"
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-8 h-8",
                                            },
                                        }}
                                    />
                                </SignedIn>
                            </>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-dark-300 hover:text-dark-100 hover:bg-dark-800/50 rounded-lg"
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden pb-3">
                    <form action="/search">
                        <Input
                            name="q"
                            placeholder="Search prompts..."
                            icon={<Search className="h-4 w-4" />}
                            className="bg-dark-800/50 border-dark-700/50"
                        />
                    </form>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-dark-700/50">
                    <div className="container-main py-4 space-y-2">
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2.5 text-sm font-medium rounded-lg text-dark-200 hover:bg-dark-800/50"
                        >
                            Home
                        </Link>
                        <Link
                            href="/categories"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2.5 text-sm font-medium rounded-lg text-dark-200 hover:bg-dark-800/50"
                        >
                            Categories
                        </Link>
                        <Link
                            href="/models"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2.5 text-sm font-medium rounded-lg text-dark-200 hover:bg-dark-800/50"
                        >
                            AI Models
                        </Link>
                        <Link
                            href="/leaderboard"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2.5 text-sm font-medium rounded-lg text-dark-200 hover:bg-dark-800/50"
                        >
                            Leaderboard
                        </Link>
                        <div className="pt-2">
                            <Link href="/submit" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="accent" className="w-full">
                                    <Plus className="h-4 w-4" />
                                    Submit Prompt
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
