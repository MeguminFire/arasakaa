'use client';
import { getApps, initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

import { useDoc } from './firestore/use-doc';

export interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
}


type FirebaseInstances = FirebaseContextValue;

let firebaseInstances: FirebaseInstances | null = null;

export function initializeFirebase(): FirebaseInstances | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (firebaseInstances) {
    return firebaseInstances;
  }

  const app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);

  firebaseInstances = { app, auth, db };
  return firebaseInstances;
}

export { useDoc };
export type { FirebaseContextValue };
