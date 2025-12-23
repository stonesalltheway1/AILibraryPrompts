import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Clerk Middleware Configuration
 * 
 * This middleware runs before requests to your application.
 * It makes auth data available to route handlers and server actions
 * that need to verify the user is authenticated.
 * 
 * Note: Public pages (like /prompts/*) don't need auth - they are
 * statically generated. Only write operations (comments, votes, etc.)
 * verify auth server-side in their respective actions.
 */
export default clerkMiddleware();

export const config = {
    // Match all routes except static files and Next.js internals
    matcher: [
        // Skip Next.js internals and all static files
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
