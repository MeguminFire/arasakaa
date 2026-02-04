import type {
  User,
  StatCard,
  ProgressItem,
  LeaderboardEntry,
  Game,
  Quiz,
  Lesson,
  QuizQuestion,
  ForumPost,
  Comment,
  GameScenario,
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
  PowerOff,
  FileX,
  Terminal,
  MessagesSquare,
} from 'lucide-react';
import { getPlaceholderImage } from './placeholder-images';

export const user: User = {
  uid: 'default-user',
  email: 'jett.runner.default@example.com',
  name: 'Jett Runner',
  avatar: '',
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

export const leaderboard: LeaderboardEntry[] = [
    {
    rank: 1,
    user: {
      uid: 'lead-1',
      email: 'glitch@example.com',
      name: 'Glitch',
      avatar: '',
    },
    score: 2150,
    time: '03:45',
  },
  {
    rank: 2,
    user: {
      uid: 'lead-2',
      email: '8bit@example.com',
      name: '8-Bit',
      avatar: '',
    },
    score: 2010,
    time: '04:12',
  },
  {
    rank: 3,
    user: {
      uid: 'lead-3',
      email: 'trinity@example.com',
      name: 'Trinity',
      avatar: '',
    },
    score: 1980,
    time: '04:30',
  }
];

export const games: Game[] = [
  {
    id: '1',
    title: 'The Uncooperative Printer',
    description: 'A user can\'t print. Investigate the scene, take action, and resolve the issue.',
    topic: 'Printer issues',
    difficulty: 'easy',
    icon: Printer,
  },
  {
    id: '2',
    title: 'The Case of the Slow Computer',
    description: 'A user reports their PC is running at a crawl. Diagnose the bottleneck and restore its speed.',
    topic: 'Slow computer performance',
    difficulty: 'easy',
    icon: Cpu,
  },
  {
    id: '3',
    title: 'Mysterious Wi-Fi Drops',
    description: 'A laptop keeps losing its connection. Hunt down the cause of the instability and secure the signal.',
    topic: 'Intermittent Wi-Fi connection',
    difficulty: 'medium',
    icon: Router,
  },
  {
    id: '4',
    title: 'The Blue Screen of Dread',
    description: 'A critical system failure is causing a BSOD. Analyze the situation and bring the system back online.',
    topic: 'Blue Screen of Death (BSOD)',
    difficulty: 'medium',
    icon: ShieldCheck,
  },
   {
    id: '5',
    title: 'The Silent Desktop',
    description: 'A user presses the power button on their desktop, but nothing happens. Find the point of failure.',
    topic: 'No Power',
    difficulty: 'easy',
    icon: PowerOff,
  },
  {
    id: '6',
    title: 'The Installation Blockade',
    description: 'A user is unable to install a critical piece of software. Determine what is blocking the installation.',
    topic: 'Software Installation Issues',
    difficulty: 'hard',
    icon: FileX,
  },
];

export const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Anatomy of a Computer',
      description: 'Understand the core components that make a computer work, from the CPU to the PSU.',
      href: '/learn/components',
      icon: Cpu,
      quizId: '2'
    },
    {
      id: '2',
      title: 'Networking Fundamentals',
      description: 'Learn the basics of how devices communicate, from IP addresses to routers and switches.',
      href: '/learn/networking',
      icon: Network,
      quizId: '1'
    },
    {
      id: '3',
      title: 'The Art of Troubleshooting',
      description: 'Master the 6-step methodology for diagnosing and solving any technical problem.',
      href: '/learn/troubleshooting',
      icon: Wrench,
      quizId: '3'
    }
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
  {
    id: '4',
    title: 'Command Line Basics',
    description: 'Test your knowledge of essential commands for Windows and Unix-like systems.',
    topic: 'Software',
    icon: Terminal,
  }
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
  ],
  '4': [
    {
      question: "In Windows Command Prompt, what command is used to see the contents of the current directory?",
      options: [ 'ls', 'dir', 'show', 'list' ],
      correctAnswer: 'dir',
      explanation: '`dir` is the command used in Windows (CMD and PowerShell) to list the files and folders in the current directory. `ls` is the equivalent in Unix-like systems.'
    },
    {
        question: "What does the `cd` command do in both Windows and Unix-like systems?",
        options: [ 'Create Directory', 'Copy Directory', 'Change Directory', 'Clear Directory' ],
        correctAnswer: 'Change Directory',
        explanation: 'The `cd` command stands for "Change Directory" and is used to navigate between different folders in the file system.'
    },
    {
        question: "Which command is used to test network connectivity to another device?",
        options: [ 'netstat', 'ipconfig', 'ping', 'tracert' ],
        correctAnswer: 'ping',
        explanation: '`ping` sends ICMP Echo Request packets to a target host to test if it is reachable and measures the round-trip time for the packets.'
    },
    {
        question: "In PowerShell or Bash, what does `mkdir` do?",
        options: [ 'Move a directory', 'Make a new directory', 'Mirror a directory', 'Mount a directory' ],
        correctAnswer: 'Make a new directory',
        explanation: '`mkdir` stands for "make directory" and is used to create a new folder (directory) in the file system.'
    },
    {
        question: "What is the purpose of the `ipconfig` command in Windows?",
        options: [ 'To configure internet proxy settings', 'To display the current TCP/IP network configuration values', 'To connect to a VPN', 'To ping multiple addresses at once' ],
        correctAnswer: 'To display the current TCP/IP network configuration values',
        explanation: '`ipconfig` is a command-line tool used to view and manage the IP address, subnet mask, default gateway, and other network settings of a device. The Unix equivalent is often `ifconfig` or `ip addr`.'
    },
    {
        question: "How do you clear the screen in most terminal applications?",
        options: [ 'clear or cls', 'erase', 'wipe', 'reset' ],
        correctAnswer: 'clear or cls',
        explanation: '`cls` is the command to clear the screen in Windows Command Prompt, while `clear` is used in most Unix-like shells and PowerShell.'
    },
    {
        question: "What does `sfc /scannow` do in Windows?",
        options: [ 'Scans for viruses', 'Checks hard drive for errors', 'Scans and verifies the integrity of all protected system files', 'Shows file contents' ],
        correctAnswer: 'Scans and verifies the integrity of all protected system files',
        explanation: 'The System File Checker (`sfc`) tool scans for and attempts to repair corrupted or missing Windows system files.'
    },
    {
        question: "Which command in Unix-like systems (like Linux or macOS) is used to view the contents of a file?",
        options: [ 'cat', 'type', 'open', 'view' ],
        correctAnswer: 'cat',
        explanation: 'The `cat` (concatenate) command is commonly used to display the content of files. The `type` command serves a similar purpose in Windows.'
    },
    {
        question: "What does the `>` character typically do in a command line?",
        options: [ 'Executes the command twice', 'Deletes a file', 'Redirects the output of a command to a file', 'Searches for text' ],
        correctAnswer: 'Redirects the output of a command to a file',
        explanation: 'The `>` operator is used for output redirection. For example, `dir > files.txt` would write the directory listing into a file named files.txt instead of displaying it on the screen.'
    },
    {
        question: "In PowerShell or Bash, how do you stop a currently running process?",
        options: [ 'Esc', 'Ctrl+S', 'Ctrl+C', 'Ctrl+X' ],
        correctAnswer: 'Ctrl+C',
        explanation: 'Pressing `Ctrl+C` sends an interrupt signal to the foreground process, which usually causes it to terminate immediately.'
    }
  ]
};

