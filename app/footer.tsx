'use client'
import { useEffect, useState } from 'react'
import { TextLoop } from '@/components/motion-primitives/text-loop'
import { SlidingNumber } from '@/components/motion-primitives/sliding-number'

function useCountdown(targetType?: 'work' | 'home' | 'weekend') {
  const [left, setLeft] = useState(0)

  useEffect(() => {
    if (!targetType) return

    const tick = () => {
      const now = new Date()
      const target = new Date(now)
      
      // 设置目标时间
      if (targetType === 'home') {
        target.setHours(18, 0, 0, 0) // 下班时间 18:00
      } else if (targetType === 'work') {
        target.setHours(9, 0, 0, 0)  // 上班时间 9:00
      } else {
        // 周末不显示具体倒计时
        return
      }

      if (now > target) target.setDate(target.getDate() + 1)
      setLeft(Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000)))
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetType])

  // 强制两位数显示（确保即使数值为0也显示00）
  const formatTime = (time: number) => {
    const normalized = Math.max(0, time) // 防止负数
    return String(normalized).padStart(2, '0')
  }

  return {
    h: formatTime(Math.floor(left / 3600)),
    m: formatTime(Math.floor((left % 3600) / 60)),
    s: formatTime(left % 60),
    isWeekend: targetType === 'weekend'
  }
}

const TEXTS = [
  <span key="smile">Powered by coffee & my daughter's smile.</span>,
  <span key="copyright">© 2025 Jun Zhang.</span>,
]

export function Footer() {
  const [countdownType, setCountdownType] = useState<'work' | 'home' | 'weekend'>()

  useEffect(() => {
    const updateType = () => {
      const now = new Date()
      const isWeekend = [0, 6].includes(now.getDay()) // 0是周日，6是周六
      const hours = now.getHours()
      
      setCountdownType(
        isWeekend 
          ? 'weekend' 
          : hours >= 9 && hours < 18 
            ? 'home' 
            : 'work'
      )
    }

    updateType()
    const interval = setInterval(updateType, 60_000)
    return () => clearInterval(interval)
  }, [])

  const { h, m, s, isWeekend } = useCountdown(countdownType)

  return (
    <footer className="mt-24 border-t border-zinc-100 px-4 py-4 dark:border-zinc-800">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <TextLoop
          className="text-sm text-zinc-600 dark:text-zinc-400"
          interval={3}
          variants={({ index }) => ({
            initial: { 
              y: index === 0 ? -20 : 20, 
              rotateX: index === 0 ? -90 : 90, 
              opacity: 0, 
              filter: 'blur(4px)' 
            },
            animate: { 
              y: 0, 
              rotateX: 0, 
              opacity: 1, 
              filter: 'blur(0px)' 
            },
            exit: { 
              y: index === 0 ? 20 : -20, 
              rotateX: index === 0 ? 90 : -90, 
              opacity: 0, 
              filter: 'blur(4px)' 
            },
          })}
        >
          {TEXTS}
        </TextLoop>

        <div className="flex items-center">
          {isWeekend ? (
            <span className="text-base text-zinc-600 dark:text-zinc-400">
              TIME FOR BEER 🍺
            </span>
          ) : (
            <>
              <div className="flex items-baseline space-x-1 text-lg font-medium text-zinc-800 dark:text-zinc-200">
                <SlidingNumber className="font-mono" value={h} />
                <span className="mx-0.5">:</span>
                <SlidingNumber className="font-mono" value={m} />
                <span className="mx-0.5">:</span>
                <SlidingNumber className="font-mono" value={s} />
              </div>
              <span className="ml-2 text-base text-zinc-600 dark:text-zinc-400">
                {countdownType === 'home' 
                  ? "until freedom o'clock" 
                  : "until tomorrow's grind"}

              </span>
            </>
          )}
        </div>
      </div>
    </footer>
  )
}