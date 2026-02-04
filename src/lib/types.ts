export type User = {
  name: string;
  email: string;
  avatar: string;
};

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
  user: User;
  score: number;
  time: string;
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

export type ForumPost = {
  id: string;
  user: User;
  title: string;
  content: string;
  deviceType: string;
  brand: string;
  createdAt: string;
  replies: number;
  views: number;
};
