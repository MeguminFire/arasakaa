'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Gamepad2,
  MessagesSquare,
  Trophy,
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import UserAvatar from '@/components/shared/UserAvatar';
import { UserProvider } from '@/context/UserProvider';
import { cn } from '@/lib/utils';
import { FirebaseProvider } from '@/firebase/FirebaseProvider';
import DataRain from '@/components/shared/DataRain';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/games', icon: Gamepad2, label: 'Games' },
  { href: '/forum', icon: MessagesSquare, label: 'Forum' },
  { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const showAppShell = !isAuthPage;

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
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Share+Tech+Mono&family=Michroma&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased dark text-sm">
        <DataRain />
        <div className="flicker-overlay" />
        <FirebaseProvider>
          <UserProvider>
            {showAppShell ? (
                <div className="flex flex-col h-screen">
                <header className="flex-shrink-0 sticky top-0 z-40 flex h-12 items-center justify-center border-b bg-background/80 px-4 backdrop-blur-sm">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Image src="/arasaka.png" alt="Arasaka Logo" width={28} height={28} className="h-7 w-auto" />
                        <span className="font-logo text-lg text-white tracking-widest">ARASAKA</span>
                    </Link>
                </header>
                <main className="flex-1 p-2 overflow-y-auto">{children}</main>
                    <footer className="relative flex-shrink-0 border-t bg-background/90">
                    <nav className="flex h-12 items-center justify-center gap-4 px-4">
                        {navItems.map((item) => (
                        <Link
                            href={item.href}
                            key={item.href}
                            className={cn(
                            'flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary',
                            isClient && ((pathname.startsWith(item.href) && item.href !== '/') || pathname === item.href) ? 'text-primary' : ''
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            <span className="text-xs font-headline tracking-wider">{item.label}</span>
                        </Link>
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
