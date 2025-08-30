'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Asteroid, FolderGit2, Home, Send, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { id: 'home', icon: Home, label: 'Home', color: 'text-sky-400' },
  { id: 'projects', icon: FolderGit2, label: 'Projects', color: 'text-green-400' },
  { id: 'about', icon: User, label: 'About', color: 'text-amber-400' },
  { id: 'contact', icon: Send, label: 'Contact', color: 'text-violet-400' },
];

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
        // The angle needs to be offset by -PI/2 to start the first item at the top (12 o'clock)
        const angle = (i / navItems.length) * 2 * Math.PI - Math.PI / 2;

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
            // Correct transformOrigin for a perfect circular path around the center (0,0) of the parent
            transformOrigin: `${-Math.cos(angle) * radius}px ${-Math.sin(angle) * radius}px`,
          },
          0
        );

        item.addEventListener('mouseenter', () => {
          timeline.current?.pause();
          gsap.to(item, { scale: 1.2, duration: 0.3 });
          // The color is applied to the SVG child
          gsap.to(item.firstChild, { color: 'hsl(var(--accent))', duration: 0.3 });
        });

        item.addEventListener('mouseleave', () => {
          timeline.current?.play();
          gsap.to(item, { scale: 1, duration: 0.3 });
          // Animate back to original color
           gsap.to(item.firstChild, { color: gsap.getProperty(item.firstChild, "color"), duration: 0.3 });
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
        <div className="absolute flex flex-col items-center pulse-breathing text-center">
           <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            className="h-20 w-20 md:h-28 md:w-28"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(56 189 248)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(217 70 239)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path
              fill="url(#logoGradient)"
              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1.13 15.3l-3.32-3.32a.75.75 0 0 1 1.06-1.06l2.79 2.79l6.22-6.22a.75.75 0 0 1 1.06 1.06z"
            />
          </svg>
          <h1 className="text-3xl md:text-5xl font-bold mt-4 text-gradient">
            AsodTech
          </h1>
        </div>

        {navItems.map(({ id, icon: Icon, label, color }, i) => (
          <button
            key={id}
            ref={(el) => (navItemsRef.current[i] = el)}
            onClick={() => scrollToSection(id)}
            className="cursor-pointer whitespace-nowrap"
            aria-label={`Scroll to ${label} section`}
          >
            <Icon className={`h-10 w-10 md:h-12 md:w-12 transition-colors duration-300 ${color}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
