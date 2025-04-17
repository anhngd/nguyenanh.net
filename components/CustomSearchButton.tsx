'use client'

import { useCallback } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { useKBar } from 'kbar'

const CustomSearchButton = () => {
  const { query } = useKBar()
  
  const handleClick = useCallback(() => {
    try {
      if (query && typeof query.toggle === 'function') {
        query.toggle()
      } else {
        console.warn('Search functionality not available')
      }
    } catch (error) {
      console.error('Error activating search:', error)
    }
  }, [query])
  
  return (
    <button
      onClick={handleClick}
      className="flex items-center"
      aria-label="Search"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 text-gray-900 dark:text-gray-100"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  )
}

export default CustomSearchButton 