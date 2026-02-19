'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/shared/page-header';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Terminal, CheckCircle, XCircle, RotateCcw, Bug } from 'lucide-react';
import Link from 'next/link';

// New game constants
const CORRECT_WORDS = ['Replace', 'backround', 'with', 'background', 'on', 'line', '2'];
const DISTRACTORS = ['color', 'font', 'delete', 'line 1', 'padding', 'margin', '.widget'];
const FULL_WORD_POOL = [...CORRECT_WORDS, ...DISTRACTORS];
const CORRECT_ANSWER = 'background: #333;';

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
  const [words, setWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'info', message: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setWords(shuffleArray([...FULL_WORD_POOL]));
  }, []);

  const handleWordClick = (word: string) => {
    if (isFinished) return;
    
    if (selectedWords.includes(word)) {
      setSelectedWords(prev => prev.filter(w => w !== word));
    } else {
      if (selectedWords.length < 7) {
        setSelectedWords(prev => [...prev, word]);
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isQuestionCorrect = selectedWords.length === 7 && selectedWords.every(word => CORRECT_WORDS.includes(word));
    
    if (!isQuestionCorrect) {
        setFeedback({ type: 'incorrect', message: 'Incorrect debug sequence selected. The description of the fix is wrong.'});
        return;
    }

    if (userAnswer.trim().replace(/;$/, '') === CORRECT_ANSWER.replace(/;$/, '')) {
        setFeedback({ type: 'correct', message: 'SYSTEM RESTORED. Correct syntax identified.' });
        setIsFinished(true);
    } else {
        setFeedback({ type: 'incorrect', message: `ACCESS DENIED. Incorrect syntax. The correct code is: ${CORRECT_ANSWER}` });
    }
  };
  
  const handleReset = () => {
    setWords(shuffleArray([...FULL_WORD_POOL]));
    setSelectedWords([]);
    setUserAnswer('');
    setFeedback(null);
    setIsFinished(false);
  };

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }
  
  const showInput = selectedWords.length === 7;
  const formedQuestion = selectedWords.sort((a,b) => CORRECT_WORDS.indexOf(a) - CORRECT_WORDS.indexOf(b)).join(' ');

  return (
    <div className="space-y-6">
      <PageHeader title="Arasaka Debugger" description="Analyze the corrupted code, select the words to describe the fix, and input the corrected code." />

      <Card className="border-destructive/50">
        <CardHeader>
            <CardTitle className="font-headline text-destructive flex items-center gap-2">
                <Bug />
                SYSTEM ERROR // CORRUPTED CODE BLOCK
            </CardTitle>
        </CardHeader>
        <CardContent>
            <pre className="bg-muted p-4 rounded-md font-code text-sm text-foreground overflow-x-auto">
                <span className="text-muted-foreground">1 | </span>
                <span className="text-cyan-400">.widget</span>
                <span>{" {"}</span>
                <br />
                <span className="text-muted-foreground">2 | </span>
                <span>  </span>
                <span className="text-red-400">backround</span>
                <span>: </span>
                <span className="text-yellow-400">#333</span>
                <span>;</span>
                <br />
                <span className="text-muted-foreground">3 | </span>
                <span>{"}"}</span>
            </pre>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
           <div className="mb-4">
              <p className="text-center font-code text-muted-foreground">
                [CONSTRUCT DEBUG LOG] :: Selected words: {selectedWords.length} / 7
              </p>
           </div>
          <div className="flex flex-wrap justify-center gap-2">
            {words.map(word => (
              <Card 
                key={word}
                onClick={() => handleWordClick(word)}
                className={cn(
                    "cursor-pointer transition-all w-32 text-center",
                    selectedWords.includes(word) 
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card/50 hover:bg-card',
                    isFinished || (selectedWords.length === 7 && !selectedWords.includes(word)) ? 'opacity-50 cursor-not-allowed' : ''
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
      
      {showInput && !isFinished && (
        <Card className="animate-fade-in border-accent/50">
            <CardContent className="pt-6">
                 <form onSubmit={handleSubmit} className="space-y-4">
                     <p className="text-center font-body text-accent">
                         Debug Log: "{formedQuestion}"
                     </p>
                     <div className="relative">
                        <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            type="text"
                            value={userAnswer}
                            onChange={e => setUserAnswer(e.target.value)}
                            placeholder="> Enter corrected line of code..."
                            className="pl-10 font-code h-12 text-lg"
                        />
                     </div>
                      <div className="flex justify-center gap-4">
                        <Button type="submit" variant="destructive" className="px-3 py-1 text-sm h-auto">Submit Fix</Button>
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
                Run Again
            </Button>
            <Button asChild variant="outline" className="px-3 py-1 text-sm h-auto">
                <Link href="/games">Back to Training Hub</Link>
            </Button>
        </div>
      )}

    </div>
  );
}
