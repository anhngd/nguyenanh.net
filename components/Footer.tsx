'use client'

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from './social-icons'
import { useState, useEffect } from 'react'
import FooterCredit from './FooterCredit'

export default function Footer() {
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
    <footer className={`${isSmallScreen ? 'w-full' : ''}`}>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="x" href={siteMetadata.x} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="font-lexend">{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div className="font-lexend">{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/" className="font-lexend">{siteMetadata.title}</Link>
        </div>
        
        <FooterCredit />
      </div>
    </footer>
  )
}
