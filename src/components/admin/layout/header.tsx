// src/components/admin/layout/header.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/admin" className="text-xl font-bold">
            Admin Dashboard
          </Link>
          <nav className="space-x-4">
            <Link href="/admin/categories">
              <Button variant="ghost">Categories</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}





