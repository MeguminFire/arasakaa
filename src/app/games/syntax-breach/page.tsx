'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/shared/page-header';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Terminal, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import Link from 'next/link';

const CORRECT_WORDS = ['What', 'is', 'the', 'correct', 'syntax', 'for', 'comments'];
const DISTRACTORS = ['How', 'CSS', 'selector', 'class', 'style', 'color', 'background', 'font'];
const FULL_WORD_POOL = [...CORRECT_WORDS, ...DISTRACTORS];
const CORRECT_ANSWER = '/* comment */';

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function SyntaxBreachPage() {
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
        setFeedback({ type: 'incorrect', message: 'Incorrect sequence. The words do not form the right question.'});
        return;
    }

    if (userAnswer.trim() === CORRECT_ANSWER) {
        setFeedback({ type: 'correct', message: 'Access Granted. Correct syntax identified.' });
        setIsFinished(true);
    } else {
        setFeedback({ type: 'incorrect', message: `Access Denied. Incorrect syntax. The correct answer is: ${CORRECT_ANSWER}` });
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

  return (
    <div className="space-y-6">
      <PageHeader title="Syntax Breach" description="Select the 7 words to form the question, then provide the correct syntax." />
      
      <Card>
        <CardContent className="pt-6">
           <div className="mb-4">
              <p className="text-center text-muted-foreground font-code">
                Selected words: {selectedWords.length} / 7
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
                     <p className="text-center font-headline text-accent">
                         "{selectedWords.sort((a,b) => CORRECT_WORDS.indexOf(a) - CORRECT_WORDS.indexOf(b)).join(' ')}"
                     </p>
                     <div className="relative">
                        <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            type="text"
                            value={userAnswer}
                            onChange={e => setUserAnswer(e.target.value)}
                            placeholder="> Enter correct syntax..."
                            className="pl-10 font-code h-12 text-lg"
                        />
                     </div>
                      <div className="flex justify-center gap-4">
                        <Button type="submit" variant="destructive" className="px-3 py-1 text-sm h-auto">Submit</Button>
                      </div>
                 </form>
            </CardContent>
        </Card>
      )}

      {feedback && (
        <Alert variant={feedback.type === 'incorrect' ? 'destructive' : 'default'} className={cn(feedback.type === 'correct' && 'border-green-500/50 text-green-400')}>
            {feedback.type === 'correct' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>{feedback.type.toUpperCase()}</AlertTitle>
            <AlertDescription>
                {feedback.message}
            </AlertDescription>
        </Alert>
      )}
      
      {isFinished && (
         <div className="flex justify-center gap-4">
            <Button onClick={handleReset} variant="destructive" className="px-3 py-1 text-sm h-auto">
                <RotateCcw className="mr-2 h-4 w-4"/>
                Play Again
            </Button>
            <Button asChild variant="outline" className="px-3 py-1 text-sm h-auto">
                <Link href="/games">Back to Games</Link>
            </Button>
        </div>
      )}

    </div>
  );
}
