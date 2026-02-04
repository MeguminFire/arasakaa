'use server';

/**
 * @fileOverview Generates an interactive, branching troubleshooting scenario for a game.
 *
 * - generateInteractiveScenario - A function that generates a new interactive scenario.
 * - InteractiveScenarioInput - The input type for the generateInteractiveScenario function.
 * - InteractiveScenarioOutput - The return type for the generateInteractiveScenario function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveScenarioInputSchema = z.object({
  topic: z
    .string()
    .describe('The specific computer troubleshooting topic to generate a scenario for.'),
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The difficulty level of the troubleshooting scenario.'),
});
export type InteractiveScenarioInput = z.infer<typeof InteractiveScenarioInputSchema>;

const ActionSchema = z.object({
  id: z.string().describe("A unique ID for this action (e.g., 'action_1', 'action_2')."),
  text: z.string().describe("The description of the action a player can take (e.g., 'Check the power cable')."),
});

const ResultSchema = z.object({
  text: z.string().describe("The observed outcome of taking the corresponding action (e.g., 'The power cable was loose. You plug it in securely.')."),
  isCorrectPath: z.boolean().describe("Whether this action leads towards the solution."),
  isSolution: z.boolean().describe("Whether this action ultimately solves the entire problem."),
  nextStepId: z.string().optional().describe("The ID of the next step to transition to if this action is not the final solution."),
});

const GameStepSchema = z.object({
  id: z.string().describe("A unique ID for this step (e.g., 'start', 'check_power', 'dead_end_1')."),
  title: z.string().describe("The title for this step in the troubleshooting process (e.g., 'Initial Assessment')."),
  description: z.string().describe("The situation or information presented to the player at this step."),
  actions: z.array(ActionSchema).describe("A list of 2-3 possible actions the player can take."),
  results: z.record(z.string(), ResultSchema).describe("A map where the key is an action ID from the 'actions' array and the value is the result of that action."),
});

const InteractiveScenarioOutputSchema = z.object({
  title: z.string().describe("The title of the overall scenario (e.g., 'The Computer Won't Start')."),
  initialSituation: z.string().describe("The initial problem description given to the player from the 'customer' perspective."),
  startStepId: z.string().describe("The ID of the starting step, which must be a key in the 'steps' object."),
  steps: z.record(z.string(), GameStepSchema).describe("A map of all possible steps in the game, keyed by their ID. There should be at least 3-4 steps."),
  finalSolution: z.string().describe("A detailed explanation of the optimal path to solve the problem, for the user to review after winning.")
});
export type InteractiveScenarioOutput = z.infer<typeof InteractiveScenarioOutputSchema>;


export async function generateInteractiveScenario(
  input: InteractiveScenarioInput
): Promise<InteractiveScenarioOutput> {
  return generateInteractiveScenarioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInteractiveScenarioPrompt',
  input: {schema: InteractiveScenarioInputSchema},
  output: {schema: InteractiveScenarioOutputSchema},
  prompt: `You are a game designer creating a text-based, interactive troubleshooting game.
Your task is to generate a complete, self-contained game state machine in JSON format.

The game should be a branching narrative where the player makes choices to diagnose and solve a computer problem.

**Topic:** {{{topic}}}
**Difficulty:** {{{difficulty}}}

**Instructions:**
1.  Create a scenario with a clear problem and a title.
2.  Define a starting step with an initial situation description.
3.  Create a graph of at least 3-4 steps. Each step should represent a state in the game.
4.  Each step must have a unique \`id\`, a \`title\`, a \`description\` of the current situation, and a list of 2-3 player \`actions\`.
5.  For each action in a step, define a corresponding \`result\` in the \`results\` map, using the action's \`id\` as the key.
6.  A result should describe the outcome of the action. It must indicate if the action is part of the correct path (\`isCorrectPath\`).
7.  One of the paths must lead to a final, successful resolution. The action that resolves the issue should have \`isSolution\` set to \`true\`.
8.  Incorrect actions should lead to steps that either are dead ends or provide feedback that guides the player back to the right path. These results should have \`isCorrectPath: false\`. The next step could be the same step or a new one explaining the wrong turn.
9.  Ensure all \`nextStepId\` values correspond to valid keys in the main \`steps\` object.
10. The \`startStepId\` must be the ID of the first step.
11. Finally, provide a \`finalSolution\` text that explains the correct path and why it works.

The output must be a valid JSON object that conforms to the provided schema.
  `,
});

const generateInteractiveScenarioFlow = ai.defineFlow(
  {
    name: 'generateInteractiveScenarioFlow',
    inputSchema: InteractiveScenarioInputSchema,
    outputSchema: InteractiveScenarioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
