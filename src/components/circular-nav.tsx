'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Crown, FolderGit2, Home, Send, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { id: 'about', icon: User, label: 'About', color: 'text-amber-400', angle: -Math.PI / 2 }, // Top
  { id: 'projects', icon: FolderGit2, label: 'Projects', color: 'text-green-400', angle: 0 }, // Right
  { id: 'contact', icon: Send, label: 'Contact', color: 'text-violet-400', angle: Math.PI / 2 }, // Bottom
  { id: 'home', icon: Home, label: 'Home', color: 'text-sky-400', angle: Math.PI }, // Left
];

export function CircularNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const rotationContainerRef = useRef<HTMLDivElement>(null);
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
    if (isMobile === undefined) return;

    const ctx = gsap.context(() => {
      const radius = isMobile ? 180 : 320; 

      const masterTl = gsap.timeline({ repeat: -1 });

      navItemsRef.current.forEach((item, i) => {
        if (!item) return;
        const navItemData = navItems[i];
        
        const xPos = Math.cos(navItemData.angle) * radius;
        const yPos = Math.sin(navItemData.angle) * radius;

        gsap.set(item, {
          x: xPos,
          y: yPos,
          xPercent: -50,
          yPercent: -50,
          position: 'absolute',
        });
        
        const itemTl = gsap.timeline();
        itemTl
          .to(item, {
            x: '+=40', // move right
            duration: 6,
            ease: 'power1.inOut',
          })
          .to(item, {
            x: xPos, // return to original x
            duration: 6,
            ease: 'power1.inOut',
          });

        masterTl.add(itemTl, i * 1.5); // Stagger by 1.5s

        item.addEventListener('mouseenter', () => {
          gsap.to(item, { scale: 1.2, duration: 0.3 });
          gsap.to(item.firstChild, { color: 'hsl(var(--accent))', duration: 0.3 });
          masterTl.pause();
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, { scale: 1, duration: 0.3 });
          gsap.to(item.firstChild, { color: navItemData.color.replace('text-',''), duration: 0.3 });
          masterTl.resume();
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute flex flex-col items-center pulse-breathing text-center z-10">
        <div className="relative">
          <Crown
            className="h-28 w-28 md:h-36 md:w-36 text-transparent"
            strokeWidth={1}
            fill="url(#logoGradient)"
          />
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(56 189 248)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(217 70 239)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mt-4 text-gradient">
          AsodTech
        </h1>
      </div>
      
      <div ref={rotationContainerRef} className="absolute flex items-center justify-center">
        {navItems.map(({ id, icon: Icon, label, color }, i) => (
          <button
            key={id}
            ref={(el) => (navItemsRef.current[i] = el)}
            onClick={() => scrollToSection(id)}
            className="cursor-pointer whitespace-nowrap"
            aria-label={`Scroll to ${label} section`}
          >
            <Icon className={`h-20 w-20 md:h-24 md:w-24 transition-colors duration-300 ${color}`} strokeWidth={1} />
          </button>
        ))}
      </div>
    </div>
  );
}
