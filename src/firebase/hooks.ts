'use client';
import { useContext } from 'react';
import { FirebaseContext, FirebaseContextValue } from './provider';

export const useFirebase = (): FirebaseContextValue => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }
  return context;
};

export const useFirebaseApp = () => useFirebase()?.app;
export const useAuth = () => useFirebase()?.auth;
export const useFirestore = () => useFirebase()?.db;