export const forumPosts: ForumPost[] = [
    {
        id: 'post-1',
        user: {
            uid: 'forum-user-1',
            name: 'Cypher',
            email: 'cypher@example.com',
            avatar: '',
        },
        title: 'My new custom build keeps getting BSOD with MEMORY_MANAGEMENT error.',
        content: 'Hey everyone, I just finished my first PC build. Specs: Ryzen 7 7800X3D, RTX 4080, 32GB DDR5 6000MHz RAM. It boots up fine, but whenever I try to run a game for more than 10 minutes, I get a Blue Screen of Death with the "MEMORY_MANAGEMENT" stop code. I\'ve tried reseating the RAM, but it didn\'t help. Is it a bad stick? Or could it be a setting in the BIOS I missed? Any help is appreciated!',
        deviceType: 'Desktop PC',
        brand: 'Custom Build',
        createdAt: '2 hours ago',
        replies: 2,
        views: 88,
        comments: [
            {
                id: 'comment-1-1',
                user: leaderboard[0].user,
                content: 'MEMORY_MANAGEMENT is almost always RAM. Did you run Windows Memory Diagnostic? Also, check if your motherboard BIOS is up to date. Sometimes new RAM kits need a BIOS update for stability.',
                createdAt: '1 hour ago'
            },
            {
                id: 'comment-1-2',
                user: user,
                content: 'Also make sure you enabled the correct EXPO/XMP profile in your BIOS. If the speed/timings are wrong, it can cause instability.',
                createdAt: '45 minutes ago'
            }
        ]
    },
    {
        id: 'post-2',
        user: {
            uid: 'forum-user-2',
            name: 'Echo',
            email: 'echo@example.com',
            avatar: '',
        },
        title: 'Dell XPS 15 trackpad is randomly freezing and jumping.',
        content: 'My Dell XPS 15 (2023 model) is having a really annoying trackpad issue. About every 5 minutes, the cursor will either completely freeze for a few seconds, or it will jump to a random corner of the screen. Using a USB mouse works perfectly fine. I\'ve already updated all the drivers through Dell\'s website and Windows Update. Has anyone else experienced this? Is it a known hardware fault?',
        deviceType: 'Laptop',
        brand: 'Dell',
        createdAt: '1 day ago',
        replies: 1,
        views: 256,
        comments: [
            {
                id: 'comment-2-1',
                user: leaderboard[2].user,
                content: 'I had a similar issue on an older XPS. It turned out to be a grounding issue with the chassis. Does it happen more when the laptop is plugged in and charging?',
                createdAt: '22 hours ago'
            }
        ]
    }
];

