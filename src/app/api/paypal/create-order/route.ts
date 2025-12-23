import { NextRequest, NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productId, title, price, currency = 'USD' } = body;

        if (!productId || !title || !price) {
            return NextResponse.json(
                { error: 'Missing required fields: productId, title, price' },
                { status: 400 }
            );
        }

        const order = await createPayPalOrder(productId, title, price, currency);

        return NextResponse.json({
            id: order.id,
            status: order.status,
        });
    } catch (error) {
        console.error('Error creating PayPal order:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}
