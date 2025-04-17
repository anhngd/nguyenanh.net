'use client'

import { Fragment, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
  const [fontLoaded, setFontLoaded] = useState(false);
  
  // Make sure we only show the animation after fonts have loaded
  useEffect(() => {
    setFontLoaded(true);
  }, []);
  
  return (
    <Fragment>
      <div className="fixed inset-0 z-50 bg-white/60 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center justify-center h-screen relative">
          {/* Stars background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-1 h-1 bg-white dark:bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0.1 }}
                animate={{ 
                  opacity: [0.1, 0.8, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{ 
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          {/* Rocket animation container */}
          <div className="relative h-60 flex items-end justify-center mb-12">
            {/* Fire/thrust effect */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="w-5 h-12 rounded-b-full bg-gradient-to-t from-orange-600 via-yellow-500 to-transparent"
                animate={{
                  height: ["3rem", "4rem", "3rem"],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />
              <motion.div
                className="w-3 h-10 -mt-2 rounded-b-full bg-gradient-to-t from-yellow-300 via-yellow-100 to-transparent"
                animate={{
                  height: ["2.5rem", "3.5rem", "2.5rem"],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 0.1,
                }}
              />
              
              {/* Smoke particles */}
              <div className="absolute bottom-0 w-14 flex justify-center">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-600 opacity-40"
                    initial={{ 
                      y: 0,
                      x: (i % 2 === 0 ? -1 : 1) * Math.random() * 5,
                      scale: 0 
                    }}
                    animate={{ 
                      y: [0, 60 + Math.random() * 40], 
                      x: [(i % 2 === 0 ? -1 : 1) * Math.random() * 5, (i % 2 === 0 ? -1 : 1) * (10 + Math.random() * 20)],
                      scale: [0, 1 + Math.random() * 2, 0],
                      opacity: [0, 0.3, 0], 
                    }}
                    transition={{ 
                      duration: 1 + Math.random() * 1.5, 
                      repeat: Infinity, 
                      delay: Math.random() * 2,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Letter A rocket */}
            <motion.div
              className="relative"
              initial={{ y: 180 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                delay: 0.2
              }}
            >
              {/* Glow effect behind A */}
              <motion.div
                className="absolute -inset-3 rounded-full bg-orange-400/20 blur-xl z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* The letter A styled as a rocket */}
              <div className="relative z-10">
                <motion.div 
                  className="relative w-12 h-20 flex items-center justify-center"
                  animate={{
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="text-6xl font-bold text-orange-500 relative filter drop-shadow-lg"
                    style={{
                      fontFamily: "'Lexend', cursive",
                      fontVariationSettings: "'wght' 600, 'wdth' 100",
                    }}
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(249, 115, 22, 0.7)",
                        "0 0 16px rgba(249, 115, 22, 0.9)",
                        "0 0 8px rgba(249, 115, 22, 0.7)"
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    A
                  </motion.div>
                </motion.div>
                
                {/* Small fins on sides */}
                <motion.div 
                  className="absolute -left-3 top-1/2 w-3 h-5 bg-gradient-to-r from-transparent to-orange-500 rounded-l-full"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -right-3 top-1/2 w-3 h-5 bg-gradient-to-l from-transparent to-orange-500 rounded-r-full"
                  animate={{ rotate: [5, -5, 5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Loading text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-gray-600 dark:text-gray-300 font-medium"
          >
            Loading...
          </motion.div>
        </div>
      </div>
    </Fragment>
  )
} 