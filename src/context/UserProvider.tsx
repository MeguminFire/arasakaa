'use client';

import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot, setDoc, arrayUnion } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import type { UserProfile } from '@/lib/types';
import { useFirebase } from '@/firebase/FirebaseProvider';

type UserContextValue = {
    authUser: FirebaseUser | null;
    userProfile: UserProfile | null;
    loading: boolean;
    updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
    addCompletedItem: (
        type: 'game' | 'quiz' | 'lesson',
        id: string
    ) => Promise<void>;
};

const UserContext = createContext<UserContextValue>({
    authUser: null,
    userProfile: null,
    loading: true,
    updateUserProfile: async () => {},
    addCompletedItem: async () => {},
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { auth, db } = useFirebase();
    const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
            if (!user) {
                setUserProfile(null);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        if (authUser && db) {
            const userDocRef = doc(db, 'users', authUser.uid);
            const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
                setUserProfile(docSnap.exists() ? (docSnap.data() as UserProfile) : null);
                setLoading(false);
            });
            return () => unsubscribe();
        }
    }, [authUser, db]);

    const updateUserProfile = async (data: Partial<UserProfile>) => {
        if (!authUser || !db) return;
        const userDocRef = doc(db, 'users', authUser.uid);
        const profileData = !userProfile
          ? {
              name: data.name || authUser?.displayName || 'New User',
              avatar: data.avatar || '',
              completedGames: [],
              completedQuizzes: [],
              completedLessons: [],
              ...data,
            }
          : data;
        await setDoc(userDocRef, profileData, { merge: true });
    };

    const addCompletedItem = async (
        type: 'game' | 'quiz' | 'lesson',
        id: string
      ) => {
        if (!authUser || !userProfile || !db) return;
    
        const userDocRef = doc(db, 'users', authUser.uid);
        let fieldToUpdate: keyof UserProfile | null = null;
        let existingItems: string[] = [];
    
        switch (type) {
          case 'game':
            fieldToUpdate = 'completedGames';
            existingItems = userProfile.completedGames || [];
            break;
          case 'quiz':
            fieldToUpdate = 'completedQuizzes';
            existingItems = userProfile.completedQuizzes || [];
            break;
          case 'lesson':
            fieldToUpdate = 'completedLessons';
            existingItems = userProfile.completedLessons || [];
            break;
        }
    
        if (fieldToUpdate && !existingItems.includes(id)) {
          await setDoc(
            userDocRef,
            {
              [fieldToUpdate]: arrayUnion(id),
            },
            { merge: true }
          );
        }
      };

    const value = { authUser, userProfile, loading, updateUserProfile, addCompletedItem };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
