// @ts-nocheck
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { games } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Lightbulb, Loader2, Trophy, RotateCcw, ChevronRight } from 'lucide-react';
import { getNewInteractiveScenario } from '@/lib/actions';
import type { InteractiveScenarioOutput, GameStep, Action, Result } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TitanLogo } from '@/components/shared/icons';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;
  const game = useMemo(() => games.find((g) => g.id === gameId), [gameId]);

  const [scenario, setScenario] = useState<InteractiveScenarioOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<Result | null>(null);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<{step: GameStep, action: Action, result: Result}[]>([]);

  const fetchNewScenario = useCallback(() => {
    if (game) {
      setIsLoading(true);
      setScenario(null);
      setHistory([]);
      getNewInteractiveScenario({ topic: game.topic, difficulty: game.difficulty })
        .then((newScenario) => {
          setScenario(newScenario);
          setCurrentStepId(newScenario.startStepId);
          setLastResult(null);
          setSelectedActionId(null);
          setIsFinished(false);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [game]);

  useEffect(() => {
    fetchNewScenario();
  }, [fetchNewScenario]);

  const handleActionClick = (action: Action) => {
    if (!scenario || selectedActionId) return;

    setSelectedActionId(action.id);
    const currentStep = scenario.steps[currentStepId!];
    const result = currentStep.results[action.id];
    setLastResult(result);
    setHistory(prev => [...prev, { step: currentStep, action, result }]);

    setTimeout(() => {
        setSelectedActionId(null);
        if (result.isSolution) {
            setIsFinished(true);
        } else {
            setCurrentStepId(result.nextStepId || currentStepId);
        }
    }, 2500); // Wait 2.5 seconds to show feedback before moving to next step
  };
  
  const handleRestart = () => {
     fetchNewScenario();
  }
  
  if (!game) {
    return <PageHeader title="Game not found" description="This troubleshooting game does not exist." />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-semibold">Generating Your Mission...</p>
        <p className="text-muted-foreground">The AI is crafting a unique, interactive scenario for you.</p>
      </div>
    );
  }

  if (!scenario || !currentStepId) {
    return <PageHeader title="Error" description="Could not load the game scenario. Please try again." />;
  }
  
  if (isFinished) {
    return (
         <div className="text-center max-w-3xl mx-auto space-y-6">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto" />
            <h1 className="text-3xl font-bold font-headline">Mission Complete, Titan!</h1>
            <p className="text-xl text-muted-foreground">
              Excellent work. You've resolved the issue and restored order.
            </p>
            <Card className="text-left bg-card/80">
                <CardHeader>
                    <CardTitle>Debrief: Optimal Solution</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{scenario.finalSolution}</p>
                </CardContent>
            </Card>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart}>
                <RotateCcw className="mr-2 h-4 w-4" />
                New Mission
              </Button>
              <Button variant="outline" onClick={() => router.push('/games')}>
                Back to Mission Hub
              </Button>
            </div>
        </div>
    )
  }
  
  const currentStep = scenario.steps[currentStepId];

  return (
    <div className="space-y-6">
       <PageHeader title={scenario.title} description={`Mission: Resolve a "${game.title}" scenario.`}>
           <Badge variant="outline" className="capitalize border-accent text-accent">{game.difficulty}</Badge>
       </PageHeader>
        
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Incoming Transmission</CardTitle>
            <CardDescription>{scenario.initialSituation}</CardDescription>
          </CardHeader>
        </Card>

        {history.map((h, index) => (
            <div key={index} className="space-y-4 animate-fade-in">
                <Card className="border-primary/50">
                     <CardHeader>
                        <CardTitle className="text-lg">{h.step.title}</CardTitle>
                        <CardDescription>{h.step.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <p className="text-sm text-muted-foreground italic">Your action: "{h.action.text}"</p>
                    </CardFooter>
                </Card>
                 <div className="flex items-center gap-4 text-accent">
                    <ChevronRight className="h-6 w-6" />
                    <p className="font-code text-sm animate-pulse">{h.result.text}</p>
                </div>
            </div>
        ))}
        
        {!isFinished && (
            <Card className="animate-fade-in border-accent/50">
              <CardHeader>
                <CardTitle>{currentStep.title}</CardTitle>
                <CardDescription>{currentStep.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-bold text-primary">Choose your next action:</p>
                {currentStep.actions.map((action) => (
                    <Button
                        key={action.id}
                        variant={selectedActionId === action.id ? 'secondary' : 'outline'}
                        className={cn('w-full justify-start text-left h-auto whitespace-normal p-4', {
                            'border-green-500 bg-green-500/10 text-green-400': selectedActionId === action.id && lastResult?.isCorrectPath,
                            'border-red-500 bg-red-500/10 text-red-400': selectedActionId === action.id && !lastResult?.isCorrectPath,
                            'cursor-wait': selectedActionId
                        })}
                        onClick={() => handleActionClick(action)}
                        disabled={!!selectedActionId}
                    >
                        {selectedActionId === action.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {action.text}
                    </Button>
                ))}
              </CardContent>
            </Card>
        )}

        {selectedActionId && lastResult && (
          <Alert variant={lastResult.isCorrectPath ? 'default' : 'destructive'} className={cn("border-2", {
              'border-green-500 text-green-400': lastResult.isCorrectPath,
              'border-red-500 text-red-400': !lastResult.isCorrectPath,
          })}>
            {lastResult.isCorrectPath ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <AlertTitle className="flex items-center gap-2">
              {lastResult.isCorrectPath ? "Good Call" : 'Ineffective Action'}
            </AlertTitle>
            <AlertDescription>
                {lastResult.text}
            </AlertDescription>
          </Alert>
        )}
    </div>
  );
}
