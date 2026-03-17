'use client';

import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { CheckCircle, BookOpen } from 'lucide-react';
import { useUser } from '@/context/UserProvider';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const LESSON_ID = '2';
const QUIZ_ID = '2';

export default function HardwareTroubleshootingLessonPage() {
    const { addCompletedItem, userProfile } = useUser();
    const { toast } = useToast();
    const isCompleted = userProfile?.completedLessons?.includes(LESSON_ID) ?? false;

    const handleMarkAsComplete = () => {
        addCompletedItem('lesson', LESSON_ID);
        toast({
        title: 'Lesson Completed!',
        description: 'You\'ve marked "Hardware Troubleshooting Essentials" as complete.',
        action: (
            <CheckCircle className="text-green-500" />
        ),
        });
    };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Hardware Troubleshooting Essentials"
        description="Learn to diagnose and resolve common physical computer issues."
      />

       <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="relative h-48 w-full md:h-64">
                    <Image
                    src={getPlaceholderImage('hardware-troubleshooting-hero')?.imageUrl ?? ''}
                    alt="Technician working on computer hardware"
                    data-ai-hint={getPlaceholderImage('hardware-troubleshooting-hero')?.imageHint ?? ''}
                    fill
                    className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
            </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>The First Question: Is It Plugged In?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            It sounds simple, but the first step for any device that won't turn on is to check its power source. This is the foundation of physical troubleshooting. Before you ever open a computer case, you must rule out external power issues.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Check the outlet:</strong> Plug a known working device (like a lamp) into the same power outlet to confirm the outlet is active.</li>
            <li><strong>Check the power strip:</strong> If using a surge protector or power strip, make sure it's turned on and functioning. Try plugging the computer directly into the wall.</li>
            <li><strong>Check the cables:</strong> Ensure the power cable is securely connected to both the wall and the computer's Power Supply Unit (PSU). For desktops, this connection can sometimes become loose.</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>POST and Beep Codes: The Computer's Cry for Help</CardTitle>
          <CardDescription>When a computer first turns on, it performs a Power-On Self-Test (POST). If it fails, it can't display an error on the screen, so it communicates with a series of beeps.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-muted-foreground">These beep codes are a vital diagnostic tool. While they vary by motherboard manufacturer (e.g., AMI, Award, Phoenix), some patterns are common:</p>
             <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Common Beep Codes</AlertTitle>
                <AlertDescription>
                    <ul className="list-disc pl-5">
                        <li><strong>One short beep:</strong> System is OK.</li>
                        <li><strong>Continuous long beeps:</strong> RAM not detected or not seated correctly.</li>
                        <li><strong>One long, two short beeps:</strong> Video card issue.</li>
                        <li><strong>Repeated short beeps:</strong> Power supply issue or motherboard failure.</li>
                    </ul>
                </AlertDescription>
            </Alert>
            <p className="text-muted-foreground">If you hear beep codes, your first step should be to look up the specific code for your motherboard's manufacturer to get a precise diagnosis.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>RAM Issues</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                    <p>Faulty or improperly seated RAM is a very common cause of boot failures. Symptoms include beep codes, failure to POST, or random crashes and Blue Screens of Death (BSODs).</p>
                    <p><strong>Troubleshooting Steps:</strong></p>
                     <ul className="list-disc pl-5 text-sm">
                        <li>Turn off and unplug the PC.</li>
                        <li>Reseat the RAM sticks: remove them and insert them again firmly until the clips on both sides lock into place.</li>
                        <li>Test with one stick at a time to isolate a faulty module.</li>
                        <li>Try the RAM in different slots on the motherboard.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Storage Drive Failures</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                   <p>If the computer passes the POST but fails to load Windows, often showing an error like "No bootable device," the problem may be the storage drive.</p>
                   <p><strong>Common Symptoms:</strong></p>
                     <ul className="list-disc pl-5 text-sm">
                        <li><strong>HDD:</strong> A repetitive clicking or grinding noise is a classic sign of mechanical failure.</li>
                        <li><strong>SSD:</strong> May fail to be detected in the BIOS, or the computer may freeze frequently.</li>
                        <li>OS reports read/write errors.</li>
                    </ul>
                </CardContent>
            </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Lesson Complete?</CardTitle>
            <CardDescription>Once you feel you understand these hardware concepts, mark this lesson as complete and test your knowledge.</CardDescription>
        </CardHeader>
        <CardFooter className="gap-4">
            <Button onClick={handleMarkAsComplete} disabled={isCompleted}>
                <CheckCircle className="mr-2 h-4 w-4" />
                {isCompleted ? 'Completed' : 'Mark as Complete'}
            </Button>
            <Button variant="outline" asChild>
                <Link href={`/quiz/${QUIZ_ID}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Take the Hardware Troubleshooting Quiz
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
