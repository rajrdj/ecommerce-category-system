// src/app/api/categories/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import { Category } from '@/lib/db/models/category';
import { categorySchema } from '@/lib/utils/validation';
import { generateApiResponse } from '@/lib/utils/api-response';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const category = await Category.findById(params.id);
    if (!category) {
      return generateApiResponse(null, 'Category not found', 404);
    }
    return generateApiResponse(category);
  } catch (error) {
    return generateApiResponse(null, 'Failed to fetch category', 500);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await req.json();
    
    const validation = categorySchema.safeParse(body);
    if (!validation.success) {
      return generateApiResponse(null, validation.error.message, 400);
    }
    
    const category = await Category.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return generateApiResponse(null, 'Category not found', 404);
    }
    
    return generateApiResponse(category, 'Category updated successfully');
  } catch (error) {
    return generateApiResponse(null, 'Failed to update category', 500);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    // Check for child categories
    const hasChildren = await Category.exists({ parentId: params.id });
    if (hasChildren) {
      return generateApiResponse(
        null,
        'Cannot delete category with child categories',
        400
      );
    }
    
    const category = await Category.findByIdAndDelete(params.id);
    if (!category) {
      return generateApiResponse(null, 'Category not found', 404);
    }
    
    return generateApiResponse(null, 'Category deleted successfully');
  } catch (error) {
    return generateApiResponse(null, 'Failed to delete category', 500);
  }
}