'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

// Custom Image with Fallback Component
const ImageWithFallback = ({ src, alt, className, ...props }: {src: string, alt: string, className?: string } & any) => {
    const [error, setError] = useState(false);
    
    const handleError = () => {
        setError(true);
    };

    return error ? (
        <div className={cn("w-full h-full bg-muted flex items-center justify-center text-muted-foreground/50 font-code text-xs rounded-sm", className)}>
            IMG_PENDING
        </div>
    ) : (
        <Image
            src={src}
            alt={alt}
            onError={handleError}
            className={className}
            {...props}
        />
    );
};


export default function FourPicsOneWordPage() {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const answer = 'HACK';

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.toUpperCase() === answer) {
      setFeedback('CONNECTION_ESTABLISHED');
      setIsCorrect(true);
    } else {
      setFeedback('Incorrect. Try again, netrunner.');
      setIsCorrect(false);
    }
  };
  
  return (
    <div className="space-y-6 flex flex-col items-center">
        <PageHeader title="Training Drill: 4 Pics 1 Word" description="Analyze the data streams. Decrypt the connection." />

        <Card className="border-primary/50 bg-card/80 shadow-[0_0_15px_hsl(var(--primary)/0.3)] w-full max-w-sm">
            <CardHeader className="p-4">
                <CardTitle className="font-code text-primary text-lg">[ANALYZE_DATA_STREAM_01]</CardTitle>
                <CardDescription className="text-sm">4 Pics, 1 Word. Decrypt the connection.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <ImageWithFallback src="/hack1.png" alt="Hack Pic 1" width={150} height={150} className={cn("rounded-sm w-full h-auto aspect-square object-cover transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                    <ImageWithFallback src="/hack2.png" alt="Hack Pic 2" width={150} height={150} className={cn("rounded-sm w-full h-auto aspect-square object-cover transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                    <ImageWithFallback src="/hack3.png" alt="Hack Pic 3" width={150} height={150} className={cn("rounded-sm w-full h-auto aspect-square object-cover transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                    <ImageWithFallback src="/hack4.png" alt="Hack Pic 4" width={150} height={150} className={cn("rounded-sm w-full h-auto aspect-square object-cover transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                </div>
                <form onSubmit={handleGuessSubmit} className="flex gap-2">
                <Input 
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Your Answer..."
                    className="font-code text-sm"
                    disabled={isCorrect}
                />
                <Button type="submit" size="sm" disabled={isCorrect}>
                    <Send className="h-4 w-4" />
                </Button>
                </form>
                {feedback && (
                <p className={cn('text-xs font-code', isCorrect ? 'text-green-400' : 'text-red-400')}>
                    {feedback}
                </p>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
