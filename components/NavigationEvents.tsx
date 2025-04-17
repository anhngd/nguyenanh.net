'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
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
      speed: 400,
    })

    let timer: NodeJS.Timeout

    function startProgress() {
      timer = setTimeout(() => {
        NProgress.start()
      }, 200)
    }

    function stopProgress() {
      clearTimeout(timer)
      NProgress.done()
    }

    startProgress()
    stopProgress()

    return () => {
      clearTimeout(timer)
      NProgress.remove()
    }
  }, [pathname, searchParams])

  return null
} 