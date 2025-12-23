import { Skeleton } from "@/components/ui";

/**
 * Loading state for the root layout
 * Displayed while initial page content is loading
 */
export default function Loading() {
    return (
        <div className="min-h-screen">
            {/* Header skeleton */}
            <header className="sticky top-0 z-50 border-b border-dark-700/50 bg-dark-900/80 backdrop-blur-md">
                <div className="container-main h-16 flex items-center justify-between">
                    <Skeleton className="w-40 h-8" />
                    <div className="hidden md:flex items-center gap-4">
                        <Skeleton className="w-24 h-8" />
                        <Skeleton className="w-24 h-8" />
                        <Skeleton className="w-24 h-8" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-64 h-10 rounded-lg hidden md:block" />
                        <Skeleton className="w-28 h-10 rounded-lg" />
                    </div>
                </div>
            </header>

            {/* Main content skeleton */}
            <main className="container-main py-12">
                {/* Hero skeleton */}
                <div className="text-center mb-12">
                    <Skeleton className="w-96 h-12 mx-auto mb-4" />
                    <Skeleton className="w-64 h-6 mx-auto mb-8" />
                    <Skeleton className="w-full max-w-xl h-12 mx-auto rounded-lg" />
                </div>

                {/* Cards grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="p-6 rounded-xl bg-dark-800/40 border border-dark-700/30">
                            <div className="flex items-start gap-4">
                                <Skeleton className="w-12 h-20" />
                                <div className="flex-1">
                                    <Skeleton className="w-full h-6 mb-2" />
                                    <Skeleton className="w-2/3 h-4 mb-3" />
                                    <div className="flex gap-2">
                                        <Skeleton className="w-16 h-5 rounded-full" />
                                        <Skeleton className="w-20 h-5 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
