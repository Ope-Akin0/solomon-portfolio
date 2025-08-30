import 'server-only';
import { generateSubtleGradient } from '@/ai/flows/generate-subtle-gradient';

export async function SubtleGradientBackground() {
  try {
    const { cssAnimation } = await generateSubtleGradient({});
    
    // The AI flow generates keyframes. We define the class that uses them.
    const fullCss = `
      ${cssAnimation}
      .animated-gradient-bg {
        background: linear-gradient(-45deg, hsl(0 0% 100%), hsl(0 0% 98%), hsl(0 0% 96%), hsl(0 0% 100%));
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
        background: hsl(0 0% 100%);
      }
    `;
    return <style dangerouslySetInnerHTML={{ __html: fallbackCss }} />;
  }
}
