'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'

export default function PageTransition() {
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
            {/* Enhanced Fire/thrust effect */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="w-7 h-16 rounded-b-full bg-gradient-to-t from-orange-600 via-yellow-500 to-transparent"
                animate={{
                  height: ["4rem", "5rem", "4rem"],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />
              <motion.div
                className="w-5 h-12 -mt-2 rounded-b-full bg-gradient-to-t from-yellow-300 via-yellow-100 to-transparent"
                animate={{
                  height: ["3rem", "4rem", "3rem"],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 0.1,
                }}
              />
              
              {/* Enhanced Smoke particles */}
              <div className="absolute bottom-0 w-20 flex justify-center">
                {[...Array(12)].map((_, i) => {
                  // Determine sizes and classes without template literals
                  const particleSize = (i % 3) + 2;
                  const widthClass = particleSize === 2 ? "w-2" : particleSize === 3 ? "w-3" : "w-4";
                  const heightClass = particleSize === 2 ? "h-2" : particleSize === 3 ? "h-3" : "h-4";
                  const colorClass = i % 3 === 0 
                    ? "bg-orange-200 dark:bg-orange-300 opacity-60" 
                    : "bg-gray-200 dark:bg-gray-500 opacity-50";
                    
                  return (
                    <motion.div
                      key={i}
                      className={`absolute ${widthClass} ${heightClass} rounded-full ${colorClass}`}
                      initial={{ 
                        y: 0,
                        x: (i % 2 === 0 ? -1 : 1) * Math.random() * 8,
                        scale: 0 
                      }}
                      animate={{ 
                        y: [0, 80 + Math.random() * 60], 
                        x: [(i % 2 === 0 ? -1 : 1) * Math.random() * 8, (i % 2 === 0 ? -1 : 1) * (15 + Math.random() * 25)],
                        scale: [0, 1.5 + Math.random() * 2.5, 0],
                        opacity: [0, 0.4 + Math.random() * 0.3, 0], 
                      }}
                      transition={{ 
                        duration: 1.2 + Math.random() * 1.8, 
                        repeat: Infinity, 
                        delay: Math.random() * 2,
                        ease: "easeOut"
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
            
            {/* Letter A rocket */}
            <motion.div
              className="relative"
              initial={{ y: 180 }}
              animate={{ 
                y: 0,
                rotate: [0, -1, 1, 0],
              }}
              transition={{
                y: {
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  delay: 0.2
                },
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {/* Glow effect behind A */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-orange-500/30 blur-xl z-0"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3]
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
                  className="relative w-14 h-24 flex items-center justify-center"
                  animate={{
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Rocket tip on top of A */}
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-full"
                    animate={{
                      height: [22, 26, 22],
                      opacity: [0.9, 1, 0.9]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className="text-6xl font-bold text-orange-500 relative filter drop-shadow-lg"
                    style={{
                      fontFamily: "'Lexend', sans-serif",
                      fontVariationSettings: "'wght' 700, 'wdth' 110",
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
                
                {/* Enhanced fins on sides */}
                <motion.div 
                  className="absolute -left-4 top-1/2 w-4 h-8 bg-gradient-to-r from-transparent to-orange-500 rounded-l-full"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -right-4 top-1/2 w-4 h-8 bg-gradient-to-l from-transparent to-orange-500 rounded-r-full"
                  animate={{ rotate: [5, -5, 5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Bottom thrusters */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-2 w-8 h-3 bg-orange-600 rounded-full"
                  animate={{
                    width: [32, 30, 32],
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Loading text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-gray-700 dark:text-gray-300 font-medium"
          >
            Loading...
          </motion.div>
          
          {/* Additional smoke/fire dots at the bottom */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-16">
            {[...Array(15)].map((_, i) => {
              // Get fixed classes based on index
              let sizeClass = "w-2 h-2";
              let colorClass = "bg-gray-400 dark:bg-gray-600";
              
              if (i % 4 === 0) {
                colorClass = "bg-orange-400";
                sizeClass = "w-2 h-2";
              } else if (i % 4 === 1) {
                colorClass = "bg-yellow-300";
                sizeClass = "w-1.5 h-1.5";
              }
              
              return (
                <motion.div
                  key={i + 100}
                  className={`absolute rounded-full ${colorClass} ${sizeClass}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, i % 2 === 0 ? 1.5 : 0.8, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 1 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  )
} 