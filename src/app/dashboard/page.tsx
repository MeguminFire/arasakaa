'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '@/context/UserProvider';
import {
  Loader2,
  AlertTriangle,
  Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

// Custom Image with Fallback Component
const ImageWithFallback = ({ src, alt, ...props }: {src: string, alt: string} & any) => {
    const [error, setError] = useState(false);
    
    const handleError = () => {
        setError(true);
    };

    return error ? (
        <div className="w-full h-full bg-muted/20 flex items-center justify-center text-muted-foreground font-code text-xs rounded-sm">
            [IMG_PENDING]
        </div>
    ) : (
        <Image
            src={src}
            alt={alt}
            onError={handleError}
            {...props}
        />
    );
};

// New Component for 4 Pics 1 Word
const FourPicsOneWordGame = () => {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const answer = 'CODE';

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.toUpperCase() === answer) {
      setFeedback('Correct! You cracked the mainframe.');
      setIsCorrect(true);
    } else {
      setFeedback('Incorrect. Try again, netrunner.');
      setIsCorrect(false);
    }
  };
  
  return (
    <Card className="border-primary/50 bg-card/80 shadow-[0_0_15px_hsl(var(--primary)/0.3)] max-w-sm mx-auto">
      <CardHeader className="p-4">
        <CardTitle className="font-code text-primary text-lg">[ANALYZE_DATA_STREAM_01]</CardTitle>
        <CardDescription className="text-sm">4 Pics, 1 Word. Decrypt the connection.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
            <ImageWithFallback src="https://placehold.co/150/333/666?text=SIGNAL" alt="Code Pic 1" width={150} height={150} className="rounded-sm w-full h-auto aspect-square object-cover" />
            <ImageWithFallback src="https://placehold.co/150/333/666?text=RELAY" alt="Code Pic 2" width={150} height={150} className="rounded-sm w-full h-auto aspect-square object-cover" />
            <ImageWithFallback src="https://placehold.co/150/333/666?text=NODE" alt="Code Pic 3" width={150} height={150} className="rounded-sm w-full h-auto aspect-square object-cover" />
            <ImageWithFallback src="https://placehold.co/150/333/666?text=QUERY" alt="Code Pic 4" width={150} height={150} className="rounded-sm w-full h-auto aspect-square object-cover" />
        </div>
        <form onSubmit={handleGuessSubmit} className="flex gap-2">
          <Input 
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Your Answer..."
            className="font-code text-sm"
            disabled={isCorrect}
          />
          <Button type="submit" size="sm" disabled={isCorrect}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        {feedback && (
          <p className={cn('text-xs font-code', isCorrect ? 'text-green-400' : 'text-red-400')}>
            {feedback}
          </p>
        )}
      </CardContent>
    </Card>
  );
};


// New Component for Reflex Booster
const ReflexBoosterGame = () => {
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'active' | 'result'>('idle');
  const [result, setResult] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startGame = useCallback(() => {
    setGameState('waiting');
    setResult(null);
    const delay = Math.random() * 3000 + 1000; // 1-4 second delay
    timerRef.current = setTimeout(() => {
      setGameState('active');
      startTimeRef.current = Date.now();
    }, delay);
  }, []);

  const handleClick = () => {
    if (gameState === 'waiting') {
      if (timerRef.current) clearTimeout(timerRef.current);
      setResult(-1); // Too soon
      setGameState('result');
      return;
    }
    if (gameState === 'active') {
      if(startTimeRef.current) {
        setResult(Date.now() - startTimeRef.current);
      }
      setGameState('result');
      return;
    }
    // if 'idle' or 'result', start the game
    startGame();
  };
  
  useEffect(() => {
    // Cleanup timeout on component unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, []);

  const getButtonContent = () => {
      switch(gameState) {
          case 'idle':
              return 'Start Reflex Test';
          case 'waiting':
              return 'Wait for Red...';
          case 'active':
              return 'CLICK NOW!';
          case 'result':
              return 'Try Again';
      }
  }

  return (
     <Card className="border-accent/50 bg-card/80 shadow-[0_0_15px_hsl(var(--accent)/0.3)] max-w-sm mx-auto">
      <CardHeader className="p-4">
        <CardTitle className="font-code text-accent text-lg">[EXECUTE_GAME_02]</CardTitle>
        <CardDescription className="text-sm">Reflex Booster. Don't flinch.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex flex-col items-center justify-center space-y-4 min-h-[268px]">
        <Button 
            onClick={handleClick}
            className={cn('h-16 w-full text-base font-bold transition-colors duration-100', {
                'bg-primary hover:bg-primary/90': gameState === 'idle' || gameState === 'result',
                'bg-yellow-500 hover:bg-yellow-500/90 text-background': gameState === 'waiting',
                'bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-pulse': gameState === 'active'
            })}
        >
            {getButtonContent()}
        </Button>
        <div className="text-center h-8">
            {result !== null && (
                <div className="animate-fade-in font-code">
                    {result === -1 ? (
                        <p className="text-red-400 text-sm">Too soon!</p>
                    ) : (
                        <p className="text-xl text-accent">{result}ms</p>
                    )}
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
};


export default function DashboardPage() {
  const { userProfile, authUser, loading } = useUser();

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
          Choose your challenge.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <FourPicsOneWordGame />
        <ReflexBoosterGame />
      </div>
    </div>
  );
}
