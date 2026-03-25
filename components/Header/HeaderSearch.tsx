'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputField from '@/components/UI/InputField'

export default function HeaderSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`)
    }
  }

  return (
    <InputField
      value={query}
      onChange={setQuery}
      onEnter={handleSearch}
      placeholder="Search products or brands"
    />
  )
}
