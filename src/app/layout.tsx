'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Gamepad2,
  MessagesSquare,
  Trophy,
  Users,
  Wrench,
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import UserAvatar from '@/components/shared/UserAvatar';
import { UserProvider, useUser } from '@/context/UserProvider';
import { cn } from '@/lib/utils';
import { FirebaseProvider } from '@/firebase/FirebaseProvider';
import DataRain from '@/components/shared/DataRain';
import React from 'react';

const baseNavItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/games', icon: Gamepad2, label: 'Games' },
  { href: '/troubleshooting', icon: Wrench, label: 'Troubleshoot' },
  { href: '/forum', icon: MessagesSquare, label: 'Forum' },
  { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
];

const adminNavItem = { href: '/users', icon: Users, label: 'Users' };

const NavLink = ({ item }: { item: typeof baseNavItems[0] }) => {
  const pathname = usePathname();
  // Directly calculate isActive during render to prevent hydration mismatch.
  const isActive =
    (item.href !== '/dashboard' && pathname.startsWith(item.href)) ||
    pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        'flex h-10 flex-col items-center justify-center gap-1 rounded-md px-3 py-1 text-muted-foreground transition-colors hover:text-primary',
        isActive && 'text-primary'
      )}
    >
      <div className="h-5 w-5 flex items-center justify-center">
        <item.icon size={20} />
      </div>
      <span className="text-xs font-headline tracking-wider">{item.label}</span>
    </Link>
  );
};

function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { authUser } = useUser();
    const isAuthPage = pathname === '/login' || pathname === '/signup';
    const showAppShell = !isAuthPage;
  
    const ADMIN_EMAILS = ['gmorecj22@gmail.com'];
    const isAdmin = authUser?.email && ADMIN_EMAILS.includes(authUser.email);
    const navItems = isAdmin ? [...baseNavItems, adminNavItem] : baseNavItems;
  
    if (!showAppShell) {
        return <>{children}</>;
    }
  
    return (
      <div className="flex flex-col h-screen">
      <header className="flex-shrink-0 sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
          <Link href="/dashboard" className="flex items-center gap-3">
              <Image src="/arasaka.png" alt="Arasaka Logo" width={36} height={36} className="h-9 w-auto" />
              <span className="hidden sm:block font-logo text-xl text-white tracking-widest">ARASAKA</span>
          </Link>
          <div className="sm:hidden">
            <UserAvatar />
          </div>
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
      <footer className="flex-shrink-0 sticky bottom-0 z-50 border-t bg-background/90">
          <div className="relative flex h-16 items-center justify-center px-4">
              <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                  {navItems.map((item) => (
                      <NavLink key={item.href} item={item} />
                  ))}
              </nav>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:block">
                  <UserAvatar />
              </div>
          </div>
      </footer>
      </div>
    );
  }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <AppShell>{children}</AppShell>
          </UserProvider>
        </FirebaseProvider>
        <Toaster />
      </body>
    </html>
  );
}
