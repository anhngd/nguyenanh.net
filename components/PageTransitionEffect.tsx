'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function PageTransitionEffect() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  
  // Global loading state for navigation
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
    }
    
    const handleStop = () => {
      setTimeout(() => {
        setIsLoading(false)
      }, 300) // Match with progression time for a nicer effect
    }
    
    // Add global event listeners for router events
    window.addEventListener('beforeunload', handleStart)
    window.addEventListener('load', handleStop)
    
    return () => {
      window.removeEventListener('beforeunload', handleStart)
      window.removeEventListener('load', handleStop)
    }
  }, [])
  
  // Reset loading state when pathname changes
  useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])
  
  return (
    <>
      {/* Progress bar at the top of the page */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={isLoading ? { scaleX: 0.5 } : { scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={isLoading ? {
          duration: 1.5,
          ease: "easeInOut"
        } : {
          duration: 0.3,
          ease: "easeOut"
        }}
      />
      
      {/* Overlay effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-40 bg-white/10 dark:bg-black/10 backdrop-blur-[1px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
        }}
      />
    </>
  )
} 