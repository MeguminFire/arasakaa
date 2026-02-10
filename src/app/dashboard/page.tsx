'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '@/context/UserProvider';
import { Loader2, AlertTriangle, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// --- Re-integrated Components ---

// Image Fallback Component (from 4-pics-1-word)
const ImageWithFallback = ({ src, alt, className, ...props }: {src: string, alt: string, className?: string } & any) => {
    const [error, setError] = useState(false);
    
    const handleError = () => {
        setError(true);
    };

    return error ? (
        <div className={cn("bg-muted flex items-center justify-center text-muted-foreground/50 font-code text-xs rounded-sm", className)}>
            IMG_PENDING
        </div>
    ) : (
        <Image
            src={src}
            alt={alt}
            onError={handleError}
            width={64}
            height={64}
            className={className}
            {...props}
        />
    );
};


// 4 Pics 1 Word Game Component
const FourPicsOneWordGame = () => {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const answer = 'HACK';

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.toUpperCase() === answer) {
      setFeedback('CONNECTION_ESTABLISHED');
      setIsCorrect(true);
    } else {
      setFeedback('Incorrect. Try again, netrunner.');
      setIsCorrect(false);
    }
  };
  
  return (
    <Card className="border-primary/50 bg-card/80 shadow-[0_0_15px_hsl(var(--primary)/0.3)] w-full max-w-xs h-full flex flex-col">
        <CardHeader className="p-2">
            <CardTitle className="font-code text-primary text-base">[ANALYZE_DATA_STREAM_01]</CardTitle>
            <CardDescription className="text-xs">4 Pics, 1 Word. Decrypt.</CardDescription>
        </CardHeader>
        <CardContent className="p-2 space-y-2 flex-grow flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-2">
                <ImageWithFallback src="/hack1.png" alt="Hack Pic 1" className={cn("rounded-sm w-16 h-16 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                <ImageWithFallback src="/hack2.png" alt="Hack Pic 2" className={cn("rounded-sm w-16 h-16 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                <ImageWithFallback src="/hack3.png" alt="Hack Pic 3" className={cn("rounded-sm w-16 h-16 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                <ImageWithFallback src="/hack4.png" alt="Hack Pic 4" className={cn("rounded-sm w-16 h-16 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
            </div>
            <form onSubmit={handleGuessSubmit} className="flex gap-2 mt-auto">
            <Input 
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Answer..."
                className="font-code text-xs h-8"
                disabled={isCorrect}
            />
            <Button type="submit" size="sm" className="h-8" disabled={isCorrect}>
                <Send className="h-4 w-4" />
            </Button>
            </form>
            {feedback && (
            <p className={cn('text-xs font-code h-4', isCorrect ? 'text-green-400' : 'text-red-400')}>
                {feedback}
            </p>
            )}
        </CardContent>
    </Card>
  );
}

// Reflex Booster Game Component
const ReflexBoosterGame = () => {
    const [gameState, setGameState] = useState<'idle' | 'waiting' | 'active' | 'result'>('idle');
    const [result, setResult] = useState<number | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number | null>(null);
  
    const startGame = useCallback(() => {
      setGameState('waiting');
      setResult(null);
      const delay = Math.random() * 2000 + 1000; // 1-3 second delay
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
                return 'Start';
            case 'waiting':
                return 'Wait...';
            case 'active':
                return 'CLICK!';
            case 'result':
                return 'Again';
        }
    }
  
    return (
        <Card className="border-accent/50 bg-card/80 shadow-[0_0_15px_hsl(var(--accent)/0.3)] w-full max-w-xs h-full flex flex-col">
            <CardHeader className="p-2">
                <CardTitle className="font-code text-accent text-base">[EXECUTE_DRILL_02]</CardTitle>
                <CardDescription className="text-xs">Reflex Booster. Don't flinch.</CardDescription>
            </CardHeader>
            <CardContent className="p-2 flex-grow flex flex-col items-center justify-center space-y-2">
                <Button 
                    onClick={handleClick}
                    className={cn('h-20 w-full text-lg font-bold transition-colors duration-100', {
                        'bg-primary hover:bg-primary/90': gameState === 'idle' || gameState === 'result',
                        'bg-yellow-500 hover:bg-yellow-500/90 text-background': gameState === 'waiting',
                        'bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-pulse': gameState === 'active'
                    })}
                >
                    {getButtonContent()}
                </Button>
                <div className="text-center h-8 flex items-center justify-center">
                    {result !== null && (
                        <div className="animate-fade-in font-code text-xl">
                            {result === -1 ? (
                                <p className="text-red-400">Too soon!</p>
                            ) : (
                                <p className="text-accent">{result}ms</p>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

// --- Main Dashboard Page ---
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

       <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
        <FourPicsOneWordGame />
        <ReflexBoosterGame />
      </div>

    </div>
  );
}
