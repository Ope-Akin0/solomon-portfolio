'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ProjectsSection } from './projects-section';

const leftText = "Full-Stack Expertise";
const rightText = "Modern Web Solutions";

function AnimatedSideText() {
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
        className="absolute bottom-full left-0 text-lg md:text-xl font-semibold text-white text-glow-faint hidden md:block mb-4"
        style={{ opacity: 0 }}
      >
        {leftText}
      </div>
      <div 
        ref={rightRef} 
        className="absolute bottom-full right-0 text-lg md:text-xl font-semibold text-white text-glow-faint hidden md:block mb-4"
        style={{ opacity: 0 }}
      >
        {rightText}
      </div>
    </>
  );
}


export const ProjectsSectionWithText = () => {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 md:px-8">
      <div className="relative max-w-7xl mx-auto">
        <AnimatedSideText />
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12">Projects</h2>
        <ProjectsSection />
      </div>
    </section>
  );
};
