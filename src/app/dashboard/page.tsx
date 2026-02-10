'use client';

import { useUser } from '@/context/UserProvider';
import { Loader2, AlertTriangle, GraduationCap, Gamepad2, MessagesSquare, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Leaderboard from '@/components/shared/leaderboard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navigationCards = [
    {
      title: 'Learning Modules',
      description: 'Build your foundational knowledge.',
      href: '/learn',
      icon: GraduationCap,
    },
    {
      title: 'Training Hub',
      description: 'Sharpen your skills with scenarios.',
      href: '/games',
      icon: Gamepad2,
    },
    {
      title: 'Community Forum',
      description: 'Connect with other operatives.',
      href: '/forum',
      icon: MessagesSquare,
    },
  ];

// --- Main Dashboard Page ---
export default function DashboardPage() {
  const { authUser, loading } = useUser();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const isGuest = !authUser;

  return (
    <div className="relative flex min-h-full flex-col items-center justify-start space-y-4 p-2 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-red opacity-30 -z-10"></div>
      
      {isGuest && (
        <Alert variant="destructive" className="w-full max-w-4xl border-2 border-destructive bg-destructive/10 backdrop-blur-sm p-2 flex items-center max-h-[60px]">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div className='ml-4'>
                <AlertTitle className="text-lg font-headline animate-hacker-glitch">
                    UNAUTHORIZED ACCESS
                </AlertTitle>
                <AlertDescription className="text-destructive-foreground/80 text-xs">
                    Guest functionality is restricted.
                </AlertDescription>
            </div>
        </Alert>
      )}

      <div className="text-center w-full max-w-4xl">
        <h1 className="font-headline text-3xl font-bold">Welcome to Arasaka</h1>
        <p className="text-muted-foreground text-sm">
          Your training begins now.
        </p>
      </div>

       <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
        {navigationCards.map((card) => (
          <Card
            key={card.title}
            className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg bg-card/80 border-primary/50"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <card.icon className="h-8 w-8 text-primary mb-3" />
              </div>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={card.href}>
                  Engage <ArrowRight className="ml-2 h-4 w-4" />
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
