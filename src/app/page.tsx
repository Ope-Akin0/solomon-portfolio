import Image from 'next/image';
import { Sections } from '@/components/sections';
import { SubtleGradientBackground } from '@/components/subtle-gradient-background';
import { CircularNav } from '@/components/circular-nav';
import { AnimatedServices } from '@/components/animated-services';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden animated-gradient-bg-fallback">
      <SubtleGradientBackground />
      <div className="absolute top-8 left-8 z-20">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-2 w-16 bg-cyan-400 rounded-full"></div>
            <div className="h-2 w-12 bg-white rounded-full"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white text-outline-cyan">
            YOU IMAGINE, <br /> WE CREATE
          </h2>
           <div className="flex flex-col gap-2">
            <div className="h-2 w-12 bg-cyan-400 rounded-full"></div>
            <div className="h-2 w-16 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
      <Link href="#work-with-me" className="absolute top-8 right-8 z-20">
        <div className="relative w-32 h-32 md:w-48 md:h-48">
          <Image
            src="/images/site.jpg"
            alt="Site owner"
            fill
            className="rounded-full object-cover object-top w-full h-full irregular-border"
          />
        </div>
      </Link>
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
