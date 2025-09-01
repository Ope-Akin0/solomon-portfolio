import Image from 'next/image';
import { Sections } from '@/components/sections';
import { SubtleGradientBackground } from '@/components/subtle-gradient-background';
import { CircularNav } from '@/components/circular-nav';
import { AnimatedServices } from '@/components/animated-services';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden animated-gradient-bg-fallback">
      <SubtleGradientBackground />
      <div className="absolute top-8 left-8 z-20">
        <h2 className="text-5xl md:text-6xl font-bold text-white text-outline-cyan">
          YOU IMAGINE, <br /> WE CREATE
        </h2>
      </div>
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
       <div className="absolute top-1/2 -translate-y-1/2 left-8 z-20 hidden md:block">
        <h3 className="text-2xl font-semibold text-white text-glow-faint [writing-mode:vertical-rl] rotate-180 uppercase tracking-widest">
          Full-Stack Expertise
        </h3>
      </div>
       <div className="absolute top-1/2 -translate-y-1/2 right-8 z-20 hidden md:block">
        <h3 className="text-2xl font-semibold text-white text-glow-faint [writing-mode:vertical-rl] uppercase tracking-widest">
          Modern Web Solutions
        </h3>
      </div>
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Tech background"
        data-ai-hint="robotic arm"
        fill
        className="object-cover opacity-10 mix-blend-soft-light animate-pulse-slow"
      />
      <main className="relative z-10">
        <CircularNav />
        <AnimatedServices />
        <Sections />
      </main>
    </div>
  );
}
