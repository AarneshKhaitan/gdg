'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/ui/sidebar';
import { AppProvider } from '@/context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
          <div className="flex h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-1 overflow-auto p-4">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}