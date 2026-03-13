'use client';

import { useUser } from '@/context/UserProvider';
import { Loader2, AlertTriangle, Gamepad2, MessagesSquare, ArrowRight, Wrench, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const navigationCards = [
    {
      title: 'Training Drills',
      description: 'Sharpen your reflexes and analytical skills.',
      href: '/games',
      icon: Gamepad2,
    },
    {
      title: 'Troubleshooting Hub',
      description: 'Engage in real-world diagnostic scenarios.',
      href: '/troubleshooting',
      icon: Wrench,
    },
    {
      title: 'Community Forum',
      description: 'Connect with other operatives.',
      href: '/forum',
      icon: MessagesSquare,
    },
  ];

const logMessages = [
  '[LOG] Secure connection established with CHIMERA-NET.',
  '[ALERT] Unidentified signal detected in Sector 7G.',
  '[LOG] Kernel status: NOMINAL.',
  '[LOG] Blackwall integrity scan: 100%.',
  '[ALERT] High-volume data spike from external node. Monitoring.',
  '[LOG] System heuristics normal.',
  '[LOG] Fetching latest intel from pacifica.node...',
  '[ALERT] Firewall deflected unauthorized access attempt from IP 20.77.0.13.',
];


// --- Main Dashboard Page ---
export default function DashboardPage() {
  const { authUser, loading } = useUser();
  const [currentLog, setCurrentLog] = useState(logMessages[0]);

  useEffect(() => {
    const logInterval = setInterval(() => {
        setCurrentLog(prevLog => {
            const currentIndex = logMessages.indexOf(prevLog);
            const nextIndex = (currentIndex + 1) % logMessages.length;
            return logMessages[nextIndex];
        });
    }, 3000);

    return () => clearInterval(logInterval);
  }, []);


  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const isGuest = !authUser;

  return (
    <div className="relative flex h-full flex-col items-center justify-start space-y-4 p-1">
      
      {isGuest && (
        <Alert variant="destructive" className="w-full max-w-4xl border-2 border-destructive bg-destructive/10 backdrop-blur-sm p-1 flex items-center max-h-[60px]">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <div className='ml-2'>
                <AlertTitle className="text-base font-headline animate-hacker-glitch">
                    UNAUTHORIZED ACCESS
                </AlertTitle>
                <AlertDescription className="text-destructive-foreground/80 text-sm">
                    Guest functionality is restricted.
                </AlertDescription>
            </div>
        </Alert>
      )}

      <div className="text-center w-full max-w-4xl">
        <h1 className="font-headline text-2xl font-bold">Welcome to Arasaka</h1>
        <p className="text-muted-foreground text-xs">
          Your training begins now.
        </p>
      </div>

      {/* --- Central Intelligence Hub --- */}
      <Card className="w-full max-w-4xl border-primary/50">
        <CardHeader>
          <CardTitle className="font-headline text-base text-primary flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Central Intelligence Hub
          </CardTitle>
          <CardDescription className="font-body">Technician Notes: Real-time system monitoring feed.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-black/50 p-4 rounded-md font-code text-green-400 h-24 flex flex-col justify-end">
             <p className="animate-fade-in text-sm">{'>'} {currentLog}</p>
          </div>
        </CardContent>
      </Card>

       <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-2">
        {navigationCards.map((card) => (
          <Card
            key={card.title}
            className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 bg-card/80 border-primary/50"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <card.icon className="h-6 w-6 text-primary mb-2" />
              </div>
              <CardTitle className="text-base font-headline">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={card.href}>
                  Engage <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
