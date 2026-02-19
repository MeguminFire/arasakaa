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
          (user.completedGames?.length || 0) * 100;
        
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
      .slice(0, 10)
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
      <CardContent className="max-h-[300px] overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] px-2 h-10">Rank</TableHead>
                <TableHead className="px-2 h-10">Player</TableHead>
                <TableHead className="text-right px-2 h-10">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((entry) => (
                <TableRow key={entry.rank}>
                  <TableCell className="p-2 font-bold text-lg text-muted-foreground">
                    {entry.rank}
                  </TableCell>
                  <TableCell className="p-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                        <AvatarFallback>{entry.user.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{entry.user.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-2 text-right font-semibold text-primary font-code">
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
