// src/app/page.tsx
import Link from 'next/link';
//import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">E-commerce Admin Dashboard</h1>
      <div className="grid gap-4">
        <Link href="/admin/categories">
          <Button>Manage Categories</Button>
        </Link>
      </div>
    </div>
  );
}