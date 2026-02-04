'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { games, scenarios } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Lightbulb, Loader2, Trophy, RotateCcw, ChevronRight } from 'lucide-react';
import type { GameScenario, Action, GameStep } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@/context/UserContext';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const { addCompletedItem } = useUser();
  const gameId = params.id as string;
  
  const game = useMemo(() => games.find((g) => g.id === gameId), [gameId]);
  const scenario: GameScenario | undefined = useMemo(() => (scenarios as Record<string, GameScenario>)[gameId], [gameId]);

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<{step: GameStep, action: Action}[]>([]);
  const [showHint, setShowHint] = useState(false);
  
  useEffect(() => {
    if (isFinished && scenario) {
      addCompletedItem('game', gameId);
    }
  }, [isFinished, scenario, addCompletedItem, gameId]);

  const handleActionClick = (action: Action, index: number) => {
    if (selectedAction || !scenario) return;

    setSelectedAction(action);
    setSelectedActionIndex(index);
    
    const currentStep = scenario.steps[currentStepIndex];
    
    setTimeout(() => {
      if (action.isCorrect) {
        setHistory(prev => [...prev, { step: currentStep, action }]);
        const isLastStep = currentStepIndex === scenario.steps.length - 1;
        if (isLastStep) {
          setIsFinished(true);
        } else {
          setCurrentStepIndex(prev => prev + 1);
          setSelectedAction(null);
          setSelectedActionIndex(null);
          setShowHint(false);
        }
      } else {
        // Incorrect action, show feedback for 2.5s then let user try again.
        setTimeout(() => {
            setSelectedAction(null);
            setSelectedActionIndex(null);
        }, 2500);
      }
    }, 1500); // Shorter delay for a snappier feel
  };
  
  const handleRestart = () => {
      setHistory([]);
      setCurrentStepIndex(0);
      setSelectedAction(null);
      setSelectedActionIndex(null);
      setIsFinished(false);
      setShowHint(false);
  }
  
  if (!game || !scenario) {
    return <PageHeader title="Game not found" description="This troubleshooting game does not exist or has not been configured." />;
  }
  
  if (isFinished) {
    return (
         <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto" />
            <h1 className="text-3xl font-bold font-headline">Mission Complete, Titan!</h1>
            <p className="text-xl text-muted-foreground">
              Excellent work. You've resolved the issue and restored order.
            </p>
            <Card className="text-left bg-card/80">
                <CardHeader>
                    <CardTitle>Debrief: Optimal Solution Path</CardTitle>
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
           <div className='w-full md:w-64 space-y-2'>
                <div className="flex justify-between text-sm font-medium">
                    <span className="text-primary">Progress</span>
                    <span>Step {currentStepIndex + 1} of {scenario.steps.length}</span>
                </div>
                <Progress value={((currentStepIndex + 1) / scenario.steps.length) * 100} />
                <Badge variant="outline" className="capitalize border-accent text-accent">{game.difficulty}</Badge>
           </div>
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
                {currentStep.hint && (
                    <div className="flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => setShowHint(true)} disabled={showHint}>
                            <Lightbulb className="mr-2 h-4 w-4" />
                            Get a Hint
                        </Button>
                    </div>
                )}
                 {showHint && currentStep.hint && (
                    <Alert className="border-yellow-500/50 text-yellow-300">
                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                        <AlertTitle>Hint</AlertTitle>
                        <AlertDescription>{currentStep.hint}</AlertDescription>
                    </Alert>
                 )}
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

        {selectedAction && !selectedAction.isCorrect && (
          <Alert variant='destructive' className="border-2 animate-fade-in border-red-500 text-red-400">
            <XCircle className="h-4 w-4 text-red-500" />
            <AlertTitle className="flex items-center gap-2">Ineffective Action</AlertTitle>
            <AlertDescription>{selectedAction.feedback}</AlertDescription>
          </Alert>
        )}
    </div>
  );
}
