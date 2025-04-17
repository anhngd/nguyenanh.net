'use client'

import { useEffect, useState, useRef } from 'react'

interface TypeWriterProps {
  text: string
  speed?: number
  delay?: number
  loop?: boolean
  className?: string
  cursorClassName?: string
  onComplete?: () => void
}

export default function TypeWriter({
  text,
  speed = 50,
  delay = 1000,
  loop = false,
  className = '',
  cursorClassName = 'text-orange-500 dark:text-orange-400',
  onComplete,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [cursorVisible, setCursorVisible] = useState(true)
  const typingRef = useRef<NodeJS.Timeout | null>(null)
  const cursorRef = useRef<NodeJS.Timeout | null>(null)
  const indexRef = useRef(0)
  const pauseRef = useRef(false)

  // Typing effect
  useEffect(() => {
    // Cursor blinking effect
    cursorRef.current = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    // Delay before starting typing
    const startTyping = setTimeout(() => {
      typingRef.current = setInterval(() => {
        if (pauseRef.current) return

        if (indexRef.current < text.length) {
          setDisplayText((prev) => prev + text.charAt(indexRef.current))
          indexRef.current += 1
        } else {
          if (typingRef.current) {
            clearInterval(typingRef.current)
          }
          setIsTyping(false)
          if (onComplete) onComplete()

          if (loop) {
            // Reset after delay
            setTimeout(() => {
              indexRef.current = 0
              setDisplayText('')
              setIsTyping(true)
            }, delay * 2)
          }
        }
      }, speed)
    }, delay)

    return () => {
      if (typingRef.current) {
        clearInterval(typingRef.current)
      }
      if (cursorRef.current) {
        clearInterval(cursorRef.current)
      }
      clearTimeout(startTyping)
    }
  }, [text, speed, delay, loop, onComplete])

  return (
    <span className={className}>
      {displayText}
      <span
        className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} ${cursorClassName} transition-opacity duration-100`}
      >
        |
      </span>
    </span>
  )
} 