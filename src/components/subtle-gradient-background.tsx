import 'server-only';
import { generateSubtleGradient } from '@/ai/flows/generate-subtle-gradient';

export async function SubtleGradientBackground() {
  try {
    const { cssAnimation } = await generateSubtleGradient({});
    
    // The AI flow generates keyframes. We define the class that uses them.
    const fullCss = `
      ${cssAnimation}
      .animated-gradient-bg {
        background: linear-gradient(-45deg, hsl(222 47% 11%), hsl(222 39% 16%), hsl(220 30% 25%), hsl(222 47% 11%));
        background-size: 400% 400%;
        animation: gradient 25s ease infinite;
      }
    `;

    return <style dangerouslySetInnerHTML={{ __html: fullCss }} />;
  } catch (error) {
    console.error('Failed to generate subtle gradient:', error);
    // Fallback static gradient
    const fallbackCss = `
      .animated-gradient-bg {
        background: hsl(222 47% 11%);
      }
    `;
    return <style dangerouslySetInnerHTML={{ __html: fallbackCss }} />;
  }
}
