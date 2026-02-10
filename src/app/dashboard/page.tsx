'use client';

import { useUser } from '@/context/UserProvider';
import { Loader2, AlertTriangle, GraduationCap, Gamepad2, MessagesSquare, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Leaderboard from '@/components/shared/leaderboard';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const dashboardNavItems = [
  {
    href: '/learn',
    icon: GraduationCap,
    title: 'Learning Modules',
    description: 'Build your foundational knowledge.'
  },
  {
    href: '/games',
    icon: Gamepad2,
    title: 'Training Hub',
    description: 'Sharpen your skills with drills and scenarios.'
  },
  {
    href: '/forum',
    icon: MessagesSquare,
    title: 'Community Forum',
    description: 'Connect with other operatives.'
  }
];

export default function DashboardPage() {
  const { authUser, userProfile, loading } = useUser();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const isGuest = !authUser;

  return (
    <div className="relative flex min-h-full flex-col items-center justify-start space-y-8 p-4 animate-fade-in">
      <div className="absolute inset-0 bg-grid-pattern-red opacity-30 -z-10"></div>
      
      {isGuest && (
        <Alert variant="destructive" className="w-full max-w-4xl border-2 border-destructive bg-destructive/10 backdrop-blur-sm p-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertTitle className="text-xl font-headline animate-hacker-glitch">
                WARNING: UNAUTHORIZED ACCESS DETECTED
            </AlertTitle>
            <AlertDescription className="text-destructive-foreground/80 text-sm">
                You are viewing this terminal as a guest. Full functionality is restricted.
            </AlertDescription>
        </Alert>
      )}

      <div className="text-center w-full max-w-4xl">
        <h1 className="font-headline text-3xl font-bold">Welcome to Arasaka, {userProfile?.name || 'Netrunner'}</h1>
        <p className="text-muted-foreground text-sm">
          Your journey begins here. Choose your path.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardNavItems.map((item) => (
          <Card key={item.href} className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg bg-card/80 hover:border-primary/50">
            <CardHeader>
              <item.icon className="h-8 w-8 text-primary mb-3" />
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={item.href}>
                  Go to {item.title} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="w-full max-w-4xl">
        <Leaderboard />
      </div>

    </div>
  );
}
