import { NextRequest, NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'You must be signed in to make a purchase' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { orderId, productId } = body;

        if (!orderId) {
            return NextResponse.json(
                { error: 'Missing orderId' },
                { status: 400 }
            );
        }

        // Get user
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Check if already purchased
        if (productId) {
            const existingPurchase = await prisma.purchase.findFirst({
                where: {
                    buyerId: user.id,
                    productId,
                    status: 'COMPLETED',
                },
            });

            if (existingPurchase) {
                return NextResponse.json(
                    { error: 'You have already purchased this product' },
                    { status: 400 }
                );
            }
        }

        // Capture payment
        const captureData = await capturePayPalOrder(orderId);

        // Extract purchase details
        const purchaseUnit = captureData.purchase_units[0];
        const capture = purchaseUnit?.payments?.captures[0];

        if (!capture || capture.status !== 'COMPLETED') {
            return NextResponse.json(
                { error: 'Payment capture failed' },
                { status: 400 }
            );
        }

        // Parse custom data (productId, fees)
        let customData: { productId?: string; platformFee?: string; sellerAmount?: string } = {};
        try {
            customData = JSON.parse(purchaseUnit.custom_id || '{}');
        } catch {
            // Ignore parse errors
        }

        const capturedProductId = customData.productId || productId;

        if (!capturedProductId) {
            return NextResponse.json(
                { error: 'Product ID not found in order' },
                { status: 400 }
            );
        }

        // Get product details
        const product = await prisma.marketplaceProduct.findUnique({
            where: { id: capturedProductId },
            include: { seller: true },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        // Create purchase record
        const purchase = await prisma.purchase.create({
            data: {
                buyerId: user.id,
                productId: capturedProductId,
                paypalOrderId: orderId,
                paypalPayerId: captureData.payer.payer_id,
                amount: parseFloat(capture.amount.value),
                platformFee: parseFloat(customData.platformFee || '0'),
                sellerAmount: parseFloat(customData.sellerAmount || '0'),
                currency: capture.amount.currency_code,
                status: 'COMPLETED',
                completedAt: new Date(),
            },
        });

        // Update product sales count
        await prisma.marketplaceProduct.update({
            where: { id: capturedProductId },
            data: {
                salesCount: { increment: 1 },
            },
        });

        // Update seller earnings
        await prisma.sellerProfile.update({
            where: { id: product.sellerId },
            data: {
                totalEarnings: { increment: parseFloat(customData.sellerAmount || '0') },
                totalSales: { increment: 1 },
            },
        });

        return NextResponse.json({
            success: true,
            orderId: captureData.id,
            purchaseId: purchase.id,
            status: captureData.status,
            payer: {
                email: captureData.payer.email_address,
                name: `${captureData.payer.name.given_name} ${captureData.payer.name.surname}`,
            },
            amount: capture.amount.value,
            currency: capture.amount.currency_code,
            productId: capturedProductId,
            // Include full content now that purchase is complete
            productContent: product.content,
        });
    } catch (error) {
        console.error('Error capturing PayPal order:', error);
        return NextResponse.json(
            { error: 'Failed to capture payment' },
            { status: 500 }
        );
    }
}
