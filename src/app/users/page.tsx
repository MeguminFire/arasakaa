'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserProvider';
import PageHeader from '@/components/shared/page-header';
import { Loader2 } from 'lucide-react';

const ADMIN_EMAILS = ['gmorecj22@gmail.com'];

export default function UsersPage() {
  const { authUser, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!authUser || !ADMIN_EMAILS.includes(authUser.email || ''))) {
      router.push('/dashboard');
    }
  }, [authUser, loading, router]);

  if (loading || !authUser || !ADMIN_EMAILS.includes(authUser.email || '')) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="User Management" description="View and manage all user data." />
      <div className="border rounded-lg p-4">
        <p>Welcome, Administrator. The user management panel is under construction.</p>
      </div>
    </div>
  );
}
