'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function AnimatedServices() {
  const serviceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = serviceRef.current;
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          onComplete: () => {
            gsap.to(el, {
              opacity: 0,
              duration: 1.5,
              delay: 2, // 1.5s fade-in + 2s visible + 1.5s fade-out = 5s total cycle
            });
          },
        }
      );
    }
  }, []);

  return (
    <div 
        ref={serviceRef} 
        className="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-[8rem] md:translate-x-[12rem] text-2xl md:text-3xl font-bold whitespace-nowrap text-glow"
    >
      Web Development
    </div>
  );
}
