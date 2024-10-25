// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import { Category } from '@/lib/db/models/category';
import { categorySchema } from '@/lib/utils/validation';
import { generateApiResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find()
      .sort({ displayOrder: 1, createdAt: -1 });
    return generateApiResponse(categories);
  } catch (error) {
    return generateApiResponse(null, 'Failed to fetch categories', 500);
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    const validation = categorySchema.safeParse(body);
    if (!validation.success) {
      return generateApiResponse(null, validation.error.message, 400);
    }
    
    const category = new Category(body);
    await category.save();
    
    return generateApiResponse(category, 'Category created successfully', 201);
  } catch (error) {
    return generateApiResponse(null, 'Failed to create category', 500);
  }
}

