'use client';

import { useUser } from '@/context/UserProvider';
import { Loader2, AlertTriangle, Gamepad2, MessagesSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';

const navigationCards = [
    {
      title: 'Training Hub',
      description: 'Sharpen your skills with scenarios.',
      href: '/games',
      icon: Gamepad2,
    },
    {
      title: 'Community Forum',
      description: 'Connect with other operatives.',
      href: '/forum',
      icon: MessagesSquare,
    },
  ];

// --- Main Dashboard Page ---
export default function DashboardPage() {
  const { authUser, loading } = useUser();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState('');

  const handleRunDiagnostic = () => {
    setIsScanning(true);
    setScanResult('');
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 100);

    setTimeout(() => {
      setIsScanning(false);
      setScanProgress(100);
      clearInterval(interval);
      setScanResult('SYSTEM_OK: No Critical Errors Found.');
    }, 3000);
  };

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

      {/* --- System Health Monitor --- */}
      <Card className="w-full max-w-4xl animate-pulse-red border-destructive/50">
        <CardHeader>
          <CardTitle className="font-headline text-base text-destructive">System Health Monitor</CardTitle>
          <CardDescription className="font-body">Technician Notes: Live diagnostic panel for system integrity.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
            <div>
              <p className="font-headline text-sm text-muted-foreground">Active Vulnerabilities</p>
              <p className="font-code text-3xl text-destructive">4</p>
            </div>
            <div>
              <p className="font-headline text-sm text-muted-foreground">Firewall Integrity</p>
              <p className="font-code text-3xl text-yellow-400">88%</p>
            </div>
            <div>
              <p className="font-headline text-sm text-muted-foreground">Network Latency</p>
              <p className="font-code text-3xl text-green-400">12ms</p>
            </div>
          </div>
          <div className="h-12 flex items-center justify-center">
            {isScanning && (
              <div className="w-full space-y-2 animate-fade-in">
                <div className="flex justify-between font-code text-sm text-destructive">
                  <span>SCANNING...</span>
                  <span>{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} className="h-2 [&>div]:bg-destructive" />
              </div>
            )}
            {scanResult && (
              <p className="text-center font-code text-green-400 animate-fade-in">{scanResult}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRunDiagnostic} disabled={isScanning} variant="destructive" className="w-full">
            {isScanning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
            {isScanning ? 'Scanning...' : 'Run Diagnostic'}
          </Button>
        </CardFooter>
      </Card>

       <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-2">
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
