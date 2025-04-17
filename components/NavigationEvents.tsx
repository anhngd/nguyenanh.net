'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({ 
      showSpinner: false,
      minimum: 0.1,
      easing: 'ease',
      speed: 400 
    })
  }, [])

  useEffect(() => {
    NProgress.start()
    
    // Complete the progress bar with slight delay for visual effect
    const timer = setTimeout(() => {
      NProgress.done(true)
    }, 200)
    
    return () => {
      clearTimeout(timer)
      NProgress.remove()
    }
  }, [pathname, searchParams])

  return null
} 