'use client'

import { useEffect, useState, useRef } from 'react'

export default function NameTyper() {
  const [displayText, setDisplayText] = useState("A");
  const fullName = "AnhND";
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  
  useEffect(() => {
    const startTyping = () => {
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
    
    // Initial start
    startTyping();
    
    // Cleanup on unmount
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);
  
  return (
    <span className="font-lexend font-light">
      {displayText}
      <span className="animate-blink text-orange-500 dark:text-orange-400">|</span>
    </span>
  );
} 