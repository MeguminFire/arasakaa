'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/lib/types';
import { user as defaultUser } from '@/lib/data';

interface UserContextType {
  user: User;
  updateUser: (newUser: Partial<User>) => void;
  completedGames: string[];
  completedQuizzes: string[];
  addCompletedItem: (type: 'game' | 'quiz', id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('troubleshoot-user');
      const storedGames = localStorage.getItem('completedGames');
      const storedQuizzes = localStorage.getItem('completedQuizzes');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedGames) {
        setCompletedGames(JSON.parse(storedGames));
      }
      if (storedQuizzes) {
        setCompletedQuizzes(JSON.parse(storedQuizzes));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const updateUser = (newUser: Partial<User>) => {
    setUser(prevUser => {
      const updatedUser = { ...prevUser, ...newUser };
      try {
        localStorage.setItem('troubleshoot-user', JSON.stringify(updatedUser));
      } catch (error) {
         console.error("Failed to save user to localStorage", error);
      }
      return updatedUser;
    });
  };

  const addCompletedItem = (type: 'game' | 'quiz', id: string) => {
    if (type === 'game') {
      setCompletedGames(prev => {
        if (prev.includes(id)) return prev;
        const newCompleted = [...prev, id];
        try {
            localStorage.setItem('completedGames', JSON.stringify(newCompleted));
        } catch (error) {
            console.error("Failed to save completed games to localStorage", error);
        }
        return newCompleted;
      });
    } else {
      setCompletedQuizzes(prev => {
        if (prev.includes(id)) return prev;
        const newCompleted = [...prev, id];
         try {
            localStorage.setItem('completedQuizzes', JSON.stringify(newCompleted));
        } catch (error) {
            console.error("Failed to save completed quizzes to localStorage", error);
        }
        return newCompleted;
      });
    }
  };

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <UserContext.Provider value={{ user, updateUser, completedGames, completedQuizzes, addCompletedItem }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

  