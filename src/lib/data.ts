import type {
  User,
  StatCard,
  ProgressItem,
  Game,
  GameScenario,
  Lesson,
  Quiz,
  QuizQuestion,
} from './types';
import {
  Cpu,
  Router,
  ShieldCheck,
  Trophy,
  BookOpen,
  Gamepad2,
  CheckCircle,
  Clock,
  Crown,
  Award,
  Printer,
  PowerOff,
  FileX,
  ShieldAlert,
  FileUp,
  Network,
  Unplug,
  MoveHorizontal,
  HelpCircle,
  BrainCircuit,
  Dna,
} from 'lucide-react';
import { getPlaceholderImage } from './placeholder-images';

export const user: User = {
  uid: 'default-user',
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

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Anatomy of a Computer',
    description: 'Understand the core components that make a computer work, from the CPU to the PSU.',
    href: '/learn/components',
    icon: Cpu,
  },
  {
    id: '2',
    title: 'Networking Fundamentals',
    description: 'Learn the basics of how devices communicate, including IP addresses, DNS, and routers.',
    href: '/learn/networking',
    icon: Router,
  },
  {
    id: '3',
    title: 'OS Troubleshooting Methodology',
    description: 'Master the 6-step methodology for diagnosing and solving any OS or software problem.',
    href: '/learn/troubleshooting',
    icon: HelpCircle,
  },
];

export const quizzes: Quiz[] = [
    {
        id: '1',
        title: 'Networking Quiz',
        description: 'Test your knowledge of networking fundamentals like IP, DNS, and hardware.',
        href: '/quiz/1',
        icon: Dna,
    },
    {
        id: '2',
        title: 'Hardware Quiz',
        description: 'How well do you know your computer components? Test your knowledge.',
        href: '/quiz/2',
        icon: BrainCircuit,
    },
    {
        id: '3',
        title: 'Troubleshooting Theory Quiz',
        description: 'Quiz yourself on the 6-step troubleshooting methodology.',
        href: '/quiz/3',
        icon: HelpCircle,
    }
];

