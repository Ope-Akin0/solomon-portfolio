'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';

const services = ['Web Development', 'Web Design', 'Software Composing'];

const positions = (isMobile: boolean) => {
    const radius = isMobile ? 120 : 180;
    return [
      { top: `${-radius}px`, left: '50%', transform: 'translateX(-50%)' }, // Top
      { top: '50%', left: `${-radius}px`, transform: 'translateY(-50%) translateX(-100%)' }, // Left
      { top: '50%', left: `${radius}px`, transform: 'translateY(-50%)' }, // Right
    ];
};

export function AnimatedServices() {
  const [currentService, setCurrentService] = useState({ text: '', style: {} });
  const serviceRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const availablePositions = positions(isMobile);

  useEffect(() => {
    let lastServiceIndex = -1;
    let lastPositionIndex = -1;

    const showNextService = () => {
      let serviceIndex = Math.floor(Math.random() * services.length);
      while (serviceIndex === lastServiceIndex) {
        serviceIndex = Math.floor(Math.random() * services.length);
      }
      lastServiceIndex = serviceIndex;

      let positionIndex = Math.floor(Math.random() * availablePositions.length);
      while (positionIndex === lastPositionIndex) {
        positionIndex = Math.floor(Math.random() * availablePositions.length);
      }
      lastPositionIndex = positionIndex;

      setCurrentService({
        text: services[serviceIndex],
        style: availablePositions[positionIndex],
      });

      gsap.fromTo(
        serviceRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          onComplete: () => {
            gsap.to(serviceRef.current, {
              opacity: 0,
              duration: 1.5,
              delay: 2,
              onComplete: showNextService,
            });
          },
        }
      );
    };

    const timeoutId = setTimeout(showNextService, 1000);

    return () => {
      clearTimeout(timeoutId);
      gsap.killTweensOf(serviceRef.current);
    };
  }, [isMobile, availablePositions]);

  return (
    <div 
        ref={serviceRef} 
        style={currentService.style}
        className="absolute top-1/2 left-1/2 text-2xl md:text-3xl font-bold whitespace-nowrap text-glow"
    >
      {currentService.text}
    </div>
  );
}
