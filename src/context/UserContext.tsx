'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useUser as useFirebaseAuth, useFirestore, FirebaseProvider, initializeFirebase, FirebaseContextValue } from '@/firebase';
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

const UserProviderContent = ({ children }: { children: ReactNode }) => {
  const { user: authUser, loading: authLoading } = useFirebaseAuth();
  const db = useFirestore();
  
  const userDocRef = (authUser && db) ? doc(db, 'users', authUser.uid) : null;
  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userDocRef);

  const loading = authLoading || profileLoading;

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!userDocRef) return;
    
    // When creating a user profile for the first time, ensure email is included.
    const profileData = userProfile ? data : { ...data, email: authUser?.email };
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

  return (
    <UserContext.Provider value={{ authUser, userProfile: userProfile ?? null, loading, updateUserProfile, addCompletedItem }}>
      {children}
    </UserContext.Provider>
  );
}

const uninitializedUserContext: UserContextType = {
  authUser: null,
  userProfile: null,
  loading: true,
  updateUserProfile: async () => {},
  addCompletedItem: async () => {},
};


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [instances, setInstances] = useState<FirebaseContextValue | null>(null);

  useEffect(() => {
    // This effect runs only on the client, preventing SSR issues.
    setInstances(initializeFirebase());
  }, []);

  // While Firebase is initializing on the client, we provide an uninitialized context.
  // This prevents hooks like useAuth() from throwing errors on the server.
  if (!instances) {
     return (
      <UserContext.Provider value={uninitializedUserContext}>
        {children}
      </UserContext.Provider>
    );
  }

  return (
    <FirebaseProvider {...instances}>
      <UserProviderContent>{children}</UserProviderContent>
    </FirebaseProvider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    return uninitializedUserContext;
  }
  return context;
};
