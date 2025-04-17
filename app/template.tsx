'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// Variants cho animation
const variants = {
  hidden: { 
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.4
    }
  },
  enter: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
      staggerChildren: 0.05
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        className="w-full"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            enter: { opacity: 1 },
          }}
          className="page-content"
        >
          {children}
        </motion.div>
        
        {/* Hiệu ứng làm mờ khi chuyển trang */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black"
          variants={{
            hidden: { opacity: 1 },
            enter: { 
              opacity: 0,
              transition: { 
                duration: 0.4,
                delay: 0.2 
              } 
            },
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
} 