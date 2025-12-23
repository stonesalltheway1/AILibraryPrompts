"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Users,
    Upload,
    Settings,
    ArrowLeft,
    Shield,
} from "lucide-react";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/prompts", label: "Prompts", icon: FileText },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/import", label: "Import JSON", icon: Upload },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-dark-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-dark-900 border-r border-dark-700/50 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-dark-700/50">
                    <div className="flex items-center gap-2">
                        <Shield className="w-8 h-8 text-primary-500" />
                        <div>
                            <h1 className="font-bold text-dark-50">Admin Panel</h1>
                            <p className="text-xs text-dark-400">AI Library Prompts</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {adminNavItems.map((item) => {
                        const isActive =
                            item.href === "/admin"
                                ? pathname === "/admin"
                                : pathname.startsWith(item.href);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                                        : "text-dark-300 hover:bg-dark-800/50 hover:text-dark-100"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Back to Site */}
                <div className="p-4 border-t border-dark-700/50">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-3 text-dark-400 hover:text-dark-200 transition-colors rounded-lg hover:bg-dark-800/50"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
