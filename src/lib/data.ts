import type {
  User,
  StatCard,
  ProgressItem,
  Game,
  GameScenario,
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
    initialSituation: "A user's browser homepage has been changed to a suspicious search engine, and pop-up ads are appearing constantly. The computer is also running slower than usual.",
    steps: [
        {
            title: 'Step 1: First Response',
            description: "The user is logged in. What's your immediate action to prevent further damage?",
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
    initialSituation: "A frantic user calls you. They accidentally held Shift+Delete on a folder named 'Q4_Project_Finals', permanently bypassing the Recycle Bin. The folder was on their desktop.",
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
      initialSituation: "The entire office suddenly can't browse websites like google.com or cnn.com, getting 'Server not found' errors. However, you discover you can successfully `ping 8.8.8.8`.",
      steps: [
          {
              title: 'Step 1: Interpret the Clues',
              description: 'You can ping an external IP address, but domain names are not working. What service is this a classic symptom of?',
              hint: 'What service acts as the internet\'s phonebook, turning names into numbers?',
              actions: [
                  { text: 'DNS (Domain Name System) failure.', isCorrect: true, feedback: 'Correct. The ability to ping an IP means the core internet connection is working, but the system that translates names to IPs is broken.' },
                  { text: 'DHCP server failure.', isCorrect: false, feedback: 'If DHCP failed, devices wouldn\'t be getting IP addresses in the first place, and you likely couldn\'t ping an external IP.' },
                  { text: 'Firewall blockage.', isCorrect: false, feedback: 'A firewall might block web traffic, but it wouldn\'t typically stop domain name resolution itself, and you can ping out.' },
              ]
          },
          {
              title: 'Step 2: Temporary Fix',
              description: 'You check a user\'s IP config and see their DNS server is an internal IP (`192.168.1.5`) which is unresponsive. What is the fastest way to get the whole office back online while you fix the internal server?',
              hint: 'You can centrally manage the DNS servers that clients use.',
              actions: [
                  { text: 'Log into the main router and change the DHCP settings to assign a public DNS server (like 1.1.1.1) to all clients.', isCorrect: true, feedback: 'Excellent choice. This is an efficient, network-wide fix that restores service to everyone. They just need to renew their DHCP lease.' },
                  { text: 'Email instructions to every user on how to manually change their DNS settings.', isCorrect: false, feedback: 'This is slow, inefficient, and prone to user error. A central fix is much better.' },
                  { text: 'Reboot the main internet router.', isCorrect: false, feedback: 'The router is working (since you can ping 8.8.8.8). The issue is with the specific DNS server it\'s telling clients to use.' },
              ]
          }
      ],
      finalSolution: "The office-wide internet outage was due to a failure of the internal DNS server. A successful ping to a public IP confirmed the internet connection was active. The immediate solution was to reconfigure the office's DHCP server to assign a public DNS provider (like 1.1.1.1 or 8.8.8.8), restoring domain name resolution for all users."
  },
  '11': {
      id: '11',
      title: 'The Packet Thief',
      initialSituation: 'A user reports that their video calls are freezing and audio is robotic, but a speed test shows excellent download and upload speeds. The problem is intermittent.',
      steps: [
          {
              title: 'Step 1: Check Connection Quality',
              description: 'Bandwidth is good, but the symptoms point to an unstable connection. What command-line tool is best for checking for packet loss over time?',
              hint: 'You need a tool that sends requests continuously, not just once.',
              actions: [
                  { text: '`ping 8.8.8.8 -t`', isCorrect: true, feedback: 'Correct. The `-t` flag makes ping run continuously. You let it run and see frequent "Request timed out" messages, indicating packet loss.' },
                  { text: '`ipconfig /all`', isCorrect: false, feedback: 'This shows your IP configuration but does not test the quality of your connection to a remote host.' },
                  { text: '`tracert 8.8.8.8`', isCorrect: false, feedback: 'Tracert is a great tool for finding *where* loss occurs, but a continuous ping is better for first confirming *if* loss is happening.' },
              ]
          },
          {
              title: 'Step 2: Locate the Loss',
              description: 'You\'ve confirmed about 10% packet loss. Now you need to find where it\'s happening. What tool traces the network path hop-by-hop, showing the performance of each step?',
              hint: 'This tool is like a road map for your data packets.',
              actions: [
                  { text: '`tracert 8.8.8.8` (or `pathping 8.8.8.8`)', isCorrect: true, feedback: 'Perfect. You run the trace and see that the first few hops within your local network are fine (1-2ms), but latency jumps and packet loss begins at an IP outside your network.' },
                  { text: 'Restarting the user\'s Wi-Fi adapter.', isCorrect: false, feedback: 'While a good basic step, the `tracert` tool is needed to prove whether the problem is local or external.' },
                  { text: 'Running a virus scan.', isCorrect: false, feedback: 'Malware is an unlikely cause for network packet loss that occurs at a specific external hop.' },
              ]
          },
          {
              title: 'Step 3: Draw a Conclusion',
              description: 'The `tracert` results show 0% loss to your office router (hop 1), but 10% loss starting at hop 2, which is an IP address owned by your ISP. What is the correct conclusion and action?',
              hint: 'If the problem is outside your control, you need to involve the party that controls it.',
              actions: [
                  { text: 'The problem is with the ISP. You must contact their support and provide the `tracert` logs as evidence.', isCorrect: true, feedback: 'Exactly. Your diagnostics have proven the issue is not on the local network. Providing the data to the ISP is the only way to get it resolved.' },
                  { text: 'You need to replace the office router.', isCorrect: false, feedback: 'The trace shows the connection to the router is perfect. Replacing it would not fix an issue happening further down the line.' },
                  { text: 'The user needs to use a wired connection instead of Wi-Fi.', isCorrect: false, feedback: 'This might help, but the evidence points to an external issue. Even on a wired connection, the ISP-level packet loss would still exist.' },
              ]
          }
      ],
      finalSolution: "The user's call quality issues were caused by packet loss. A continuous ping confirmed the instability, and a `tracert` command isolated the loss to a router within the Internet Service Provider's (ISP) network. The solution was to contact the ISP with the diagnostic data, enabling them to investigate and fix their faulty equipment."
  }
};
