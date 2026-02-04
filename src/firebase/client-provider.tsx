'use client';

import { UserProvider } from '@/context/UserProvider';
import { useEffect, useState } from 'react';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
      return null; // Don't render anything on the server
  }

  return (
    <FirebaseProvider>
        <UserProvider>
            {children}
        </UserProvider>
    </FirebaseProvider>
  );
}
