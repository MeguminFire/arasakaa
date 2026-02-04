'use client';

// This file is now primarily for re-exporting hooks for convenience.
export { useDoc } from './firestore/use-doc';
export { useFirebase, useFirebaseApp, useAuth, useFirestore } from './hooks';
export type { FirebaseInstances } from './provider';
