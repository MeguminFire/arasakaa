'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useUser as useFirebaseAuth, useFirestore, initializeFirebase, FirebaseProvider, FirebaseContextValue } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import type { UserProfile } from '@/lib/types';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import type { User as FirebaseUser } from 'firebase/auth';

interface UserContextType {
  authUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  addCompletedItem: (type: 'game' | 'quiz' | 'lesson', id: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// This new internal provider handles the actual user data logic.
// It will only be rendered after Firebase has been initialized on the client.
function AuthUserProvider({ children }: { children: ReactNode }) {
  const { user: authUser, loading: authLoading } = useFirebaseAuth();
  const db = useFirestore();
  
  const userDocRef = (authUser && db) ? doc(db, 'users', authUser.uid) : null;
  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userDocRef);

  const loading = authLoading || profileLoading;

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!userDocRef) return;
    
    // When creating a user profile for the first time, ensure name and avatar are initialized.
    const profileData = !userProfile 
      ? { ...data, name: data.name || authUser?.displayName || 'New User', avatar: data.avatar || '' } 
      : data;
      
    await setDoc(userDocRef, profileData, { merge: true });
  };
  
  const addCompletedItem = async (type: 'game' | 'quiz' | 'lesson', id: string) => {
    if (!userDocRef || !userProfile) return;

    let fieldToUpdate: keyof UserProfile | null = null;
    let existingItems: string[] = [];

    switch(type) {
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
        await setDoc(userDocRef, {
            [fieldToUpdate]: arrayUnion(id)
        }, { merge: true });
    }
  };
  
  const value = { authUser, userProfile: userProfile ?? null, loading, updateUserProfile, addCompletedItem };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [instances, setInstances] = useState<FirebaseContextValue | null>(null);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    // This is the correct place to initialize client-side libraries like Firebase.
    setInstances(initializeFirebase());
  }, []);

  // On the server and during the initial client render, instances will be null.
  // We provide a null context, which our custom hooks are designed to handle gracefully.
  return (
    <FirebaseProvider app={instances?.app ?? null} auth={instances?.auth ?? null} db={instances?.db ?? null}>
        <AuthUserProvider>
            {children}
        </AuthUserProvider>
    </FirebaseProvider>
  );
};


export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    // This provides a safe fallback for server rendering or before the context is available.
    return {
      authUser: null,
      userProfile: null,
      loading: true,
      updateUserProfile: async () => {},
      addCompletedItem: async () => {},
    };
  }
  return context;
};
