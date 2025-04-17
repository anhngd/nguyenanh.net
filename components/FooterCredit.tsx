'use client'

import { useState, useEffect } from 'react'
import Link from './Link'
import TypeWriter from './TypeWriter'

export default function FooterCredit() {
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  
  // Start typing after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="mb-8 text-sm text-gray-500 dark:text-gray-400 font-lexend">
      {hasStarted ? (
        <>
          <TypeWriter 
            text="Built with the open-source template by"
            speed={40}
            delay={100}
            onComplete={() => setIsTypingComplete(true)}
          />
          
          {isTypingComplete && (
            <>
              <Link
                href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
                className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium transition duration-200 footer-link"
              >
                @timlrx
              </Link>
              
              <TypeWriter 
                text=". Grateful for the great foundation."
                speed={40}
                delay={100}
              />
            </>
          )}
        </>
      ) : (
        <span className="opacity-0">
          Built with the open-source template by @timlrx. Grateful for the great foundation.
        </span>
      )}
    </div>
  )
} 