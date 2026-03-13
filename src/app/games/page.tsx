'use client';

import Link from 'next/link';
import PageHeader from '@/components/shared/page-header';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Zap, TerminalSquare } from 'lucide-react';

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
        title: 'Arasaka Debugger',
        description: 'Analyze corrupted code and apply the correct fix to restore system integrity.',
        href: '/games/syntax-breach',
        icon: TerminalSquare,
    }
]

export default function GamesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Training Drills"
        description="Sharpen your reflexes and analytical skills."
      />
      
      <div className="space-y-4">
        <h2 className="text-2xl font-headline font-bold">Available Drills</h2>
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
    </div>
  );
}
