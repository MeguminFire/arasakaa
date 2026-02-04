// @ts-nocheck
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { games } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Lightbulb, Loader2, Trophy, RotateCcw } from 'lucide-react';
import { getNewScenario } from '@/lib/actions';
import Leaderboard from '@/components/shared/leaderboard';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type TroubleshootingStep = {
  stepTitle: string;
  correctStep: string;
  incorrectOptions: string[];
};

type Scenario = {
  scenario: string;
  steps: TroubleshootingStep[];
  solution: string;
};

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;
  const game = useMemo(() => games.find((g) => g.id === gameId), [gameId]);

  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{isCorrect: boolean} | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const fetchNewScenario = () => {
    if (game) {
      setIsLoading(true);
      getNewScenario({ topic: game.topic, difficulty: game.difficulty, seed: Date.now().toString() })
        .then((newScenario) => {
          setScenario(newScenario);
          setCurrentStepIndex(0);
          setSelectedOption(null);
          setFeedback(null);
          setIsFinished(false);
        })
        .finally(() => setIsLoading(false));
    }
  }

  useEffect(() => {
    fetchNewScenario();
  }, [game]);

  useEffect(() => {
    if (scenario && scenario.steps && scenario.steps[currentStepIndex]) {
      const currentStep = scenario.steps[currentStepIndex];
      if (currentStep) {
        setShuffledOptions(shuffleArray([currentStep.correctStep, ...currentStep.incorrectOptions]));
      }
    }
  }, [scenario, currentStepIndex]);

  const handleOptionSelect = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || !scenario) return;
    const isCorrect = selectedOption === scenario.steps[currentStepIndex].correctStep;
    setFeedback({ isCorrect });
  };

  const handleNext = () => {
    setFeedback(null);
    setSelectedOption(null);
    if (currentStepIndex < scenario.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };
  
  const handleRestart = () => {
     fetchNewScenario();
  }
  
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
  
  if (isFinished) {
    return (
         <div className="text-center max-w-2xl mx-auto space-y-6">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto" />
            <h1 className="text-3xl font-bold">Scenario Complete!</h1>
            <p className="text-xl text-muted-foreground">
              Great job! You've successfully resolved the issue.
            </p>
            <Card className="text-left">
                <CardHeader>
                    <CardTitle>Solution Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{scenario.solution}</p>
                </CardContent>
            </Card>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
              <Button variant="outline" onClick={() => router.push('/games')}>
                See Other Games
              </Button>
            </div>
        </div>
    )
  }
  
  const currentStep = scenario.steps[currentStepIndex];
  const progressValue = ((currentStepIndex + 1) / scenario.steps.length) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PageHeader title={game.title} description={game.description}>
            <Badge variant="outline" className="capitalize">{game.difficulty}</Badge>
        </PageHeader>
        
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-primary">Progress</span>
                <span className="text-sm text-muted-foreground">Step {currentStepIndex + 1} of {scenario.steps.length}</span>
            </div>
            <Progress value={progressValue} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>The Situation</CardTitle>
            <CardDescription>{scenario.scenario}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{currentStep.stepTitle}</CardTitle>
            <CardDescription>What would you do next?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {shuffledOptions.map((option) => (
                <Button
                    key={option}
                    variant={selectedOption === option ? 'secondary' : 'outline'}
                    className={`w-full justify-start text-left h-auto whitespace-normal ${
                        feedback && option === currentStep.correctStep ? 'border-green-500 bg-green-500/10' : ''
                    } ${
                        feedback && selectedOption === option && !feedback.isCorrect ? 'border-red-500 bg-red-500/10' : ''
                    }`}
                    onClick={() => handleOptionSelect(option)}
                    disabled={!!feedback}
                >
                    {option}
                </Button>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end">
             {feedback ? (
                <Button onClick={handleNext}>
                  {currentStepIndex < scenario.steps.length - 1 ? 'Next Step' : 'Finish'}
                </Button>
             ) : (
                <Button onClick={handleSubmit} disabled={!selectedOption}>Submit</Button>
             )}
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
              {feedback.isCorrect ? "That's correct!" : 'Not quite...'}
            </AlertTitle>
            <AlertDescription>
                {feedback.isCorrect ? "Good choice. Proceed to the next step." : "That's not the most effective step right now. Try another option."}
            </AlertDescription>
            {!feedback.isCorrect && (
                 <div className="flex items-start gap-2 text-sm mt-3">
                  <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-yellow-500"/>
                  <p className="text-muted-foreground">The correct answer was: <strong>{currentStep.correctStep}</strong></p>
                </div>
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
