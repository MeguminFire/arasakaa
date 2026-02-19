import { User as FirebaseUser, Unsubscribe } from 'firebase/auth';
import type { Timestamp } from 'firebase/firestore';

export type User = {
  uid: string;
  name: string;
  avatar: string;
};

export type UserProfile = {
  uid?: string; // UID is the doc ID, so it's not in the doc data itself.
  name: string;
  avatar: string;
  completedGames: string[];
  completedQuizzes: string[];
  completedLessons: string[];
}

export type StatCard = {
  label: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type ProgressItem = {
  id: string;
  name:string;
  type: 'Game' | 'Quiz' | 'Lesson';
  completion: number;
};

export type LeaderboardEntry = {
  rank: number;
  user: {
    uid: string;
    name: string;
    avatar?: string;
  };
  score: number;
};

export type Game = {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  topic: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  quizId: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

// Types for the hardcoded interactive game
export type Action = {
  text: string;
  isCorrect: boolean;
  feedback: string;
};

export type GameStep = {
  title: string;
  description: string;
  hint?: string;
  actions: Action[];
};

export type GameScenario = {
  id: string;
  title: string;
  initialSituation: string;
  steps: GameStep[];
  finalSolution: string;
};

export type Comment = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Timestamp;
};

export type ForumPost = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  deviceType: string;
  brand: string;
  issueType: string;
  createdAt: Timestamp;
};
