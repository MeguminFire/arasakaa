'use client';

import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot, setDoc, arrayUnion } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import type { UserProfile } from '@/lib/types';
import { getApps, initializeApp, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

type UserContextValue = {
    authUser: FirebaseUser | null;
    userProfile: UserProfile | null;
    loading: boolean;
    auth: Auth | null;
    db: Firestore | null;
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
    auth: null,
    db: null,
    updateUserProfile: async () => {},
    addCompletedItem: async () => {},
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<Auth | null>(null);
    const [db, setDb] = useState<Firestore | null>(null);
    const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        const authInstance = getAuth(app);
        const dbInstance = getFirestore(app);
        setAuth(authInstance);
        setDb(dbInstance);
    }, []);

    useEffect(() => {
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
            if (!user) {
                setLoading(false);
                setUserProfile(null);
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
        if (!db || !authUser) return;
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
        if (!db || !authUser || !userProfile) return;
    
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

    const value = { authUser, userProfile, loading, auth, db, updateUserProfile, addCompletedItem };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
