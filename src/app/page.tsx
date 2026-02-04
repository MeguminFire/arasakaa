'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { GraduationCap, Gamepad2, BookOpen, ArrowRight, Zap } from 'lucide-react';
import { TitanLogo } from '@/components/shared/icons';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

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
  const [showIntro, setShowIntro] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (localStorage.getItem('introSeen')) {
      setShowIntro(false);
    }
  }, []);

  const handleStart = () => {
    setShowIntro(false);
    if (isClient) {
      localStorage.setItem('introSeen', 'true');
    }
  };

  if (!isClient) {
    // Render nothing or a loader on the server to avoid hydration mismatch
    return null;
  }

  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-4 text-center animate-fade-in">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative">
          <Zap className="absolute -top-8 -left-8 h-16 w-16 text-primary/50 -rotate-12" />
          <Zap className="absolute -bottom-8 -right-8 h-16 w-16 text-accent/50 rotate-12" />
          <div className="p-8 rounded-lg border-2 border-primary/50 bg-card/50 backdrop-blur-sm">
            <TitanLogo className="h-16 w-16 mx-auto text-primary" />
            <h1 className="mt-6 font-headline text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Troubleshoot Titans
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Welcome, challenger. Sharpen your tech instincts. Diagnose, solve, and conquer real-world IT scenarios. Your training begins now.
            </p>
            <Button
              onClick={handleStart}
              size="lg"
              className="mt-8 font-bold text-lg font-headline tracking-wider group bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary))] hover:shadow-[0_0_30px_hsl(var(--accent))]"
            >
              <span className="group-hover:tracking-widest transition-all duration-300">START</span>
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
            <Dialog>
              <DialogTrigger asChild>
                <div className="md:col-span-1">
                  <DashboardCard 
                    icon={GraduationCap}
                    title="Learn"
                    description="Master troubleshooting theory. Knowledge is your primary weapon."
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[90vh]">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-headline">Troubleshooting Fundamentals</DialogTitle>
                  <DialogDescription>Master the art of diagnosing and solving computer problems.</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-full w-full pr-4">
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-0">
                        <div className="relative h-48 w-full">
                          <Image
                            src={getPlaceholderImage('learn-hero')?.imageUrl ?? ''}
                            alt="Abstract technology background"
                            data-ai-hint="technology abstract"
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>
                      </CardContent>
                      <CardHeader>
                        <h2 className="text-2xl font-bold font-headline">What is Troubleshooting?</h2>
                      </CardHeader>
                      <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                          Troubleshooting is a logical, systematic search for the source of a problem in order to solve it, and make the product or process operational again. It's a skill that combines technical knowledge, critical thinking, and a bit of detective work.
                        </p>
                        <p>
                          Instead of randomly trying solutions, a skilled troubleshooter follows a structured process to isolate the cause of the problem and implement a reliable fix.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h2 className="text-2xl font-bold font-headline">Watch & Learn: Troubleshooting Theory</h2>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          This video from Professor Messer provides an excellent overview of the troubleshooting methodology used by professionals.
                        </p>
                        <div className="aspect-video w-full">
                          <iframe
                            className="h-full w-full rounded-lg"
                            src="https://www.youtube.com/embed/p6_n2tV362s"
                            title="YouTube video player: A+ | Troubleshooting Theory"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <h2 className="text-2xl font-bold font-headline">The 6 Steps of Troubleshooting</h2>
                      </CardHeader>
                      <CardContent className="space-y-8">
                          <div className="flex flex-col md:flex-row gap-6 items-center">
                              <div className="w-full md:w-2/3 space-y-4">
                                  <div className="p-4 border rounded-lg bg-card/50">
                                      <h3 className="font-semibold text-lg text-primary">1. Identify the problem</h3>
                                      <p className="text-muted-foreground">Gather information from the user. What exactly is happening? When did it start? Were there any recent changes?</p>
                                  </div>
                                  <div className="p-4 border rounded-lg bg-card/50">
                                      <h3 className="font-semibold text-lg text-primary">2. Establish a theory of probable cause</h3>
                                      <p className="text-muted-foreground">Based on the symptoms, form a hypothesis. Start with the most obvious and simplest potential causes.</p>
                                  </div>
                              </div>
                              <div className="w-full md:w-1/3">
                                  <Image
                                    src={getPlaceholderImage('learn-step-1-2')?.imageUrl ?? ''}
                                    alt="A person thinking or gathering information"
                                    data-ai-hint="thinking person"
                                    width={400}
                                    height={300}
                                    className="rounded-lg object-cover"
                                  />
                              </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-6 items-center">
                              <div className="w-full md:w-2/3 space-y-4">
                                  <div className="p-4 border rounded-lg bg-card/50">
                                      <h3 className="font-semibold text-lg text-primary">3. Test the theory to determine cause</h3>
                                      <p className="text-muted-foreground">Test your hypothesis. If the theory is that a cable is loose, check the cable. If confirmed, move on. If not, form a new theory.</p>
                                  </div>
                                  <div className="p-4 border rounded-lg bg-card/50">
                                      <h3 className="font-semibold text-lg text-primary">4. Establish a plan of action and implement it</h3>
                                      <p className="text-muted-foreground">Once the cause is known, create a plan to fix it. This might involve repairing a component, changing a setting, or installing software.</p>
                                  </div>
                              </div>
                              <div className="w-full md:w-1/3">
                                  <Image
                                    src={getPlaceholderImage('learn-step-3-4')?.imageUrl ?? ''}
                                    alt="Testing a theory with tools"
                                    data-ai-hint="testing tools"
                                    width={400}
                                    height={300}
                                    className="rounded-lg object-cover"
                                  />
                              </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-6 items-center">
                              <div className="w-full md:w-2/3 space-y-4">
                                  <div className="p-4 border rounded-lg bg-card/50">
                                      <h3 className="font-semibold text-lg text-primary">5. Verify full system functionality</h3>
                                      <p className="text-muted-foreground">After implementing the solution, test everything to make sure the problem is gone and that you haven't created a new one.</p>
                                  </div>
                                  <div className="p-4 border rounded-lg bg-card/50">
                                      <h3 className="font-semibold text-lg text-primary">6. Document findings, actions, and outcomes</h3>
                                      <p className="text-muted-foreground">Record what you did. This helps with future issues and builds a knowledge base for you and your team.</p>
                                  </div>
                              </div>
                              <div className="w-full md:w-1/3">
                                  <Image
                                    src={getPlaceholderImage('learn-step-5-6')?.imageUrl ?? ''}
                                    alt="Verifying a working computer and documenting"
                                    data-ai-hint="working computer"
                                    width={400}
                                    height={300}
                                    className="rounded-lg object-cover"
                                  />
                              </div>
                          </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

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
