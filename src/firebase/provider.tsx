'use client';

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { initializeFirebase, FirebaseInstances } from '@/firebase';

export type FirebaseContextValue = FirebaseInstances | null;

export const FirebaseContext = createContext<FirebaseContextValue>(undefined);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [instances, setInstances] = useState<FirebaseContextValue>(null);

  useEffect(() => {
    const initializedInstances = initializeFirebase();
    setInstances(initializedInstances);
  }, []);

  return (
    <FirebaseContext.Provider value={instances}>
      {children}
    </FirebaseContext.Provider>
  );
};
