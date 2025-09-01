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
              delay: 2, // 5s total visible time = 1.5s fade-in + 2s delay + 1.5s fade-out. We want 5s visible, so 5 - 1.5 = 3.5s delay. Let's make it 3.5
            });
          },
        }
      );
    }
  }, []);

  return (
    <div 
        ref={serviceRef} 
        className="absolute top-1/2 left-1/2 -translate-y-[12rem] md:-translate-y-[18rem] -translate-x-1/2 text-2xl md:text-3xl font-bold whitespace-nowrap text-glow"
    >
      Web Development
    </div>
  );
}
