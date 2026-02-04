'use client';

import { createContext, useContext } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

export interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const useFirebaseApp = () => useFirebase()?.app ?? null;
export const useAuth = () => useFirebase()?.auth ?? null;
export const useFirestore = () => useFirebase()?.db ?? null;

export function FirebaseProvider({
  children,
  ...value
}: {
  children: React.ReactNode;
} & FirebaseContextValue) {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export type { FirebaseContextValue };
