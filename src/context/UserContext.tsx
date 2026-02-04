'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useDoc } from '@/firebase/firestore/use-doc';
import type { UserProfile } from '@/lib/types';
import { doc, setDoc, arrayUnion, type Firestore } from 'firebase/firestore';
import { onAuthStateChanged, type User as FirebaseUser, type Auth } from 'firebase/auth';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

// Define the shape of the context value
interface UserContextType {
  authUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  auth: Auth | null;
  db: Firestore | null;
  loading: boolean;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  addCompletedItem: (
    type: 'game' | 'quiz' | 'lesson',
    id: string
  ) => Promise<void>;
}

// Create the context with a default undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Initialize Firebase on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const app =
        getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      setAuth(getAuth(app));
      setDb(getFirestore(app));
    }
  }, []);


  // Listen for auth state changes
  useEffect(() => {
    if (!auth) {
      setLoadingAuth(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoadingAuth(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const userDocRef = authUser && db ? doc(db, 'users', authUser.uid) : null;
  const { data: userProfile, loading: profileLoading } =
    useDoc<UserProfile>(userDocRef);

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!userDocRef) return;
    const profileData = !userProfile
      ? {
          name: data.name || authUser?.displayName || 'New User',
          avatar: data.avatar || '',
        }
      : data;
    await setDoc(userDocRef, profileData, { merge: true });
  };

  const addCompletedItem = async (
    type: 'game' | 'quiz' | 'lesson',
    id: string
  ) => {
    if (!userDocRef || !userProfile) return;

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

  const value = {
    authUser,
    userProfile: userProfile ?? null,
    auth,
    db,
    loading: loadingAuth || profileLoading,
    updateUserProfile,
    addCompletedItem,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
