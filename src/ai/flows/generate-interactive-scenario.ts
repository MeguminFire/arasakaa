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

const ResultSchema = z.object({
  text: z.string().describe("The observed outcome of taking the corresponding action (e.g., 'The power cable was loose. You plug it in securely.')."),
  isCorrectPath: z.boolean().describe("Whether this action leads towards the solution."),
  isSolution: z.boolean().describe("Whether this action ultimately solves the entire problem."),
  nextStepIndex: z.number().optional().describe("The array index of the next step to transition to. This is REQUIRED if 'isSolution' is false. It must be a valid index in the top-level 'steps' array."),
});

const ActionSchema = z.object({
  text: z.string().describe("The description of the action a player can take (e.g., 'Check the power cable')."),
  result: ResultSchema.describe("The result of taking this action."),
});

const GameStepSchema = z.object({
  title: z.string().describe("The title for this step in the troubleshooting process (e.g., 'Initial Assessment')."),
  description: z.string().describe("The situation or information presented to the player at this step."),
  actions: z.array(ActionSchema).describe("A list of 2-3 possible actions the player can take, each with its own embedded result object."),
});

const InteractiveScenarioOutputSchema = z.object({
  title: z.string().describe("The title of the overall scenario (e.g., 'The Computer Won't Start')."),
  initialSituation: z.string().describe("The initial problem description given to the player from the 'customer' perspective."),
  steps: z.array(GameStepSchema).describe("An array of all possible steps in the game. The game starts at index 0. There should be at least 3-5 steps."),
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
1.  **Structure:** The game is an array of "steps". The player starts at \`steps[0]\`.
2.  **Steps:** Each step has a scenario (\`description\`) and 2-3 \`actions\` the player can choose.
3.  **Actions & Results:** Each action has a \`result\`.
    *   The result describes what happens (\`text\`).
    *   It says if the action was helpful (\`isCorrectPath: true\`) or not (\`isCorrectPath: false\`).
4.  **Winning:** One action's result must have \`isSolution: true\`. This ends the game. All other actions must have \`isSolution: false\`.
5.  **Branching:**
    *   If a result has \`isSolution: false\`, it MUST have a \`nextStepIndex\` property pointing to the index of the next step in the main \`steps\` array.
    *   The \`nextStepIndex\` value MUST be a valid index in the \`steps\` array (i.e., between 0 and \`steps.length - 1\`).
    *   If a result has \`isSolution: true\`, there should be no \`nextStepIndex\`.

**YOUR TASK:**
Generate a game with 3-5 steps about the following:
- **Topic:** {{{topic}}}
- **Difficulty:** {{{difficulty}}}

**OUTPUT FORMAT:**
Your output must be a single, raw JSON object. Double-check your final output to ensure all \`nextStepIndex\` values point to valid indexes within the \`steps\` array you created. Produce ONLY the valid JSON object.
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
