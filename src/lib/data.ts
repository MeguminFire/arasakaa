import type {
  User,
  StatCard,
  ProgressItem,
  Title,
  LeaderboardEntry,
  Game,
  Quiz,
  QuizQuestion,
} from './types';
import {
  Cpu,
  Router,
  Wrench,
  ShieldCheck,
  Trophy,
  BookOpen,
  Gamepad2,
  BarChart,
  CheckCircle,
  Clock,
  Crown,
  Award,
  Network,
  HardDrive,
  Printer,
} from 'lucide-react';
import { getPlaceholderImage } from './placeholder-images';

export const user: User = {
  name: 'Alex Titan',
  email: 'alex.titan@example.com',
  avatar: getPlaceholderImage('avatar-user')?.imageUrl ?? '',
  title: 'Novice Technician',
};

export const stats: StatCard[] = [
  {
    label: 'Games Played',
    value: '12',
    icon: Gamepad2,
    change: '+2',
    changeType: 'increase',
  },
  {
    label: 'Quizzes Taken',
    value: '8',
    icon: BookOpen,
    change: '+1',
    changeType: 'increase',
  },
  {
    label: 'Success Rate',
    value: '88%',
    icon: CheckCircle,
    change: '-3%',
    changeType: 'decrease',
  },
  {
    label: 'Avg. Time',
    value: '5m 21s',
    icon: Clock,
    change: '+15s',
    changeType: 'increase',
  },
];

export const progress: ProgressItem[] = [
  {
    id: 'game-1',
    name: 'The Slow Boot',
    type: 'Game',
    completion: 100,
  },
  {
    id: 'quiz-1',
    name: 'Networking Basics',
    type: 'Quiz',
    completion: 80,
  },
  {
    id: 'game-2',
    name: 'Wi-Fi Woes',
    type: 'Game',
    completion: 50,
  },
  {
    id: 'quiz-2',
    name: 'Hardware Components',
    type: 'Quiz',
    completion: 0,
  },
];

export const titles: Title[] = [
  { id: '1', name: 'PC Rookie', icon: Award, earned: true },
  { id: '2', name: 'Network Novice', icon: Award, earned: true },
  { id: '3', name: 'System Solver', icon: Crown, earned: false },
  { id: '4', name: 'Hardware Hero', icon: Crown, earned: false },
  { id: '5', name: 'Software Sage', icon: Trophy, earned: false },
  { id: '6', name: 'Troubleshoot Titan', icon: Trophy, earned: false },
];

export const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      name: 'CyberSavvy',
      avatar: getPlaceholderImage('avatar-1')?.imageUrl ?? '',
      title: 'Hardware Hero',
    },
    score: 2450,
    time: '02:30',
  },
  {
    rank: 2,
    user: {
      name: 'TechieTom',
      avatar: getPlaceholderImage('avatar-2')?.imageUrl ?? '',
      title: 'System Solver',
    },
    score: 2300,
    time: '02:45',
  },
  {
    rank: 3,
    user: {
      name: 'Alex Titan',
      avatar: getPlaceholderImage('avatar-user')?.imageUrl ?? '',
      title: 'Network Novice',
    },
    score: 2280,
    time: '03:10',
  },
  {
    rank: 4,
    user: {
      name: 'BinaryBess',
      avatar: getPlaceholderImage('avatar-3')?.imageUrl ?? '',
      title: 'Network Novice',
    },
    score: 2100,
    time: '03:15',
  },
  {
    rank: 5,
    user: {
      name: 'DataDave',
      avatar: getPlaceholderImage('avatar-4')?.imageUrl ?? '',
      title: 'PC Rookie',
    },
    score: 1950,
    time: '03:30',
  },
];

