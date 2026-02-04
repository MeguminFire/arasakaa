'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { initializeFirebase, FirebaseContextValue } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import type { UserProfile } from '@/lib/types';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import type { User as FirebaseUser, Auth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

interface UserContextType {
  auth: Auth | null;
  authUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  addCompletedItem: (type: 'game' | 'quiz' | 'lesson', id: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.Node }) => {
  const [instances, setInstances] = useState<FirebaseContextValue | null>(null);
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const firebaseInstances = initializeFirebase();
    setInstances(firebaseInstances);
    
    if (firebaseInstances?.auth) {
      const unsubscribe = onAuthStateChanged(firebaseInstances.auth, (user) => {
        setAuthUser(user);
        setAuthLoading(false);
      });
      return () => unsubscribe();
    } else {
      setAuthLoading(false);
    }
  }, []);

  const db = instances?.db ?? null;
  const userDocRef = (authUser && db) ? doc(db, 'users', authUser.uid) : null;
  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userDocRef);

  const loading = authLoading || profileLoading;

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!userDocRef) return;
    
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
  
  const value = { 
    auth: instances?.auth ?? null,
    authUser, 
    userProfile: userProfile ?? null, 
    loading, 
    updateUserProfile, 
    addCompletedItem 
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    return {
      auth: null,
      authUser: null,
      userProfile: null,
      loading: true,
      updateUserProfile: async () => {},
      addCompletedItem: async () => {},
    };
  }
  return context;
};
