'use client';

import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Orbit } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = ['Home', 'Projects', 'About', 'Contact'];

export function CircularNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const isMobile = useIsMobile();

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useLayoutEffect(() => {
    if (isMobile === undefined) return; // Wait until isMobile is determined

    const ctx = gsap.context(() => {
      const radius = isMobile ? 100 : 150;
      const rotationSpeed = 30; // seconds per rotation

      timeline.current = gsap.timeline({ repeat: -1 });

      navItemsRef.current.forEach((item, i) => {
        if (!item) return;
        const angle = (i / navItems.length) * 2 * Math.PI;

        gsap.set(item, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          xPercent: -50,
          yPercent: -50,
          position: 'absolute',
        });

        timeline.current?.to(
          item,
          {
            rotation: '+=360',
            duration: rotationSpeed,
            ease: 'none',
            transformOrigin: `${-Math.cos(angle) * radius}px ${-Math.sin(angle) * radius}px`,
          },
          0
        );

        item.addEventListener('mouseenter', () => {
          timeline.current?.pause();
          gsap.to(item, { scale: 1.2, color: 'hsl(var(--primary))', duration: 0.3 });
        });

        item.addEventListener('mouseleave', () => {
          timeline.current?.play();
          gsap.to(item, { scale: 1, color: 'hsl(var(--foreground))', duration: 0.3 });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div
      id="home"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div ref={containerRef} className="relative flex items-center justify-center">
        <div className="absolute flex flex-col items-center pulse-breathing">
          <Orbit className="h-20 w-20 md:h-28 md:w-28 text-primary" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-4">OrbitalFolio</h1>
        </div>

        {navItems.map((item, i) => (
          <button
            key={item}
            ref={(el) => (navItemsRef.current[i] = el)}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="text-lg md:text-xl font-semibold cursor-pointer whitespace-nowrap"
            aria-label={`Scroll to ${item} section`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
