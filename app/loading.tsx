'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <Fragment>
      <div className="fixed inset-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 1],
              opacity: 1
            }}
            transition={{ 
              duration: 1.2,
              ease: "easeInOut",
              times: [0, 0.6, 1]
            }}
            className="relative"
          >
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                filter: [
                  "drop-shadow(0 0 0 rgba(249, 115, 22, 0.3))",
                  "drop-shadow(0 0 12px rgba(249, 115, 22, 0.7))",
                  "drop-shadow(0 0 0 rgba(249, 115, 22, 0.3))"
                ]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-20 w-20 flex items-center justify-center"
            >
              <motion.div 
                className="h-full w-full text-7xl font-bold font-prompt text-orange-500 flex items-center justify-center"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(249, 115, 22, 0.3)",
                    "0 0 8px rgba(249, 115, 22, 0.7)",
                    "0 0 0px rgba(249, 115, 22, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                A
              </motion.div>
              
              <motion.div
                className="absolute -inset-1 rounded-full bg-orange-500/10 dark:bg-orange-500/20 z-[-1] blur-md"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              
              <motion.div
                className="absolute -inset-4 rounded-full bg-orange-400/5 dark:bg-orange-400/10 z-[-2] blur-xl"
                animate={{ 
                  scale: [1.1, 1.3, 1.1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </motion.div>
          </motion.div>
          
          <div className="mt-8">
            <div className="flex space-x-3">
              <motion.div 
                className="h-3 w-3 rounded-full bg-orange-500" 
                animate={{ 
                  y: [0, -8, 0], 
                  opacity: [0.3, 1, 0.3],
                  boxShadow: [
                    "0 0 0 rgba(249, 115, 22, 0)",
                    "0 0 10px rgba(249, 115, 22, 0.5)",
                    "0 0 0 rgba(249, 115, 22, 0)"
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.div 
                className="h-3 w-3 rounded-full bg-orange-500" 
                animate={{ 
                  y: [0, -8, 0], 
                  opacity: [0.3, 1, 0.3],
                  boxShadow: [
                    "0 0 0 rgba(249, 115, 22, 0)",
                    "0 0 10px rgba(249, 115, 22, 0.5)",
                    "0 0 0 rgba(249, 115, 22, 0)"
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.15 }}
              />
              <motion.div 
                className="h-3 w-3 rounded-full bg-orange-500" 
                animate={{ 
                  y: [0, -8, 0], 
                  opacity: [0.3, 1, 0.3],
                  boxShadow: [
                    "0 0 0 rgba(249, 115, 22, 0)",
                    "0 0 10px rgba(249, 115, 22, 0.5)",
                    "0 0 0 rgba(249, 115, 22, 0)"
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
} 