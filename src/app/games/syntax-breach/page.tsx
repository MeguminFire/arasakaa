'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/shared/page-header';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Terminal, CheckCircle, XCircle, RotateCcw, HelpCircle } from 'lucide-react';
import Link from 'next/link';

// New game data structure
const TROUBLESHOOTING_QUESTIONS = [
  {
    id: 1,
    words: ['what', 'to', 'do', 'for', 'a', 'bsod'],
    questionText: 'What to do for a BSOD?',
    answer: 'check drivers',
  },
  {
    id: 2,
    words: ['why', 'is', 'my', 'internet', 'slow'],
    questionText: 'Why is my internet slow?',
    answer: 'reboot router',
  },
  {
    id: 3,
    words: ['how', 'to', 'fix', 'no', 'sound'],
    questionText: 'How to fix no sound?',
    answer: 'check audio device',
  },
  {
    id: 4,
    words: ['computer', 'wont', 'turn', 'on'],
    questionText: "Computer won't turn on?",
    answer: 'check power cable',
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
  const [formedQuestion, setFormedQuestion] = useState<{ questionText: string; answer: string } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'info', message: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

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
    for (const q of TROUBLESHOOTING_QUESTIONS) {
        const questionSet = new Set(q.words);
        if (selectedSet.size === questionSet.size && [...selectedSet].every(w => questionSet.has(w))) {
            setFormedQuestion({ questionText: q.questionText, answer: q.answer });
            setFeedback(null); // Clear previous feedback
            return; // Exit after finding a match
        }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formedQuestion) return;

    if (userAnswer.trim().toLowerCase() === formedQuestion.answer.toLowerCase()) {
        setFeedback({ type: 'correct', message: 'SYSTEM RESTORED. Correct solution identified.' });
        setIsFinished(true);
    } else {
        setFeedback({ type: 'incorrect', message: `ACCESS DENIED. Incorrect solution. The recommended action is: "${formedQuestion.answer}"` });
    }
  };
  
  const handleReset = () => {
    setWordPool(shuffleArray([...allWords]));
    setSelectedWords([]);
    setFormedQuestion(null);
    setUserAnswer('');
    setFeedback(null);
    setIsFinished(false);
  };

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Arasaka Debugger" description="Analyze the situation. Construct a query to identify the problem, then provide the correct solution." />

      <Card className="border-accent/50">
        <CardHeader>
            <CardTitle className="font-headline text-accent flex items-center gap-2">
                <HelpCircle />
                TROUBLESHOOTING SCENARIO
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-center font-code text-muted-foreground p-4 bg-muted rounded-md">
                Construct a valid query from the word fragments below.
            </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
           <div className="mb-4">
              <p className="font-body text-center text-muted-foreground">
                [CONSTRUCT DEBUG LOG] :: Word fragments selected: {selectedWords.length}
              </p>
           </div>
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
                    (isFinished || formedQuestion) ? 'opacity-50 cursor-not-allowed' : ''
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
            <CardContent className="pt-6">
                 <form onSubmit={handleSubmit} className="space-y-4">
                     <p className="text-center font-body text-accent">
                         Query Constructed: "{formedQuestion.questionText}"
                     </p>
                     <p className="text-center text-sm text-muted-foreground">
                        Provide a short (1-5 word) solution.
                     </p>
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
        <Alert variant={feedback.type === 'incorrect' ? 'destructive' : 'default'} className={cn(feedback.type === 'correct' && 'border-green-500/50 text-green-400')}>
            {feedback.type === 'correct' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle className="font-headline">{feedback.type === 'correct' ? 'SUCCESS' : 'FAILURE'}</AlertTitle>
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
