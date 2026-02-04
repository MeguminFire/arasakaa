'use client';

import { useState, useRef, useEffect } from 'react';
import { useUser } from '@/context/UserProvider';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User as UserIcon, Upload, Loader2, Mail } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { userProfile, authUser, updateUserProfile, loading } = useUser();
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const avatarFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/login');
    }
    if (userProfile) {
      setName(userProfile.name);
    }
  }, [authUser, userProfile, loading, router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && userProfile && name.trim() !== userProfile.name) {
      setIsSaving(true);
      await updateUserProfile({ name: name.trim() });
      toast({
        title: "Profile Updated",
        description: "Your name has been successfully changed.",
      });
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        setIsSaving(true);
        await updateUserProfile({ avatar: reader.result as string });
        toast({
            title: "Avatar Updated",
            description: "Your new avatar has been saved."
        });
        setIsSaving(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  if (loading || !userProfile) {
      return <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
      </div>
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Your Profile"
        description="Manage your account settings and preferences."
      />
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Choose your callsign and upload a custom avatar. Your email address cannot be changed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32 border-4 border-primary/50">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback className="text-4xl">
                  {userProfile.name?.charAt(0) || 'G'}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                accept="image/*"
                ref={avatarFileRef}
                onChange={handleAvatarChange}
                className="hidden"
              />
              <Button type="button" variant="outline" onClick={() => avatarFileRef.current?.click()} disabled={isSaving}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Avatar
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                 <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your name"
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  value={authUser?.email ?? ''}
                  disabled
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving || !name || (userProfile && name === userProfile.name)}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
