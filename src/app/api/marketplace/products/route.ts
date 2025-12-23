import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/marketplace/products - List products with filters
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const category = searchParams.get('category');
        const model = searchParams.get('model');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const minRating = searchParams.get('minRating');
        const sortBy = searchParams.get('sortBy') || 'popular';
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const featured = searchParams.get('featured') === 'true';

        // Build where clause
        const where: Record<string, unknown> = {
            isActive: true,
        };

        if (category) {
            where.category = category;
        }

        if (model) {
            where.modelType = model;
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) (where.price as Record<string, number>).gte = parseFloat(minPrice);
            if (maxPrice) (where.price as Record<string, number>).lte = parseFloat(maxPrice);
        }

        if (minRating) {
            where.rating = { gte: parseFloat(minRating) };
        }

        if (featured) {
            where.isFeatured = true;
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { tags: { has: search } },
            ];
        }

        // Build orderBy
        type OrderByValue = 'asc' | 'desc';
        let orderBy: Record<string, OrderByValue> = { salesCount: 'desc' };
        switch (sortBy) {
            case 'newest':
                orderBy = { createdAt: 'desc' };
                break;
            case 'price-low':
                orderBy = { price: 'asc' };
                break;
            case 'price-high':
                orderBy = { price: 'desc' };
                break;
            case 'rating':
                orderBy = { rating: 'desc' };
                break;
            case 'popular':
            default:
                orderBy = { salesCount: 'desc' };
        }

        // Fetch products
        const [products, total] = await Promise.all([
            prisma.marketplaceProduct.findMany({
                where,
                orderBy,
                skip: (page - 1) * limit,
                take: limit,
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
            }),
            prisma.marketplaceProduct.count({ where }),
        ]);

        // Format response (hide full content)
        const formattedProducts = products.map((product) => ({
            id: product.id,
            title: product.title,
            slug: product.slug,
            description: product.description,
            previewContent: product.previewContent,
            price: product.price,
            currency: product.currency,
            category: product.category,
            modelType: product.modelType,
            tags: product.tags,
            thumbnailUrl: product.thumbnailUrl,
            salesCount: product.salesCount,
            viewCount: product.viewCount,
            rating: product.rating,
            reviewCount: product.reviewCount,
            isFeatured: product.isFeatured,
            createdAt: product.createdAt,
            seller: product.seller,
        }));

        return NextResponse.json({
            products: formattedProducts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST /api/marketplace/products - Create a new product listing
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            sellerId,
            title,
            description,
            content,
            previewContent,
            usageInstructions,
            price,
            currency = 'USD',
            category,
            modelType,
            tags = [],
            thumbnailUrl,
        } = body;

        // Validate required fields
        if (!sellerId || !title || !description || !content || !price || !category || !modelType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            + '-' + Date.now().toString(36);

        // Auto-generate preview if not provided
        const autoPreview = previewContent || content.split('\n').slice(0, 10).join('\n') + '\n...';

        // Create product
        const product = await prisma.marketplaceProduct.create({
            data: {
                sellerId,
                title,
                slug,
                description,
                content,
                previewContent: autoPreview,
                usageInstructions,
                price,
                currency,
                category,
                modelType,
                tags,
                thumbnailUrl,
            },
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
        });

        return NextResponse.json({ product }, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}
