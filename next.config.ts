import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Image optimization for Core Web Vitals
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
        formats: ['image/avif', 'image/webp'], // Modern formats for better compression
        minimumCacheTTL: 60, // Cache images for 60 seconds
        deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive breakpoints
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon/thumbnail sizes
    },
    // Remove unnecessary header
    poweredByHeader: false,
    // Compression
    compress: true,
    // Experimental optimizations for performance
    experimental: {
        optimizePackageImports: ['lucide-react', '@clerk/nextjs'], // Reduce bundle size
        optimizeCss: true, // Optimize CSS delivery
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                ],
            },
            // Cache static assets aggressively
            {
                source: "/logo.png",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
