import Image from 'next/image';
import { Sections } from '@/components/sections';
import { SubtleGradientBackground } from '@/components/subtle-gradient-background';
import { CircularNav } from '@/components/circular-nav';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden animated-gradient-bg">
      <SubtleGradientBackground />
      <div className="absolute top-8 right-8 z-20">
        <div className="relative w-32 h-32 md:w-48 md:h-48">
          <Image
            src="/images/site.jpg"
            alt="Site owner"
            fill
            className="rounded-full object-cover object-top w-full h-full irregular-border"
          />
        </div>
      </div>
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Tech background"
        data-ai-hint="robotic arm"
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
