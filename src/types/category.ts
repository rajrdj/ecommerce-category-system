// src/types/category.ts
export interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    parentId: string | null;
    level: number
}