import 'server-only';
import { generateSubtleGradient } from '@/ai/flows/generate-subtle-gradient';

export async function SubtleGradientBackground() {
  try {
    const { cssAnimation } = await generateSubtleGradient({});
    
    return <style dangerouslySetInnerHTML={{ __html: cssAnimation }} />;
  } catch (error) {
    console.error('Failed to generate subtle gradient:', error);
    // Fallback static gradient
    const fallbackCss = `
      .animated-gradient-bg {
        background: #0a0a2a;
      }
    `;
    return <style dangerouslySetInnerHTML={{ __html: fallbackCss }} />;
  }
}
