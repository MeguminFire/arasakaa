'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { forumPosts } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Eye, Laptop, Smartphone, Tablet, Monitor, Send, HelpCircle } from 'lucide-react';

const deviceTypes = [
  { value: 'desktop', label: 'Desktop PC', icon: Monitor },
  { value: 'laptop', label: 'Laptop', icon: Laptop },
  { value: 'smartphone', label: 'Smartphone', icon: Smartphone },
  { value: 'tablet', label: 'Tablet', icon: Tablet },
];

const brands = [
    'Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Microsoft', 'Samsung', 'Razer', 'MSI', 'Custom Build', 'Other'
];

const issueTypes = [
    'Won\'t Turn On', 'Slow Performance', 'Blue Screen (BSOD)', 'Internet/Wi-Fi Issues', 'Software Problem', 'Hardware Malfunction', 'Display/Graphics Issue', 'Other'
];

export default function ForumPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // This is a simulation. In a real app, this would send data to a backend.
        setTimeout(() => {
            toast({
                title: "Post Submitted!",
                description: "Your query has been posted to the forum.",
            });
            setIsSubmitting(false);
        }, 1500);
    }
    
    return (
        <div className="space-y-8 w-full">
            <PageHeader title="Community Forum" description="Ask questions, share solutions, and connect with the community." />

             <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Post a New Query</CardTitle>
                    <CardDescription>Having trouble? Ask the community for help. Fill out the details below.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePostSubmit}>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="device-type">Device Type</Label>
                                <Select required>
                                    <SelectTrigger id="device-type">
                                        <SelectValue placeholder="Select device..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {deviceTypes.map(type => (
                                             <SelectItem key={type.value} value={type.value}>
                                                <div className="flex items-center gap-2">
                                                    <type.icon className="h-4 w-4 text-muted-foreground" />
                                                    <span>{type.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="brand">Brand</Label>
                                <Select required>
                                    <SelectTrigger id="brand">
                                        <SelectValue placeholder="Select brand..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {brands.map(brand => (
                                             <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="issue-type">Issue Type</Label>
                                 <Select required>
                                    <SelectTrigger id="issue-type">
                                        <SelectValue placeholder="Select issue..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {issueTypes.map(issue => (
                                             <SelectItem key={issue} value={issue}>{issue}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="title">Query Title</Label>
                            <Input id="title" placeholder="e.g., My laptop won't connect to Wi-Fi after update" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="description">Detailed Problem Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your issue in detail. What have you tried so far? Are there any error messages?"
                                className="min-h-[150px]"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Posting...' : 'Post to Forum'}
                            <Send className="ml-2 h-4 w-4"/>
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <Separator />
            
            <div className="space-y-4">
                 <h2 className="text-2xl font-headline font-bold">Recent Posts</h2>
                 {forumPosts.map(post => (
                    <Link href={`/forum/${post.id}`} key={post.id} className="block">
                        <Card className="hover:border-primary/80 transition-colors">
                            <CardHeader>
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                                        <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg mb-1">{post.title}</CardTitle>
                                        <CardDescription>
                                            Posted by <span className="text-primary font-medium">{post.user.name}</span> &bull; {post.createdAt}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground line-clamp-2">{post.content}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <HelpCircle className="h-4 w-4" />
                                        <span>{post.deviceType} &bull; {post.brand}</span>
                                    </div>
                                    
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>{post.replies}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Eye className="h-4 w-4" />
                                        <span>{post.views}</span>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                 ))}
            </div>
        </div>
    );
}
