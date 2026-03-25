'use client'

import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type ProductSearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounce?: number
  onEnter?: (value: string) => void
}

export default function ProductSearchInput({
  value,
  onChange,
  placeholder = 'Search products or brands',
  debounce = 300,
  onEnter
}: ProductSearchInputProps) {
  const [localValue, setLocalValue] = useState(value)

  // 🔄 sync external value
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // ⏱️ debounce update
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue)
    }, debounce)

    return () => clearTimeout(timer)
  }, [localValue, debounce, onChange])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(localValue)
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pr-10 pl-4 py-2 text-sm md:text-base border border-neutral-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </span>
    </div>
  )
}