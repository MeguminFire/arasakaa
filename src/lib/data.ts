import type {
  User,
  StatCard,
  ProgressItem,
  Title,
  LeaderboardEntry,
  Game,
  Quiz,
  Lesson,
  QuizQuestion,
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
} from 'lucide-react';
import { getPlaceholderImage } from './placeholder-images';

export const user: User = {
  name: 'Alex Titan',
  email: 'alex.titan.default@example.com',
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
      name: 'Glitch',
      avatar: getPlaceholderImage('avatar-2')?.imageUrl ?? '',
      title: 'System Solver',
      email: 'glitch@example.com'
    },
    score: 2150,
    time: '03:45',
  },
  {
    rank: 2,
    user: {
      name: '8-Bit',
      avatar: getPlaceholderImage('avatar-3')?.imageUrl ?? '',
      title: 'Hardware Hero',
      email: '8bit@example.com'
    },
    score: 2010,
    time: '04:12',
  },
  {
    rank: 3,
    user: {
      name: 'Trinity',
      avatar: getPlaceholderImage('avatar-4')?.imageUrl ?? '',
      title: 'PC Rookie',
      email: 'trinity@example.com'
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

export const gameScenarios: GameScenario[] = [
  {
    id: '1',
    title: "The Uncooperative Printer",
    initialSituation: "A user reports, 'I can't print my document! I've tried sending it three times and nothing happens. The printer is on, I can see the little green light!'",
    finalSolution: "The problem was a simple paper jam combined with a stalled print queue. The optimal path was to first check the physical status of the printer, clear the paper jam, and then clear the software-side print queue in Windows.",
    steps: [
      {
        title: "Initial Check",
        description: "You're at the user's desk. The printer is on, but the screen displays 'Error: Paper Jam'. What's your first move?",
        hint: "Physical problems are often the easiest to check first. Look at the printer itself before diving into software.",
        actions: [
          { text: "Check the printer's physical status (paper, ink, screen messages) and clear the visible paper jam.", isCorrect: true, feedback: "Good call. You open the printer tray and immediately spot a crumpled piece of paper caught in the feed mechanism. You carefully remove the paper jam." },
          { text: "Immediately restart the user's computer.", isCorrect: false, feedback: "Restarting the computer won't clear a physical paper jam. The problem persists." },
          { text: "Reinstall the printer driver.", isCorrect: false, feedback: "A bit premature. While drivers can be an issue, the printer screen is explicitly telling you there's a physical problem." }
        ]
      },
      {
        title: "Software Glitch",
        description: "After clearing the paper jam, the printer's error message is gone, but the document still isn't printing. The user's original three print jobs seem to be stuck somewhere in the system.",
        hint: "When a print job is sent, it goes into a 'queue' on the computer. If a job fails, it can block all subsequent jobs.",
        actions: [
          { text: "Open the Windows print queue and cancel all pending documents.", isCorrect: true, feedback: "Excellent. You open 'Devices and Printers', find the print queue, and see three 'Error - Printing' documents. You cancel them all. The queue is now clear." },
          { text: "Unplug the printer and plug it back in.", isCorrect: false, feedback: "Power cycling the printer is a good step, but in this case, the stalled jobs are stored on the computer. The jobs are still stuck." },
          { text: "Tell the user to try printing again.", isCorrect: false, feedback: "The new print job just gets stuck behind the three errored ones. Nothing new comes out." }
        ]
      },
      {
        title: "Final Confirmation",
        description: "The paper jam is cleared and the print queue is empty. It's time to see if the problem is truly solved.",
        hint: "Never assume, always verify. The final step of any troubleshooting process is to confirm the fix works.",
        actions: [
          { text: "Ask the user to print a single test page.", isCorrect: true, feedback: "Success! The test page prints out perfectly. You've resolved the issue and can confidently close the case." },
          { text: "Assume it's fixed and walk away.", isCorrect: false, feedback: "Never assume! Verification is a key step. You might have missed something, and the user will just call you back." },
          { text: "Print 100 copies of a large document to 'stress test' it.", isCorrect: false, feedback: "A bit of an overkill and a waste of paper. A single test page is sufficient to confirm the fix." }
        ]
      }
    ]
  },
  {
    id: '2',
    title: "The Case of the Slow Computer",
    initialSituation: "A designer complains, 'My computer is so slow! It takes forever to open Photoshop, and even moving windows around feels laggy. This started happening a few days ago.'",
    finalSolution: "The computer's performance was being crippled by too many resource-heavy applications launching at startup and a recently installed, suspicious browser extension that was consuming CPU in the background. The solution was to clean up the startup programs using Task Manager and remove the malware.",
    steps: [
      {
        title: "Resource Analysis",
        description: "The user's desktop is cluttered with icons. You need to figure out what's consuming the system resources.",
        hint: "The Task Manager is your best friend for seeing what's currently running and how much CPU, Memory, and Disk it's using.",
        actions: [
          { text: "Open the Task Manager to check CPU, Memory, and Disk usage.", isCorrect: true, feedback: "Smart move. Task Manager shows Memory usage is high (90%), and a process named 'WebBooster.exe' is constantly using 30% of the CPU." },
          { text: "Immediately run a virus scan.", isCorrect: false, feedback: "A good instinct, but it's better to see what's happening in real-time first. A full scan could take a while and slow the machine down even more." },
          { text: "Suggest upgrading the RAM.", isCorrect: false, feedback: "Throwing hardware at a problem isn't always the answer. You need to diagnose the cause first. The high memory usage could be a symptom, not the root problem." }
        ]
      },
      {
        title: "Identify the Culprit",
        description: "You've identified a suspicious process, 'WebBooster.exe', and noted that many non-essential applications are running. What's the plan?",
        hint: "Check the 'Startup' tab in Task Manager to see what programs launch automatically when the computer boots up.",
        actions: [
          { text: "Go to the 'Startup' tab in Task Manager and disable unnecessary applications.", isCorrect: true, feedback: "Good. You disable several cloud sync tools and manufacturer 'bloatware'. This will reduce the background load on future startups." },
          { text: "Right-click and 'End Task' on every application using a lot of memory.", isCorrect: false, feedback: "This might provide temporary relief, but the problem will return on the next reboot if they are startup items." },
          { text: "Ignore 'WebBooster.exe' and focus only on the known applications.", isCorrect: false, feedback: "Ignoring a suspicious, high-resource process is a mistake. It's the most likely cause of the sudden slowdown." }
        ]
      },
      {
        title: "Eradication and Verification",
        description: "You've disabled the startup bloat. Now you need to deal with the 'WebBooster.exe' malware.",
        hint: "The safest way to remove malware is with a dedicated scanner, rather than just deleting files manually.",
        actions: [
          { text: "Run a full malware scan to remove 'WebBooster.exe' and any other threats, then reboot.", isCorrect: true, feedback: "Perfect. The antivirus finds and quarantines the malware. After a reboot, you open Task Manager again. CPU and Memory usage are now at normal levels. Photoshop opens quickly. The mission is a success." },
          { text: "Manually delete the 'WebBooster.exe' file.", isCorrect: false, feedback: "Risky. Malware often has multiple components or registry entries. Simply deleting the .exe might not remove it entirely. A proper scan is safer and more thorough." },
          { text: "Just disable the process in Task Manager and hope for the best.", isCorrect: false, feedback: "This is only a temporary fix. The malware will likely restart itself or cause other issues. It needs to be properly removed." }
        ]
      }
    ]
  },
  {
    id: '3',
    title: "Mysterious Wi-Fi Drops",
    initialSituation: "'My laptop keeps disconnecting from the Wi-Fi!' a user exclaims. 'It works for a few minutes, then the internet is gone. I have to disconnect and reconnect to make it work again.'",
    finalSolution: "The issue was caused by an outdated and corrupted Wi-Fi network adapter driver. The correct troubleshooting path was to identify that only one device was affected, then attempt to update, and ultimately reinstall, the driver for that specific device.",
    steps: [
      {
        title: "Isolate the Problem",
        description: "The user's laptop shows a Wi-Fi connection, but a yellow triangle indicates 'No Internet'. What's the first thing you verify?",
        hint: "Is it just this one device, or is the whole network down? This is the most important first question.",
        actions: [
          { text: "Check if other devices (like your phone) can connect to the same Wi-Fi network.", isCorrect: true, feedback: "Crucial first step. Your phone connects to the Wi-Fi and accesses the internet just fine. This proves the network itself is working and the problem is likely with the user's laptop." },
          { text: "Immediately restart the office's main Wi-Fi router.", isCorrect: false, feedback: "This would affect everyone in the office. Since you haven't confirmed the problem is the network, this is a disruptive and likely unnecessary step." },
          { text: "Tell the user to move closer to the Wi-Fi router.", isCorrect: false, feedback: "While signal strength can be an issue, the user said it works for a few minutes before dropping. This suggests a software or hardware issue, not just a weak signal." }
        ]
      },
      {
        title: "Driver Investigation",
        description: "You've confirmed the issue is isolated to the laptop. The connection is unstable, suggesting a software or hardware fault on the device.",
        hint: "Device Manager in Windows is the central place to check the status of all hardware and their drivers.",
        actions: [
          { text: "Open Device Manager and check the status of the Network Adapter.", isCorrect: true, feedback: "You navigate to Device Manager and see a small yellow warning icon next to the 'Intel Wi-Fi 6' adapter. This is a clear sign of a driver issue." },
          { text: "Run the Windows Network Troubleshooter.", isCorrect: false, feedback: "The troubleshooter runs for a few minutes and inconclusively suggests 'Try restarting the router,' which you've already ruled out as the main problem." },
          { text: "Run `ipconfig /release` and `ipconfig /renew` in the command prompt.", isCorrect: false, feedback: "This can solve IP address conflicts, but the warning icon in Device Manager points to a lower-level driver problem." }
        ]
      },
      {
        title: "Implement the Fix",
        description: "Device Manager indicates a problem with the Wi-Fi driver. How do you resolve it?",
        hint: "Sometimes, simply updating a driver isn't enough if the existing files are corrupt. A clean re-installation is often more effective.",
        actions: [
          { text: "Right-click the adapter, choose 'Uninstall device' (and check the box to delete the driver software), then reboot the laptop.", isCorrect: true, feedback: "This is the correct procedure. Upon rebooting, Windows automatically finds the hardware and installs a fresh, working driver. The Wi-Fi connection is now stable and fast. Problem solved." },
          { text: "Right-click the adapter and choose 'Update driver'.", isCorrect: false, feedback: "You try this first, but Windows reports 'The best drivers for your device are already installed.' This doesn't fix the corruption issue." },
           { text: "Disable and then re-enable the adapter in Device Manager.", isCorrect: false, feedback: "This is a good quick step to try, but it often doesn't resolve underlying corruption. In this case, the problem returns after a few minutes." }
        ]
      }
    ]
  },
  {
    id: '4',
    title: "The Blue Screen of Dread",
    initialSituation: "A user panics. 'I was working on a huge spreadsheet and my computer just crashed! It showed a scary blue screen with a sad face. Now it restarts, but I'm afraid it will happen again.'",
    finalSolution: "The Blue Screen of Death was caused by a faulty stick of RAM. By analyzing the error message (MEMORY_MANAGEMENT) and running the built-in Windows Memory Diagnostic tool, the faulty hardware was identified.",
    steps: [
      {
        title: "Information Gathering",
        description: "The user has rebooted, and things seem normal for now. You need to find out what caused the crash.",
        hint: "The most important piece of information on a BSOD is the 'Stop Code', which often looks like 'MEMORY_MANAGEMENT' or 'IRQL_NOT_LESS_OR_EQUAL'.",
        actions: [
          { text: "Ask the user for the specific 'Stop Code' shown on the blue screen.", isCorrect: true, feedback: "The user luckily snapped a photo with their phone. The stop code is 'MEMORY_MANAGEMENT'. This is a massive clue, pointing directly towards a RAM issue." },
          { text: "Check if the computer feels hot.", isCorrect: false, feedback: "Overheating can cause crashes, but it's not the most direct investigation. The specific error code is more important." },
          { text: "Assume it was a one-time glitch and tell the user to keep working.", isCorrect: false, feedback: "Ignoring a BSOD is a recipe for disaster and data loss. These errors almost always indicate an underlying problem that needs to be addressed." }
        ]
      },
      {
        title: "Formulate a Theory",
        description: "The 'MEMORY_MANAGEMENT' stop code strongly suggests a problem with the computer's RAM. How do you test this theory?",
        hint: "Windows has a built-in tool specifically for testing RAM. You can find it by searching for 'Windows Memory Diagnostic' in the start menu.",
        actions: [
          { text: "Use the Windows Memory Diagnostic tool to test the RAM.", isCorrect: true, feedback: "This is the correct, non-invasive next step. You schedule the diagnostic to run on the next reboot. The user is informed it will take some time." },
          { text: "Open the computer and start re-seating the RAM sticks.", isCorrect: false, feedback: "This is a physical step that should be taken only after a software diagnostic confirms a hardware fault. It's invasive and might not be necessary." },
          { text: "Update the graphics card driver.", isCorrect: false, feedback: "While faulty drivers are a common cause of BSODs, the specific error code points to memory, not the GPU." }
        ]
      },
      {
        title: "Confirm and Resolve",
        description: "After the reboot, the Windows Memory Diagnostic tool runs. A few minutes in, it reports 'Hardware problems were detected'.",
        hint: "The diagnostic tool has confirmed your theory. The only remaining step is to replace the faulty hardware.",
        actions: [
          { text: "Document the error, power down the PC, and replace the faulty RAM stick.", isCorrect: true, feedback: "With the diagnostic confirming the theory, you now have a clear plan. You replace the bad RAM with a new stick, and the computer boots up and runs without any further crashes. You've conquered the Blue Screen of Dread." },
          { text: "Reinstall Windows.", isCorrect: false, feedback: "This is a drastic 'scorched earth' approach. It won't fix a hardware problem. The BSOD would almost certainly reappear after the reinstallation." },
           { text: "Ignore the error and hope it fixes itself.", isCorrect: false, feedback: "The diagnostic found a definite hardware fault. Ignoring it will lead to more crashes and potential data corruption." }
        ]
      }
    ]
  },
  {
    id: '5',
    title: "The Silent Desktop",
    initialSituation: "A frantic user calls you over. 'I press the power button, but absolutely nothing happens! No lights, no beeps, no fans spinning. It's completely dead.'",
    finalSolution: "The desktop computer was not receiving power because the surge protector it was plugged into had been tripped. The solution was to identify the external point of failure before inspecting internal components.",
    steps: [
      {
        title: "External Power Check",
        description: "You're looking at a completely unresponsive desktop computer. Where do you start?",
        hint: "Always check the simplest and most external things first. Is it plugged in? Is the outlet working?",
        actions: [
          { text: "Check that the power cable is securely plugged into both the PC and the wall outlet (or surge protector).", isCorrect: true, feedback: "A fundamental first step. You notice the PC is plugged into a surge protector. You press the power button on the PC again... still nothing." },
          { text: "Immediately open the computer case to check the internal power supply connections.", isCorrect: false, feedback: "Too soon! You should always rule out external power issues before opening the case." },
          { text: "Tell the user they probably need a new power supply unit (PSU).", isCorrect: false, feedback: "You can't conclude that yet. Many other things could be wrong. Diagnosis must come before conclusions." }
        ]
      },
      {
        title: "Isolating the Power Source",
        description: "The PC's power cable is secure. You suspect the issue might be the surge protector or the wall outlet itself.",
        hint: "How can you test if the power source is the problem? Try a known-good power source.",
        actions: [
          { text: "Plug a different, working device (like a lamp or phone charger) into the same surge protector.", isCorrect: true, feedback: "Excellent idea. You plug in a desk lamp, and it doesn't turn on. You then notice the 'reset' switch on the surge protector is sticking out. You press it, it clicks, and the lamp turns on!" },
          { text: "Replace the computer's power cable with a new one.", isCorrect: false, feedback: "While cables can fail, it's less common than a tripped surge protector or a dead outlet. It's better to test the source first." },
          { text: "Use a multimeter to test the voltage coming out of the PSU inside the computer.", isCorrect: false, feedback: "This is an advanced and unnecessary step at this stage. The problem is likely external to the PC." }
        ]
      },
      {
        title: "Final Confirmation",
        description: "You've reset the surge protector and confirmed it now provides power. The final step is to verify the original problem is solved.",
        hint: "Don't forget to test the actual problem device.",
        actions: [
          { text: "Press the power button on the desktop computer again.", isCorrect: true, feedback: "Success! The computer whirs to life, lights flash, and the monitor displays the boot screen. You've saved the day without even opening the case." },
          { text: "Tell the user to buy a new surge protector.", isCorrect: false, feedback: "Not necessarily. Surge protectors are designed to trip. Resetting it is often all that's needed. You should only recommend replacement if it trips frequently." },
          { text: "Leave the lamp plugged in and tell the user the PC is fixed.", isCorrect: false, feedback: "You haven't confirmed the fix! You only confirmed the outlet works. Always test the original failing device." }
        ]
      }
    ]
  },
  {
    id: '6',
    title: "The Installation Blockade",
    initialSituation: "A user is trying to install new accounting software, but the installation fails every time with a vague error: 'Installation failed. Please contact your administrator.'",
    finalSolution: "The software installation was being blocked by the corporate antivirus program, which was incorrectly flagging the installer as a potential threat. The solution was to temporarily disable the antivirus, run the installation as an administrator, and then re-enable the antivirus.",
    steps: [
      {
        title: "Gathering Intel",
        description: "The installation error is generic. You need more information about the environment.",
        hint: "Vague errors often mean something external is interfering. What security software is running? Does the user have the right permissions?",
        actions: [
          { text: "Right-click the installer and select 'Run as administrator'.", isCorrect: true, feedback: "A crucial first step for many installation issues. However, when you do this, the installation still fails with the same error. This suggests something more than simple permissions is at play." },
          { text: "Check the software's system requirements against the PC's specifications.", isCorrect: false, feedback: "A good thought, but less likely to cause a generic 'failed' error. Usually, you'd get a specific message like 'Not enough disk space' or 'OS not supported'." },
          { text: "Try downloading the installer again in case the file is corrupt.", isCorrect: false, feedback: "This is a valid step, but running as admin is a more common fix to try first. In this case, the new download also fails." }
        ]
      },
      {
        title: "Investigating Interference",
        description: "Running as administrator didn't work. Something else is actively blocking the installation. What could it be?",
        hint: "Security software, like antivirus or firewalls, are designed to block suspicious activity, and sometimes they make mistakes (a 'false positive').",
        actions: [
          { text: "Temporarily disable the computer's antivirus and firewall software.", isCorrect: true, feedback: "A good theory. You disable the corporate antivirus suite, noting to re-enable it immediately after the test. You run the installer again as administrator." },
          { text: "Boot the computer into Safe Mode and try the installation.", isCorrect: false, feedback: "This is a powerful troubleshooting step, but many installers won't run in Safe Mode because required Windows services are disabled." },
          { text: "Edit the Windows Registry to look for related keys.", isCorrect: false, feedback: "Extremely risky and unnecessary at this point. Editing the registry should be a last resort and done with extreme caution." }
        ]
      },
      {
        title: "Resolution and Cleanup",
        description: "With the antivirus temporarily disabled, the installation as administrator completes successfully! The accounting software now launches.",
        hint: "Your job isn't done until the system is back in a secure state.",
        actions: [
          { text: "Immediately re-enable the antivirus software and verify the newly installed program still works.", isCorrect: true, feedback: "Perfect. You re-enable the security software, protecting the system. You launch the accounting app, and it works fine. You inform the user and document the solution, perhaps reporting the false positive to the antivirus vendor." },
          { text: "Leave the antivirus disabled permanently for convenience.", isCorrect: false, feedback: "A huge security risk! The antivirus must be re-enabled to protect the user and the company network from real threats." },
          { text: "Tell the user it's fixed and walk away without re-enabling security.", isCorrect: false, feedback: "You've left the computer vulnerable. Always return a system to its proper, secure configuration after troubleshooting." }
        ]
      }
    ]
  }
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
