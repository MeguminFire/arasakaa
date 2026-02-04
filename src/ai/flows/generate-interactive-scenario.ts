'use server';

/**
 * @fileOverview Generates an interactive, troubleshooting scenario for a game.
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
  text: z.string().describe("The description of the action a player can take (e.g., 'Check the power cable')."),
  isCorrect: z.boolean().describe("Whether this is the correct action for the current step. Exactly one action per step should be true."),
  feedback: z.string().describe("The immediate feedback or result of taking this action (e.g., 'The cable was loose. You plug it in securely.' or 'The monitor is on, but still shows no signal.').")
});

const GameStepSchema = z.object({
  title: z.string().describe("The title for this step in the troubleshooting process (e.g., 'Initial Assessment')."),
  description: z.string().describe("The situation or information presented to the player at this step."),
  actions: z.array(ActionSchema).min(2).max(3).describe("A list of 2-3 possible actions. Exactly ONE action must have `isCorrect: true`."),
});

const InteractiveScenarioOutputSchema = z.object({
  title: z.string().describe("The title of the overall scenario (e.g., 'The Computer Won't Start')."),
  initialSituation: z.string().describe("The initial problem description given to the player from the 'customer' perspective."),
  steps: z.array(GameStepSchema).describe("An array of all possible steps in the game. The game starts at index 0. There should be at least 3-5 steps, representing the correct path."),
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
  prompt: `You are a game data generator. Your only function is to create a JSON object for an interactive troubleshooting game. The JSON you output MUST be valid and strictly follow the provided schema. Do not add any text or markdown before or after the JSON object.

**GAME RULES:**
1.  **Structure:** The game is a linear sequence of 'steps' that represent the single correct path to solve the problem.
2.  **Steps:** Each step has a 'description' and a list of 'actions'.
3.  **Actions:** For each step, you must provide 2-3 possible actions.
    *   **Exactly one** action MUST be the correct one, with \`isCorrect: true\`.
    *   All other actions for that step MUST be incorrect, with \`isCorrect: false\`.
    *   Each action must have 'feedback' explaining the outcome of that specific action.
4.  **Game Flow:** The game will automatically progress to the next step in the array when the player chooses the correct action. The correct action on the final step wins the game.

**YOUR TASK:**
Generate a game with 3-5 steps about the following:
- **Topic:** {{{topic}}}
- **Difficulty:** {{{difficulty}}}

**OUTPUT FORMAT:**
Your output must be a single, raw JSON object. Produce ONLY the valid JSON object.
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
    if (!output) {
      throw new Error("Generated output was null or invalid.");
    }
    return output;
  }
);
