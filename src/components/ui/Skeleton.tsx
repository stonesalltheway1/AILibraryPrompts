import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-lg bg-dark-700/50",
                className
            )}
        />
    );
}

export function PromptCardSkeleton() {
    return (
        <div className="rounded-xl border border-dark-700/50 bg-dark-800/60 p-5">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-2 mb-4">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-dark-700/30">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-4 w-20" />
            </div>
        </div>
    );
}

export function PromptDetailSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Prompt content */}
            <div className="rounded-xl bg-dark-900/80 p-6 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}
