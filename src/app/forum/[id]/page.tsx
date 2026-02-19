'use client';

import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useFirebase } from '@/firebase/FirebaseProvider';
import { useUser } from '@/context/UserProvider';
import { doc, onSnapshot, collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import type { ForumPost, Comment } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

export default function ForumPostPage() {
  const params = useParams();
  const { toast } = useToast();
  const { db } = useFirebase();
  const { authUser, userProfile } = useUser();
  
  const postId = params.id as string;

  const [post, setPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newReply, setNewReply] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!db || !postId) return;
    const postRef = doc(db, 'forumPosts', postId);
    const unsubscribePost = onSnapshot(postRef, (docSnap) => {
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() } as ForumPost);
      } else {
        setPost(null);
      }
      setIsLoading(false);
    });

    const commentsRef = collection(db, 'forumPosts', postId, 'comments');
    const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'));
    const unsubscribeComments = onSnapshot(commentsQuery, (querySnapshot) => {
      const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
      setComments(commentsData);
    });

    return () => {
      unsubscribePost();
      unsubscribeComments();
    };
  }, [db, postId]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !authUser || !userProfile || !newReply.trim()) return;

    setIsSubmitting(true);
    try {
        const commentsRef = collection(db, 'forumPosts', postId, 'comments');
        await addDoc(commentsRef, {
            content: newReply,
            authorId: authUser.uid,
            authorName: userProfile.name,
            authorAvatar: userProfile.avatar || '',
            createdAt: serverTimestamp(),
        });
        setNewReply('');
        toast({
            title: "Reply Posted!",
            description: "Your reply has been added to the conversation.",
        });
    } catch (error) {
        console.error("Error posting reply:", error);
        toast({
            variant: 'destructive',
            title: "Error",
            description: "Could not post your reply. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return <PageHeader title="Post not found" description="This forum post does not exist." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader title={post.title}>
        <Button variant="outline" asChild>
          <Link href="/forum">Back to Community Forum</Link>
        </Button>
      </PageHeader>

      <Card className="border-primary/50">
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
              <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <CardDescription>
                Posted by <span className="font-medium text-primary">{post.authorName}</span> &bull;{' '}
                {post.createdAt ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) : 'just now'}
              </CardDescription>
               <CardDescription className="mt-1">
                {post.deviceType} &bull; {post.brand}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-foreground/90">{post.content}</p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="flex items-center gap-2 text-xl font-headline font-bold">
            <MessageSquare className="h-6 w-6"/>
            <span>{comments.length} Replies</span>
        </h2>

        {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
                <Avatar>
                    <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                    <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                     <Card>
                        <CardHeader className="p-4">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-primary">{comment.authorName}</p>
                                <p className="text-xs text-muted-foreground">
                                    {comment.createdAt ? formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true }) : 'just now'}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="whitespace-pre-wrap">{comment.content}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        ))}
      </div>
      
      <Separator />

      <Card>
        <form onSubmit={handleReplySubmit}>
            <CardHeader>
                <CardTitle>Leave a Reply</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea 
                    placeholder="Share your knowledge or ask for more details..." 
                    className="min-h-[150px]"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    required
                    disabled={!authUser}
                />
            </CardContent>
            <CardFooter>
                 <Button type="submit" disabled={isSubmitting || !authUser || !newReply.trim()}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? 'Posting...' : 'Post Reply'}
                    <Send className="ml-2 h-4 w-4"/>
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
