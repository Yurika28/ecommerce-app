'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/components/types/product'
import { API } from '@/constants/api'

export function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch(API.allProducts())
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setProducts(data.products ?? [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return { products, loading }
}