export const quizQuestions: Record<string, QuizQuestion[]> = {
    '1': [ // Networking Quiz
        {
            question: "What is the primary function of a router?",
            options: ["To connect multiple devices on the same local network", "To connect a local network to the internet and direct traffic", "To translate domain names into IP addresses", "To provide power to network devices"],
            correctAnswer: "To connect a local network to the internet and direct traffic",
            explanation: "A router's main job is to act as a gateway between your local network and the wider internet, directing traffic to the correct destinations."
        },
        {
            question: "Which of these is a valid private IP address often used for a home router's admin page?",
            options: ["8.8.8.8", "192.168.1.1", "google.com", "2001:0db8:85a3:0000:0000:8a2e:0370:7334"],
            correctAnswer: "192.168.1.1",
            explanation: "IP addresses in the 192.168.x.x range are designated for private networks and are not routable on the public internet. 192.168.1.1 is a very common default address for routers."
        },
        {
            question: "What does DNS stand for and what does it do?",
            options: ["Digital Network Service; it encrypts your data", "Domain Name System; it translates domain names to IP addresses", "Data Naming Standard; it assigns names to files", "Dynamic Network Security; it acts as a firewall"],
            correctAnswer: "Domain Name System; it translates domain names to IP addresses",
            explanation: "DNS acts like the internet's phonebook, allowing you to use easy-to-remember names like 'google.com' instead of having to memorize a complex IP address like '142.250.191.78'."
        },
        {
            question: "If you want to connect several wired devices within the same room to your network, what is the best device to use?",
            options: ["A modem", "A switch", "A second router", "An access point"],
            correctAnswer: "A switch",
            explanation: "A switch is specifically designed to connect multiple devices on a local area network (LAN), allowing them to communicate with each other efficiently."
        },
        {
            question: "You can ping 8.8.8.8 successfully, but you can't browse to google.com. What is the most likely problem?",
            options: ["Your internet cable is unplugged", "Your computer has no IP address", "A firewall is blocking all traffic", "There is a DNS failure"],
            correctAnswer: "There is a DNS failure",
            explanation: "Being able to ping an IP address proves your internet connectivity is working. The inability to reach a site by its domain name points directly to a problem with DNS resolution."
        },
    ],
    '2': [ // Hardware Quiz
        {
            question: "Which component is considered the 'brain' of the computer?",
            options: ["RAM", "GPU", "CPU", "Motherboard"],
            correctAnswer: "CPU",
            explanation: "The CPU (Central Processing Unit) performs most of the processing inside a computer, executing instructions and performing calculations, which is why it's called the 'brain'."
        },
        {
            question: "What type of memory is volatile, meaning it loses its data when the power is turned off?",
            options: ["SSD (Solid-State Drive)", "HDD (Hard Disk Drive)", "RAM (Random-Access Memory)", "ROM (Read-Only Memory)"],
            correctAnswer: "RAM (Random-Access Memory)",
            explanation: "RAM is the computer's short-term, volatile memory. It holds data for currently running applications, but this data is erased when the computer shuts down."
        },
        {
            question: "Which component connects all the other hardware pieces together and allows them to communicate?",
            options: ["Power Supply Unit (PSU)", "Graphics Processing Unit (GPU)", "Central Processing Unit (CPU)", "Motherboard"],
            correctAnswer: "Motherboard",
            explanation: "The motherboard is the main circuit board that acts as the central hub, providing connections for the CPU, RAM, GPU, storage, and other peripherals."
        },
        {
            question: "What is the primary purpose of a GPU?",
            options: ["To run the operating system", "To store long-term files", "To render images and video for display", "To connect to the internet"],
            correctAnswer: "To render images and video for display",
            explanation: "The GPU, or graphics card, is a specialized processor optimized for handling visual data, making it essential for gaming, video editing, and other graphics-heavy tasks."
        },
        {
            question: "Which storage technology generally offers the fastest performance for booting an operating system and loading applications?",
            options: ["HDD (Hard Disk Drive)", "SSD (Solid-State Drive)", "Optical Drive (CD/DVD)", "USB Flash Drive"],
            correctAnswer: "SSD (Solid-State Drive)",
            explanation: "SSDs use flash memory and have no moving parts, allowing them to read and write data significantly faster than traditional spinning Hard Disk Drives (HDDs)."
        },
    ],
    '3': [ // Troubleshooting Theory Quiz
        {
            question: "According to the 6-step troubleshooting methodology, what should you do right after you've implemented a solution?",
            options: ["Document your findings", "Establish a new theory", "Verify full system functionality and implement preventative measures", "Identify the problem"],
            correctAnswer: "Verify full system functionality and implement preventative measures",
            explanation: "After applying a fix, it's crucial to confirm that the original problem is gone and also to think about how to prevent it from happening again."
        },
        {
            question: "When forming a theory of probable cause, where should you start?",
            options: ["With the most complex and unlikely potential causes", "With the most obvious and simplest potential causes", "By immediately assuming it's a virus", "By taking the entire computer apart"],
            correctAnswer: "With the most obvious and simplest potential causes",
            explanation: "Always start with the simplest explanations first (e.g., 'Is it plugged in?'). This is often referred to as 'questioning the obvious' and can save a lot of time."
        },
        {
            question: "What is the final, and often most overlooked, step in the troubleshooting process?",
            options: ["Test the theory", "Implement the solution", "Identify the problem", "Document findings, actions, and outcomes"],
            correctAnswer: "Document findings, actions, and outcomes",
            explanation: "Proper documentation helps other technicians, provides a record of work, and assists in identifying trends or recurring problems. It is a critical professional habit."
        },
        {
            question: "You have a theory about what is causing a problem. What is the next step?",
            options: ["Implement a plan of action", "Test the theory to determine the cause", "Establish a new theory", "Document your findings"],
            correctAnswer: "Test the theory to determine the cause",
            explanation: "Before you can create a plan of action, you must test your theory to confirm or deny that it is the actual cause of the problem."
        },
        {
            question: "If your test proves your theory is incorrect, what should you do?",
            options: ["Keep trying the same fix until it works", "Tell the user the problem is unfixable", "Establish a new theory and test it", "Immediately escalate to a senior technician"],
            correctAnswer: "Establish a new theory and test it",
            explanation: "The troubleshooting process is iterative. If one theory is disproven, you use what you've learned to form a new, more informed theory and repeat the testing process."
        },
    ]
};


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
  {
    id: '7',
    title: 'Virus Vanguard',
    description: 'A user suspects they have a virus. Identify the malware symptoms and clean the system.',
    topic: 'Malware Removal',
    difficulty: 'medium',
    icon: ShieldAlert,
  },
  {
    id: '8',
    title: 'Data Recovery Dash',
    description: 'A user has accidentally deleted a critical project folder. Attempt to recover the lost files.',
    topic: 'Data Recovery',
    difficulty: 'hard',
    icon: FileUp,
  },
  {
    id: '9',
    title: 'The IP Address Thief',
    description: 'Two devices are fighting over the same IP address, causing network instability. Find the rogue device.',
    topic: 'IP Conflict',
    difficulty: 'medium',
    icon: Network,
  },
  {
      id: '10',
      title: 'DNS Blackout',
      description: "Users can't access any websites by name, but can by IP address. Diagnose the DNS failure.",
      topic: 'DNS Failure',
      difficulty: 'medium',
      icon: Unplug,
  },
  {
      id: '11',
      title: 'The Packet Thief',
      description: 'A stable connection is experiencing intermittent slowness and timeouts. Trace the connection to find the packet loss.',
      topic: 'Packet Loss',
      difficulty: 'hard',
      icon: MoveHorizontal,
  },
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
  },
  '7': {
    id: '7',
    title: 'Virus Vanguard',
    description: 'A user suspects they have a virus. Identify the malware symptoms and clean the system.',
    steps: [
        {
            title: 'Step 1: First Response',
            description: "The user's browser homepage has been changed to a suspicious search engine, and pop-up ads are appearing constantly. The computer is also running slower than usual. What's your immediate action to prevent further damage?",
            hint: "Isolate the patient before you operate.",
            actions: [
                { text: 'Disconnect the computer from the network.', isCorrect: true, feedback: "Good call. Isolating the machine prevents the malware from spreading or communicating with its command center." },
                { text: 'Run a full system scan with the installed antivirus.', isCorrect: false, feedback: "Not yet. If the malware is sophisticated, it might evade the current AV or block it. Isolation is the priority." },
                { text: 'Restart the computer.', isCorrect: false, feedback: "This won't remove the malware and may allow it to embed itself deeper into the system on startup." }
            ]
        },
        {
            title: 'Step 2: Cleanup',
            description: "The computer is offline. You need to scan for and remove the malware. What's the most reliable method?",
            hint: "Starting in a minimal environment prevents malware from hiding.",
            actions: [
                { text: "Boot into Safe Mode with Networking and run a scan with a reputable on-demand anti-malware tool (like Malwarebytes).", isCorrect: true, feedback: "Correct. Safe Mode prevents most malware from running, allowing your scanner to find and remove it effectively. You find and quarantine several adware and spyware threats." },
                { text: "Just run the built-in Windows Defender scan in normal mode.", isCorrect: false, feedback: "This might work for simple threats, but active malware can sometimes hide from scanners in a normal Windows session. Safe Mode is more thorough." },
                { text: "Manually delete suspicious files from Program Files.", isCorrect: false, feedback: "This is very risky. You could easily delete critical system files, and you're unlikely to find all parts of the malware." }
            ]
        }
    ],
    finalSolution: "The system was infected with adware. The solution was to first disconnect it from the network, then boot into Safe Mode to run a scan with a dedicated anti-malware tool, which successfully removed the threats. Finally, browser settings were reset to their defaults."
  },
  '8': {
    id: '8',
    title: 'Data Recovery Dash',
    description: 'A user has accidentally deleted a critical project folder. Attempt to recover the lost files.',
    steps: [
        {
            title: 'Step 1: Immediate Action',
            description: "What is the absolute first and most important instruction you give to the user?",
            hint: "To recover data, you must prevent it from being overwritten.",
            actions: [
                { text: 'Stop using the computer immediately.', isCorrect: true, feedback: "Crucial first step. Any further disk activity (like browsing the web or saving files) could overwrite the sectors where the 'deleted' data resides, making recovery impossible." },
                { text: 'Try to find the folder using Windows Search.', isCorrect: false, feedback: "The file data is no longer indexed by the file system, so search won't find it. This also creates more disk activity." },
                { text: 'Run System Restore.', isCorrect: false, feedback: "System Restore does not affect personal files like documents and would not bring the folder back. It also writes to the disk, which is dangerous." }
            ]
        },
        {
            title: 'Step 2: Recovery Method',
            description: "The user has stopped working. You need to use software to scan for the deleted file data. What is the correct approach?",
            hint: "Don't write any new data to the drive you're trying to recover from.",
            actions: [
                { text: "Use a portable data recovery tool (like Recuva Portable) run from a separate USB drive.", isCorrect: true, feedback: "This is the correct professional method. Running the tool from a USB stick prevents you from installing software on the affected drive, which could overwrite the very data you're trying to save." },
                { text: "Download and install a data recovery program onto the user's C: drive.", isCorrect: false, feedback: "This is a critical mistake. Installing the program could overwrite the deleted files, making them permanently unrecoverable." },
                { text: "Run `chkdsk /f` to check for file system errors.", isCorrect: false, feedback: "`chkdsk` is for fixing file system errors, not for recovering deleted files. It heavily writes to the disk and could destroy the data." }
            ]
        }
    ],
    finalSolution: "The key to recovering shift-deleted files is to immediately stop using the drive to prevent data overwriting. The correct procedure was to use a portable data recovery application run from a USB drive to scan the user's main drive for the deleted file signatures and restore them to a different drive (the USB stick)."
  },
  '9': {
    id: '9',
    title: 'The IP Address Thief',
    initialSituation: "A user in accounting reports their connection is dropping every few minutes. When it works, it's fine, but then it dies. They see a pop-up mentioning an 'IP address conflict'.",
    steps: [
        {
            title: 'Step 1: Confirm the Conflict',
            description: "You need to see the user's IP configuration to confirm their address. What command do you run on their machine?",
            hint: 'This command shows all network adapter configurations, including IP addresses, MAC addresses, and DNS servers.',
            actions: [
                { text: '`ipconfig /all`.', isCorrect: true, feedback: 'Correct. You run the command and see their IP is 192.168.1.123. You also note their hardware MAC address.' },
                { text: '`tracert google.com`.', isCorrect: false, feedback: 'This traces a route to an external server but won\'t show the local IP configuration details needed to resolve a conflict.' },
                { text: '`netstat -an`.', isCorrect: false, feedback: 'This shows active connections and listening ports, but it\'s not the primary tool for viewing the IP address configuration.' },
            ]
        },
        {
            title: 'Step 2: Hunt the Rogue Device',
            description: "You know the conflicting IP is 192.168.1.123. How do you find the MAC address of the *other* device that's causing the conflict?",
            hint: 'You need to query the network\'s address resolution table after communicating with the conflicting IP.',
            actions: [
                { text: '`ping 192.168.1.123` followed by `arp -a`.', isCorrect: true, feedback: "Excellent. Pinging the address ensures it's in the computer's ARP cache. `arp -a` then reveals a different MAC address associated with that IP—the culprit." },
                { text: '`ping -a 192.168.1.123`.', isCorrect: false, feedback: 'This performs a reverse DNS lookup, which is not what you need. You need the hardware (MAC) address.' },
                { text: 'Immediately unplug the user\'s computer from the network.', isCorrect: false, feedback: 'This takes the user offline and doesn\'t help you find the other device.' },
            ]
        },
        {
            title: 'Step 3: Identify and Remediate',
            description: 'You look up the rogue MAC address in the asset inventory and find it belongs to a new smart-printer someone plugged in and manually set to a static IP. What is the proper, long-term solution?',
            hint: 'Static IPs in a DHCP environment are a recipe for disaster. Devices should ask for an address.',
            actions: [
                { text: 'Access the printer\'s web interface and change its network settings from static to DHCP.', isCorrect: true, feedback: 'Perfect. By setting the printer to use DHCP, it will request a unique, available IP from the router, permanently resolving the conflict.' },
                { text: 'Change the user\'s computer to a different static IP.', isCorrect: false, feedback: 'This only fixes the problem for this one user and creates a new static IP that could cause future conflicts. It doesn\'t solve the root problem.' },
                { text: 'Tell the office to stop using the new printer.', isCorrect: false, feedback: 'This is not a helpful technical solution. The goal is to make the technology work correctly for everyone.' },
            ]
        }
    ],
    finalSolution: "An IP conflict was caused by a new printer configured with a static IP address that was already assigned to a user. The solution was to find the printer's MAC address using `arp -a`, access its configuration, and change its network settings to obtain an IP address automatically via DHCP."
  },
  '10': {
      id: '10',
      title: 'DNS Blackout',
      initialSituation: "Users report they can't access any websites like google.com or cnn.com, but you find you can successfully `ping 8.8.8.8`. What is the most likely issue?",
      steps: [
        {
            title: 'Step 1: Test Your Theory',
            description: "Your theory is that the local DNS server is down. How do you test this from a user's command prompt?",
            hint: 'Use a tool that lets you query domain names and specify which server to ask.',
            actions: [
                { text: 'Run `nslookup google.com 8.8.8.8` to query a public DNS server.', isCorrect: true, feedback: 'Correct. This bypasses the local DNS server. The command succeeds, proving that the internet is working but the local DNS resolver is the point of failure.' },
                { text: 'Run `ipconfig /flushdns`', isCorrect: false, feedback: 'Flushing the DNS cache is a good step, but it doesn\'t test if the server is responsive. You need to test resolution first.' },
                { text: 'Run `tracert google.com`', isCorrect: false, feedback: 'Tracert will also fail because it relies on DNS to resolve the name to an IP. It doesn\'t help you diagnose the DNS server itself.' }
            ]
        },
        {
            title: 'Step 2: Implement a Workaround',
            description: "You've confirmed the local DNS server is unresponsive. While you work on fixing the server, how can you get users back online immediately?",
            hint: "You can manually tell computers to use a different 'phonebook'.",
            actions: [
                { text: 'Instruct users to change their network adapter settings to use a public DNS server like 8.8.8.8 or 1.1.1.1.', isCorrect: true, feedback: 'This is the standard temporary fix. By pointing their computers to a working public DNS server, they can resolve domain names and access the internet while you fix the primary server.' },
                { text: 'Tell everyone to just use IP addresses for all websites.', isCorrect: false, feedback: 'This is impractical and not user-friendly.' },
                { text: 'Restart every computer in the office.', isCorrect: false, feedback: 'This will not help, as the computers will still try to contact the same broken DNS server on reboot.' }
            ]
        }
    ],
    finalSolution: "The local DNS server was down, preventing domain name resolution. This was confirmed by using `nslookup` to successfully query a public DNS server (8.8.8.8), bypassing the local one. The short-term fix was to have users temporarily change their network settings to use a public DNS server."
  },
  '11': {
      id: '11',
      title: 'The Packet Thief',
      initialSituation: "A user on a wired connection complains that video calls are choppy and web pages sometimes fail to load completely, even though their connection seems to be active. You suspect packet loss.",
      steps: [
        {
            title: 'Step 1: Gather Evidence',
            description: "What command-line tool can you use to continuously test the connection to a reliable server and see if any packets are being lost?",
            hint: "This command sends repeated echo requests and shows you if any fail to return.",
            actions: [
                { text: '`ping google.com -t`', isCorrect: true, feedback: "Correct. The `-t` flag makes the ping continuous. After a minute, you see several 'Request timed out' messages, confirming intermittent packet loss." },
                { text: '`ipconfig /all`', isCorrect: false, feedback: "This shows your IP configuration but doesn't test the quality of the live connection." },
                { text: '`netstat -e`', isCorrect: false, feedback: "This can show interface statistics, including errors, but a continuous ping is a more direct and real-time test for packet loss to a specific destination." }
            ]
        },
        {
            title: 'Step 2: Isolate the Faulty Hop',
            description: "You've confirmed packet loss. Now you need to find out *where* it's happening between the user and the destination. Which tool traces the route and shows statistics for each hop?",
            hint: "This tool is like a combination of ping and tracert.",
            actions: [
                { text: '`pathping google.com`', isCorrect: true, feedback: "Excellent choice. Pathping first traces the route, then pings each hop for a period of time. After a few minutes, it reveals that a specific router in the office is dropping 50% of the packets sent to it." },
                { text: '`tracert google.com`', isCorrect: false, feedback: "Tracert shows the route, but it doesn't provide detailed loss statistics for each hop, which is what you need to pinpoint the problem." },
                { text: 'Unplug and replug the user\'s network cable.', isCorrect: false, feedback: "This is a basic physical check, but since the connection is intermittent (not completely dead), a faulty hardware device along the path is more likely than a simple loose cable." }
            ]
        },
        {
            title: 'Step 3: The Physical Layer',
            description: "Pathping has identified the specific router that is dropping packets. What is the most likely cause and solution?",
            hint: "When a single piece of network hardware is failing intermittently, think about its most basic connections.",
            actions: [
                { text: "The router has a faulty ethernet cable connecting it to the main switch. Replacing the cable resolves the packet loss.", isCorrect: true, feedback: 'Correct. A damaged or poorly terminated cable is a very common cause of packet loss. After replacing the cable between the switch and the faulty router, a new pathping shows 0% loss at all hops.' },
                { text: "The entire router is broken and needs to be replaced.", isCorrect: false, feedback: "While possible, it's much more common for a cable to fail than an entire router. Always check and replace cables before replacing expensive hardware." },
                { text: "The user's computer has a bad network card.", isCorrect: false, feedback: "Pathping proved the loss was happening at an internal router, not at the user's computer (the first hop)." }
            ]
        }
    ],
    finalSolution: "Intermittent packet loss was causing the user's connection issues. This was confirmed with `ping -t` and then isolated to a specific router using `pathping`. The root cause was a faulty Ethernet cable connecting that router to the core switch. Replacing the cable resolved the packet loss."
  },
};
