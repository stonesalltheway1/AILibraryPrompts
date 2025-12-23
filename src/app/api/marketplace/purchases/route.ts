import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/marketplace/purchases - Get user's purchases
export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const purchases = await prisma.purchase.findMany({
            where: {
                buyerId: user.id,
                status: 'COMPLETED',
            },
            include: {
                product: {
                    include: {
                        seller: {
                            select: {
                                id: true,
                                displayName: true,
                                avatarUrl: true,
                                isVerified: true,
                            },
                        },
                    },
                },
            },
            orderBy: { completedAt: 'desc' },
        });

        // Format response with full content access
        const formattedPurchases = purchases.map((purchase) => ({
            id: purchase.id,
            purchasedAt: purchase.completedAt,
            amount: purchase.amount,
            currency: purchase.currency,
            product: {
                id: purchase.product.id,
                title: purchase.product.title,
                slug: purchase.product.slug,
                description: purchase.product.description,
                content: purchase.product.content, // Full content for purchased items
                usageInstructions: purchase.product.usageInstructions,
                category: purchase.product.category,
                modelType: purchase.product.modelType,
                tags: purchase.product.tags,
                seller: purchase.product.seller,
            },
        }));

        return NextResponse.json({ purchases: formattedPurchases });
    } catch (error) {
        console.error('Error fetching purchases:', error);
        return NextResponse.json(
            { error: 'Failed to fetch purchases' },
            { status: 500 }
        );
    }
}
