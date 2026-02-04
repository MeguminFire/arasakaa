'use server';

import {
  generateInteractiveScenario,
  type InteractiveScenarioInput,
} from '@/ai/flows/generate-interactive-scenario';

export const getNewInteractiveScenario = async (input: InteractiveScenarioInput) => {
  // The AI can sometimes generate a scenario that isn't fully valid.
  // Add a simple retry mechanism.
  for (let i = 0; i < 3; i++) {
    try {
      const scenario = await generateInteractiveScenario(input);
      // Basic validation: ensure there is a scenario with at least one step.
      if (scenario && scenario.steps && scenario.steps.length > 0) {
        return scenario;
      }
    } catch (e) {
      console.error(`Attempt ${i+1} failed for getNewInteractiveScenario`, e);
    }
  }
  throw new Error("Failed to generate a valid interactive scenario after multiple attempts.");
};
