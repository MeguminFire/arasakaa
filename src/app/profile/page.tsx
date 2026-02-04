'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User as UserIcon } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user, updateUser } = useUser();
  const [name, setName] = useState(user.name);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const { toast } = useToast();

  const avatarPlaceholders = placeholderImages.filter(p => p.id.startsWith('avatar-'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateUser({ name: name.trim(), avatar: selectedAvatar });
      toast({
        title: "Profile Updated",
        description: "Your name and avatar have been successfully changed.",
      });
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
              This is how your name and avatar will be displayed in the app.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
             <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
               <Input
                  id="email"
                  value={user.email}
                  disabled
                  className="cursor-not-allowed bg-muted/50"
                />
            </div>
            <div className="space-y-2">
                <Label>Choose Avatar</Label>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                    {avatarPlaceholders.map(p => (
                        <div key={p.id} onClick={() => setSelectedAvatar(p.imageUrl)} className={cn("relative aspect-square rounded-full cursor-pointer border-2 transition-all", selectedAvatar === p.imageUrl ? "border-primary scale-110" : "border-transparent hover:border-primary/50")}>
                             <Image
                                src={p.imageUrl}
                                alt={p.description}
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                    ))}
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
