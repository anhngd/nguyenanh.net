'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import NProgress from 'nprogress'
import PageTransition from './PageTransition'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const maxLoadingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isFirstRender = useRef(true)
  
  // Configure NProgress
  NProgress.configure({ 
    showSpinner: false,
    speed: 400,
  })

  // Start the progress bar
  const startProgress = () => {
    // Skip loading animation on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    setIsNavigating(true)
    NProgress.start()
    
    // Set maximum loading time to 200ms
    if (maxLoadingTimerRef.current) {
      clearTimeout(maxLoadingTimerRef.current)
    }
    
    maxLoadingTimerRef.current = setTimeout(() => {
      stopProgress()
    }, 200)
  }

  // Stop the progress
  const stopProgress = () => {
    if (maxLoadingTimerRef.current) {
      clearTimeout(maxLoadingTimerRef.current)
      maxLoadingTimerRef.current = null
    }
    NProgress.done()
    setIsNavigating(false)
  }

  useEffect(() => {
    startProgress()
    return () => {
      // The cleanup function will run when the component unmounts
      // or before the effect runs again (on next route change)
      stopProgress()
    }
  }, [pathname, searchParams])

  return isNavigating ? <PageTransition /> : null
}

// This is a separate component that uses Suspense
import { Suspense } from 'react'

export function NavigationEventsWrapper() {
  return (
    <Suspense fallback={null}>
      <NavigationEvents />
    </Suspense>
  )
}

// Export the wrapped component as default
export default NavigationEventsWrapper 