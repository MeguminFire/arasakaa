'use client';

import { useState, useEffect } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Laptop, Smartphone, Tablet, Monitor, Send, HelpCircle, Loader2 } from 'lucide-react';
import { useFirebase } from '@/firebase/FirebaseProvider';
import { useUser } from '@/context/UserProvider';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import type { ForumPost } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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

const postSchema = z.object({
  deviceType: z.string().min(1, "Device type is required"),
  brand: z.string().min(1, "Brand is required"),
  issueType: z.string().min(1, "Issue type is required"),
  title: z.string().min(10, "Title must be at least 10 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters").max(5000),
});

type PostFormData = z.infer<typeof postSchema>;


export default function ForumPage() {
    const { toast } = useToast();
    const { db } = useFirebase();
    const { authUser, userProfile } = useUser();
    
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<PostFormData>({
        resolver: zodResolver(postSchema)
    });

    useEffect(() => {
        if (!db) return;
        setIsLoading(true);
        const postsRef = collection(db, 'forumPosts');
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ForumPost));
            setPosts(postsData);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [db]);

    const handlePostSubmit = async (data: PostFormData) => {
        if (!db || !authUser || !userProfile) {
            toast({
                variant: 'destructive',
                title: 'Not logged in',
                description: 'You must be logged in to post to the forum.',
            });
            return;
        }

        try {
            await addDoc(collection(db, 'forumPosts'), {
                ...data,
                authorId: authUser.uid,
                authorName: userProfile.name,
                authorAvatar: userProfile.avatar || '',
                createdAt: serverTimestamp(),
            });
            toast({
                title: "Post Submitted!",
                description: "Your query has been posted to the forum.",
            });
            reset();
        } catch (error) {
            console.error("Error creating post:", error);
            toast({
                variant: 'destructive',
                title: "Error",
                description: "There was a problem submitting your post. Please try again.",
            });
        }
    }
    
    return (
        <div className="space-y-8 w-full">
            <PageHeader title="Community Forum" description="Ask questions, share solutions, and connect with the community." />

             <Card className="bg-card/50">
                <form onSubmit={handleSubmit(handlePostSubmit)}>
                    <CardHeader>
                        <CardTitle>Post a New Query</CardTitle>
                        <CardDescription>Having trouble? Ask the community for help. Fill out the details below.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="device-type">Device Type</Label>
                                <Controller
                                    name="deviceType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
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
                                    )}
                                />
                                {errors.deviceType && <p className="text-xs text-destructive">{errors.deviceType.message}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="brand">Brand</Label>
                                <Controller
                                    name="brand"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                                            <SelectTrigger id="brand">
                                                <SelectValue placeholder="Select brand..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {brands.map(brand => (
                                                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.brand && <p className="text-xs text-destructive">{errors.brand.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="issue-type">Issue Type</Label>
                                 <Controller
                                     name="issueType"
                                     control={control}
                                     render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                                            <SelectTrigger id="issue-type">
                                                <SelectValue placeholder="Select issue..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {issueTypes.map(issue => (
                                                    <SelectItem key={issue} value={issue}>{issue}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                     )}
                                 />
                                 {errors.issueType && <p className="text-xs text-destructive">{errors.issueType.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="title">Query Title</Label>
                            <Input id="title" placeholder="e.g., My laptop won't connect to Wi-Fi after update" {...register("title")} disabled={isSubmitting} />
                            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="description">Detailed Problem Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your issue in detail. What have you tried so far? Are there any error messages?"
                                className="min-h-[150px]"
                                {...register("description")}
                                disabled={isSubmitting}
                            />
                            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting || !authUser}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting ? 'Posting...' : 'Post to Forum'}
                            <Send className="ml-2 h-4 w-4"/>
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <Separator />
            
            <div className="space-y-4">
                 <h2 className="text-2xl font-headline font-bold">Recent Posts</h2>
                 {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                 ) : posts.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No posts yet. Be the first to ask a question!</p>
                 ) : (
                    posts.map(post => (
                        <Link href={`/forum/${post.id}`} key={post.id} className="block">
                            <Card className="hover:border-primary/80 transition-colors">
                                <CardHeader>
                                    <div className="flex gap-4">
                                        <Avatar>
                                            <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                                            <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg mb-1">{post.title}</CardTitle>
                                            <CardDescription>
                                                Posted by <span className="text-primary font-medium">{post.authorName}</span> &bull; {' '}
                                                {post.createdAt ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) : '...'}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground line-clamp-2">{post.content}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <HelpCircle className="h-4 w-4" />
                                        <span>{post.deviceType} &bull; {post.brand}</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))
                 )}
            </div>
        </div>
    );
}
