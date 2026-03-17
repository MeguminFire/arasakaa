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

const componentsData = [
  {
    id: 'cpu',
    name: 'Central Processing Unit (CPU)',
    imageId: 'component-cpu',
    description: 'The CPU is the "brain" of the computer. It performs calculations, executes instructions, and manages the flow of data. The speed of the CPU, measured in gigahertz (GHz), is a key factor in a computer\'s overall performance.',
  },
  {
    id: 'ram',
    name: 'Random-Access Memory (RAM)',
    imageId: 'component-ram',
    description: 'RAM is the computer\'s short-term memory. It temporarily stores data that the CPU needs to access quickly. The more RAM a computer has, the more applications it can run smoothly at the same time.',
  },
  {
    id: 'mobo',
    name: 'Motherboard',
    imageId: 'component-mobo',
    description: 'The motherboard is the main circuit board that connects all the components. It allows the CPU, RAM, storage, and other hardware to communicate with each other. It\'s the foundation upon which the entire computer is built.',
  },
  {
    id: 'gpu',
    name: 'Graphics Processing Unit (GPU)',
    imageId: 'component-gpu',
    description: 'The GPU, or graphics card, is a specialized processor designed to handle visual data. It renders images, videos, and animations for display. A powerful GPU is essential for gaming, video editing, and other graphics-intensive tasks.',
  },
  {
    id: 'storage',
    name: 'Storage (SSD/HDD)',
    imageId: 'component-storage',
    description: 'Storage is the computer\'s long-term memory. Hard Disk Drives (HDDs) are traditional spinning disks, while Solid-State Drives (SSDs) use flash memory for much faster performance. The operating system, applications, and your files are all stored here.',
  },
  {
    id: 'psu',
    name: 'Power Supply Unit (PSU)',
    imageId: 'component-psu',
    description: 'The PSU converts AC power from your wall outlet into the DC power that computer components need to operate. A reliable power supply is crucial for system stability and protecting your hardware from power surges.',
  },
];

const LESSON_ID = '1';
const QUIZ_ID = '2';

export default function ComponentsLessonPage() {
  const { addCompletedItem, userProfile } = useUser();
  const { toast } = useToast();
  const isCompleted = userProfile?.completedLessons?.includes(LESSON_ID) ?? false;

  const handleMarkAsComplete = () => {
    addCompletedItem('lesson', LESSON_ID);
    toast({
      title: 'Lesson Completed!',
      description: 'You\'ve marked "Anatomy of a Computer" as complete.',
      action: (
        <CheckCircle className="text-green-500" />
      ),
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Anatomy of a Computer"
        description="Understand the core components that make a computer work."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {componentsData.map((component) => (
          <Card key={component.id} className="flex flex-col">
            <CardHeader>
              <div className="relative h-40 w-full mb-4">
                <Image
                  src={getPlaceholderImage(component.imageId)?.imageUrl ?? ''}
                  alt={component.name}
                  data-ai-hint={getPlaceholderImage(component.imageId)?.imageHint ?? ''}
                  fill
                  className="rounded-t-lg object-cover"
                />
              </div>
              <CardTitle>{component.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{component.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Lesson Complete?</CardTitle>
            <CardDescription>Once you feel you understand the components, mark this lesson as complete and test your knowledge with the quiz.</CardDescription>
        </CardHeader>
        <CardFooter className="gap-4">
            <Button onClick={handleMarkAsComplete} disabled={isCompleted}>
                <CheckCircle className="mr-2 h-4 w-4" />
                {isCompleted ? 'Completed' : 'Mark as Complete'}
            </Button>
            <Button variant="outline" asChild>
                <Link href={`/quiz/${QUIZ_ID}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Take the Hardware Quiz
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
