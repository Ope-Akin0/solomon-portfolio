
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
    
    // Animate into view
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: Math.random() * 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div 
      ref={textRef} 
      className={`text-xl md:text-2xl font-bold text-white text-glow-faint opacity-0 ${className}`}
    >
      {text}
    </div>
  );
};


export const AnimatedServices = () => {
  return (
    <>
      <AnimatedText text="Full-Stack Expertise" className="text-center" />
      <AnimatedText text="Modern Web Solutions" className="text-center" />
    </>
  );
};
