"use client";

import dynamic from "next/dynamic";

// Dynamic import with ssr:false - this is valid in a Client Component
// This prevents CommentsSection (which uses Clerk hooks) from being
// executed during SSG/build time.
const CommentsSection = dynamic(
    () => import("./CommentsSection").then(mod => mod.CommentsSection),
    {
        ssr: false,
        loading: () => (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-24 bg-dark-800/50 rounded-lg mb-4" />
                    <div className="space-y-3">
                        <div className="h-16 bg-dark-800/30 rounded-lg" />
                        <div className="h-16 bg-dark-800/30 rounded-lg" />
                    </div>
                </div>
            </div>
        )
    }
);

interface CommentsWrapperProps {
    promptId: string;
    initialComments?: Array<{
        id: string;
        content: string;
        userId: string;
        createdAt: Date;
        user?: {
            username: string;
            image?: string;
        };
    }>;
}

/**
 * Wrapper component for CommentsSection that enables client-only rendering.
 * 
 * This component must be a Client Component ("use client") because:
 * 1. `next/dynamic` with `ssr: false` can only be used in Client Components
 * 2. The underlying CommentsSection uses Clerk hooks (useAuth, useUser)
 *    which require ClerkProvider context that isn't available during SSG
 * 
 * By using this wrapper, the prompt page remains SSG/ISR compatible while
 * the comments load after client-side hydration.
 */
export function CommentsWrapper({ promptId, initialComments = [] }: CommentsWrapperProps) {
    return <CommentsSection promptId={promptId} initialComments={initialComments} />;
}
