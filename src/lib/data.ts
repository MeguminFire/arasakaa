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
      name: 'Alex Titan',
      avatar: getPlaceholderImage('avatar-user')?.imageUrl ?? '',
      title: 'Network Novice',
    },
    score: 2280,
    time: '03:10',
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
    difficulty: 'easy',
    icon: Cpu,
  },
  {
    id: '3',
    title: 'The Mysterious Wi-Fi Disconnect',
    description: 'A laptop keeps disconnecting from the Wi-Fi. Ensure a stable connection.',
    topic: 'Intermittent Wi-Fi connection',
    difficulty: 'easy',
    icon: Router,
  },
  {
    id: '4',
    title: 'The Blue Screen of Dread',
    description: 'A PC is crashing with a Blue Screen of Death. Identify the faulty component.',
    topic: 'Blue Screen of Death (BSOD)',
    difficulty: 'easy',
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
    {
        question: 'What is a MAC address?',
        options: ['A type of IP address', 'A unique identifier for a network interface controller', 'A computer\'s serial number', 'A software license key'],
        correctAnswer: 'A unique identifier for a network interface controller',
        explanation: 'A MAC (Media Access Control) address is a unique identifier assigned to a network interface controller (NIC) for use as a network address in communications within a network segment.'
    },
    {
        question: 'Which of these is a common Wi-Fi security standard?',
        options: ['WEP', 'WPA3', 'HTTP', 'FTP'],
        correctAnswer: 'WPA3',
        explanation: 'WPA3 (Wi-Fi Protected Access 3) is the latest and most secure protocol for Wi-Fi networks. WEP is an older, insecure standard.'
    },
    {
        question: 'What does the `ping` command do?',
        options: ['Measures internet speed', 'Checks connectivity between two devices on a network', 'Displays your IP address', 'Restarts the network adapter'],
        correctAnswer: 'Checks connectivity between two devices on a network',
        explanation: 'The ping command sends a small packet of data to a specified network address to test the reachability of a host on an Internet Protocol (IP) network.'
    },
    {
        question: 'What is a subnet mask used for?',
        options: ['To hide a network from the public', 'To divide a network into smaller networks (subnets)', 'To change a device\'s MAC address', 'To encrypt network traffic'],
        correctAnswer: 'To divide a network into smaller networks (subnets)',
        explanation: 'A subnet mask is used to divide an IP address into two parts. One part identifies the host (computer), the other part identifies the network to which it belongs.'
    },
    {
        question: 'Which cable type is commonly used for modern Ethernet networks?',
        options: ['Coaxial', 'Fiber Optic', 'Twisted Pair (e.g., Cat 6)', 'Serial'],
        correctAnswer: 'Twisted Pair (e.g., Cat 6)',
        explanation: 'Twisted pair cables like Cat 5e, Cat 6, and Cat 7 are the standard for wired local area networks (LANs).'
    },
    {
        question: 'What is a DHCP server responsible for?',
        options: ['Hosting websites', 'Translating domain names', 'Automatically assigning IP addresses to devices', 'Filtering spam emails'],
        correctAnswer: 'Automatically assigning IP addresses to devices',
        explanation: 'A DHCP (Dynamic Host Configuration Protocol) server automatically assigns IP addresses and other network configuration parameters to devices on a network.'
    },
    {
        question: 'Which port is typically used for HTTPS traffic?',
        options: ['80', '21', '25', '443'],
        correctAnswer: '443',
        explanation: 'Port 443 is the standard port for HTTPS (HTTP Secure) traffic, which is encrypted. Port 80 is for unencrypted HTTP traffic.'
    }
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
    {
        question: 'Which component stores data long-term, even when the power is off?',
        options: ['CPU', 'RAM', 'SSD or HDD', 'GPU'],
        correctAnswer: 'SSD or HDD',
        explanation: 'Solid-State Drives (SSDs) and Hard Disk Drives (HDDs) are used for non-volatile, long-term storage of the operating system, applications, and user files.'
    },
    {
        question: 'What is the main function of a GPU?',
        options: ['To run the operating system', 'To connect to the internet', 'To process and render graphics and images', 'To manage system memory'],
        correctAnswer: 'To process and render graphics and images',
        explanation: 'The GPU (Graphics Processing Unit) is a specialized electronic circuit designed to rapidly manipulate and alter memory to accelerate the creation of images in a frame buffer intended for output to a display device.'
    },
    {
        question: 'What does the motherboard do?',
        options: ['Provides all the computer\'s power', 'Acts as the main circuit board connecting all components', 'Only holds the CPU', 'Cools the computer'],
        correctAnswer: 'Acts as the main circuit board connecting all components',
        explanation: 'The motherboard is the backbone that ties the computer\'s components together at one spot and allows them to talk to each other.'
    },
    {
        question: 'What is the purpose of a PSU?',
        options: ['To process sound', 'To provide power to all computer components', 'To store temporary files', 'To run security scans'],
        correctAnswer: 'To provide power to all computer components',
        explanation: 'The PSU (Power Supply Unit) converts AC power from the wall outlet to the low-voltage regulated DC power needed by the internal components of a computer.'
    },
    {
        question: 'Which of these is a type of computer port?',
        options: ['USB', 'HTTP', 'RAM', 'CPU'],
        correctAnswer: 'USB',
        explanation: 'USB (Universal Serial Bus) is a common type of port used to connect peripherals like keyboards, mice, printers, and external drives to a computer.'
    },
    {
        question: 'What is BIOS/UEFI?',
        options: ['A type of antivirus software', 'The computer\'s main operating system', 'Firmware used to perform hardware initialization during booting', 'A graphics-intensive video game'],
        correctAnswer: 'Firmware used to perform hardware initialization during booting',
        explanation: 'BIOS (Basic Input/Output System) or the more modern UEFI (Unified Extensible Firmware Interface) is the firmware that initializes the hardware when you turn on your computer, before the operating system loads.'
    },
     {
        question: 'What does "SSD" stand for?',
        options: ['Solid State Drive', 'Super Speed Drive', 'System Storage Device', 'Secure Software Data'],
        correctAnswer: 'Solid State Drive',
        explanation: 'An SSD is a storage device that uses integrated circuit assemblies to store data persistently, typically using flash memory.'
    },
    {
        question: 'What is the function of a heat sink in a computer?',
        options: ['To increase processing speed', 'To store data', 'To dissipate heat from a component like the CPU', 'To provide electrical power'],
        correctAnswer: 'To dissipate heat from a component like the CPU',
        explanation: 'A heat sink is a passive heat exchanger that transfers the heat generated by an electronic or a mechanical device to a fluid medium, often air, where it is dissipated away from the device.'
    }
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
    },
    {
        question: 'What is the purpose of a "System Restore" in Windows?',
        options: ['To delete all personal files', 'To reinstall the operating system', 'To revert system files and settings to an earlier point in time', 'To update drivers'],
        correctAnswer: 'To revert system files and settings to an earlier point in time',
        explanation: 'System Restore allows a user to revert their computer\'s state (including system files, installed applications, Windows Registry, and system settings) to that of a previous point in time, which can be used to recover from system malfunctions or other problems.'
    },
    {
        question: 'If an application is frozen and not responding, what is the most common Windows utility to close it?',
        options: ['Command Prompt', 'Control Panel', 'Task Manager', 'File Explorer'],
        correctAnswer: 'Task Manager',
        explanation: 'Task Manager can be used to view and manage running processes and applications. You can use it to force-close unresponsive programs.'
    },
    {
        question: 'What is "disk fragmentation"?',
        options: ['A way to clean a hard drive', 'When a single file is stored in separate pieces on a disk', 'A type of virus', 'A hardware failure'],
        correctAnswer: 'When a single file is stored in separate pieces on a disk',
        explanation: 'Disk fragmentation occurs when a file is broken up into pieces to fit on the disk. It can slow down the computer because it takes longer to read the different pieces of the file.'
    },
    {
        question: 'Which of the following is a common symptom of a malware infection?',
        options: ['Computer running faster than usual', 'Unexpected pop-up ads and browser redirects', 'Longer battery life', 'More free hard drive space'],
        correctAnswer: 'Unexpected pop-up ads and browser redirects',
        explanation: 'Malware (malicious software) often manifests as unwanted ads, changes to your browser homepage or search engine, and general system instability.'
    },
    {
        question: 'In macOS, what is the equivalent of the Windows Task Manager for managing applications?',
        options: ['System Preferences', 'Finder', 'Activity Monitor', 'Terminal'],
        correctAnswer: 'Activity Monitor',
        explanation: 'Activity Monitor on macOS shows the processes running on your Mac, so you can manage them and see how they affect your Mac\'s activity and performance.'
    },
    {
        question: 'What does it mean to "update a driver"?',
        options: ['To buy a new hardware component', 'To install a new version of software for a hardware device', 'To clean the computer\'s registry', 'To defragment the hard drive'],
        correctAnswer: 'To install a new version of software for a hardware device',
        explanation: 'A driver is software that allows your computer\'s operating system to communicate with a hardware device. Updating it can fix bugs, add features, and improve performance.'
    },
    {
        question: 'What is the "Blue Screen of Death" (BSOD)?',
        options: ['A screensaver', 'A feature of antivirus software', 'A critical system error in Windows', 'A normal shutdown screen'],
        correctAnswer: 'A critical system error in Windows',
        explanation: 'A BSOD is an error screen displayed on a Windows computer system following a fatal system error. It indicates a system crash, in which the operating system has reached a condition where it can no longer operate safely.'
    },
    {
        question: 'What is the first step you should take if your computer won\'t turn on?',
        options: ['Open the computer case', 'Buy a new computer', 'Check all power connections and cables', 'Reinstall the operating system'],
        correctAnswer: 'Check all power connections and cables',
        explanation: 'Before assuming a major hardware failure, always check the most basic potential issues first. Ensure the computer is plugged in, the outlet has power, and all cables are securely connected.'
    }
  ]
};
