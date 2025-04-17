'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import NProgress from 'nprogress'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  let timer: NodeJS.Timeout
  
  // Configure NProgress
  NProgress.configure({ 
    showSpinner: false,
    speed: 400,
  })

  // Start the progress bar after a small delay to avoid flashing for quick navigation
  const startProgress = () => {
    timer = setTimeout(() => {
      NProgress.start()
    }, 200)
  }

  // Stop the progress and clear the timer
  const stopProgress = () => {
    clearTimeout(timer)
    NProgress.done()
  }

  useEffect(() => {
    // Start on navigation change, stop when navigation completes
    startProgress()
    return () => stopProgress()
  }, [pathname, searchParams])

  return null
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