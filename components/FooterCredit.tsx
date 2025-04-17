'use client'

import { useState, useEffect } from 'react'
import FooterCreditTyper from './FooterCreditTyper'

export default function FooterCredit() {
  const [isVisible, setIsVisible] = useState(false)
  
  // Show content after a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
      {isVisible ? (
        <FooterCreditTyper />
      ) : (
        <span className="opacity-0">
          Built with the open-source template by @timlrx. Grateful for the great foundation.
        </span>
      )}
    </div>
  )
} 