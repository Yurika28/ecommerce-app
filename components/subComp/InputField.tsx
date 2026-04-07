'use client'

import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type InputFieldProps = {
  placeholder?: string
  debounceMs?:  number
  onChange?:    (value: string) => void
  onSubmit?:    (value: string) => void  // renamed from onEnter — clearer intent
}

export default function InputField({
  placeholder = 'Search products or brands',
  debounceMs  = 300,
  onChange,
  onSubmit,
}: InputFieldProps) {
  const [value, setValue] = useState('')

  // Debounced onChange — no ref trick needed; parent must pass a stable callback
  useEffect(() => {
    const timer = setTimeout(() => onChange?.(value), debounceMs)
    return () => clearTimeout(timer)
  }, [value, debounceMs, onChange])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()                // prevents any page reload
    const trimmed = value.trim()
    if (trimmed) onSubmit?.(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full" role="search">
      <input
        type="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full pr-10 pl-4 py-2 text-sm md:text-base border border-neutral-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-0 bg-transparent border-none cursor-pointer"
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </button>
    </form>
  )
}