'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  UserPlus,
  Loader2,
} from 'lucide-react';
import { useUser } from '@/context/UserProvider';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { SplashScreen } from '@/components/shared/SplashScreen';


export default function HomePage() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [view, setView] = useState('loading'); // 'loading', 'intro', 'nameEntry'
  const [newName, setNewName] = useState('');
  const { authUser, userProfile, loading, updateUserProfile } = useUser();
  const router = useRouter();

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setSplashFinished(true);
    }, 4000); // Animation is ~3.5s, give it a bit of buffer to fade out.
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (loading) {
      setView('loading');
      return;
    }

    if (authUser && userProfile) {
      router.push('/dashboard');
      return;
    }

    if (authUser && !userProfile) {
      setView('nameEntry');
      return;
    }
    
    if (!authUser) {
      setView('intro');
      return;
    }

  }, [authUser, userProfile, loading, router]);

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && authUser) {
        await updateUserProfile({ name: newName.trim() });
        router.push('/dashboard');
    }
  };

  if (!splashFinished) {
    return <SplashScreen />;
  }

  if (view === 'loading') {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  if (view === 'intro') {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-4 text-center scanline-overlay overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative w-full max-w-lg">
           <div className="flex justify-center items-center gap-8 mb-12">
              <Image
                  src="/arasaka.png"
                  alt="Arasaka Logo"
                  width={80}
                  height={80}
                  className="h-28 w-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              />
              <h1 className="font-headline text-6xl text-white tracking-[0.4em] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">ARASAKA</h1>
          </div>
          <div className="p-8 rounded-lg border-2 border-primary/50 backdrop-blur-sm">
            <p
              className="max-w-2xl mx-auto text-lg text-muted-foreground opacity-0 animate-text-focus-in"
              style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
            >
              Welcome, challenger. Sharpen your tech instincts. Diagnose, solve,
              and conquer real-world IT scenarios. Your training begins now.
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              style={{
                animationDelay: '1800ms',
                animationFillMode: 'forwards',
              }}
              className="mt-8 font-bold text-lg font-headline tracking-wider group bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary))] hover:shadow-[0_0_30px_hsl(var(--accent))]"
            >
              <span className="group-hover:tracking-widest transition-all duration-300">
                GET STARTED
              </span>
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (view === 'nameEntry') {
    return (
        <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-4 text-center animate-fade-in">
             <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
             <div className="relative w-full max-w-md">
                 <div className="p-8 rounded-lg border-2 border-primary/50 bg-card/50 backdrop-blur-sm space-y-6">
                    <UserPlus className="h-16 w-16 mx-auto text-primary" />
                    <h1 className="font-headline text-3xl md:text-4xl font-bold">Choose Your Callsign</h1>
                    <p className="text-muted-foreground">Welcome to Arasaka. Every agent needs a name. What will yours be?</p>
                    <form onSubmit={handleNameSubmit} className="flex flex-col gap-4">
                        <Input 
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="e.g., Glitch, Byte, Jett"
                            className="text-center text-lg h-12"
                            required
                            autoFocus
                        />
                        <Button
                            type="submit"
                            size="lg"
                            className="font-bold text-lg font-headline tracking-wider group bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary))] hover:shadow-[0_0_30px_hsl(var(--accent))]"
                        >
                            <span className="group-hover:tracking-widest transition-all duration-300">Join the Ranks</span>
                            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                        </Button>
                    </form>
                 </div>
             </div>
        </div>
    )
  }

  return null;
}
