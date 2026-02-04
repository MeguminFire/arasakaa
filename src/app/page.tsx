'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Gamepad2, BookOpen, ArrowRight, Zap } from 'lucide-react';
import { TitanLogo } from '@/components/shared/icons';
import { cn } from '@/lib/utils';

// Component for the navigation cards on the dashboard
function DashboardCard({ href, icon: Icon, title, description, className }: { href?: string, icon: React.ElementType, title: string, description: string, className?: string }) {
  const content = (
    <div className={cn("relative h-full w-full p-4 md:p-6 rounded-lg border-2 border-primary/50 bg-card/50 backdrop-blur-sm transition-all duration-300 transform hover:border-primary hover:bg-card/80 hover:scale-105", className)}>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
      <div className="relative z-10 flex flex-col h-full">
          <Icon className="h-12 w-12 text-primary group-hover:text-accent transition-colors" />
          <h2 className="mt-4 font-headline text-2xl md:text-3xl font-bold text-foreground group-hover:text-accent transition-colors">{title}</h2>
          <p className="mt-2 text-muted-foreground flex-grow">{description}</p>
          <div className="mt-4 flex items-center font-semibold text-primary group-hover:text-accent transition-colors">
            <span>Engage</span>
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block group h-full">
        {content}
      </Link>
    );
  }

  // Without href, it becomes a div that can be a trigger
  return <div className="block group h-full cursor-pointer">{content}</div>;
}


export default function DashboardPage() {
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Only show intro if it hasn't been seen this session
    if (!sessionStorage.getItem('introSeen')) {
      setShowIntro(true);
    }
  }, []);

  const handleStart = () => {
    setShowIntro(false);
    if (isClient) {
      sessionStorage.setItem('introSeen', 'true');
    }
  };

  if (!isClient) {
    // Render nothing or a loader on the server to avoid hydration mismatch
    return null;
  }

  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-4 text-center scanline-overlay overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative">
          <Zap className="absolute -top-8 -left-8 h-16 w-16 text-primary/50 -rotate-12 opacity-0 animate-text-focus-in" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}/>
          <Zap className="absolute -bottom-8 -right-8 h-16 w-16 text-accent/50 rotate-12 opacity-0 animate-text-focus-in" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}/>
          <div className="p-8 rounded-lg border-2 border-primary/50 bg-card/50 backdrop-blur-sm">
            <TitanLogo 
              className="h-16 w-16 mx-auto text-primary opacity-0 animate-text-focus-in" 
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }} 
            />
            <h1 
              className="mt-6 font-headline text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent opacity-0 animate-text-focus-in"
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              Troubleshoot Titans
            </h1>
            <p 
              className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground opacity-0 animate-text-focus-in"
              style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
            >
              Welcome, challenger. Sharpen your tech instincts. Diagnose, solve, and conquer real-world IT scenarios. Your training begins now.
            </p>
            <Button
              onClick={handleStart}
              size="lg"
              style={{ animationDelay: '1800ms', animationFillMode: 'forwards' }}
              className="mt-8 font-bold text-lg font-headline tracking-wider group bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary))] hover:shadow-[0_0_30px_hsl(var(--accent))] opacity-0 animate-text-focus-in"
            >
              <span className="group-hover:tracking-widest transition-all duration-300">INITIALIZE</span>
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in space-y-8 p-4">
        <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Main Hub</h1>
            <p className="mt-2 text-muted-foreground text-lg">Choose your path, titan.</p>
        </div>
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <DashboardCard 
              href="/learn"
              icon={GraduationCap}
              title="Learn"
              description="Master troubleshooting theory. Knowledge is your primary weapon."
              className="md:col-span-1"
            />
            <DashboardCard 
              href="/games"
              icon={Gamepad2}
              title="Games"
              description="Apply your skills in simulated, real-world scenarios. Experience is everything."
              className="md:col-span-1"
            />
             <DashboardCard 
              href="/quizzes"
              icon={BookOpen}
              title="Quizzes"
              description="Test your knowledge with rapid-fire questions. Precision is key."
              className="md:col-span-2"
            />
        </div>
    </div>
  );
}
