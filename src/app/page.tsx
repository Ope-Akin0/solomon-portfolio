import Image from 'next/image';
import { Sections } from '@/components/sections';
import { SubtleGradientBackground } from '@/components/subtle-gradient-background';
import { CircularNav } from '@/components/circular-nav';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden animated-gradient-bg">
      <SubtleGradientBackground />
      <div className="absolute top-8 right-8 z-20">
        <div className="relative w-24 h-24 md:w-36 md:h-36">
          <Image
            src="/images/site.jpg"
            alt="Site owner"
            width={144}
            height={144}
            className="rounded-full object-cover w-full h-full irregular-border"
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