export const games: Game[] = [
  {
    id: '1',
    title: 'The Uncooperative Printer',
    description: 'A user reports their printer is not printing. Diagnose and solve the issue.',
    topic: 'Printer issues',
    difficulty: 'easy',
    icon: Printer,
  },
  {
    id: '2',
    title: 'The Case of the Slow Computer',
    description: 'A computer that was once fast is now sluggish. Find the bottleneck.',
    topic: 'Slow computer performance',
    difficulty: 'medium',
    icon: Cpu,
  },
  {
    id: '3',
    title: 'The Mysterious Wi-Fi Disconnect',
    description: 'A laptop keeps disconnecting from the Wi-Fi. Ensure a stable connection.',
    topic: 'Intermittent Wi-Fi connection',
    difficulty: 'medium',
    icon: Router,
  },
  {
    id: '4',
    title: 'The Blue Screen of Dread',
    description: 'A PC is crashing with a Blue Screen of Death. Identify the faulty component.',
    topic: 'Blue Screen of Death (BSOD)',
    difficulty: 'hard',
    icon: ShieldCheck,
  },
];

export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'Networking Fundamentals',
    description: 'Test your knowledge on basic networking concepts and hardware.',
    topic: 'Networking',
    icon: Network,
  },
  {
    id: '2',
    title: 'Hardware Identification',
    description: 'Identify common computer hardware components and their functions.',
    topic: 'Hardware',
    icon: HardDrive,
  },
  {
    id: '3',
    title: 'OS Troubleshooting',
    description: 'A quiz on common operating system issues and how to resolve them.',
    topic: 'Operating Systems',
    icon: Wrench,
  },
];

export const quizQuestions: { [key: string]: QuizQuestion[] } = {
  '1': [
    {
      question: "What does 'IP' stand for in 'IP Address'?",
      options: [
        'Internet Protocol',
        'Internal Protocol',
        'Internet Provider',
        'Internal Provider',
      ],
      correctAnswer: 'Internet Protocol',
      explanation: 'IP stands for Internet Protocol, which is the set of rules governing the format of data sent via the internet or local network.',
    },
    {
      question: 'Which device connects a local network to the internet?',
      options: ['Switch', 'Router', 'Hub', 'Modem'],
      correctAnswer: 'Router',
      explanation: 'A router is a networking device that forwards data packets between computer networks. Routers perform the traffic directing functions on the Internet.',
    },
    {
      question: 'What is the purpose of a DNS server?',
      options: [
        'To assign IP addresses',
        'To translate domain names to IP addresses',
        'To block malicious websites',
        'To store website data',
      ],
      correctAnswer: 'To translate domain names to IP addresses',
      explanation: 'The Domain Name System (DNS) is the phonebook of the Internet. Humans access information online through domain names, like nytimes.com or espn.com. Web browsers interact through Internet Protocol (IP) addresses.',
    },
  ],
  '2': [
    {
      question: 'What component is considered the "brain" of the computer?',
      options: ['RAM', 'GPU', 'CPU', 'Motherboard'],
      correctAnswer: 'CPU',
      explanation: 'The CPU (Central Processing Unit) performs most of the processing inside a computer, making it the "brain".',
    },
    {
      question: 'What is RAM an acronym for?',
      options: [
        'Read-Only Memory',
        'Random-Access Memory',
        'Rapid-Action Memory',
        'Real-time Access Memory',
      ],
      correctAnswer: 'Random-Access Memory',
      explanation: 'RAM is Random-Access Memory, a form of computer memory that can be read and changed in any order, typically used to store working data.',
    },
  ],
  '3': [
    {
        question: 'In Windows, what command line tool is used to check for system file corruption?',
        options: [ 'chkdsk', 'sfc /scannow', 'diskpart', 'ipconfig' ],
        correctAnswer: 'sfc /scannow',
        explanation: 'The `sfc /scannow` command scans the integrity of all protected system files and replaces incorrect versions with correct Microsoft versions.'
    },
    {
        question: 'What is "Safe Mode" in an OS used for?',
        options: [ 'Running the OS with minimal drivers', 'Encrypting the hard drive', 'Increasing performance', 'Scanning for viruses' ],
        correctAnswer: 'Running the OS with minimal drivers',
        explanation: 'Safe Mode starts the OS in a basic state, using a limited set of files and drivers. It helps troubleshoot problems on your PC.'
    }
  ]
};
