// src/app/layout.tsx
//import './globals.css';
import { Inter } from 'next/font/google';
//import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-commerce Admin',
  description: 'E-commerce admin dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}

