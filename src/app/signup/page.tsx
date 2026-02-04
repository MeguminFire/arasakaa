'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { UserPlus, Loader2 } from 'lucide-react';
import { TitanLogo } from '@/components/shared/icons';
import { useFirebase } from '@/firebase/FirebaseProvider';

export default function SignUpPage() {
  const { auth } = useFirebase();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setIsLoading(true);
    try {
      const emailForFirebase = `${username}@example.com`;
      await createUserWithEmailAndPassword(auth, emailForFirebase, password);
      toast({
        title: 'Account Created',
        description: 'Welcome to the Glitch Guild! You will be redirected.',
      });
      // On successful creation, Firebase automatically signs the user in.
      // The main page's useEffect will detect this and show the name entry screen.
      router.push('/');
    } catch (error: any) {
      console.error('Sign up error:', error);
      let errorMessage = error.message || 'An unexpected error occurred.';
      if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This username is already taken. Please choose another one.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak. Please use at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'The username is not valid. Please avoid special characters.';
      }
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <Link href="/" className="flex items-center gap-2 justify-center mb-4">
                <TitanLogo className="size-10 text-primary" />
            </Link>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Or{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              log in to an existing account
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="mt-2">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <div className="text-sm">
                  <span className="font-semibold text-muted-foreground">
                    (6+ characters)
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isLoading || !auth}>
                 {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
