'use client';

import Link from 'next/link';
import { useUser } from '@/context/UserProvider';
import { Loader2, AlertTriangle, GraduationCap, Gamepad2, MessagesSquare, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Leaderboard from '@/components/shared/leaderboard';

const navCards = [
  {
    href: '/learn',
    icon: GraduationCap,
    title: 'Learning Modules',
    description: 'Build foundational knowledge with lessons on hardware, software, and networking.'
  },
  {
    href: '/games',
    icon: Gamepad2,
    title: 'Training Hub',
    description: 'Sharpen your skills with tactical drills and real-world troubleshooting scenarios.'
  },
  {
    href: '/forum',
    icon: MessagesSquare,
    title: 'Community Forum',
    description: 'Connect with other technicians, ask questions, and share solutions.'
  }
]

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
    <div className="relative flex min-h-full flex-col items-center justify-start space-y-4 py-4 animate-fade-in">
      <div className="absolute inset-0 bg-grid-pattern-red opacity-30 -z-10"></div>
      
      {isGuest && (
        <Alert variant="destructive" className="w-full max-w-4xl border-2 border-destructive bg-destructive/10 backdrop-blur-sm p-2 flex items-center max-h-[60px]">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div className='ml-4'>
                <AlertTitle className="text-lg font-headline animate-hacker-glitch">
                    WARNING: UNAUTHORIZED ACCESS DETECTED
                </AlertTitle>
                <AlertDescription className="text-destructive-foreground/80 text-xs">
                    You are viewing this terminal as a guest. Full functionality is restricted.
                </AlertDescription>
            </div>
        </Alert>
      )}

      <div className="text-center w-full max-w-4xl">
        <h1 className="font-headline text-3xl font-bold">Welcome to Arasaka</h1>
        <p className="text-muted-foreground text-sm">
          Your journey begins here. Choose your path.
        </p>
      </div>

       <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
        {navCards.map((card) => (
          <Link href={card.href} key={card.href} className="block h-full">
            <Card className="h-full flex flex-col justify-between transition-colors hover:border-primary/80">
                <CardHeader>
                  <card.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <p className="text-sm font-bold text-primary flex items-center">
                        Engage <ArrowRight className="ml-2 h-4 w-4"/>
                    </p>
                </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="w-full max-w-4xl mt-4">
        <Leaderboard />
      </div>

    </div>
  );
}
