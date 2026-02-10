'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/shared/page-header';

const ImageWithFallback = ({ src, alt, className, ...props }: {src: string, alt: string, className?: string } & any) => {
    const [error, setError] = useState(false);
    
    const handleError = () => {
        setError(true);
    };

    return error ? (
        <div className={cn("bg-muted flex items-center justify-center text-muted-foreground/50 font-code text-sm rounded-md", className)}>
            IMG_PENDING
        </div>
    ) : (
        <Image
            src={src}
            alt={alt}
            onError={handleError}
            width={128} 
            height={128}
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
      setFeedback('ENCRYPTION BROKEN');
      setIsCorrect(true);
    } else {
      setFeedback('ACCESS_DENIED');
      setIsCorrect(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-start space-y-6 p-4">
        <PageHeader title="Training Drill: 4 Pics 1 Word" description="Analyze the data streams and decrypt the keyword." />
        <Card className="border-primary/50 bg-card/80 shadow-[0_0_20px_hsl(var(--primary)/0.3)] w-full max-w-md flex flex-col p-4">
            <CardHeader className="p-2 text-center">
                <CardTitle className="font-code text-primary text-lg tracking-widest">[ANALYZE_DATA_STREAM]</CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-4 flex-grow flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-4">
                    <ImageWithFallback src="/pic1.png" alt="Hack Pic 1" className={cn("rounded-md w-32 h-32 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                    <ImageWithFallback src="/pic2.png" alt="Hack Pic 2" className={cn("rounded-md w-32 h-32 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                    <ImageWithFallback src="/pic3.png" alt="Hack Pic 3" className={cn("rounded-md w-32 h-32 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                    <ImageWithFallback src="/pic4.png" alt="Hack Pic 4" className={cn("rounded-md w-32 h-32 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                </div>
                {!isCorrect ? (
                    <form onSubmit={handleGuessSubmit} className="flex gap-2">
                        <Input 
                            type="text"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            placeholder="DECRYPT..."
                            className="font-code text-center text-lg h-12"
                            maxLength={4}
                            disabled={isCorrect}
                        />
                        <Button type="submit" size="lg" className="h-12" disabled={isCorrect}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                ) : null}
                {feedback && (
                    <Alert variant={isCorrect ? 'default' : 'destructive'} className={cn('text-sm font-code h-12 p-2 flex items-center justify-center', isCorrect ? 'text-green-400 border-green-500/50' : 'text-red-400 border-red-500/50')}>
                       <AlertTitle className="text-lg">{feedback}</AlertTitle>
                    </Alert>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
