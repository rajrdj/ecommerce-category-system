// src/app/admin/categories/[id]/page.tsx
import { CategoryForm } from '@/components/admin/categories/category-form';
import { AdminLayout } from '@/components/admin/layout/layout';

export const metadata = {
  title: 'Edit Category - Admin Dashboard',
  description: 'Edit e-commerce category',
};

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <CategoryForm categoryId={params.id} />
      </div>
    </AdminLayout>
  );
}