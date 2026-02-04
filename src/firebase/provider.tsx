'use client';

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

export interface FirebaseInstances {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

export type FirebaseContextValue = FirebaseInstances | null;

export const FirebaseContext = createContext<FirebaseContextValue>(undefined);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [instances, setInstances] = useState<FirebaseContextValue>(null);

  useEffect(() => {
    // This check is crucial. It ensures that we only try to initialize
    // Firebase on the client-side, and only once.
    if (typeof window !== 'undefined' && !instances) {
      const app =
        getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      const auth = getAuth(app);
      const db = getFirestore(app);
      setInstances({ app, auth, db });
    }
  }, [instances]); // Dependency array ensures this effect runs when `instances` changes, but the `if` prevents re-runs.

  return (
    <FirebaseContext.Provider value={instances}>
      {children}
    </FirebaseContext.Provider>
  );
};
