'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { UserPlus, Loader2 } from 'lucide-react';
import { TitanLogo, GoogleIcon } from '@/components/shared/icons';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: 'Authentication service is not available. Please try again later.',
      });
      return;
    }
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Account Created',
        description: 'Welcome to the Glitch Guild! You will be redirected.',
      });
      // On successful creation, Firebase automatically signs the user in.
      // The main page's useEffect will detect this and show the name entry screen.
      router.push('/');
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!auth) {
        toast({
            variant: 'destructive',
            title: 'Sign In Failed',
            description: 'Authentication service is not available. Please try again later.',
        });
        return;
    }
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        toast({
            title: 'Sign In Successful',
            description: 'Welcome to the Glitch Guild!',
        });
        router.push('/');
    } catch (error: any) {
        console.error('Google Sign In error:', error);
        toast({
            variant: 'destructive',
            title: 'Sign In Failed',
            description: error.message || 'Could not sign in with Google.',
        });
    } finally {
        setIsGoogleLoading(false);
    }
  }

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
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || isGoogleLoading}
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
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
                 {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading || isGoogleLoading}>
            {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <GoogleIcon className="mr-2 h-4 w-4" />
            )}
            Google
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}
