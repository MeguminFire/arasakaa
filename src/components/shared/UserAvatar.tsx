'use client';

import { useUser } from '@/context/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, LogIn } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';

export default function UserAvatar() {
  const { userProfile, authUser, auth } = useUser();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
  };

  if (!authUser || !userProfile) {
    return (
      <Button asChild variant="outline" className="w-full justify-start">
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Log In
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-auto w-full items-center justify-start gap-2 p-2"
        >
          <Avatar className="size-8 border-2 border-primary/50">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback>
              {userProfile.name?.charAt(0) || 'G'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{userProfile.name}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userProfile.name}</p>
            {authUser?.email && (
              <p className="text-xs leading-none text-muted-foreground">
                {authUser.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <Settings className="mr-2 h-4 w-4" />
            <span>Profile & Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} disabled={!auth}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
