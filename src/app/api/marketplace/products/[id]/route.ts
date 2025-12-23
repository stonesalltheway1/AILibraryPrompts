import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/marketplace/products/[id] - Get product details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Get user if authenticated (to check if they purchased)
        const { userId } = await auth();

        const product = await prisma.marketplaceProduct.findUnique({
            where: { id },
            include: {
                seller: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true,
                        isVerified: true,
                        rating: true,
                        totalSales: true,
                    },
                },
                reviews: {
                    include: {
                        buyer: {
                            select: {
                                displayName: true,
                                avatarUrl: true,
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        // Check if user has purchased this product
        let hasPurchased = false;
        let fullContent = null;

        if (userId) {
            const user = await prisma.user.findUnique({
                where: { clerkId: userId },
            });

            if (user) {
                const purchase = await prisma.purchase.findFirst({
                    where: {
                        buyerId: user.id,
                        productId: product.id,
                        status: 'COMPLETED',
                    },
                });

                if (purchase) {
                    hasPurchased = true;
                    fullContent = product.content;
                }
            }
        }

        // Increment view count
        await prisma.marketplaceProduct.update({
            where: { id },
            data: { viewCount: { increment: 1 } },
        });

        // Return product (with or without full content based on purchase)
        return NextResponse.json({
            product: {
                id: product.id,
                title: product.title,
                slug: product.slug,
                description: product.description,
                previewContent: product.previewContent,
                content: fullContent, // Only if purchased
                usageInstructions: product.usageInstructions,
                price: product.price,
                currency: product.currency,
                category: product.category,
                modelType: product.modelType,
                tags: product.tags,
                thumbnailUrl: product.thumbnailUrl,
                salesCount: product.salesCount,
                viewCount: product.viewCount + 1,
                rating: product.rating,
                reviewCount: product.reviewCount,
                isFeatured: product.isFeatured,
                createdAt: product.createdAt,
                seller: product.seller,
                reviews: product.reviews.map((review) => ({
                    id: review.id,
                    rating: review.rating,
                    title: review.title,
                    content: review.content,
                    isVerified: review.isVerified,
                    createdAt: review.createdAt,
                    buyer: review.buyer,
                })),
            },
            hasPurchased,
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 }
        );
    }
}

// PUT /api/marketplace/products/[id] - Update product (seller only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Get user and verify ownership
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: { sellerProfile: true },
        });

        if (!user?.sellerProfile) {
            return NextResponse.json(
                { error: 'Seller profile not found' },
                { status: 403 }
            );
        }

        const product = await prisma.marketplaceProduct.findUnique({
            where: { id },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        if (product.sellerId !== user.sellerProfile.id) {
            return NextResponse.json(
                { error: 'Not authorized to update this product' },
                { status: 403 }
            );
        }

        // Update product
        const updatedProduct = await prisma.marketplaceProduct.update({
            where: { id },
            data: {
                title: body.title,
                description: body.description,
                content: body.content,
                previewContent: body.previewContent,
                usageInstructions: body.usageInstructions,
                price: body.price,
                category: body.category,
                modelType: body.modelType,
                tags: body.tags,
                thumbnailUrl: body.thumbnailUrl,
                isActive: body.isActive,
            },
        });

        return NextResponse.json({ product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        );
    }
}

// DELETE /api/marketplace/products/[id] - Delete product (seller only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: { sellerProfile: true },
        });

        if (!user?.sellerProfile) {
            return NextResponse.json(
                { error: 'Seller profile not found' },
                { status: 403 }
            );
        }

        const product = await prisma.marketplaceProduct.findUnique({
            where: { id },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        if (product.sellerId !== user.sellerProfile.id) {
            return NextResponse.json(
                { error: 'Not authorized to delete this product' },
                { status: 403 }
            );
        }

        await prisma.marketplaceProduct.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
