// src/components/admin/layout/sidebar.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  LayoutGrid, 
  List,
  Settings,
  ShoppingBag,
  Users 
} from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 border-r h-screen">
      <nav className="p-4 space-y-2">
        <Link href="/admin">
          <Button variant="ghost" className="w-full justify-start">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/admin/categories">
          <Button variant="ghost" className="w-full justify-start">
            <List className="mr-2 h-4 w-4" />
            Categories
          </Button>
        </Link>
        <Link href="/admin/products">
          <Button variant="ghost" className="w-full justify-start">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Products
          </Button>
        </Link>
        <Link href="/admin/users">
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
        </Link>
        <Link href="/admin/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </nav>
    </aside>
  );
}