'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className='flex gap-2'>
      <button onClick={() => setTheme('light')} className='rounded-full p-2 bg-white shadow dark:bg-neutral-800'>
        <Sun size={16} />
      </button>
      <button onClick={() => setTheme('dark')} className='rounded-full p-2 bg-white shadow dark:bg-neutral-800'>
        <Moon size={16} />
      </button>
    </div>
  );
}