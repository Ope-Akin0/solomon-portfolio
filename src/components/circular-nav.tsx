'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Crown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const ProjectsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 8.54V4.46C22 3.12 20.88 2 19.54 2H4.46C3.12 2 2 3.12 2 4.46v15.08C2 20.88 3.12 22 4.46 22h15.08c1.34 0 2.46-1.12 2.46-2.46v-4.08c0-.49-.31-.92-.78-1.07l-1.62-.54c-.6-.2-1.29.11-1.5.71l-1.39 4.17c-.21.63-.84 1.05-1.52 1.05H6.27c-.68 0-1.31-.42-1.52-1.05L3.36 12.6c-.21-.63.11-1.29.71-1.5l4.17-1.39c.63-.21 1.05-.84 1.05-1.52V6.27c0-.68.42-1.31 1.05-1.52l4.11-1.36c.63-.21 1.29.11 1.5.71l1.36 4.11c.2.6.79.93 1.37.83l1.83-.3z" />
  </svg>
);

const ContactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const navItems = [
  { id: 'projects', icon: ProjectsIcon, label: 'Projects', color: 'text-green-400', angle: -Math.PI / 2 }, // Top
  { id: 'about', icon: UserIcon, label: 'About', color: 'text-amber-400', angle: 0 }, // Right
  { id: 'contact', icon: ContactIcon, label: 'Contact', color: 'text-violet-400', angle: Math.PI / 2 }, // Bottom
  { id: 'home', icon: HomeIcon, label: 'Home', color: 'text-sky-400', angle: Math.PI }, // Left
];


export function CircularNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const rotationContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);

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
    const ctx = gsap.context(() => {
      if (masterTimelineRef.current) {
        masterTimelineRef.current.revert();
      }

      const radius = isMobile ? 180 : 320;
      masterTimelineRef.current = gsap.timeline({ repeat: -1 });

      navItemsRef.current.forEach((item, i) => {
        if (!item) return;

        const navItemData = navItems[i];
        const xPos = Math.cos(navItemData.angle) * radius;
        const yPos = Math.sin(navItemData.angle) * radius;

        gsap.set(item, { x: xPos, y: yPos, xPercent: -50, yPercent: -50, position: 'absolute' });
        
        const itemTl = gsap.timeline();
        itemTl
          .to(item, { x: '+=40', duration: 6, ease: 'power1.inOut' })
          .to(item, { x: xPos, duration: 6, ease: 'power1.inOut' });
          
        masterTimelineRef.current!.add(itemTl, i * 1.5);
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
      <div 
        className="absolute flex flex-col items-center pulse-breathing text-center z-10 cursor-pointer"
        onClick={() => scrollToSection('work-with-me')}
        aria-label="Scroll to work with me section"
      >
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
            key={`${id}-${i}`}
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
