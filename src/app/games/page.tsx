'use client';

import Link from 'next/link';
import { games } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Send } from 'lucide-react';
import { useUser } from '@/context/UserProvider';
import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
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

// Component for 4 Pics 1 Word
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
    <Card className="border-primary/50 bg-card/80 shadow-[0_0_15px_hsl(var(--primary)/0.3)] w-full">
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

// Component for Reflex Booster
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
     <Card className="border-accent/50 bg-card/80 shadow-[0_0_15px_hsl(var(--accent)/0.3)] w-full">
      <CardHeader className="p-4">
        <CardTitle className="font-code text-accent text-lg">[EXECUTE_GAME_02]</CardTitle>
        <CardDescription className="text-sm">Reflex Booster. Don't flinch.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex flex-col items-center justify-center space-y-4 min-h-[304px]">
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


export default function GamesPage() {
  const { userProfile } = useUser();
  const completedGames = userProfile?.completedGames || [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Training Hub"
        description="Sharpen your skills with tactical drills and real-world scenarios."
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-headline font-bold">Training Drills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FourPicsOneWordGame />
            <ReflexBoosterGame />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-headline font-bold">Troubleshooting Scenarios</h2>
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => {
            const isCompleted = completedGames.includes(game.id);
            return (
                <Card
                key={game.id}
                className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                >
                <CardHeader>
                    <div className="flex items-start justify-between">
                    <game.icon className="h-8 w-8 text-primary mb-3" />
                    <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className="capitalize">
                        {game.difficulty}
                        </Badge>
                        {isCompleted && (
                        <Badge variant="secondary" className="border-green-500 bg-green-500/10 text-green-400">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Completed
                        </Badge>
                        )}
                    </div>
                    </div>
                    <CardTitle className="text-xl">{game.title}</CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild className="w-full">
                    <Link href={`/game/${game.id}`}>
                        {isCompleted ? 'Play Again' : 'Play Game'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    </Button>
                </CardFooter>
                </Card>
            );
            })}
        </div>
      </div>
    </div>
  );
}
