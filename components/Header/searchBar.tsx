'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import InputField from '@/components/subComp/InputField'

export default function SearchBar() {
  const router = useRouter()

  // Called on every keystroke (debounced) — useful for live suggestions later
  const handleChange = useCallback(() => {
    // wire up autocomplete/suggestions here when ready
  }, [])

  // Called on form submit (Enter key or icon click)
  const handleSubmit = useCallback((value: string) => {
    router.push(`/search?q=${encodeURIComponent(value)}`)
  }, [router])

  return (
    <InputField
      onChange={handleChange}
      onSubmit={handleSubmit}
      placeholder="Search products or brands"
    />
  )
}