'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { games, gameScenarios } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Lightbulb, Loader2, Trophy, RotateCcw, ChevronRight } from 'lucide-react';
import type { GameScenario, Action } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TitanLogo } from '@/components/shared/icons';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;
  
  const game = useMemo(() => games.find((g) => g.id === gameId), [gameId]);
  const scenario = useMemo(() => gameScenarios.find((s) => s.id === gameId), [gameId]);

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<{step: typeof scenario.steps[0], action: Action}[]>([]);

  const handleActionClick = (action: Action, index: number) => {
    if (selectedAction) return;

    setSelectedAction(action);
    setSelectedActionIndex(index);
    
    const currentStep = scenario!.steps[currentStepIndex];
    setHistory(prev => [...prev, { step: currentStep, action }]);

    setTimeout(() => {
      if (action.isCorrect) {
        const isLastStep = currentStepIndex === scenario!.steps.length - 1;
        if (isLastStep) {
          setIsFinished(true);
        } else {
          setCurrentStepIndex(prev => prev + 1);
          setSelectedAction(null);
          setSelectedActionIndex(null);
        }
      } else {
        // Incorrect action, allow user to try again
        setSelectedAction(null);
        setSelectedActionIndex(null);
      }
    }, 2500);
  };
  
  const handleRestart = () => {
      setHistory([]);
      setCurrentStepIndex(0);
      setSelectedAction(null);
      setSelectedActionIndex(null);
      setIsFinished(false);
  }
  
  if (!game || !scenario) {
    return <PageHeader title="Game not found" description="This troubleshooting game does not exist." />;
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
                Play Again
              </Button>
              <Button variant="outline" onClick={() => router.push('/games')}>
                Back to Mission Hub
              </Button>
            </div>
        </div>
    )
  }
  
  const currentStep = scenario.steps[currentStepIndex];

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
                    <p className="font-code text-sm animate-pulse">{h.action.feedback}</p>
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
                {currentStep.actions.map((action, index) => (
                    <Button
                        key={index}
                        variant={selectedActionIndex === index ? 'secondary' : 'outline'}
                        className={cn('w-full justify-start text-left h-auto whitespace-normal p-4', {
                            'border-green-500 bg-green-500/10 text-green-400': selectedActionIndex === index && selectedAction?.isCorrect,
                            'border-red-500 bg-red-500/10 text-red-400': selectedActionIndex === index && selectedAction && !selectedAction.isCorrect,
                            'cursor-wait': selectedActionIndex !== null
                        })}
                        onClick={() => handleActionClick(action, index)}
                        disabled={selectedActionIndex !== null}
                    >
                        {selectedActionIndex === index && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {action.text}
                    </Button>
                ))}
              </CardContent>
            </Card>
        )}

        {selectedAction && (
          <Alert variant={selectedAction.isCorrect ? 'default' : 'destructive'} className={cn("border-2", {
              'border-green-500 text-green-400': selectedAction.isCorrect,
              'border-red-500 text-red-400': !selectedAction.isCorrect,
          })}>
            {selectedAction.isCorrect ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <AlertTitle className="flex items-center gap-2">
              {selectedAction.isCorrect ? "Correct Action" : 'Ineffective Action'}
            </AlertTitle>
            <AlertDescription>
                {selectedAction.feedback}
            </AlertDescription>
          </Alert>
        )}
    </div>
  );
}
