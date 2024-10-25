// src/app/admin/categories/page.tsx
import { CategoryManager } from '@/components/admin/categories/category-list';
import { AdminLayout } from '@/components/admin/layout/layout';

export const metadata = {
  title: 'Category Management - Admin Dashboard',
  description: 'Manage your e-commerce categories',
};

export default function CategoriesPage() {
  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <CategoryManager />
      </div>
    </AdminLayout>
  );
}

