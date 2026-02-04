'use server';

import { generateInteractiveScenarioFlow, type GeneratedGameScenario } from "@/ai/flows/generate-interactive-scenario";
import type { Game, GameScenario } from "./types";

const MAX_RETRIES = 3;

export const getNewInteractiveScenario = async (game: Game): Promise<GameScenario> => {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const generatedContent: GeneratedGameScenario = await generateInteractiveScenarioFlow({
        title: game.title,
        description: game.description,
      });

      // Combine the static game data with the AI-generated scenario
      const scenario: GameScenario = {
        id: game.id,
        ...generatedContent,
      };
      
      // Basic validation
      if (scenario.steps && scenario.steps.length > 0 && scenario.steps.every(s => s.actions.length === 3)) {
         return scenario;
      }
      console.warn(`Attempt ${i+1}: AI generated an invalid scenario structure.`);

    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
    }
  }
  throw new Error("Failed to generate a valid interactive scenario after multiple attempts.");
};
