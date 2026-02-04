'use server';

/**
 * @fileOverview Generates troubleshooting scenarios for the Troubleshoot Titans game.
 *
 * - generateTroubleshootingScenario - A function that generates a new troubleshooting scenario.
 * - TroubleshootingScenarioInput - The input type for the generateTroubleshootingScenario function.
 * - TroubleshootingScenarioOutput - The return type for the generateTroubleshootingScenario function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TroubleshootingScenarioInputSchema = z.object({
  topic: z
    .string()
    .describe('The specific computer troubleshooting topic to generate a scenario for.'),
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The difficulty level of the troubleshooting scenario.'),
  seed: z.string().describe('A random seed to ensure scenario uniqueness.'),
});
export type TroubleshootingScenarioInput = z.infer<typeof TroubleshootingScenarioInputSchema>;

const TroubleshootingStepSchema = z.object({
  stepTitle: z.string().describe('A title for this step of the troubleshooting process (e.g., "Initial Assessment", "Checking Connections").'),
  correctStep: z.string().describe('The single best action to take at this step.'),
  incorrectOptions: z.array(z.string()).describe('A list of 2 plausible but incorrect or inefficient actions for this step.'),
});

const TroubleshootingScenarioOutputSchema = z.object({
  scenario: z
    .string()
    .describe('A detailed description of the computer troubleshooting scenario.'),
  steps: z.array(TroubleshootingStepSchema).describe('An array of troubleshooting steps, each with a title, one correct option, and several incorrect options.'),
  solution: z.string().describe('The final solution to the troubleshooting scenario, explaining why the steps were correct.'),
});
export type TroubleshootingScenarioOutput = z.infer<typeof TroubleshootingScenarioOutputSchema>;

export async function generateTroubleshootingScenario(
  input: TroubleshootingScenarioInput
): Promise<TroubleshootingScenarioOutput> {
  return generateTroubleshootingScenarioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTroubleshootingScenarioPrompt',
  input: {schema: TroubleshootingScenarioInputSchema},
  output: {schema: TroubleshootingScenarioOutputSchema},
  prompt: `You are an expert in creating computer troubleshooting scenarios for a game.

Create a troubleshooting scenario based on the following topic and difficulty:

Topic: {{{topic}}}
Difficulty: {{{difficulty}}}

The scenario should be detailed and engaging. The game is turn-based. For each step of the troubleshooting process, provide:
1.  A \`stepTitle\` that describes the current phase of the investigation (e.g., "Initial Assessment", "Checking Connections").
2.  A \`correctStep\` which is the single best action to take.
3.  A list of 2 \`incorrectOptions\` which are plausible but wrong or inefficient actions.

Finally, provide an overall \`solution\` description that summarizes the correct actions and explains why they solve the problem.

Ensure the output is in JSON format.
  `,
});

const generateTroubleshootingScenarioFlow = ai.defineFlow(
  {
    name: 'generateTroubleshootingScenarioFlow',
    inputSchema: TroubleshootingScenarioInputSchema,
    outputSchema: TroubleshootingScenarioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
