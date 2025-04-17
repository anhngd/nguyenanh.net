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
  
  // Check if screen is smaller than or equal to 2/3 of full HD (1280px)
  const isSmallScreen = windowWidth <= 1280;
  
  return (
    <section className={`mx-auto px-4 sm:px-6 ${isSmallScreen ? 'max-w-full' : 'max-w-3xl xl:max-w-5xl xl:px-0'}`}>
      {children}
    </section>
  )
}
