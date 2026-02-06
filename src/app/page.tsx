'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  Gamepad2,
  BookOpen,
  ArrowRight,
  Zap,
  UserPlus,
  MessagesSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/UserProvider';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { SplashScreen } from '@/components/shared/SplashScreen';


// Component for the navigation cards on the dashboard
function DashboardCard({
  href,
  icon: Icon,
  title,
  description,
  className,
}: {
  href?: string;
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}) {
  const content = (
    <div
      className={cn(
        'relative h-full w-full p-4 md:p-6 rounded-lg border-2 border-primary/50 bg-card/50 backdrop-blur-sm transition-all duration-300 transform hover:border-primary hover:bg-card/80 hover:scale-105',
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
      <div className="relative z-10 flex flex-col h-full">
        <Icon className="h-12 w-12 text-primary group-hover:text-accent transition-colors" />
        <h2 className="mt-4 font-headline text-2xl md:text-3xl font-bold text-foreground group-hover:text-accent transition-colors">
          {title}
        </h2>
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
  const [splashFinished, setSplashFinished] = useState(false);
  const [view, setView] = useState('loading'); // 'loading', 'intro', 'nameEntry', 'dashboard'
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
    // This effect runs once on mount to decide the initial view
    if (loading) {
      setView('loading');
      return;
    }

    if (!authUser) {
      if (sessionStorage.getItem('introCompleted')) {
        // If they've seen the intro but are logged out, send to login
        router.push('/login');
      } else {
        // First time visitor, show intro
        setView('intro');
      }
      return;
    }

    if (authUser && !userProfile) {
      // Logged in, but no profile yet (first time sign up)
      setView('nameEntry');
      return;
    }
    
    if(authUser && userProfile) {
        setView('dashboard');
    }

  }, [authUser, userProfile, loading, router]);

  const handleIntroFinish = () => {
    sessionStorage.setItem('introCompleted', 'true');
    router.push('/signup');
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && authUser) {
        await updateUserProfile({ name: newName.trim() });
        // The useEffect will handle switching to the dashboard view
    }
  };

  if (!splashFinished) {
    return <SplashScreen />;
  }

  if (view === 'loading') {
    return null; // Render nothing on server and during initial client load to avoid hydration issues
  }

  if (view === 'intro') {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-4 text-center scanline-overlay overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative w-full max-w-lg">
          <Zap
            className="absolute -top-8 -left-8 h-16 w-16 text-primary/50 -rotate-12 opacity-0 animate-text-focus-in"
            style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
          />
          <Zap
            className="absolute -bottom-8 -right-8 h-16 w-16 text-accent/50 rotate-12 opacity-0 animate-text-focus-in"
            style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
          />
           <Image
              src="/arasaka.png"
              alt="Arasaka Logo"
              width={371}
              height={70}
              className="mx-auto h-auto w-full max-w-[300px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] opacity-0 animate-text-focus-in"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            />
          <div className="mt-8 p-8 rounded-lg border-2 border-primary/50 backdrop-blur-sm">
            <p
              className="max-w-2xl mx-auto text-lg text-muted-foreground opacity-0 animate-text-focus-in"
              style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
            >
              Welcome, challenger. Sharpen your tech instincts. Diagnose, solve,
              and conquer real-world IT scenarios. Your training begins now.
            </p>
            <Button
              onClick={handleIntroFinish}
              size="lg"
              style={{
                animationDelay: '1800ms',
                animationFillMode: 'forwards',
              }}
              className="mt-8 font-bold text-lg font-headline tracking-wider group bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary))] hover:shadow-[0_0_30px_hsl(var(--accent))]"
            >
              <span className="group-hover:tracking-widest transition-all duration-300">
                INITIALIZE
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

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in space-y-8 p-4">
      <div className="text-center">
        <Image
          src="/arasaka.png"
          alt="Arasaka Logo"
          width={371}
          height={70}
          className="mx-auto h-auto w-full max-w-[300px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
          priority
        />
        <p className="mt-4 text-muted-foreground text-lg">
          Choose your path, Netrunner.
        </p>
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
        <DashboardCard
          href="/forum"
          icon={MessagesSquare}
          title="Community Forum"
          description="Ask for help, share your knowledge, and connect with other titans in the community forum."
          className="md:col-span-2"
        />
      </div>
    </div>
  );
}
