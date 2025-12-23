"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui";

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Global error handler for Next.js App Router
 * Catches errors in the root layout and displays a recovery UI
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        // Log error to monitoring service (e.g., Sentry)
        console.error("Global error:", error);
    }, [error]);

    return (
        <html lang="en">
            <body className="min-h-screen bg-dark-950 text-dark-50 antialiased">
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        {/* Error Icon */}
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-10 h-10 text-red-400" />
                            </div>
                        </div>

                        {/* Error Message */}
                        <h1 className="text-2xl font-bold text-white mb-3">
                            Something went wrong
                        </h1>
                        <p className="text-gray-400 mb-6">
                            We encountered an unexpected error. You can try refreshing
                            the page or go back to the homepage.
                        </p>

                        {/* Error ID for support */}
                        {error.digest && (
                            <p className="text-xs text-gray-500 mb-6">
                                Error ID: {error.digest}
                            </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button variant="primary" onClick={reset}>
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </Button>
                            <Link href="/">
                                <Button variant="secondary">
                                    <Home className="w-4 h-4" />
                                    Go Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
