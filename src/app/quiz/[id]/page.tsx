'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { quizzes, quizQuestions } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Trophy,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import type { QuizQuestion } from '@/lib/types';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const QUESTIONS_PER_QUIZ = 10;

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;
  const quiz = useMemo(() => quizzes.find((q) => q.id === quizId), [quizId]);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const startNewQuiz = useCallback(() => {
    if (!quizId) return;
    setIsLoading(true);
    // Ensure we have a fresh set of questions every time
    const allQuestions = quizQuestions[quizId] || [];
    const shuffled = shuffleArray(allQuestions);
    const selectedQuestions = shuffled.slice(0, QUESTIONS_PER_QUIZ);
    
    // Shuffle the options for each question as well
    const questionsWithShuffledOptions = selectedQuestions.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    
    setQuestions(questionsWithShuffledOptions);

    // Reset state
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
    setIsLoading(false);
  }, [quizId]);

  useEffect(() => {
    startNewQuiz();
  }, [startNewQuiz]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-semibold">Preparing your quiz...</p>
        <p className="text-muted-foreground">Shuffling the questions for a unique challenge.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
  const progressValue = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    startNewQuiz();
  };

  if (!quiz) {
    return (
      <PageHeader
        title="Quiz not found"
        description="This quiz does not exist."
      />
    );
  }

  if (questions.length === 0 && !isLoading) {
    return (
      <PageHeader
        title="No Questions"
        description="This quiz doesn't have any questions yet."
      />
    );
  }
  
  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <Trophy className="h-16 w-16 text-yellow-400" />
        <h1 className="text-3xl font-bold">Quiz Complete!</h1>
        <p className="text-xl text-muted-foreground">
          You scored {score} out of {questions.length}
        </p>
        <div className="flex gap-4">
          <Button onClick={handleRestart}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
          <Button variant="outline" onClick={() => router.push('/quizzes')}>
            See Other Quizzes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <PageHeader title={quiz.title}>
        <div className="w-full">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-primary">Progress</span>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progressValue} />
        </div>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
          <CardDescription>
            Select the correct answer from the options below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer ?? ''}
            onValueChange={setSelectedAnswer}
            disabled={showFeedback}
          >
            {currentQuestion.options.map((option) => (
              <Label
                key={option}
                className={`flex items-center space-x-3 p-4 rounded-md border transition-colors ${
                  showFeedback && option === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-500/10'
                    : ''
                } ${
                  showFeedback &&
                  option === selectedAnswer &&
                  !isCorrect
                    ? 'border-red-500 bg-red-500/10'
                    : ''
                }`}
              >
                <RadioGroupItem value={option} />
                <span>{option}</span>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          {!showFeedback ? (
            <Button
              className="w-full"
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </Button>
          ) : (
            <Button className="w-full" onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1
                ? 'Next Question'
                : 'Finish Quiz'}
            </Button>
          )}
        </CardFooter>
      </Card>
      {showFeedback && (
        <Alert variant={isCorrect ? 'default' : 'destructive'}>
          {isCorrect ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertTitle>{isCorrect ? 'Correct!' : 'Incorrect'}</AlertTitle>
          <AlertDescription className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 mt-1 text-yellow-400 flex-shrink-0" />
            <span>{currentQuestion.explanation}</span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
