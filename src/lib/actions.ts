// @ts-nocheck
'use server';

import {
  getTroubleshootingFeedback,
  TroubleshootingFeedbackInput,
} from '@/ai/flows/troubleshooting-game-feedback';
import {
  generateTroubleshootingScenario,
  TroubleshootingScenarioInput,
} from '@/ai/flows/generate-troubleshooting-scenarios';

export const getGameFeedback = async (input: TroubleshootingFeedbackInput) => {
  const feedback = await getTroubleshootingFeedback(input);
  return feedback;
};

export const getNewScenario = async (input: TroubleshootingScenarioInput) => {
  const scenario = await generateTroubleshootingScenario(input);
  return scenario;
};
