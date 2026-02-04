'use server';
/**
 * @fileOverview A Genkit flow for generating unique, interactive troubleshooting game scenarios.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define Zod schemas that match the data types
const ActionSchema = z.object({
  text: z.string().describe('The description of the action the player can take.'),
  isCorrect: z.boolean().describe('Set to true for the one correct action, false for incorrect ones.'),
  feedback: z.string().describe('The result of taking this action. If correct, it leads to the next step. If incorrect, it explains why.'),
});

const GameStepSchema = z.object({
  title: z.string().describe('The title for this step of the scenario (e.g., "Initial Check").'),
  description: z.string().describe('The situation at this step.'),
  hint: z.string().describe('A helpful tip if the player gets stuck.'),
  actions: z.array(ActionSchema).length(3).describe('An array of exactly 3 actions: one correct, two incorrect.'),
});

const GameScenarioOutputSchema = z.object({
  title: z.string().describe('A creative and specific title for this unique troubleshooting scenario, based on the input game title.'),
  initialSituation: z.string().describe("A detailed description of the problem from a user's perspective, setting the scene."),
  steps: z.array(GameStepSchema).min(3).max(5).describe('An array of 3 to 5 linear steps to solve the problem.'),
  finalSolution: z.string().describe('A summary of the optimal solution path that the player just completed.'),
});

export type GeneratedGameScenario = z.infer<typeof GameScenarioOutputSchema>;

const GameScenarioInputSchema = z.object({
    title: z.string(),
    description: z.string(),
});

const generationPrompt = ai.definePrompt({
    name: 'generateInteractiveScenarioPrompt',
    input: { schema: GameScenarioInputSchema },
    output: { schema: GameScenarioOutputSchema },
    prompt: `You are an expert IT support technician and a creative game designer. Your task is to generate a unique, interactive troubleshooting scenario for a training game called "Glitch Guild".

The scenario should be based on the following game concept:
- Title: {{{title}}}
- Description: {{{description}}}

Generate a complete scenario with a unique title, an initial situation, a linear series of 3 to 5 steps, and a final solution summary.

RULES:
1.  **Linear Progression:** The steps must follow a logical, single path to victory. There are no branches.
2.  **Actions:** Each step MUST have exactly three actions:
    - One and only one action with \`isCorrect: true\`. This action moves the player to the next step.
    - Two plausible but incorrect actions with \`isCorrect: false\`. These actions should provide educational feedback but keep the player on the current step.
3.  **Feedback:** The \`feedback\` for a correct action should confirm the choice and describe what happens next. The \`feedback\` for an incorrect action must explain *why* it was the wrong choice.
4.  **Content:** The scenario should be realistic, engaging, and educational for someone learning IT troubleshooting.
5.  **Final Step:** The final step's correct action should lead to the game's conclusion.
6.  **Final Solution:** The \`finalSolution\` field should be a short paragraph summarizing the correct sequence of actions the player took to solve the problem.
`,
});

export const generateInteractiveScenarioFlow = ai.defineFlow(
    {
        name: 'generateInteractiveScenarioFlow',
        inputSchema: GameScenarioInputSchema,
        outputSchema: GameScenarioOutputSchema,
    },
    async (input) => {
        const { output } = await generationPrompt(input);
        if (!output) {
            throw new Error("Failed to generate a scenario.");
        }
        // Validate that each step has exactly one correct answer
        for (const step of output.steps) {
            const correctActions = step.actions.filter(a => a.isCorrect).length;
            if (correctActions !== 1) {
                throw new Error(`Validation failed: A step has ${correctActions} correct actions instead of 1.`);
            }
        }
        return output;
    }
);
