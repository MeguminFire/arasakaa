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
        <div className={cn("bg-muted flex items-center justify-center text-muted-foreground/50 font-code text-xs rounded-sm", className)}>
            IMG_PENDING
        </div>
    ) : (
        <Image
            src={src}
            alt={alt}
            onError={handleError}
            width={56} // w-14
            height={56} // h-14
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
    <div className="flex flex-col items-center justify-start space-y-4 p-2">
        <PageHeader title="Training Drill: 4 Pics 1 Word" description="Analyze the data streams and decrypt the keyword." />
        <Card className="border-primary/50 bg-card/80 shadow-[0_0_15px_hsl(var(--primary)/0.3)] w-full max-w-xs h-[300px] flex flex-col p-2">
            <CardHeader className="p-2">
                <CardTitle className="font-code text-primary text-base">[ANALYZE_DATA_STREAM]</CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-2 flex-grow flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-2">
                    <ImageWithFallback src="/pic1.png" alt="Hack Pic 1" className={cn("rounded-sm w-14 h-14 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                    <ImageWithFallback src="/pic2.png" alt="Hack Pic 2" className={cn("rounded-sm w-14 h-14 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                    <ImageWithFallback src="/pic3.png" alt="Hack Pic 3" className={cn("rounded-sm w-14 h-14 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                    <ImageWithFallback src="/pic4.png" alt="Hack Pic 4" className={cn("rounded-sm w-14 h-14 object-cover mx-auto transition-all", isCorrect && 'outline outline-2 outline-green-400 shadow-[0_0_15px_theme(colors.green.400)]')} />
                </div>
                {!isCorrect ? (
                    <form onSubmit={handleGuessSubmit} className="flex gap-2">
                        <Input 
                            type="text"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            placeholder="DECRYPT..."
                            className="font-code text-xs h-8"
                            maxLength={4}
                            disabled={isCorrect}
                        />
                        <Button type="submit" size="sm" className="h-8" disabled={isCorrect}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                ) : null}
                {feedback && (
                    <Alert variant={isCorrect ? 'default' : 'destructive'} className={cn('text-xs font-code h-10 p-2', isCorrect ? 'text-green-400 border-green-500/50' : 'text-red-400 border-red-500/50')}>
                       <AlertTitle className="text-center">{feedback}</AlertTitle>
                    </Alert>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
