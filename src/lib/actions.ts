// @ts-nocheck
'use server';

import {
  generateTroubleshootingScenario,
  TroubleshootingScenarioInput,
} from '@/ai/flows/generate-troubleshooting-scenarios';

export const getNewScenario = async (input: TroubleshootingScenarioInput) => {
  const scenario = await generateTroubleshootingScenario(input);
  return scenario;
};
