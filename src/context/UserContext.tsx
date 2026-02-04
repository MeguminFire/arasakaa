'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/lib/types';
import { user as defaultUser } from '@/lib/data';

interface UserContextType {
  user: User;
  updateUser: (newUser: Partial<User>) => void;
  completedGames: string[];
  completedQuizzes: string[];
  completedLessons: string[];
  addCompletedItem: (type: 'game' | 'quiz' | 'lesson', id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('troubleshoot-user');
      const storedGames = localStorage.getItem('completedGames');
      const storedQuizzes = localStorage.getItem('completedQuizzes');
      const storedLessons = localStorage.getItem('completedLessons');

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.avatar = ''; // Force empty avatar on load to use fallback
        setUser(parsedUser);
      }
      if (storedGames) {
        setCompletedGames(JSON.parse(storedGames));
      }
      if (storedQuizzes) {
        setCompletedQuizzes(JSON.parse(storedQuizzes));
      }
      if (storedLessons) {
        setCompletedLessons(JSON.parse(storedLessons));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const updateUser = (newUser: Partial<User>) => {
    setUser(prevUser => {
      const updatedUser = { ...prevUser, ...newUser, avatar: '' }; // Ensure avatar is always empty
      try {
        localStorage.setItem('troubleshoot-user', JSON.stringify(updatedUser));
      } catch (error) {
         console.error("Failed to save user to localStorage", error);
      }
      return updatedUser;
    });
  };

  const addCompletedItem = (type: 'game' | 'quiz' | 'lesson', id: string) => {
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
    } else if (type === 'quiz') {
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
    } else if (type === 'lesson') {
        setCompletedLessons(prev => {
            if (prev.includes(id)) return prev;
            const newCompleted = [...prev, id];
            try {
                localStorage.setItem('completedLessons', JSON.stringify(newCompleted));
            } catch (error) {
                console.error("Failed to save completed lessons to localStorage", error);
            }
            return newCompleted;
        });
    }
  };

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <UserContext.Provider value={{ user, updateUser, completedGames, completedQuizzes, completedLessons, addCompletedItem }}>
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
