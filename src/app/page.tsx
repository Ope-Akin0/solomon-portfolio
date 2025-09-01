import Image from 'next/image';
import { Sections } from '@/components/sections';
import { SubtleGradientBackground } from '@/components/subtle-gradient-background';
import { CircularNav } from '@/components/circular-nav';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden animated-gradient-bg">
      <SubtleGradientBackground />
      <div className="absolute top-8 right-8 z-20">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src="/site.jpg"
            alt="Site owner"
            width={128}
            height={128}
            className="rounded-full object-cover w-full h-full irregular-border"
          />
        </div>
      </div>
      <Image
        src="/site.jpg"
        alt="Celestial background"
        data-ai-hint="starry nebula"
        fill
        className="object-cover opacity-20 mix-blend-soft-light animate-pulse-slow"
      />
      <main className="relative z-10">
        <CircularNav />
        <Sections />
      </main>
    </div>
  );
}
