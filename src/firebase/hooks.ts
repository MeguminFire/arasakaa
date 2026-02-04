'use client';
import { useContext } from 'react';
import { FirebaseContext, FirebaseContextValue } from './provider';

export const useFirebase = (): FirebaseContextValue => {
  const context = useContext(FirebaseContext);
  // It's okay for context to be undefined on the server.
  // We don't throw an error, and components should handle the `null` case.
  return context ?? null;
};

export const useFirebaseApp = () => useFirebase()?.app ?? null;
export const useAuth = () => useFirebase()?.auth ?? null;
export const useFirestore = () => useFirebase()?.db ?? null;
