'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Gamepad2,
  BookOpen,
  GraduationCap,
  MessagesSquare,
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import UserAvatar from '@/components/shared/UserAvatar';
import { UserProvider } from '@/context/UserProvider';
import { cn } from '@/lib/utils';
import { FirebaseProvider } from '@/firebase/FirebaseProvider';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/learn', icon: GraduationCap, label: 'Learn' },
  { href: '/games', icon: Gamepad2, label: 'Games' },
  { href: '/quizzes', icon: BookOpen, label: 'Quizzes' },
  { href: '/forum', icon: MessagesSquare, label: 'Forum' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) {
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
          <link href="https://fonts.googleapis.com/css2?family=Michroma&family=Orbitron:wght@400;700&family=Rajdhani:wght@400;600&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased dark">
          <FirebaseProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </FirebaseProvider>
          <Toaster />
        </body>
      </html>
    )
  }

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
        <link href="https://fonts.googleapis.com/css2?family=Michroma&family=Orbitron:wght@400;700&family=Rajdhani:wght@400;600&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased dark">
        <FirebaseProvider>
          <UserProvider>
            <div className="flex flex-col h-screen">
              <header className="flex-shrink-0 sticky top-0 z-40 flex h-16 items-center justify-center border-b bg-background/80 px-4 backdrop-blur-sm">
                  <Link href="/" className="flex items-center gap-3">
                      <Image src="/arasaka.png" alt="Arasaka Logo" width={32} height={32} className="h-8 w-auto" />
                      <span className="font-michroma text-xl text-white tracking-widest">ARASAKA</span>
                  </Link>
              </header>
              <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
               <footer className="relative flex-shrink-0 border-t bg-background/90">
                  <nav className="flex h-16 items-center justify-center gap-6 md:gap-12 px-4">
                    {navItems.map((item) => (
                      <Link
                        href={item.href}
                        key={item.href}
                        className={cn(
                          'flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary',
                          pathname === item.href ? 'text-primary' : ''
                        )}
                      >
                        <item.icon className="h-6 w-6" />
                        <span className="text-xs font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                  <div className="absolute bottom-3 right-4">
                    <UserAvatar />
                  </div>
              </footer>
            </div>
          </UserProvider>
        </FirebaseProvider>
        <Toaster />
      </body>
    </html>
  );
}
