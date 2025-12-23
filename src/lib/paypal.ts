// PayPal Configuration and Utilities
const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;
const PLATFORM_FEE_PERCENT = parseInt(process.env.PLATFORM_FEE_PERCENT || '20');

interface PayPalAccessToken {
    access_token: string;
    token_type: string;
    expires_in: number;
}

interface PayPalOrder {
    id: string;
    status: string;
    links: Array<{ href: string; rel: string; method: string }>;
}

/**
 * Generate an OAuth 2.0 access token for PayPal API calls
 */
export async function generateAccessToken(): Promise<string> {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error('PayPal credentials not configured');
    }

    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');

    const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to generate PayPal access token: ${error}`);
    }

    const data: PayPalAccessToken = await response.json();
    return data.access_token;
}

/**
 * Create a PayPal order for checkout
 */
export async function createPayPalOrder(
    productId: string,
    productTitle: string,
    amount: number,
    currency: string = 'USD'
): Promise<PayPalOrder> {
    const accessToken = await generateAccessToken();

    // Calculate platform fee (20% default)
    const platformFee = (amount * PLATFORM_FEE_PERCENT) / 100;
    const sellerAmount = amount - platformFee;

    const orderPayload = {
        intent: 'CAPTURE',
        purchase_units: [
            {
                reference_id: productId,
                description: productTitle,
                amount: {
                    currency_code: currency,
                    value: amount.toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: currency,
                            value: amount.toFixed(2),
                        },
                    },
                },
                items: [
                    {
                        name: productTitle,
                        quantity: '1',
                        unit_amount: {
                            currency_code: currency,
                            value: amount.toFixed(2),
                        },
                        category: 'DIGITAL_GOODS',
                    },
                ],
                custom_id: JSON.stringify({
                    productId,
                    platformFee: platformFee.toFixed(2),
                    sellerAmount: sellerAmount.toFixed(2),
                }),
            },
        ],
        application_context: {
            brand_name: 'Godly Prompts',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/marketplace/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/marketplace/cancel`,
        },
    };

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to create PayPal order: ${error}`);
    }

    return response.json();
}

/**
 * Capture a PayPal order after buyer approval
 */
export async function capturePayPalOrder(orderId: string): Promise<{
    id: string;
    status: string;
    payer: {
        email_address: string;
        payer_id: string;
        name: { given_name: string; surname: string };
    };
    purchase_units: Array<{
        reference_id: string;
        custom_id: string;
        payments: {
            captures: Array<{
                id: string;
                status: string;
                amount: { currency_code: string; value: string };
            }>;
        };
    }>;
}> {
    const accessToken = await generateAccessToken();

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to capture PayPal order: ${error}`);
    }

    return response.json();
}

/**
 * Get PayPal order details
 */
export async function getPayPalOrderDetails(orderId: string): Promise<PayPalOrder> {
    const accessToken = await generateAccessToken();

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to get PayPal order: ${error}`);
    }

    return response.json();
}

export { PAYPAL_CLIENT_ID, PLATFORM_FEE_PERCENT };
