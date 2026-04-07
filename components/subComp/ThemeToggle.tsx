'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  // On mount: apply saved preference, falling back to system preference
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved ? saved === 'dark' : systemDark
    setIsDark(dark) 
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="cursor-pointer hover:text-gray-600"
    >
      {isDark
        ? <SunIcon className="h-6 w-6" />
        : <MoonIcon className="h-6 w-6" />
      }
    </button>
  )
}