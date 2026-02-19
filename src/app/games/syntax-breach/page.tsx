'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/shared/page-header';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Terminal, CheckCircle, XCircle, RotateCcw, HelpCircle, Lightbulb } from 'lucide-react';
import Link from 'next/link';

// Updated game data with hints
const TROUBLESHOOTING_QUESTIONS = [
  {
    id: 1,
    words: ['what', 'to', 'do', 'for', 'a', 'bsod'],
    questionText: 'What to do for a BSOD?',
    answer: 'check drivers',
    hint: "This error is often caused by a problem with the software that tells your hardware how to work."
  },
  {
    id: 2,
    words: ['why', 'is', 'my', 'internet', 'slow'],
    questionText: 'Why is my internet slow?',
    answer: 'reboot router',
    hint: "The classic 'turn it off and on again' solution is surprisingly effective for network hardware."
  },
  {
    id: 3,
    words: ['how', 'to', 'fix', 'no', 'sound'],
    questionText: 'How to fix no sound?',
    answer: 'check audio device',
    hint: "Make sure your computer is trying to send sound to the correct speakers or headphones."
  },
  {
    id: 4,
    words: ['computer', 'wont', 'turn', 'on'],
    questionText: "Computer won't turn on?",
    answer: 'check power cable',
    hint: "Start with the most basic physical connection that provides electricity."
  },
];

const DISTRACTORS = ['monitor', 'keyboard', 'delete', 'install', 'update', 'because', 'the', 'blue', 'fast', 'error'];

const shuffleArray = (array: any[]) => {
  // Client-side only shuffle
  if (typeof window === 'undefined') return array;
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function ArasakaDebuggerPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [wordPool, setWordPool] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [formedQuestion, setFormedQuestion] = useState<{ questionText: string; answer: string; hint: string; } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'info', message: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [failureCount, setFailureCount] = useState(0);

  // Memoize the full word list to avoid re-calculating
  const allWords = useMemo(() => {
    const questionWords = TROUBLESHOOTING_QUESTIONS.flatMap(q => q.words);
    return [...new Set([...questionWords, ...DISTRACTORS])]; // Use Set to remove duplicates
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setWordPool(shuffleArray([...allWords]));
  }, [allWords]);

  const handleWordClick = (word: string) => {
    if (isFinished || formedQuestion) return;

    const newSelectedWords = selectedWords.includes(word)
      ? selectedWords.filter(w => w !== word)
      : [...selectedWords, word];

    setSelectedWords(newSelectedWords);
    
    // Check if the selected words form a valid question
    const selectedSet = new Set(newSelectedWords);
    let questionFound = false;
    for (const q of TROUBLESHOOTING_QUESTIONS) {
        const questionSet = new Set(q.words);
        if (selectedSet.size === questionSet.size && [...selectedSet].every(w => questionSet.has(w))) {
            setFormedQuestion({ questionText: q.questionText, answer: q.answer, hint: q.hint });
            setFeedback(null); // Clear previous feedback
            setFailureCount(0); // Reset failure count for new question
            questionFound = true;
            break; 
        }
    }

    if (!questionFound) {
      setFormedQuestion(null);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formedQuestion) return;

    if (userAnswer.trim().toLowerCase() === formedQuestion.answer.toLowerCase()) {
        setFeedback({ type: 'correct', message: 'SYSTEM RESTORED. Correct solution identified.' });
        setIsFinished(true);
    } else {
        const newFailureCount = failureCount + 1;
        setFailureCount(newFailureCount);
        if (newFailureCount >= 2) {
            setFeedback({ type: 'incorrect', message: `Hint: ${formedQuestion.hint}` });
        } else {
            setFeedback({ type: 'incorrect', message: 'ACCESS DENIED. Incorrect solution. Try again.' });
        }
    }
  };
  
  const handleReset = () => {
    setWordPool(shuffleArray([...allWords]));
    setSelectedWords([]);
    setFormedQuestion(null);
    setUserAnswer('');
    setFeedback(null);
    setIsFinished(false);
    setFailureCount(0);
  };

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Arasaka Debugger" description="Analyze the situation. Construct a query to identify the problem, then provide the correct solution." />
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg">Query Construction</CardTitle>
          <CardDescription className="font-body">Selected words form the query below.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="p-4 bg-muted rounded-md min-h-[4rem] flex items-center justify-center border border-dashed">
                <p className="font-code text-lg text-accent text-center">
                    {selectedWords.join(' ') || '... awaiting input ...'}
                </p>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline text-lg">Word Fragments</CardTitle>
            <CardDescription className="font-body">Select words to construct a valid troubleshooting query.</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex flex-wrap justify-center gap-2">
            {wordPool.map(word => (
              <Card 
                key={word}
                onClick={() => handleWordClick(word)}
                className={cn(
                    "cursor-pointer transition-all w-32 text-center",
                    selectedWords.includes(word) 
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card/50 hover:bg-card',
                    formedQuestion ? 'opacity-50 cursor-not-allowed' : ''
                )}
              >
                <CardContent className="p-4">
                  <p className="font-body text-lg">{word}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {formedQuestion && !isFinished && (
        <Card className="animate-fade-in border-accent/50">
            <CardHeader>
                <CardTitle className="font-headline">Query Constructed</CardTitle>
                <CardDescription className="font-body">Provide a short (1-5 word) solution for the query: <span className="text-accent font-semibold">"{formedQuestion.questionText}"</span></CardDescription>
            </CardHeader>
            <CardContent>
                 <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="relative">
                        <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            type="text"
                            value={userAnswer}
                            onChange={e => setUserAnswer(e.target.value)}
                            placeholder="> Enter solution..."
                            className="pl-10 font-code h-12 text-lg"
                        />
                     </div>
                      <div className="flex justify-center gap-4">
                        <Button type="submit" variant="destructive" className="px-3 py-1 text-sm h-auto">Submit Solution</Button>
                      </div>
                 </form>
            </CardContent>
        </Card>
      )}

      {feedback && (
        <Alert variant={feedback.type === 'incorrect' ? 'destructive' : 'default'} className={cn(
            'transition-all',
            feedback.type === 'correct' && 'border-green-500/50 text-green-400',
            feedback.type === 'incorrect' && failureCount >= 2 && 'border-yellow-500/50 text-yellow-400'
        )}>
            {feedback.type === 'correct' ? <CheckCircle className="h-4 w-4" /> : (failureCount >= 2 ? <Lightbulb className="h-4 w-4" /> : <XCircle className="h-4 w-4" />)}
            <AlertTitle className="font-headline">{feedback.type === 'correct' ? 'SUCCESS' : (failureCount >= 2 ? 'HINT' : 'FAILURE')}</AlertTitle>
            <AlertDescription>
                {feedback.message}
            </AlertDescription>
        </Alert>
      )}
      
      {isFinished && (
         <div className="flex justify-center gap-4">
            <Button onClick={handleReset} variant="destructive" className="px-3 py-1 text-sm h-auto">
                <RotateCcw className="mr-2 h-4 w-4"/>
                Run New Scenario
            </Button>
            <Button asChild variant="outline" className="px-3 py-1 text-sm h-auto">
                <Link href="/games">Back to Training Hub</Link>
            </Button>
        </div>
      )}

    </div>
  );
}
