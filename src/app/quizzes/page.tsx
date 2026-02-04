'use client';

import Link from 'next/link';
import { quizzes } from '@/lib/data';
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
import { useUser } from '@/context/UserProvider';
import { Badge } from '@/components/ui/badge';


export default function QuizzesPage() {
  const { userProfile } = useUser();
  const completedQuizzes = userProfile?.completedQuizzes || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Troubleshooting Quizzes"
        description="Test your knowledge and climb the leaderboard."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          const isCompleted = completedQuizzes.includes(quiz.id);
          return (
            <Card
              key={quiz.id}
              className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader>
                 <div className="flex items-start justify-between">
                    <quiz.icon className="h-8 w-8 text-primary mb-3" />
                    {isCompleted && (
                        <Badge variant="secondary" className="border-green-500 bg-green-500/10 text-green-400">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Completed
                        </Badge>
                    )}
                </div>
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/quiz/${quiz.id}`}>
                    {isCompleted ? 'Take Again' : 'Start Quiz'} <ArrowRight className="ml-2 h-4 w-4" />
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
