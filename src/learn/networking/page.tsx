'use client';

import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { CheckCircle, BookOpen, Wifi, Globe, Waypoints, Dna } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

const LESSON_ID = '2';
const QUIZ_ID = '1';

export default function NetworkingLessonPage() {
    const { addCompletedItem, userProfile } = useUser();
    const { toast } = useToast();
    const isCompleted = userProfile?.completedLessons?.includes(LESSON_ID) ?? false;

    const handleMarkAsComplete = () => {
        addCompletedItem('lesson', LESSON_ID);
        toast({
        title: 'Lesson Completed!',
        description: 'You\'ve marked "Networking Fundamentals" as complete.',
        action: (
            <CheckCircle className="text-green-500" />
        ),
        });
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <PageHeader
                title="Networking Fundamentals"
                description="Learn the basics of how devices communicate over the internet."
            />

             <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <div className="relative h-48 w-full md:h-64">
                        <Image
                        src={getPlaceholderImage('learn-networking-hero')?.imageUrl ?? ''}
                        alt="Abstract network visualization"
                        data-ai-hint={getPlaceholderImage('learn-networking-hero')?.imageHint ?? ''}
                        fill
                        className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>What is a Network?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        In the simplest terms, a computer network is a group of two or more connected computers that can share resources (like a printer or a file), exchange files, or allow electronic communications. The computers on a network may be linked through cables, telephone lines, radio waves, satellites, or infrared light beams.
                    </p>
                    <p>
                        The internet itself is the largest network in the world, connecting millions of smaller networks from governments, businesses, and homes.
                    </p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Globe className="h-8 w-8 text-primary" />
                        <CardTitle>IP Addresses: The Postal Codes of the Internet</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                        Every device on a network has a unique Internet Protocol (IP) address. Think of it like a mailing address for your computer. It tells other devices where to send information. An example of an IP address is `192.168.1.101`.
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Dna className="h-8 w-8 text-primary" />
                        <CardTitle>DNS: The Internet's Phonebook</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                        It's hard to remember strings of numbers. The Domain Name System (DNS) translates human-friendly domain names (like `google.com`) into computer-friendly IP addresses. When you type a website name, a DNS server looks up the corresponding IP address for you.
                    </CardContent>
                </Card>
            </div>
             
             <Card>
                <CardHeader>
                    <CardTitle>Key Networking Hardware</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-1/3">
                            <Image
                                src={getPlaceholderImage('learn-networking-router')?.imageUrl ?? ''}
                                alt="A modern Wi-Fi router"
                                data-ai-hint={getPlaceholderImage('learn-networking-router')?.imageHint ?? ''}
                                width={400}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <div className="w-full md:w-2/3 space-y-2">
                             <h3 className="font-headline text-xl flex items-center gap-2 text-primary"><Waypoints /> Router</h3>
                            <p className="text-muted-foreground">A router is the traffic director of your network. It connects your local network (all the devices in your home or office) to the wider internet. It takes information from the modem and routes it to the correct device (your laptop, phone, etc.) and vice-versa.</p>
                        </div>
                    </div>
                     <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
                        <div className="w-full md:w-1/3">
                            <Image
                                src={getPlaceholderImage('learn-networking-switch')?.imageUrl ?? ''}
                                alt="A network switch with cables"
                                data-ai-hint={getPlaceholderImage('learn-networking-switch')?.imageHint ?? ''}
                                width={400}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <div className="w-full md:w-2/3 space-y-2">
                             <h3 className="font-headline text-xl flex items-center gap-2 text-primary"><Wifi /> Switch</h3>
                            <p className="text-muted-foreground">A switch is used to connect multiple devices on the *same* local network. Think of it as a sophisticated hub that allows devices like your computer, printer, and game console to talk to each other efficiently. Routers often have built-in switches.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Lesson Complete?</CardTitle>
                    <CardDescription>Once you feel you understand these networking concepts, mark this lesson as complete and test your knowledge.</CardDescription>
                </CardHeader>
                <CardFooter className="gap-4">
                    <Button onClick={handleMarkAsComplete} disabled={isCompleted}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {isCompleted ? 'Completed' : 'Mark as Complete'}
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/quiz/${QUIZ_ID}`}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Take the Networking Quiz
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

        </div>
    );
}
