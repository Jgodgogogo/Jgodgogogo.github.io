'use client'
import Image from 'next/image'
import Link from 'next/link'
import { TextLoop } from '@/components/motion-primitives/text-loop'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AnimatedBackground } from '@/components/motion-primitives/animated-background'
import { GlowEffect } from '@/components/motion-primitives/glow-effect'

const THEMES_OPTIONS = [
  { id: 'light', icon: <SunIcon className="h-5 w-5" />, label: 'Light' },
  { id: 'dark', icon: <MoonIcon className="h-5 w-5" />, label: 'Dark' },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 关键修改1：添加 mounted 状态检测
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky rounded-full top-0 z-40 flex h-24 w-full items-center justify-between px-4 pt-4 md:px-6 py-6 backdrop-blur-sm bg-white/70 dark:bg-zinc-950/70">
      {/* 左侧个人头像组件 */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {/* 头像容器 - 关键修改2：添加 hover 状态控制 */}
          <div className="relative">
            <GlowEffect
              colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
              mode="colorShift"
              blur="soft"
              duration={3}
              scale={1}
              className="rounded-full z-[-1]"
            />
            
            {/* 关键修改4：条件渲染头像 */}
            {mounted ? (
              <Image
                src={theme === 'dark' ? '/avatar-dark.png' : '/avatar-light.png'}
                alt="Avatar"
                width={64}
                height={64}
                className="relative rounded-full border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
            )}
          </div>
          
          {/* 动态副标题 */}
          <div className="flex flex-col">
            <span className="text-xl font-semibold">Jun Zhang</span>
            <TextLoop className="text-base font-light opacity-50" interval={3}>
              {['Solution Designer', 'UX Architect', 'Curious Maker', 'Empathy Thinker']}
            </TextLoop>
          </div>
        </Link>
      </div>

      {/* 右侧模式切换组件 */}
      <div className="flex items-center gap-2">
        <AnimatedBackground
          className="pointer-events-none rounded-lg bg-zinc-100 dark:bg-zinc-800"
          defaultValue={theme}
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.2,
          }}
          enableHover={false}
          onValueChange={(id) => {
            setTheme(id as string)
          }}
        >
          {THEMES_OPTIONS.map((option) => (
            <button
              key={option.id}
              className="inline-flex h-10 w-10 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
              type="button"
              aria-label={`Switch to ${option.label} theme`}
              data-id={option.id}
            >
              {option.icon}
            </button>
          ))}
        </AnimatedBackground>
      </div>
    </header>
  )
}