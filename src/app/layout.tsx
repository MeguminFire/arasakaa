import type { Metadata } from 'next';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Gamepad2,
  BookOpen,
  GraduationCap,
  MessagesSquare,
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { TitanLogo } from '@/components/shared/icons';
import './globals.css';
import { UserProvider } from '@/context/UserContext';
import UserAvatar from '@/components/shared/UserAvatar';
import FirebaseClientProvider from '@/firebase/client-provider';


export const metadata: Metadata = {
  title: 'Glitch Guild',
  description: 'Games and quizzes about computer troubleshooting.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@400;600&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased dark">
        <FirebaseClientProvider>
          <UserProvider>
            <SidebarProvider>
              <Sidebar>
                <SidebarHeader>
                  <div className="flex items-center gap-2">
                    <TitanLogo className="size-8 text-primary" />
                    <span className="text-xl font-headline">
                      Glitch Guild
                    </span>
                  </div>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        href="/"
                        asChild
                        tooltip="Dashboard"
                      >
                        <Link href="/">
                          <LayoutDashboard />
                          <span>Dashboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        href="/learn"
                        asChild
                        tooltip="Learn"
                      >
                        <Link href="/learn">
                          <GraduationCap />
                          <span>Learn</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        href="/games"
                        asChild
                        tooltip="Games"
                      >
                        <Link href="/games">
                          <Gamepad2 />
                          <span>Games</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        href="/quizzes"
                        asChild
                        tooltip="Quizzes"
                      >
                        <Link href="/quizzes">
                          <BookOpen />
                          <span>Quizzes</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        href="/forum"
                        asChild
                        tooltip="Guild Hall"
                      >
                        <Link href="/forum">
                          <MessagesSquare />
                          <span>Guild Hall</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                  <UserAvatar />
                </SidebarFooter>
              </Sidebar>
              <SidebarInset className="flex flex-col">
                <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm">
                  <SidebarTrigger className="md:hidden" />
                  <Link href="/" className="flex items-center gap-2 md:hidden">
                    <TitanLogo className="size-8 text-primary" />
                    <span className="text-xl font-headline">
                      Glitch Guild
                    </span>
                  </Link>
                </header>
                <main className="flex-1 p-4 md:p-6">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </UserProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
