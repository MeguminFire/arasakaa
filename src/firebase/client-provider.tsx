'use client';

import { useState, useEffect } from 'react';
import { FirebaseProvider, initializeFirebase, FirebaseContextValue } from '@/firebase';

export default function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [instances, setInstances] = useState<FirebaseContextValue | null>(null);

  useEffect(() => {
    setInstances(initializeFirebase());
  }, []);

  if (!instances) {
    // Render children within a provider that has null instances.
    // This allows the rest of the app to render on the server without crashing.
    return <FirebaseProvider app={null} auth={null} db={null}>{children}</FirebaseProvider>;
  }

  return <FirebaseProvider {...instances}>{children}</FirebaseProvider>;
}
