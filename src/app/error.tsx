"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Error boundary page for route-level errors
 * Catches errors within page segments and shows recovery UI
 */
export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error to monitoring service
        console.error("Route error:", error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                {/* Error Icon */}
                <div className="mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-amber-400" />
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-xl font-bold text-dark-100 mb-3">
                    Oops! Something went wrong
                </h1>
                <p className="text-dark-400 mb-6">
                    We couldn&apos;t load this page. Please try again or navigate
                    to a different page.
                </p>

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
    );
}
