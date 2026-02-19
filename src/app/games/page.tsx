'use client';

import Link from 'next/link';
import { games } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, BrainCircuit, Zap, TerminalSquare } from 'lucide-react';
import { useUser } from '@/context/UserProvider';

const trainingDrills = [
    {
        id: '4-pics-1-word',
        title: '4 Pics 1 Word',
        description: 'Analyze the data streams and decrypt the keyword.',
        href: '/games/4-pics-1-word',
        icon: BrainCircuit,
    },
    {
        id: 'reflex-booster',
        title: 'Reflex Booster',
        description: 'Test your reaction time against the clock.',
        href: '/games/reflex-booster',
        icon: Zap,
    },
    {
        id: 'syntax-breach',
        title: 'Syntax Breach',
        description: 'Form the question and provide the correct syntax to pass.',
        href: '/games/syntax-breach',
        icon: TerminalSquare,
    }
]

export default function GamesPage() {
  const { userProfile } = useUser();
  const completedGames = userProfile?.completedGames || [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Training Hub"
        description="Sharpen your skills with these real-world scenarios and drills."
      />
      
      <div className="space-y-4">
        <h2 className="text-2xl font-headline font-bold">Training Drills</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
             {trainingDrills.map((drill) => (
                <Card
                    key={drill.id}
                    className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                >
                    <CardHeader>
                        <drill.icon className="h-8 w-8 text-primary mb-3" />
                        <CardTitle className="text-xl">{drill.title}</CardTitle>
                        <CardDescription>{drill.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button asChild className="w-full">
                        <Link href={drill.href}>
                            Start Drill <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        </Button>
                    </CardFooter>
                </Card>
             ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-headline font-bold">Troubleshooting Scenarios</h2>
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => {
            const isCompleted = completedGames.includes(game.id);
            return (
                <Card
                key={game.id}
                className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                >
                <CardHeader>
                    <div className="flex items-start justify-between">
                    <game.icon className="h-8 w-8 text-primary mb-3" />
                    <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className="capitalize">
                        {game.difficulty}
                        </Badge>
                        {isCompleted && (
                        <Badge variant="secondary" className="border-green-500 bg-green-500/10 text-green-400">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Completed
                        </Badge>
                        )}
                    </div>
                    </div>
                    <CardTitle className="text-xl">{game.title}</CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild className="w-full">
                    <Link href={`/game/${game.id}`}>
                        {isCompleted ? 'Play Again' : 'Play Game'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    </Button>
                </CardFooter>
                </Card>
            );
            })}
        </div>
      </div>
    </div>
  );
}
