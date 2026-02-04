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
  nextStepId: z.string().optional().describe("The ID of the next step to transition to if this is not the final solution. Must be a valid key from the top-level 'steps' object."),
});

const ActionSchema = z.object({
  id: z.string().describe("A unique ID for this action (e.g., 'action_1', 'action_2')."),
  text: z.string().describe("The description of the action a player can take (e.g., 'Check the power cable')."),
  result: ResultSchema.describe("The result of taking this action."),
});

const GameStepSchema = z.object({
  id: z.string().describe("A unique ID for this step (e.g., 'start', 'check_power', 'dead_end_1')."),
  title: z.string().describe("The title for this step in the troubleshooting process (e.g., 'Initial Assessment')."),
  description: z.string().describe("The situation or information presented to the player at this step."),
  actions: z.array(ActionSchema).describe("A list of 2-3 possible actions the player can take, each with its own embedded result object."),
});

const InteractiveScenarioOutputSchema = z.object({
  title: z.string().describe("The title of the overall scenario (e.g., 'The Computer Won't Start')."),
  initialSituation: z.string().describe("The initial problem description given to the player from the 'customer' perspective."),
  startStepId: z.string().describe("The ID of the starting step, which must be a key in the 'steps' object."),
  steps: z.record(z.string(), GameStepSchema).describe("A map of all possible steps in the game, keyed by their ID. There should be at least 3-5 steps."),
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
  prompt: `You are an engine for creating game data. Your SOLE task is to generate a valid JSON object that represents a branching, interactive troubleshooting game.

The JSON object you generate MUST strictly adhere to the output schema provided. Do not include any extra text, commentary, or markdown fences. Your entire output must be only the JSON object.

Generate the game based on this topic and difficulty:
- **Topic:** {{{topic}}}
- **Difficulty:** {{{difficulty}}}

Follow these rules for the generated JSON:
- The game must have a \`title\` and an \`initialSituation\`.
- There must be a graph of 3-5 game "steps". Each step is an object in the \`steps\` map.
- The \`startStepId\` must be the ID of one of the steps in the \`steps\` map.
- Each step object must have a unique \`id\`, a \`title\`, a \`description\`, and an array of 2-3 \`actions\`.
- Each action object must have its own embedded \`result\` object.
- One action path must lead to a solution. The result for the final correct action must have \`isSolution: true\`. All other results must have \`isSolution: false\`.
- Results for actions on the correct path to the solution should have \`isCorrectPath: true\`. Incorrect actions should have \`isCorrectPath: false\`.
- If a result does not solve the problem (\`isSolution: false\`), it can optionally have a \`nextStepId\` to move to another step. Every \`nextStepId\` MUST be a valid ID of a step in the top-level \`steps\` map.
- Provide a \`finalSolution\` string that explains the correct path through the game.

Produce ONLY the valid JSON object.
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
