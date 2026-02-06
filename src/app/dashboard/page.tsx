'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserProvider';
import {
  GraduationCap,
  Gamepad2,
  BookOpen,
  ArrowRight,
  MessagesSquare,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Re-using the DashboardCard component from the original page.tsx
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

  return <div className="block group h-full cursor-pointer">{content}</div>;
}


export default function DashboardPage() {
  const { userProfile, authUser, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!authUser) {
        router.push('/login');
      } else if (!userProfile) {
        router.push('/'); // Redirect to name entry page
      }
    }
  }, [authUser, userProfile, loading, router]);

  if (loading || !userProfile || !authUser) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in space-y-8 p-4">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold">Welcome, {userProfile?.name || 'Netrunner'}</h1>
        <p className="text-muted-foreground text-lg">
          Choose your path.
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