'use client'

import { useMemo, useState, useRef, useEffect } from 'react'

interface KeywordCloudProps {
  keywordCounts: Record<string, number>
}

// Color palette for keywords with gradient of purples, blues and other UI/UX relevant colors
const KEYWORD_COLORS = [
  'bg-purple-50 text-purple-700 hover:bg-purple-600 dark:bg-purple-900/40 dark:text-purple-300 dark:hover:bg-purple-700',
  'bg-blue-50 text-blue-700 hover:bg-blue-600 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-700',
  'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-700',
  'bg-pink-50 text-pink-700 hover:bg-pink-600 dark:bg-pink-900/40 dark:text-pink-300 dark:hover:bg-pink-700',
  'bg-teal-50 text-teal-700 hover:bg-teal-600 dark:bg-teal-900/40 dark:text-teal-300 dark:hover:bg-teal-700',
  'bg-orange-50 text-orange-700 hover:bg-orange-600 dark:bg-orange-900/40 dark:text-orange-300 dark:hover:bg-orange-700',
  'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-700',
  'bg-red-50 text-red-700 hover:bg-red-600 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-700',
]

export default function KeywordCloud({ keywordCounts }: KeywordCloudProps) {
  const keywordKeys = Object.keys(keywordCounts)
  const sortedKeywords = keywordKeys.sort((a, b) => keywordCounts[b] - keywordCounts[a])
  
  // State to track hovered keyword and globe rotation
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null)
  const [globeRotation, setGlobeRotation] = useState({ x: 0, y: 0 })
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const globeRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  
  // Calculate keyword sizes and 3D positions for globe effect
  const { keywordStyles, globeRadius } = useMemo(() => {
    const min = sortedKeywords.length > 0 
      ? Math.min(...sortedKeywords.map((keyword) => keywordCounts[keyword])) : 0
    const max = sortedKeywords.length > 0 
      ? Math.max(...sortedKeywords.map((keyword) => keywordCounts[keyword])) : 0
      
    // Determine globe radius based on number of keywords
    const radius = Math.min(180, Math.max(150, sortedKeywords.length * 2.5))
    
    // Create a map of keyword styles
    const styles = {} as Record<
      string,
      {
        fontSize: string
        padding: string
        opacity: number
        scale: number
        colorClass: string
        phi: number  // Vertical angle (latitude)
        theta: number // Horizontal angle (longitude)
        distance: number // Distance from center (can vary slightly)
      }
    >
    
    // Pre-assign colors to most common keywords
    const topKeywords = [...sortedKeywords].slice(0, KEYWORD_COLORS.length)
    const colorMap = new Map()
    topKeywords.forEach((keyword, idx) => {
      colorMap.set(keyword, KEYWORD_COLORS[idx % KEYWORD_COLORS.length])
    })
    
    // Distribute keywords evenly on a sphere using the Fibonacci sphere algorithm
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    
    sortedKeywords.forEach((keyword, i) => {
      const count = keywordCounts[keyword]
      const range = max - min || 1
      const ratio = (count - min) / range
      
      // Calculate size based on importance
      const fontSize = 0.8 + (ratio * 1.1)
      const paddingV = 0.25 + (ratio * 0.25)
      const paddingH = 0.5 + (ratio * 0.5)
      
      // Assign color
      const colorClass = colorMap.get(keyword) || 
        KEYWORD_COLORS[keyword.length % KEYWORD_COLORS.length]
        
      // Calculate position on the sphere
      // Using Fibonacci sphere algorithm for even distribution
      const y = 1 - (i / (sortedKeywords.length - 1)) * 2  // y goes from 1 to -1
      const phi = Math.acos(y)  // Vertical angle (latitude)
      const theta = ((i + 1) * goldenRatio * Math.PI * 2) % (Math.PI * 2)  // Horizontal angle (longitude)
      
      // Adjust distance from center slightly based on importance
      const distance = radius * (0.95 + (ratio * 0.1))
      
      styles[keyword] = {
        fontSize: `${fontSize}rem`,
        padding: `${paddingV}rem ${paddingH}rem`,
        opacity: 0.7 + (ratio * 0.3),
        scale: 1 + (ratio * 0.15),
        colorClass,
        phi,
        theta,
        distance,
      }
    })
    
    return { keywordStyles: styles, globeRadius: radius }
  }, [sortedKeywords, keywordCounts])
  
  // Auto-rotate the globe when not interacting
  useEffect(() => {
    let lastTime = 0
    
    const autoRotate = (time: number) => {
      if (!isAutoRotating) return
      
      const deltaTime = lastTime ? (time - lastTime) / 1000 : 0.016
      lastTime = time
      
      setGlobeRotation(prev => ({
        x: prev.x + deltaTime * 0.2,
        y: prev.y + deltaTime * 0.1
      }))
      
      animationRef.current = requestAnimationFrame(autoRotate)
    }
    
    if (isAutoRotating && !hoveredKeyword) {
      animationRef.current = requestAnimationFrame(autoRotate)
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAutoRotating, hoveredKeyword])
  
  // Stop auto-rotation when a keyword is hovered
  useEffect(() => {
    if (hoveredKeyword) {
      setIsAutoRotating(false)
    } else {
      // Resume auto-rotation after a delay when no longer hovering
      const timer = setTimeout(() => setIsAutoRotating(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [hoveredKeyword])
  
  // Calculate 3D position of each keyword based on its spherical coordinates
  const getGlobePosition = (keyword: string) => {
    const style = keywordStyles[keyword]
    const isHovered = keyword === hoveredKeyword
    
    // Calculate the 3D coordinates from spherical coordinates
    let phi = style.phi
    let theta = style.theta
    
    // If a keyword is hovered, rotate the globe to bring it to the front
    if (hoveredKeyword) {
      if (hoveredKeyword === keyword) {
        // Move hovered keyword to front center
        phi = Math.PI / 2
        theta = 0
      } else {
        // Adjust all other keywords relative to the hovered one
        const hoveredStyle = keywordStyles[hoveredKeyword]
        phi = style.phi
        theta = style.theta - hoveredStyle.theta
      }
    } else {
      // Apply global rotation when not hovering
      phi = style.phi + globeRotation.y
      theta = style.theta + globeRotation.x
    }
    
    // Convert spherical to Cartesian coordinates
    const x = style.distance * Math.sin(phi) * Math.cos(theta)
    const y = style.distance * Math.cos(phi)
    const z = style.distance * Math.sin(phi) * Math.sin(theta)
    
    // Calculate the opacity based on z-position (front or back of sphere)
    // Items at the back of the sphere should be more transparent
    const normalizedZ = z / globeRadius
    const visibilityFactor = (normalizedZ + 1) / 2
    const finalOpacity = Math.max(0.15, visibilityFactor) * style.opacity
    
    // Scale based on z-position (perspective effect)
    const perspective = Math.max(0.7, (z + globeRadius) / (globeRadius * 2))
    const finalScale = perspective * style.scale
    
    return {
      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${finalScale})`,
      opacity: isHovered ? 1 : finalOpacity,
      zIndex: Math.round(z + 1000), // Ensure correct stacking
      transition: isHovered || hoveredKeyword ? 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)' : 'all 0.3s ease-out',
      filter: isHovered ? 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.5))' : 'none',
    }
  }
  
  // Handle mouse enter on a keyword
  const handleKeywordHover = (keyword: string) => {
    setHoveredKeyword(keyword)
    setIsAutoRotating(false)
  }
  
  // Handle mouse leave on the globe
  const handleGlobeLeave = () => {
    setHoveredKeyword(null)
    // Resume auto-rotation after a delay
    setTimeout(() => setIsAutoRotating(true), 500)
  }
  
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div 
        ref={globeRef}
        className="relative w-full h-[480px] perspective-[1200px] flex justify-center items-center"
        onMouseLeave={handleGlobeLeave}
      >
        {/* Decorative globe center */}
        <div className="absolute w-4 h-4 bg-blue-500/20 rounded-full blur-sm" />
        <div className="absolute w-20 h-20 rounded-full bg-gradient-radial from-blue-500/5 to-transparent" />
        
        {/* Decorative orbit circles */}
        <div className="absolute w-[200px] h-[200px] border border-blue-300/10 dark:border-blue-500/10 rounded-full rotate-[30deg]" />
        <div className="absolute w-[300px] h-[300px] border border-indigo-300/10 dark:border-indigo-500/10 rounded-full rotate-[60deg]" />
        <div className="absolute w-[400px] h-[400px] border border-purple-300/10 dark:border-purple-500/10 rounded-full rotate-[15deg]" />
        
        {/* Keywords */}
        {sortedKeywords.map((keyword) => {
          const style = keywordStyles[keyword]
          const isHovered = keyword === hoveredKeyword
          
          return (
            <div 
              key={keyword} 
              className="absolute transform-gpu cursor-pointer"
              style={getGlobePosition(keyword)}
              onMouseEnter={() => handleKeywordHover(keyword)}
            >
              <span
                className={`font-lexend whitespace-nowrap inline-block rounded-full transform-gpu transition-colors duration-300 hover:text-white shadow-sm ${isHovered ? 'shadow-lg ring-2 ring-white/30 dark:ring-blue-500/30' : ''} ${style.colorClass}`}
                style={{ 
                  fontSize: style.fontSize,
                  padding: style.padding,
                }}
              >
                {keyword}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
} 