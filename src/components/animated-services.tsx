
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    
    // Animate to appear and disappear
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
      },
      repeat: -1, 
      repeatDelay: 1
    });

    tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.inOut' })
      .to(el, { opacity: 0, duration: 1.5, ease: 'power2.inOut', delay: 2 });

  }, []);

  return (
    <div 
      ref={textRef} 
      className={`text-lg md:text-xl font-bold text-white text-glow-faint opacity-0 ${className}`}
    >
      {text}
    </div>
  );
};

export const AnimatedServices = () => {
  return (
    <>
      <AnimatedText text="Software composing" className="text-center" />
      <AnimatedText text="Modern Web Solutions" className="text-center" />
    </>
  );
};
