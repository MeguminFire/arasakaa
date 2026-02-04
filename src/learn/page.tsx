'use client';

import Link from 'next/link';
import { lessons } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Badge } from '@/components/ui/badge';

export default function LearnHubPage() {
  const { userProfile } = useUser();
  const completedLessons = userProfile?.completedLessons || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning Modules"
        description="Build your foundational knowledge with these lessons."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          return (
            <Card
              key={lesson.id}
              className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader>
                 <div className="flex items-start justify-between">
                    <lesson.icon className="h-10 w-10 text-primary mb-4" />
                    {isCompleted && (
                        <Badge variant="secondary" className="border-green-500 bg-green-500/10 text-green-400">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Completed
                        </Badge>
                    )}
                </div>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={lesson.href}>
                    {isCompleted ? 'Review Lesson' : 'Start Lesson'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
