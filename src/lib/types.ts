export type User = {
  name: string;
  email?: string;
  avatar: string;
  title: string;
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
  type: 'Game' | 'Quiz';
  completion: number;
};

export type Title = {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  earned: boolean;
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

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

// New types for the interactive game
export type Action = {
  text: string;
  isCorrect: boolean;
  feedback: string;
};

export type GameStep = {
  title: string;
  description: string;
  actions: Action[];
};

export type InteractiveScenarioOutput = {
  title: string;
  initialSituation: string;
  steps: GameStep[];
  finalSolution: string;
};
