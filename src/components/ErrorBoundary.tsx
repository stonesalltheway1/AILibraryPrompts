"use client";

import { Component, ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

/**
 * Error Boundary component for catching and displaying React errors gracefully
 * Provides a user-friendly error page with recovery options
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to monitoring service in production
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4">
                    <div className="text-center max-w-md">
                        {/* Error Icon */}
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-10 h-10 text-red-400" />
                            </div>
                        </div>

                        {/* Error Message */}
                        <h1 className="text-2xl font-bold text-dark-100 mb-3">
                            Something went wrong
                        </h1>
                        <p className="text-dark-400 mb-6">
                            We encountered an unexpected error. Don&apos;t worry,
                            you can try refreshing the page or go back home.
                        </p>

                        {/* Error Details (development only) */}
                        {process.env.NODE_ENV === "development" && this.state.error && (
                            <div className="mb-6 p-4 rounded-lg bg-dark-800/50 border border-dark-700/50 text-left">
                                <p className="text-xs font-mono text-red-400 break-all">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                variant="primary"
                                onClick={this.handleRetry}
                            >
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

        return this.props.children;
    }
}

export default ErrorBoundary;
