'use client'

import React, { useEffect, useState } from 'react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  
  // Track window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Get appropriate max width based on screen size
  // For ultra-wide screens, we want a wider content area but still with reasonable reading width
  const getMaxWidthClass = () => {
    if (windowWidth > 1920) {
      return 'max-w-7xl'; // For very large screens (>1920px) - 80rem or 1280px
    } else if (windowWidth > 1440) {
      return 'max-w-6xl'; // For large screens (>1440px) - 72rem or 1152px
    } else if (windowWidth > 1024) {
      return 'max-w-5xl'; // For medium-large screens (>1024px) - 64rem or 1024px
    } else {
      return 'max-w-full'; // For smaller screens, allow full width with padding
    }
  };
  
  return (
    <section className={`mx-auto px-4 sm:px-6 md:px-8 ${getMaxWidthClass()}`}>
      {children}
    </section>
  )
}
