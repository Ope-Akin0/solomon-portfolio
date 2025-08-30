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
  prompt: `You are a CSS animation expert.

  Generate a subtle, slowly-shifting gradient animation using CSS keyframes. The gradient should smoothly transition between a few shades of dark grey/slate, creating a 'breathing' effect suitable for a portfolio website background. The animation should be infinitely looping and optimized for performance.

  The output should be the complete CSS code for the animation, ready to be included in a <style> tag or CSS file.

  Do not include any HTML or other code, only the CSS keyframes and animation properties.

  Do not repeat yourself, use as few lines as possible.
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
