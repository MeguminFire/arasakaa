'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { forumPosts } from '@/lib/data';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send } from 'lucide-react';
import Link from 'next/link';

export default function ForumPostPage() {
  const params = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const postId = params.id as string;

  const post = useMemo(() => forumPosts.find((p) => p.id === postId), [postId]);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // This is a simulation.
    setTimeout(() => {
        toast({
            title: "Reply Posted!",
            description: "Your reply has been added to the conversation.",
        });
        setIsSubmitting(false);
    }, 1500);
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
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <CardDescription>
                Posted by <span className="font-medium text-primary">{post.user.name}</span> &bull; {post.createdAt}
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
            <span>{post.comments?.length ?? 0} Replies</span>
        </h2>

        {post.comments && post.comments.map((comment, index) => (
            <div key={comment.id} className="flex gap-4">
                <Avatar>
                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                     <Card>
                        <CardHeader className="p-4">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-primary">{comment.user.name}</p>
                                <p className="text-xs text-muted-foreground">{comment.createdAt}</p>
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
                <Textarea placeholder="Share your knowledge or ask for more details..." className="min-h-[150px]" required />
            </CardContent>
            <CardFooter>
                 <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Posting...' : 'Post Reply'}
                    <Send className="ml-2 h-4 w-4"/>
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
