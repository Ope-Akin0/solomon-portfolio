
'use client';

import React from 'react';

interface ScrollLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export const ScrollLink: React.FC<ScrollLinkProps> = ({ children, href, className }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = href.replace(/.*#/, '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <a href={href} onClick={handleScroll} className={className}>
      {children}
    </a>
  );
};
