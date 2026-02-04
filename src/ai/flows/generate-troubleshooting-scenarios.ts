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
});
export type TroubleshootingScenarioInput = z.infer<typeof TroubleshootingScenarioInputSchema>;

const TroubleshootingScenarioOutputSchema = z.object({
  scenario: z
    .string()
    .describe('A detailed description of the computer troubleshooting scenario.'),
  steps: z.array(z.string()).describe('The expected steps to resolve the issue.'),
  solution: z.string().describe('The final solution to the troubleshooting scenario.'),
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

  The scenario should be detailed and engaging. Provide the expected steps to resolve the issue and the final solution.

  Ensure that the scenario, steps, and solution are clear and concise.

  Output the scenario in JSON format.
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
