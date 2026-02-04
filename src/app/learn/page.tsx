import Image from 'next/image';
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Troubleshooting Fundamentals"
        description="Master the art of diagnosing and solving computer problems."
      />

      <Card>
        <CardContent className="p-0">
          <div className="relative h-48 w-full md:h-64">
            <Image
              src={getPlaceholderImage('learn-hero')?.imageUrl ?? ''}
              alt="Person learning about technology"
              data-ai-hint="learning technology"
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is Troubleshooting?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Troubleshooting is a logical, systematic search for the source of a problem in order to solve it, and make the product or process operational again. It's a skill that combines technical knowledge, critical thinking, and a bit of detective work.
          </p>
          <p>
            Instead of randomly trying solutions, a skilled troubleshooter follows a structured process to isolate the cause of the problem and implement a reliable fix.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Watch & Learn: Troubleshooting Theory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This video from Professor Messer provides an excellent overview of the troubleshooting methodology used by professionals.
          </p>
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full rounded-lg"
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
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-2/3 space-y-4">
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">1. Identify the problem</h3>
                        <p className="text-muted-foreground">Gather information from the user. What exactly is happening? When did it start? Were there any recent changes?</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">2. Establish a theory of probable cause</h3>
                        <p className="text-muted-foreground">Based on the symptoms, form a hypothesis. Start with the most obvious and simplest potential causes.</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">3. Test the theory to determine cause</h3>
                        <p className="text-muted-foreground">Test your hypothesis. If the theory is that a cable is loose, check the cable. If the theory is confirmed, move to the next step. If not, form a new theory.</p>
                    </div>
                </div>
                 <div className="w-full md:w-1/3">
                    <Image
                      src={getPlaceholderImage('learn-steps')?.imageUrl ?? ''}
                      alt="Flowchart diagram"
                      data-ai-hint="flowchart diagram"
                      width={400}
                      height={400}
                      className="rounded-lg object-cover"
                    />
                </div>
            </div>
             <div className="flex flex-col-reverse md:flex-row gap-6 items-center">
                 <div className="w-full md:w-1/3">
                    <Image
                      src={getPlaceholderImage('learn-tools')?.imageUrl ?? ''}
                      alt="Computer repair tools"
                      data-ai-hint="computer tools"
                      width={400}
                      height={400}
                      className="rounded-lg object-cover"
                    />
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                     <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">4. Establish a plan of action and implement it</h3>
                        <p className="text-muted-foreground">Once the cause is known, create a plan to fix it. This might involve repairing a component, changing a setting, or installing software.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">5. Verify full system functionality</h3>
                        <p className="text-muted-foreground">After implementing the solution, test everything to make sure the problem is gone and that you haven't created a new one.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">6. Document findings, actions, and outcomes</h3>
                        <p className="text-muted-foreground">Record what you did. This helps with future issues and builds a knowledge base for you and your team.</p>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
