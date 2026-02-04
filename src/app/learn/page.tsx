import Image from 'next/image';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function LearnPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Troubleshooting Fundamentals"
        description="Master the art of diagnosing and solving computer problems."
      />

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-48 w-full md:h-64">
            <Image
              src={getPlaceholderImage('learn-hero-cyberpunk')?.imageUrl ?? ''}
              alt="Futuristic city night"
              data-ai-hint={getPlaceholderImage('learn-hero-cyberpunk')?.imageHint ?? ''}
              fill
              className="object-cover"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is Troubleshooting?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Troubleshooting is a logical, systematic search for the source of a problem in order to solve it, and make the product or process operational again. It is a form of problem solving, often applied to repair failed products or processes on a machine or a system. It is a foundational skill for any IT professional.
          </p>
          <p>
            Instead of randomly trying solutions—a method sometimes called "shotgunning"—a skilled troubleshooter uses a structured process to isolate the root cause. This involves eliminating potential causes one by one, starting with the most obvious or easiest to test, until the true source of the problem is found. This methodical approach saves time, prevents unnecessary changes, and ensures a reliable and permanent fix.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Watch & Learn: Professional Troubleshooting Theory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This video from Professor Messer provides an excellent overview of the troubleshooting methodology used by CompTIA A+ certified professionals.
          </p>
          <div className="aspect-video w-full border-2 border-primary/50 rounded-lg overflow-hidden">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/p6_n2tV362s"
              title="YouTube video player: A+ | Troubleshooting Theory"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>The 6 Steps of Troubleshooting</CardTitle>
          <CardDescription>A structured approach to solving any technical problem.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center p-4 border rounded-lg">
                <div className="w-full space-y-2">
                    <h3 className="font-headline text-xl text-primary">1. Identify the problem</h3>
                    <p className="text-muted-foreground">The first step is to gather as much information as possible. Ask open-ended questions to the user: What were you doing when the problem occurred? Are there any error messages? When did it last work correctly? Have there been any recent changes (software updates, new hardware)? The goal is to fully understand the symptoms from the user's perspective. Be sure to document everything.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-6 items-center p-4 border rounded-lg">
                <div className="w-full md:w-2/3 space-y-2">
                    <h3 className="font-headline text-xl text-primary">2. Establish a theory of probable cause</h3>
                    <p className="text-muted-foreground">Based on the symptoms you've identified, form a hypothesis. Start by questioning the obvious. If the internet is down, is the network cable plugged in? If a device won't turn on, is it connected to power? Your initial theories should be simple and easy to test. As you rule out the simple causes, your theories will become more complex, but always start with the most likely and straightforward explanations first.</p>
                </div>
                <div className="w-full md:w-1/3">
                  <Image
                    src={getPlaceholderImage('learn-flowchart')?.imageUrl ?? ''}
                    alt="Holographic interface showing a flowchart"
                    data-ai-hint={getPlaceholderImage('learn-flowchart')?.imageHint ?? ''}
                    width={400}
                    height={400}
                    className="rounded-lg object-cover"
                  />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center p-4 border rounded-lg">
                <div className="w-full space-y-2">
                    <h3 className="font-headline text-xl text-primary">3. Test the theory to determine cause</h3>
                    <p className="text-muted-foreground">Once you have a theory, you must test it. This test should confirm or deny your hypothesis. If your theory is that a network cable is faulty, try a known-good cable. If your theory is that a software setting is incorrect, check the setting. If your test proves your theory correct, you've found the cause. If not, it's time to establish a new theory (escalating if necessary) and repeat this step. Remember to only test one thing at a time.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-6 items-center p-4 border rounded-lg">
                <div className="w-full md:w-2/3 space-y-2">
                    <h3 className="font-headline text-xl text-primary">4. Establish a plan of action and implement it</h3>
                    <p className="text-muted-foreground">With the cause identified, you can now plan your solution. What steps are needed to resolve the issue? Do you need to replace a part, update a driver, or change a configuration? Consider any potential side effects. For example, will updating a driver affect other software? Once you have a clear plan, implement the solution. This could be as simple as plugging in a cable or as complex as replacing a motherboard.</p>
                </div>
                 <div className="w-full md:w-1/3">
                    <Image
                      src={getPlaceholderImage('learn-implementation')?.imageUrl ?? ''}
                      alt="Cyberpunk workshop with tools"
                      data-ai-hint={getPlaceholderImage('learn-implementation')?.imageHint ?? ''}
                      width={400}
                      height={400}
                      className="rounded-lg object-cover"
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center p-4 border rounded-lg">
                <div className="w-full space-y-2">
                    <h3 className="font-headline text-xl text-primary">5. Verify full system functionality</h3>
                    <p className="text-muted-foreground">After implementing the fix, don't just assume the problem is solved. You must verify it. Have the user confirm that the original issue is gone. Additionally, it's crucial to implement preventative measures. If a driver was out of date, what can you do to ensure drivers are checked more regularly? If a setting was wrong, how can you prevent it from being changed incorrectly in the future? This proactive step turns a simple fix into a long-term improvement.</p>
                </div>
            </div>

             <div className="flex flex-col md:flex-row gap-6 items-center p-4 border rounded-lg">
                <div className="w-full space-y-2">
                    <h3 className="font-headline text-xl text-primary">6. Document findings, actions, and outcomes</h3>
                    <p className="text-muted-foreground">The final step is documentation. Record everything: the initial symptoms, your theories (both correct and incorrect), the steps you took to test them, the final solution, and the preventative measures you implemented. This documentation is invaluable. It helps other technicians solve similar problems faster, provides a record of work done, and helps in identifying recurring issues. Clear and concise documentation is the hallmark of a true professional.</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
