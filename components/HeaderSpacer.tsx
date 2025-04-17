'use client'

import { useEffect, useState } from 'react'

const HeaderSpacer = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`h-0 transition-all duration-200 ${
        isScrolled ? 'md:h-16 h-14' : 'h-0'
      }`}
      aria-hidden="true"
    />
  )
}

export default HeaderSpacer 