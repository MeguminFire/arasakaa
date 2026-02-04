import PageHeader from '@/components/shared/page-header';
import { user, stats, progress, titles } from '@/lib/data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Leaderboard from '@/components/shared/leaderboard';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <PageHeader
        title={`Welcome back, ${user.name}!`}
        description="Here's a snapshot of your troubleshooting prowess."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className="text-xs text-muted-foreground flex items-center">
                  {stat.changeType === 'increase' ? (
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  {stat.change} from last week
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>
              Your completion status for games and quizzes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Completion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {progress.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.type === 'Game' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex items-center justify-end gap-2">
                      <span className="text-sm text-muted-foreground w-8 text-right">
                        {item.completion}%
                      </span>
                      <Progress value={item.completion} className="w-24" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Earned Titles</CardTitle>
            <CardDescription>
              Your collection of special achievements.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {titles
              .filter((title) => title.earned)
              .map((title) => (
                <div
                  key={title.id}
                  className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center"
                >
                  <title.icon className="h-8 w-8 text-accent" />
                  <span className="text-sm font-medium">{title.name}</span>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
      
      <Leaderboard />

    </div>
  );
}
