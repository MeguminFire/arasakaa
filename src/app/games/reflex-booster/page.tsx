'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ReflexBoosterPage() {
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
    <div className="space-y-8 flex flex-col items-center">
        <PageHeader title="Training Drill: Reflex Booster" description="Calibrate your response time. Don't flinch." />
        <Card className="border-accent/50 bg-card/80 shadow-[0_0_15px_hsl(var(--accent)/0.3)] w-full max-w-md">
            <CardHeader className="p-4">
                <CardTitle className="font-code text-accent text-lg">[EXECUTE_DRILL_02]</CardTitle>
                <CardDescription className="text-sm">Reflex Booster. Don't flinch.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex flex-col items-center justify-center space-y-4 min-h-[250px]">
                <Button 
                    onClick={handleClick}
                    className={cn('h-24 w-full text-xl font-bold transition-colors duration-100', {
                        'bg-primary hover:bg-primary/90': gameState === 'idle' || gameState === 'result',
                        'bg-yellow-500 hover:bg-yellow-500/90 text-background': gameState === 'waiting',
                        'bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-pulse': gameState === 'active'
                    })}
                >
                    {getButtonContent()}
                </Button>
                <div className="text-center h-10">
                    {result !== null && (
                        <div className="animate-fade-in font-code text-2xl">
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
    </div>
  );
};
