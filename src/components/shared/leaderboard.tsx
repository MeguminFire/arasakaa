'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboard as defaultLeaderboard } from '@/lib/data';
import { Trophy } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useMemo } from 'react';
import type { User, LeaderboardEntry } from '@/lib/types';

export default function Leaderboard() {
  const { userProfile } = useUser();

  const leaderboard = useMemo(() => {
    if (!userProfile) return defaultLeaderboard.slice(0, 4);

    const userInLeaderboard = defaultLeaderboard.some(entry => entry.user.email === userProfile.email);
    let updatedLeaderboard: LeaderboardEntry[];

    if (userInLeaderboard) {
      updatedLeaderboard = defaultLeaderboard.map(entry => {
        if (entry.user.email === userProfile.email) {
          const user: User = {
            uid: userProfile.uid,
            name: userProfile.name,
            email: userProfile.email,
            avatar: userProfile.avatar,
          };
          return { ...entry, user: user };
        }
        return entry;
      });
    } else {
      const userEntry: LeaderboardEntry = {
        rank: 1, // Will be re-ranked
        user: {
          uid: userProfile.uid,
          name: userProfile.name,
          email: userProfile.email,
          avatar: userProfile.avatar,
        },
        score: 2280, // default score for now
        time: '03:10', // default time for now
      };
      updatedLeaderboard = [userEntry, ...defaultLeaderboard];
    }

    // Sort by score and re-assign rank
    return updatedLeaderboard
      .sort((a, b) => b.score - a.score)
      .map((entry, index) => ({ ...entry, rank: index + 1 }))
      .slice(0, 4);

  }, [userProfile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Leaderboard
        </CardTitle>
        <CardDescription>See how you rank against other titans.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((entry) => (
              <TableRow key={entry.rank}>
                <TableCell className="font-bold text-lg text-muted-foreground">
                  {entry.rank}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                      <AvatarFallback>{entry.user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{entry.user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold text-primary">
                  {entry.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
