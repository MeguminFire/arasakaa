'use server';

/**
 * @fileOverview Provides AI-powered feedback on troubleshooting steps in the Troubleshooting Game.
 *
 * - getTroubleshootingFeedback - A function that provides feedback on the user's troubleshooting steps.
 * - TroubleshootingFeedbackInput - The input type for the getTroubleshootingFeedback function.
 * - TroubleshootingFeedbackOutput - The return type for the getTroubleshootingFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TroubleshootingFeedbackInputSchema = z.object({
  problemDescription: z.string().describe('Description of the computer problem.'),
  userSteps: z.array(z.string()).describe('Array of troubleshooting steps taken by the user.'),
  expectedSolution: z.string().describe('The expected solution to the problem.'),
});
export type TroubleshootingFeedbackInput = z.infer<
  typeof TroubleshootingFeedbackInputSchema
>;

const TroubleshootingFeedbackOutputSchema = z.object({
  feedback: z.string().describe('AI-powered feedback on the troubleshooting steps.'),
  isCorrect: z.boolean().describe('Whether the troubleshooting steps were correct.'),
});
export type TroubleshootingFeedbackOutput = z.infer<
  typeof TroubleshootingFeedbackOutputSchema
>;

export async function getTroubleshootingFeedback(
  input: TroubleshootingFeedbackInput
): Promise<TroubleshootingFeedbackOutput> {
  return troubleshootingGameFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'troubleshootingGameFeedbackPrompt',
  input: {schema: TroubleshootingFeedbackInputSchema},
  output: {schema: TroubleshootingFeedbackOutputSchema},
  prompt: `You are an AI assistant providing feedback on a user\'s troubleshooting steps for a computer problem.

  Problem Description: {{{problemDescription}}}
  User Steps:
  {{#each userSteps}}
  - {{{this}}}
  {{/each}}
  Expected Solution: {{{expectedSolution}}}

  Provide feedback on the user\'s steps. Indicate whether the steps were correct and explain why or why not.
  Set the isCorrect output field to true if the steps were correct, and false otherwise.
  `,
});

const troubleshootingGameFeedbackFlow = ai.defineFlow(
  {
    name: 'troubleshootingGameFeedbackFlow',
    inputSchema: TroubleshootingFeedbackInputSchema,
    outputSchema: TroubleshootingFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
