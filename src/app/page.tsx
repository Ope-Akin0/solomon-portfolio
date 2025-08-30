import { Sections } from '@/components/sections';
import { SubtleGradientBackground } from '@/components/subtle-gradient-background';
import { CircularNav } from '@/components/circular-nav';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden animated-gradient-bg">
      <SubtleGradientBackground />
      <main className="relative z-10">
        <CircularNav />
        <Sections />
      </main>
    </div>
  );
}
