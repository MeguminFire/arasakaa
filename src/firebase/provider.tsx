'use client';

import { getApps, initializeApp, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { firebaseConfig } from './config';

type FirebaseContextValue = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
} | null;

const FirebaseContext = createContext<FirebaseContextValue>(null);

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<FirebaseContextValue>(null);

  useEffect(() => {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);
    setValue({ app, auth, db });
  }, []);

  if (!value) {
      return null; // Don't render until Firebase is initialized
  }

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
