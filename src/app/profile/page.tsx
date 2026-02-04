'use client';

import { useState, useRef } from 'react';
import { useUser } from '@/context/UserContext';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User as UserIcon, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  const { user, updateUser } = useUser();
  const [name, setName] = useState(user.name);
  const { toast } = useToast();
  const avatarFileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateUser({ name: name.trim() });
      toast({
        title: "Profile Updated",
        description: "Your name has been successfully changed.",
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result as string });
        toast({
            title: "Avatar Updated",
            description: "Your new avatar has been saved."
        });
      };
      reader.readAsDataURL(file);
    }
  };

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
              Choose your callsign and upload a custom avatar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32 border-4 border-primary/50">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-4xl">
                  {user.name?.charAt(0) || 'G'}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                accept="image/*"
                ref={avatarFileRef}
                onChange={handleAvatarChange}
                className="hidden"
              />
              <Button type="button" variant="outline" onClick={() => avatarFileRef.current?.click()}>
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
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