export const scenarios: Record<string, GameScenario> = {
  '1': {
    id: '1',
    title: 'The Uncooperative Printer',
    initialSituation: "A user reports they can't print a critical document to the office's shared HP LaserJet. The printer is on, but nothing comes out when they click 'Print'.",
    steps: [
      {
        title: 'Step 1: The Print Queue',
        description: 'You check the user\'s computer and see the print job is stuck in the queue with a "Spooling" status. What is your first action?',
        hint: 'A stuck job in the queue is often a software or service issue on the local machine.',
        actions: [
          { text: 'Stop and restart the "Print Spooler" service on the user\'s computer.', isCorrect: true, feedback: 'Correct! Restarting the spooler service clears the stuck job. You ask the user to try printing again, and it works!' },
          { text: 'Immediately restart the printer.', isCorrect: false, feedback: 'While a common step, the issue seems to be with the computer sending the job, not the printer receiving it. The job remains stuck after the restart.' },
          { text: 'Tell the user to restart their computer.', isCorrect: false, feedback: 'This would likely fix it, but it\'s a heavy-handed approach. A more targeted solution is faster and more professional.' },
        ],
      },
    ],
    finalSolution: "The problem was a stalled Print Spooler service on the user's local machine. By stopping and restarting the service via services.msc, the stuck print job was cleared, and printing functionality was restored without needing to restart the computer or the printer."
  },
  '2': {
    id: '2',
    title: 'The Case of the Slow Computer',
    initialSituation: "A graphic designer's workstation has become extremely slow, especially when using Adobe Photoshop. Opening large files takes minutes, and applying filters causes the system to hang.",
    steps: [
      {
        title: 'Step 1: Initial Diagnosis',
        description: 'You open Task Manager to check system resource usage while Photoshop is running. What do you observe?',
        hint: 'Look for the component that is at or near 100% utilization.',
        actions: [
          { text: 'CPU usage is at 30%, Memory (RAM) usage is at 95%, and the Disk is at 5%.', isCorrect: true, feedback: 'Excellent observation. The high RAM usage is the primary suspect. The system is likely running out of memory and using the much slower page file on the disk.' },
          { text: 'CPU usage is at 98%, Memory is at 40%, and Disk is at 10%.', isCorrect: false, feedback: 'While high CPU usage can cause slowness, it\'s less common for it to be the bottleneck for large file operations in Photoshop compared to RAM.' },
          { text: 'Disk usage is at 100%, Memory is at 50%, and CPU is at 20%.', isCorrect: false, feedback: '100% disk usage would be a major bottleneck, but in this case, the RAM is the actual culprit leading to potential disk thrashing.' },
        ],
      },
      {
        title: 'Step 2: Formulate a Plan',
        description: 'You\'ve determined that insufficient RAM is the likely cause. What is the most effective and permanent solution?',
        hint: 'Closing applications is a temporary fix. What will solve the problem for good?',
        actions: [
          { text: 'Recommend a RAM upgrade for the workstation.', isCorrect: true, feedback: 'Correct. For a professional graphic designer, having enough physical RAM is crucial. You recommend upgrading from 16GB to 32GB or 64GB.' },
          { text: 'Advise the user to close other applications while using Photoshop.', isCorrect: false, feedback: 'This is a good short-term mitigation strategy, but it doesn\'t solve the root problem that their workflow requires more memory than the system has.' },
          { text: 'Run a virus scan on the computer.', isCorrect: false, feedback: 'While malware can cause slowdowns, the evidence from Task Manager points directly to a resource bottleneck, not an infection.' },
        ],
      }
    ],
    finalSolution: "The workstation's performance issues were caused by insufficient RAM. Task Manager showed 95% memory utilization. The solution was to recommend and subsequently install a RAM upgrade, which permanently resolved the bottleneck."
  },
  '3': {
    id: '3',
    title: 'Mysterious Wi-Fi Drops',
    initialSituation: 'A user in the marketing department complains their laptop constantly disconnects from the corporate Wi-Fi, while their neighbor at the next desk has no issues.',
    steps: [
      {
        title: 'Step 1: Gather Information',
        description: 'You ask the user for more details. They say it only happens in the office, not at home, and seems to be worse in the afternoon. Your first diagnostic step is to check their Wi-Fi signal strength. What command do you use?',
        hint: 'Look for a command that provides detailed information about the wireless network.',
        actions: [
          { text: '`netsh wlan show interfaces` in Command Prompt.', isCorrect: true, feedback: 'Correct. This command shows a wealth of information, including the current signal strength, which you notice is only 40%.' },
          { text: '`ipconfig /all` in Command Prompt.', isCorrect: false, feedback: '`ipconfig` is great for checking IP address information but does not show real-time Wi-Fi signal strength.' },
          { text: '`ping google.com -t` in Command Prompt.', isCorrect: false, feedback: 'Pinging can show you when the connection drops, but it doesn\'t tell you *why*. You need to check the signal quality first.' },
        ]
      },
      {
        title: 'Step 2: Analyze the Signal',
        description: 'The signal strength is very low (40%), which is strange given their proximity to other working users. You suspect interference. What is a common source of Wi-Fi interference in an office?',
        hint: 'Think about other devices that use the 2.4GHz frequency.',
        actions: [
          { text: 'A new microwave oven in the nearby breakroom.', isCorrect: true, feedback: 'Exactly. You learn a new powerful microwave was installed. When it runs during lunch, it floods the 2.4GHz spectrum with interference, causing the connection drops for the user on the edge of the access point\'s range.' },
          { text: 'The user\'s new wireless mouse.', isCorrect: false, feedback: 'While possible, the small transmitter from a mouse is unlikely to cause such significant Wi-Fi disruption.' },
          { text: 'A recent Windows update.', isCorrect: false, feedback: 'A driver issue from an update is a possibility, but physical interference is a more likely cause for location-specific, time-dependent issues.' },
        ]
      },
      {
        title: 'Step 3: Implement the Solution',
        description: 'You\'ve identified microwave interference as the probable cause. What is the best long-term solution?',
        hint: 'How can you avoid the crowded 2.4GHz frequency?',
        actions: [
          { text: 'Force the user\'s laptop to connect to the 5GHz Wi-Fi band instead of the 2.4GHz band.', isCorrect: true, feedback: 'Perfect. The 5GHz band is not affected by the microwave. You configure their laptop\'s Wi-Fi adapter settings to prefer the 5GHz band, which immediately stabilizes their connection.' },
          { text: 'Ask everyone to stop using the microwave.', isCorrect: false, feedback: 'This is not a practical or popular solution in an office environment.' },
          { text: 'Move the user\'s desk away from the breakroom.', isCorrect: false, feedback: 'This could work, but it\'s often disruptive. Modifying the technology is usually a better first choice than modifying the physical office layout.' },
        ]
      }
    ],
    finalSolution: 'The user\'s Wi-Fi was dropping due to interference from a new microwave in the breakroom operating on the 2.4GHz band. The solution was to configure the laptop\'s wireless adapter to prefer the 5GHz band, which is not susceptible to this type of interference.'
  },
  '4': {
    id: '4',
    title: 'The Blue Screen of Dread',
    initialSituation: 'A user receives a Blue Screen of Death (BSOD) with the error code `IRQL_NOT_LESS_OR_EQUAL`. The computer restarts but crashes again shortly after logging in.',
    steps: [
      {
        title: 'Step 1: Initial Action',
        description: 'The computer is unstable and crashes repeatedly. What is the first thing you should do to create a stable environment for troubleshooting?',
        hint: 'You need to load Windows in a minimal state to prevent the faulty driver or software from running.',
        actions: [
          { text: 'Boot the computer into Safe Mode.', isCorrect: true, feedback: 'Correct. Safe Mode loads only essential drivers. The computer successfully boots into Safe Mode and remains stable, strongly suggesting a driver or software issue.' },
          { text: 'Attempt a System Restore immediately.', isCorrect: false, feedback: 'System Restore might fail if the system is too unstable to complete the process. It\'s better to stabilize the system first.' },
          { text: 'Open the case and reseat the RAM.', isCorrect: false, feedback: 'While RAM issues can cause BSODs, the `IRQL_NOT_LESS_OR_EQUAL` error most often points to a driver issue. Physical intervention is not the best first step here.' },
        ]
      },
      {
        title: 'Step 2: Identify the Culprit',
        description: 'Now that you are in Safe Mode, you need to find out what changed recently. The user mentions they just installed a new driver for their webcam. How do you address this?',
        hint: 'Device Manager is the tool for managing hardware and drivers.',
        actions: [
          { text: 'Open Device Manager, find the new webcam, and select "Roll Back Driver".', isCorrect: true, feedback: 'Excellent. Rolling back the driver reverts it to the previously installed, stable version. After a reboot into normal mode, the BSODs are gone.' },
          { text: 'Uninstall the webcam from Device Manager.', isCorrect: false, feedback: 'This is a bit extreme. Rolling back is a less destructive first step. If that doesn\'t work, then you could try uninstalling.' },
          { text: 'Use System Restore to go back to yesterday.', isCorrect: false, feedback: 'This would also work, but it\'s a broader change. Rolling back the specific driver is a more precise and targeted fix.' },
        ]
      }
    ],
    finalSolution: 'The `IRQL_NOT_LESS_OR_EQUAL` BSOD was caused by a faulty, recently installed webcam driver. The solution was to boot into Safe Mode, use Device Manager to roll back the webcam driver to its previous version, and then restart the computer normally.'
  },
  '5': {
    id: '5',
    title: 'The Silent Desktop',
    initialSituation: 'A user reports that their desktop computer will not turn on. When they press the power button, nothing happens—no lights, no sounds, no fans.',
    steps: [
        {
            title: 'Step 1: The Most Basic Check',
            description: "You're at the user's desk. What is the absolute first thing you should verify?",
            hint: 'Think "power pathway". Start from the wall.',
            actions: [
                { text: 'Check that the power cable is securely plugged into both the wall outlet and the computer\'s PSU.', isCorrect: true, feedback: 'Correct. You find the cable was slightly loose at the PSU. After pushing it in firmly, the computer powers on.' },
                { text: 'Open the computer case to check internal connections.', isCorrect: false, feedback: 'This is too invasive for a first step. Always check external, simple solutions before opening the hardware.' },
                { text: 'Press and hold the power button for 10 seconds.', isCorrect: false, feedback: 'This can sometimes help with laptops, but for a desktop with no signs of life, an external power issue is far more likely.' },
            ]
        }
    ],
    finalSolution: 'The computer failed to power on because the power cable was not fully seated in the Power Supply Unit (PSU). Ensuring a secure connection resolved the issue immediately.'
  },
  '6': {
    id: '6',
    title: 'The Installation Blockade',
    initialSituation: 'An accountant is trying to install a new version of their tax software, but the installation fails every time with a generic "Installation failed" error. They have administrator rights.',
    steps: [
      {
        title: 'Step 1: Look for Clues',
        description: 'The error message is unhelpful. Where in Windows can you look for more detailed logs about application installations and errors?',
        hint: 'There is a system tool specifically for logging events.',
        actions: [
          { text: 'Windows Event Viewer, under "Windows Logs" -> "Application".', isCorrect: true, feedback: 'Correct. You open Event Viewer and find a detailed error log for the failed installation, which mentions a conflict with a running process.' },
          { text: 'Task Manager.', isCorrect: false, feedback: 'Task Manager is for viewing active processes, not for historical error logs.' },
          { text: 'The C:\\Windows\\System32 directory.', isCorrect: false, feedback: 'While system files are there, it\'s not the right place to look for application error logs.' },
        ]
      },
      {
        title: 'Step 2: Resolve the Conflict',
        description: 'The Event Viewer log indicates a conflict with the company\'s antivirus software, which is locking a file the installer needs to modify. What is the safest course of action?',
        hint: 'How can you temporarily stop the conflicting software without compromising security long-term?',
        actions: [
          { text: 'Temporarily disable the antivirus\'s real-time protection, run the installer, and then immediately re-enable the antivirus.', isCorrect: true, feedback: 'Perfect. Disabling the AV allows the installation to complete successfully. You re-enable it right after, ensuring the system remains protected.' },
          { text: 'Uninstall the antivirus software completely.', isCorrect: false, feedback: 'This is a major security risk and is not necessary. A temporary disable is the correct procedure.' },
          { text: 'Try running the installer again and again until it works.', isCorrect: false, feedback: 'If a file is locked, this will never work. You must resolve the process conflict.' },
        ]
      }
    ],
    finalSolution: 'The software installation was being blocked by the antivirus program. By checking the Application log in Windows Event Viewer, the conflict was identified. The solution was to temporarily disable the antivirus, run the installation, and then immediately re-enable the protection.'
  }
};
