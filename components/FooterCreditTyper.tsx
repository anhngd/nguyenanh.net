'use client'

import { useState, useEffect, useRef } from 'react'
import Link from './Link'

export default function FooterCreditTyper() {
  const [firstPartText, setFirstPartText] = useState('');
  const [showSecondPart, setShowSecondPart] = useState(false);
  const [secondPartText, setSecondPartText] = useState('');
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  
  const firstPart = "Built with the open-source template by";
  const secondPart = ". Grateful for the great foundation.";
  
  useEffect(() => {
    // Clear any existing timeouts to avoid memory leaks
    const clearAllTimeouts = () => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
    
    // Type the first part
    const typeFirstPart = () => {
      clearAllTimeouts();
      setFirstPartText('');
      setShowSecondPart(false);
      setSecondPartText('');
      
      // Type each character with a delay
      for (let i = 0; i < firstPart.length; i++) {
        const timeout = setTimeout(() => {
          setFirstPartText(firstPart.substring(0, i + 1));
          
          // After typing the entire first part, show the @timlrx link
          if (i === firstPart.length - 1) {
            const linkTimeout = setTimeout(() => {
              setShowSecondPart(true);
              
              // Then start typing the second part
              for (let j = 0; j < secondPart.length; j++) {
                const secondTimeout = setTimeout(() => {
                  setSecondPartText(secondPart.substring(0, j + 1));
                  
                  // After completing the entire text, restart the animation after a delay
                  if (j === secondPart.length - 1) {
                    const resetTimeout = setTimeout(typeFirstPart, 5000);
                    timeoutRefs.current.push(resetTimeout);
                  }
                }, j * 40);
                timeoutRefs.current.push(secondTimeout);
              }
            }, 500);
            timeoutRefs.current.push(linkTimeout);
          }
        }, i * 40);
        timeoutRefs.current.push(timeout);
      }
    };
    
    // Start typing with a small initial delay
    const initialTimeout = setTimeout(typeFirstPart, 500);
    timeoutRefs.current.push(initialTimeout);
    
    // Clean up all timeouts on unmount
    return clearAllTimeouts;
  }, []);
  
  return (
    <span className="font-lexend">
      {firstPartText}
      <span className="animate-blink text-gray-500 dark:text-gray-400">|</span>
      
      {showSecondPart && (
        <>
          {' '}
          <Link
            href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
            className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium transition duration-200 footer-link"
          >
            @timlrx
          </Link>
          {secondPartText}
          <span className="animate-blink text-gray-500 dark:text-gray-400">|</span>
        </>
      )}
    </span>
  );
} 