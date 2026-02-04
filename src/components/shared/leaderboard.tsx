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
import type { LeaderboardEntry } from '@/lib/types';

export default function Leaderboard() {
  const { authUser, userProfile } = useUser();

  const leaderboard = useMemo(() => {
    let board = [...defaultLeaderboard];
    
    if (authUser && userProfile) {
      const userInBoard = board.some(p => p.user.uid === authUser.uid);
      if (userInBoard) {
        board = board.map(p => {
          if (p.user.uid === authUser.uid) {
            return { ...p, user: { ...p.user, name: userProfile.name, avatar: userProfile.avatar } };
          }
          return p;
        });
      } else {
        board.push({
          rank: 0,
          user: { uid: authUser.uid, name: userProfile.name, avatar: userProfile.avatar },
          score: 2280, // A default score
          time: "03:10",
        });
      }
    }

    return board
      .sort((a, b) => b.score - a.score)
      .map((p, i) => ({ ...p, rank: i + 1 }))
      .slice(0, 4);
      
  }, [authUser, userProfile]);

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
