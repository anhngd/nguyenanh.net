'use client'

import { useEffect, useState, useRef } from 'react'

interface TypeWriterProps {
  text: string
  speed?: number
  delay?: number
  loop?: boolean
  loopDelay?: number
  className?: string
  cursorClassName?: string
  onComplete?: () => void
}

export default function TypeWriter({
  text,
  speed = 50,
  delay = 1000,
  loop = false,
  loopDelay = 3000,
  className = '',
  cursorClassName = 'text-orange-500 dark:text-orange-400',
  onComplete,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [cursorVisible, setCursorVisible] = useState(true)
  const typingRef = useRef<NodeJS.Timeout | null>(null)
  const cursorRef = useRef<NodeJS.Timeout | null>(null)
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null)
  const indexRef = useRef(0)
  const pauseRef = useRef(false)

  // Typing effect
  useEffect(() => {
    // Initial text display (to fix potential issues with first character)
    setDisplayText('')
    
    // Cursor blinking effect
    cursorRef.current = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    const startTypingSequence = () => {
      // Reset state for new typing sequence
      indexRef.current = 0
      setDisplayText('') // Clear text before starting new sequence
      setIsTyping(true)
      
      // Ensure a small delay before starting typing to allow state to settle
      setTimeout(() => {
        // Create a function that types a single character
        const typeChar = () => {
          if (pauseRef.current) return;
          
          if (indexRef.current < text.length) {
            setDisplayText((prev) => {
              const nextChar = text.charAt(indexRef.current);
              return prev + nextChar;
            });
            indexRef.current += 1;
            
            // Schedule next character
            typingRef.current = setTimeout(typeChar, speed);
          } else {
            setIsTyping(false);
            if (onComplete) onComplete();
          }
        };
        
        // Start typing the first character immediately
        typeChar();
      }, 50); // Small initial delay
    }

    // Start initial typing
    startTypingSequence()

    // Set up loop timer if looping is enabled
    if (loop) {
      loopTimerRef.current = setInterval(() => {
        // Clear any existing typing interval
        if (typingRef.current) {
          clearTimeout(typingRef.current)
        }
        
        startTypingSequence()
      }, loopDelay) // Restart every X seconds (3 seconds by default)
    }

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current)
      if (cursorRef.current) clearInterval(cursorRef.current)
      if (loopTimerRef.current) clearInterval(loopTimerRef.current)
    }
  }, [text, speed, delay, loop, loopDelay, onComplete])

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