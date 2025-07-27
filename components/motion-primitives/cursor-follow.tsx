'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface CursorFollowProps {
  children: React.ReactNode
  cursorContent?: React.ReactNode
  className?: string
}

export function CursorFollow({ 
  children, 
  cursorContent = "👋 Hello!", 
  className = "" 
}: CursorFollowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered])

  return (
    <>
      <div
        ref={containerRef}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="fixed pointer-events-none z-[9999] select-none"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: -50,
              y: -60,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <div className="bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-zinc-200 dark:border-zinc-700">
              {cursorContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

