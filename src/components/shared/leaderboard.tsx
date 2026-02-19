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
import { Trophy, Loader2 } from 'lucide-react';
import { useFirebase } from '@/firebase/FirebaseProvider';
import { useEffect, useState, useMemo } from 'react';
import type { UserProfile } from '@/lib/types';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

type LeaderboardEntry = {
    rank: number;
    user: {
        uid: string;
        name: string;
        avatar?: string;
    };
    score: number;
};

export default function Leaderboard() {
  const { db } = useFirebase();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    setIsLoading(true);
    const usersRef = collection(db, 'users');
    
    // This simple listener fetches all users. For a large number of users,
    // you would want to query only the top scores directly from Firestore.
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const usersData: UserProfile[] = [];
      snapshot.forEach(doc => {
        usersData.push({ uid: doc.id, ...doc.data() } as UserProfile);
      });
      setUsers(usersData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  const leaderboard = useMemo(() => {
    return users
      .map(user => {
        const score = 
          (user.completedGames?.length || 0) * 100 +
          (user.completedQuizzes?.length || 0) * 50 +
          (user.completedLessons?.length || 0) * 20;
        
        return {
          user: {
            uid: user.uid!,
            name: user.name,
            avatar: user.avatar,
          },
          score,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));
  }, [users]);

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
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
