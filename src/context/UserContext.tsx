'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { initializeFirebase } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import type { UserProfile } from '@/lib/types';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged, type User as FirebaseUser, type Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

// Define the shape of the context value
interface UserContextType {
  auth: Auth | null;
  db: Firestore | null;
  authUser: FirebaseUser | null;
  userProfile: UserProfile | null;
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
  const [loading, setLoading] = useState(true);

  // Initialize Firebase on the client side
  useEffect(() => {
    const instances = initializeFirebase();
    if (instances) {
      setAuth(instances.auth);
      setDb(instances.db);
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
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
          ...data,
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
    auth,
    db,
    authUser,
    userProfile: userProfile ?? null,
    loading: loading || profileLoading,
    updateUserProfile,
    addCompletedItem,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    // This happens on server-side rendering, return a default "loading" state
    return {
      auth: null,
      db: null,
      authUser: null,
      userProfile: null,
      loading: true,
      updateUserProfile: async () => {},
      addCompletedItem: async () => {},
    };
  }
  return context;
};
