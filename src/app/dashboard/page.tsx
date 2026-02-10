'use client';

import { useUser } from '@/context/UserProvider';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Leaderboard from '@/components/shared/leaderboard';

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
    <div className="relative flex min-h-full flex-col items-center justify-start space-y-6 p-4 animate-fade-in">
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
        <h1 className="font-headline text-3xl font-bold">Welcome to the TACTICAL_TRAINING_OS, {userProfile?.name || 'Netrunner'}</h1>
        <p className="text-muted-foreground text-sm">
          Your journey begins here. Check your rank and choose your next challenge.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <Leaderboard />
      </div>

    </div>
  );
}
