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
import { ArrowRight } from 'lucide-react';

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Troubleshooting Quizzes"
        description="Test your knowledge and climb the leaderboard."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg"
          >
            <CardHeader>
              <quiz.icon className="h-10 w-10 text-primary mb-4" />
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/quiz/${quiz.id}`}>
                  Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
