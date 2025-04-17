'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'
import Link from './Link'
import MobileNavWithActive from './MobileNavWithActive'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const HeaderWithActiveNav = () => {
  const pathname = usePathname() || ''
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
  
  // Function to check if link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }
  
  return (
    <header className={`flex items-center justify-between py-10 ${isSmallScreen ? 'w-full' : ''}`}>
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <div className="h-6 w-6 text-2xl font-bold font-prompt text-orange-500">
                {siteMetadata.headerTitle?.charAt(0) || 'A'}
              </div>
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block font-prompt">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => {
            const isActive = isActiveLink(link.href)
            return (
              <Link
                key={link.title}
                href={link.href}
                className={`hidden font-medium sm:block font-prompt transition-colors duration-300 ${
                  isActive 
                    ? 'text-orange-500 dark:text-orange-400 font-bold' 
                    : 'text-gray-900 dark:text-gray-100 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                {link.title}
                {isActive && (
                  <span className="block h-0.5 bg-orange-500 dark:bg-orange-400 transform transition-all duration-300 mt-0.5" />
                )}
              </Link>
            )
          })}
        <SearchButton />
        <ThemeSwitch />
        <MobileNavWithActive />
      </div>
    </header>
  )
}

export default HeaderWithActiveNav 