'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import type { UserProfile } from '@/lib/types';
import { doc, setDoc, arrayUnion, type Firestore, onSnapshot } from 'firebase/firestore';
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize Firebase and set up auth listener
  useEffect(() => {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const authInstance = getAuth(app);
    const dbInstance = getFirestore(app);

    setAuth(authInstance);
    setDb(dbInstance);

    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setAuthUser(user);
       if (!user) {
        // If user is null, we are done loading.
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen for user profile changes
  useEffect(() => {
    if (db && authUser) {
      const userDocRef = doc(db, 'users', authUser.uid);
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        setUserProfile(docSnap.exists() ? (docSnap.data() as UserProfile) : null);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setUserProfile(null);
    }
  }, [db, authUser]);

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!db || !authUser) return;
    const userDocRef = doc(db, 'users', authUser.uid);
    const profileData = !userProfile
      ? {
          name: data.name || authUser?.displayName || 'New User',
          avatar: data.avatar || '',
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

  const value = {
    authUser,
    userProfile,
    auth,
    db,
    loading,
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
