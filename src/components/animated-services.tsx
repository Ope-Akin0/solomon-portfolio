'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedText = ({ text, positionClasses }: { text: string; positionClasses: string }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    
    const animate = () => {
      gsap.fromTo(
        el,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: Math.random() * 2,
          onComplete: () => {
            gsap.to(el, {
              opacity: 0,
              y: 20,
              duration: 1.5,
              delay: 3, 
              onComplete: animate,
            });
          },
        }
      );
    };
    
    animate();

  }, []);

  return (
    <div 
      ref={textRef} 
      className={`absolute text-xl md:text-2xl font-bold text-white text-glow-faint hidden md:block ${positionClasses}`}
      style={{ opacity: 0 }}
    >
      {text}
    </div>
  );
};


export function AnimatedServices() {
  return (
    <>
      <AnimatedText text="Full-Stack Expertise" positionClasses="bottom-1/4 left-1/4" />
      <AnimatedText text="Modern Web Solutions" positionClasses="bottom-1/4 right-1/4" />
    </>
  );
}
