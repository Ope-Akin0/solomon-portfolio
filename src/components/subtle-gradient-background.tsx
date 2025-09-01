import 'server-only';
import { generateSubtleGradient } from '@/ai/flows/generate-subtle-gradient';

export async function SubtleGradientBackground() {
  try {
    const { cssAnimation } = await generateSubtleGradient({});
    // The AI-generated class will override the fallback
    return <style dangerouslySetInnerHTML={{ __html: cssAnimation }} />;
  } catch (error) {
    console.error('Failed to generate subtle gradient, using fallback:', error);
    // Return null to allow the fallback CSS to take effect
    return null;
  }
}
