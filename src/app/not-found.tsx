import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950">
            <div className="text-center px-4">
                {/* 404 Graphic */}
                <div className="relative mb-8">
                    <span className="text-[150px] md:text-[200px] font-bold text-dark-800/50 leading-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <Search className="w-16 h-16 text-primary-500/50 mx-auto mb-2" />
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h1 className="text-2xl md:text-3xl font-bold text-dark-100 mb-4">
                    Page Not Found
                </h1>
                <p className="text-dark-400 max-w-md mx-auto mb-8">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                    It might have been moved or doesn&apos;t exist.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                        <Button variant="primary" size="lg">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/search">
                        <Button variant="secondary" size="lg">
                            <Search className="w-4 h-4" />
                            Search Prompts
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
