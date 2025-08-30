'use server';

/**
 * @fileOverview Generates a subtle animated gradient for a portfolio website background.
 *
 * - generateSubtleGradient - A function that generates the subtle gradient animation.
 * - GenerateSubtleGradientInput - The input type for the generateSubtleGradient function (empty object).
 * - GenerateSubtleGradientOutput - The return type for the generateSubtleGradient function (string containing CSS animation code).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSubtleGradientInputSchema = z.object({});
export type GenerateSubtleGradientInput = z.infer<typeof GenerateSubtleGradientInputSchema>;

const GenerateSubtleGradientOutputSchema = z.object({
  cssAnimation: z.string().describe('CSS code for the animated gradient.'),
});
export type GenerateSubtleGradientOutput = z.infer<typeof GenerateSubtleGradientOutputSchema>;

export async function generateSubtleGradient(input: GenerateSubtleGradientInput): Promise<GenerateSubtleGradientOutput> {
  return generateSubtleGradientFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSubtleGradientPrompt',
  input: {schema: GenerateSubtleGradientInputSchema},
  output: {schema: GenerateSubtleGradientOutputSchema},
  prompt: `
    Generate CSS keyframes for a subtle, slow-shifting gradient.
    - Name the animation 'gradient'.
    - The animation should be infinite and take 25 seconds.
    - It should smoothly transition between shades of dark grey/slate for a 'breathing' effect.
    - Output only the @keyframes CSS code.
  `,
});

const generateSubtleGradientFlow = ai.defineFlow(
  {
    name: 'generateSubtleGradientFlow',
    inputSchema: GenerateSubtleGradientInputSchema,
    outputSchema: GenerateSubtleGradientOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
