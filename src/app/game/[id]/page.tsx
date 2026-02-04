// @ts-nocheck
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { games } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Lightbulb, Loader2, RotateCcw, Undo } from 'lucide-react';
import { getGameFeedback, getNewScenario } from '@/lib/actions';
import Leaderboard from '@/components/shared/leaderboard';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type Scenario = {
  scenario: string;
  steps: string[];
  solution: string;
};

type Feedback = {
  feedback: string;
  isCorrect: boolean;
};

export default function GamePage() {
  const params = useParams();
  const gameId = params.id as string;
  const game = useMemo(() => games.find((g) => g.id === gameId), [gameId]);

  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [shuffledSteps, setShuffledSteps] = useState<string[]>([]);
  const [userSteps, setUserSteps] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (game) {
      setIsLoading(true);
      getNewScenario({ topic: game.topic, difficulty: game.difficulty })
        .then((newScenario) => {
          setScenario(newScenario);
          // Shuffle the steps for the user to select from
          setShuffledSteps([...newScenario.steps].sort(() => Math.random() - 0.5));
          setFeedback(null);
          setUserSteps([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [game]);

  const handleStepSelect = (step: string) => {
    if (userSteps.includes(step)) return;
    setUserSteps((prev) => [...prev, step]);
  };
  
  const handleUndo = () => {
    setUserSteps(prev => prev.slice(0, -1));
  }

  const handleReset = () => {
    setUserSteps([]);
  };

  const handleSubmit = async () => {
    if (!scenario) return;
    setIsChecking(true);
    setFeedback(null);
    try {
      const result = await getGameFeedback({
        problemDescription: scenario.scenario,
        userSteps: userSteps,
        expectedSolution: scenario.solution,
      });
      setFeedback(result);
    } catch (error) {
      console.error('Error getting feedback:', error);
      setFeedback({
        feedback: 'An error occurred while checking your solution. Please try again.',
        isCorrect: false,
      });
    } finally {
      setIsChecking(false);
    }
  };

  if (!game) {
    return (
      <PageHeader
        title="Game not found"
        description="This troubleshooting game does not exist."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-semibold">Generating your scenario...</p>
        <p className="text-muted-foreground">The AI is crafting a unique challenge just for you.</p>
      </div>
    );
  }

  if (!scenario) {
    return (
      <PageHeader
        title="Error"
        description="Could not load the game scenario."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PageHeader title={game.title} description={game.description}>
            <Badge variant="outline" className="capitalize">{game.difficulty}</Badge>
        </PageHeader>
        
        <Card>
          <CardHeader>
            <CardTitle>The Situation</CardTitle>
            <CardDescription>{scenario.scenario}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Your Selected Steps</h3>
                <div className="p-4 bg-muted rounded-lg min-h-[150px] border">
                  {userSteps.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Select steps from the right panel in the correct order.</p>
                  ) : (
                    <ol className="list-decimal list-inside space-y-2">
                      {userSteps.map((step, index) => (
                        <li key={index} className="text-sm">{step}</li>
                      ))}
                    </ol>
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={handleUndo} disabled={userSteps.length === 0}>
                        <Undo className="mr-2 h-4 w-4" /> Undo
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleReset} disabled={userSteps.length === 0}>
                        <RotateCcw className="mr-2 h-4 w-4" /> Reset
                    </Button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Available Steps</h3>
                <div className="space-y-2">
                  {shuffledSteps.map((step) => (
                    <Button
                      key={step}
                      variant="outline"
                      className="w-full justify-start text-left h-auto"
                      onClick={() => handleStepSelect(step)}
                      disabled={userSteps.includes(step)}
                    >
                      {step}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} disabled={userSteps.length === 0 || isChecking}>
              {isChecking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isChecking ? 'Checking...' : 'Submit Solution'}
            </Button>
          </CardFooter>
        </Card>

        {feedback && (
          <Alert variant={feedback.isCorrect ? 'default' : 'destructive'} className="border-2">
            {feedback.isCorrect ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertTitle className="flex items-center gap-2">
              {feedback.isCorrect ? 'Correct Solution!' : 'Incorrect Solution'}
            </AlertTitle>
            <AlertDescription>{feedback.feedback}</AlertDescription>
            {!feedback.isCorrect && (
                <>
                <Separator className="my-3"/>
                <div className="flex items-start gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-yellow-500"/>
                  <div>
                    <h4 className="font-semibold">Correct Solution</h4>
                    <p className="text-muted-foreground">{scenario.solution}</p>
                  </div>
                </div>
                </>
            )}
          </Alert>
        )}
      </div>
      <div className="space-y-6">
        <Leaderboard />
      </div>
    </div>
  );
}
