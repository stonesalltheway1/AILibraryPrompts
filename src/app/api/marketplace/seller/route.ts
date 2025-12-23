import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/marketplace/seller - Get current user's seller profile
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
            include: {
                sellerProfile: {
                    include: {
                        products: {
                            orderBy: { createdAt: 'desc' },
                            include: {
                                _count: {
                                    select: { purchases: true, reviews: true },
                                },
                            },
                        },
                        payouts: {
                            orderBy: { createdAt: 'desc' },
                            take: 10,
                        },
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        if (!user.sellerProfile) {
            return NextResponse.json({
                hasSeller: false,
                seller: null,
            });
        }

        // Calculate recent stats
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentPurchases = await prisma.purchase.findMany({
            where: {
                product: {
                    sellerId: user.sellerProfile.id,
                },
                status: 'COMPLETED',
                completedAt: {
                    gte: thirtyDaysAgo,
                },
            },
            include: {
                product: {
                    select: {
                        title: true,
                    },
                },
            },
            orderBy: { completedAt: 'desc' },
            take: 10,
        });

        const monthlyEarnings = recentPurchases.reduce(
            (sum, p) => sum + p.sellerAmount,
            0
        );

        const pendingPayouts = await prisma.payout.aggregate({
            where: {
                sellerId: user.sellerProfile.id,
                status: 'PENDING',
            },
            _sum: {
                amount: true,
            },
        });

        return NextResponse.json({
            hasSeller: true,
            seller: {
                id: user.sellerProfile.id,
                displayName: user.sellerProfile.displayName,
                bio: user.sellerProfile.bio,
                avatarUrl: user.sellerProfile.avatarUrl,
                paypalEmail: user.sellerProfile.paypalEmail,
                totalEarnings: user.sellerProfile.totalEarnings,
                totalSales: user.sellerProfile.totalSales,
                rating: user.sellerProfile.rating,
                reviewCount: user.sellerProfile.reviewCount,
                isVerified: user.sellerProfile.isVerified,
                createdAt: user.sellerProfile.createdAt,
                products: user.sellerProfile.products.map((p) => ({
                    id: p.id,
                    title: p.title,
                    slug: p.slug,
                    price: p.price,
                    salesCount: p.salesCount,
                    rating: p.rating,
                    reviewCount: p._count.reviews,
                    isActive: p.isActive,
                    createdAt: p.createdAt,
                })),
            },
            stats: {
                monthlyEarnings,
                monthlySales: recentPurchases.length,
                pendingPayout: pendingPayouts._sum.amount || 0,
                recentSales: recentPurchases.map((p) => ({
                    id: p.id,
                    productTitle: p.product.title,
                    amount: p.sellerAmount,
                    date: p.completedAt,
                })),
            },
        });
    } catch (error) {
        console.error('Error fetching seller profile:', error);
        return NextResponse.json(
            { error: 'Failed to fetch seller profile' },
            { status: 500 }
        );
    }
}

// POST /api/marketplace/seller - Create seller profile
export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { displayName, bio, paypalEmail } = body;

        if (!displayName || !paypalEmail) {
            return NextResponse.json(
                { error: 'Display name and PayPal email are required' },
                { status: 400 }
            );
        }

        // Validate PayPal email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(paypalEmail)) {
            return NextResponse.json(
                { error: 'Invalid PayPal email format' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: { sellerProfile: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        if (user.sellerProfile) {
            return NextResponse.json(
                { error: 'Seller profile already exists' },
                { status: 400 }
            );
        }

        // Create seller profile
        const sellerProfile = await prisma.sellerProfile.create({
            data: {
                userId: user.id,
                displayName,
                bio,
                paypalEmail,
                avatarUrl: user.avatarUrl,
            },
        });

        return NextResponse.json({ seller: sellerProfile }, { status: 201 });
    } catch (error) {
        console.error('Error creating seller profile:', error);
        return NextResponse.json(
            { error: 'Failed to create seller profile' },
            { status: 500 }
        );
    }
}

// PUT /api/marketplace/seller - Update seller profile
export async function PUT(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: { sellerProfile: true },
        });

        if (!user?.sellerProfile) {
            return NextResponse.json(
                { error: 'Seller profile not found' },
                { status: 404 }
            );
        }

        // Update seller profile
        const updatedProfile = await prisma.sellerProfile.update({
            where: { id: user.sellerProfile.id },
            data: {
                displayName: body.displayName,
                bio: body.bio,
                avatarUrl: body.avatarUrl,
                paypalEmail: body.paypalEmail,
            },
        });

        return NextResponse.json({ seller: updatedProfile });
    } catch (error) {
        console.error('Error updating seller profile:', error);
        return NextResponse.json(
            { error: 'Failed to update seller profile' },
            { status: 500 }
        );
    }
}
