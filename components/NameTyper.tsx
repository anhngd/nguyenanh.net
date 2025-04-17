'use client'

import { useEffect, useState, useRef } from 'react'

export default function NameTyper() {
  const [displayText, setDisplayText] = useState("AnhND"); // Start with full name for instant display
  const [isTypingActive, setIsTypingActive] = useState(false);
  const fullName = "AnhND";
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const hasStartedRef = useRef(false);
  
  useEffect(() => {
    // Small delay before starting typing animation
    // Only start animation after the initial render is complete
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      
      const initialDelay = setTimeout(() => {
        setIsTypingActive(true);
        startTyping();
      }, 2000); // Longer initial delay to ensure first render is complete
      
      return () => clearTimeout(initialDelay);
    }
  }, []);
  
  const startTyping = () => {
    // If typing is not active yet, don't start
    if (!isTypingActive) return;
    
    // Clear any existing timeouts
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
    
    // Start with "A" always visible
    setDisplayText("A");
    
    // Schedule typing of remaining characters
    for (let i = 1; i < fullName.length; i++) {
      const timeout = setTimeout(() => {
        setDisplayText(fullName.substring(0, i + 1));
      }, i * 300); // 300ms between each character
      
      timeoutRefs.current.push(timeout);
    }
    
    // Schedule reset after typing is complete
    const resetTimeout = setTimeout(() => {
      // Only reset if still mounted
      startTyping();
    }, (fullName.length * 300) + 3000); // Wait for typing to complete + 3s pause
    
    timeoutRefs.current.push(resetTimeout);
  };
  
  return (
    <span className="font-lexend font-light">
      {displayText}
      <span className="animate-blink text-orange-500 dark:text-orange-400">|</span>
    </span>
  );
} 