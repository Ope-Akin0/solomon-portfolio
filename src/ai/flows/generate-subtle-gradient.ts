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
    Generate CSS for a beautiful, complex, and slow-shifting dark gradient animation for a dark theme portfolio. The animation should be very subtle.
    - The animation should be named 'gradient'.
    - It should last for 20 seconds and repeat infinitely.
    - The gradient should involve dark, deep colors like dark blues, deep purples, and dark greys, creating a celestial, nebula-like effect but much darker and less bright.
    - The gradient angle should also animate smoothly.
    - Output only the CSS containing the background property and the @keyframes rule. The class should be named .animated-gradient-bg
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
