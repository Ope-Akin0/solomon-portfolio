'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const leftText = "Full-Stack Expertise";
const rightText = "Modern Web Solutions";

export function SideText() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateText = (el: HTMLDivElement | null) => {
      if (!el) return;
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
              onComplete: () => animateText(el) 
            });
          },
        }
      );
    };

    animateText(leftRef.current);
    animateText(rightRef.current);

  }, []);

  return (
    <>
      <div 
        ref={leftRef} 
        className="absolute top-1/2 left-8 -translate-y-[10rem] md:left-16 md:-translate-y-[12rem] text-lg md:text-xl font-semibold text-white text-glow-faint hidden md:block"
        style={{ opacity: 0 }}
      >
        {leftText}
      </div>
      <div 
        ref={rightRef} 
        className="absolute top-1/2 right-8 -translate-y-[10rem] md:right-16 md:-translate-y-[12rem] text-lg md:text-xl font-semibold text-white text-glow-faint hidden md:block"
        style={{ opacity: 0 }}
      >
        {rightText}
      </div>
    </>
  );
}
