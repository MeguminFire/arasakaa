'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/shared/page-header';

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
    startGame();
  };
  
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, []);

  const getButtonContent = () => {
      switch(gameState) {
          case 'idle': return 'START_REFLEX_TEST';
          case 'waiting': return '...WAIT...';
          case 'active': return 'CLICK!';
          case 'result': return 'AGAIN';
      }
  }

  return (
    <div className="flex flex-col items-center justify-start space-y-4 p-2">
      <PageHeader title="Training Drill: Reflex Booster" description="Test your reaction time against the clock." />
      <Card className="border-accent/50 bg-card/80 shadow-[0_0_15px_hsl(var(--accent)/0.3)] w-full max-w-xs h-[300px] flex flex-col p-2">
          <CardHeader className="p-2">
              <CardTitle className="font-code text-accent text-base">[EXECUTE_DRILL_02]</CardTitle>
          </CardHeader>
          <CardContent className="p-2 flex flex-col items-center justify-center space-y-2 flex-grow">
              <Button 
                  onClick={handleClick}
                  className={cn('h-20 w-full text-lg font-bold transition-colors duration-100 font-code', {
                      'bg-primary hover:bg-primary/90': gameState === 'idle' || gameState === 'result',
                      'bg-yellow-500 hover:bg-yellow-500/90 text-background': gameState === 'waiting',
                      'bg-red-600 hover:bg-red-600/90 text-destructive-foreground animate-pulse': gameState === 'active'
                  })}
              >
                  {getButtonContent()}
              </Button>
              <div className="text-center h-8 flex items-center justify-center">
                  {result !== null && (
                      <div className="animate-fade-in font-code text-xl">
                          {result === -1 ? (
                              <p className="text-red-400">TOO_SOON</p>
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
