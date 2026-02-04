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
import { ArrowRight } from 'lucide-react';

export default function GamesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Troubleshooting Games"
        description="Sharpen your skills with these real-world scenarios."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Card
            key={game.id}
            className="flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <game.icon className="h-10 w-10 text-primary mb-4" />
                <Badge variant="outline" className="capitalize">
                  {game.difficulty}
                </Badge>
              </div>
              <CardTitle>{game.title}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/game/${game.id}`}>
                  Play Game <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
