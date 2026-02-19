'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Gamepad2,
  MessagesSquare,
  Trophy,
  Loader2,
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import UserAvatar from '@/components/shared/UserAvatar';
import { UserProvider } from '@/context/UserProvider';
import { cn } from '@/lib/utils';
import { FirebaseProvider } from '@/firebase/FirebaseProvider';
import DataRain from '@/components/shared/DataRain';
import React, { useState, useEffect } from 'react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/games', icon: Gamepad2, label: 'Games' },
  { href: '/forum', icon: MessagesSquare, label: 'Forum' },
  { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
];

const NavLink = ({ item }: { item: typeof navItems[0] }) => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isActive = isClient && ((pathname.startsWith(item.href) && item.href !== '/') || pathname === item.href);

  return (
    <Link
      href={item.href}
      className={cn(
        'flex h-10 flex-col items-center justify-center gap-1 rounded-md px-3 py-1 text-muted-foreground transition-colors hover:text-primary',
        isActive ? 'text-primary' : ''
      )}
    >
      <item.icon className="h-5 w-5" />
      <span className="text-xs font-headline tracking-wider">{item.label}</span>
    </Link>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const showAppShell = !isAuthPage;

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Arasaka</title>
        <meta name="description" content="Games and quizzes about computer troubleshooting." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Share+Tech+Mono&family=Michroma&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased dark text-sm">
        <DataRain />
        <FirebaseProvider>
          <UserProvider>
            {showAppShell ? (
                <div className="flex flex-col h-screen">
                <header className="flex-shrink-0 sticky top-0 z-40 flex h-16 items-center justify-center border-b bg-background/80 px-4 backdrop-blur-sm">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <Image src="/arasaka.png" alt="Arasaka Logo" width={36} height={36} className="h-9 w-auto" />
                        <span className="font-logo text-xl text-white tracking-widest">ARASAKA</span>
                    </Link>
                </header>
                <main className="flex-1 p-2 overflow-y-auto">
                  {!isClient ? (
                     <div className="flex h-full w-full items-center justify-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                  ) : children}
                </main>
                    <footer className="relative flex-shrink-0 border-t bg-background/90">
                    <nav className="flex h-16 items-center justify-center gap-4 px-4">
                        {navItems.map((item) => (
                          <NavLink key={item.href} item={item} />
                        ))}
                    </nav>
                    <div className="absolute bottom-2 right-2">
                        <UserAvatar />
                    </div>
                </footer>
                </div>
            ) : (
                children
            )}
            </UserProvider>
        </FirebaseProvider>
        <Toaster />
      </body>
    </html>
  );
}
