'use client'
import React, { useState, useEffect } from 'react'
import { Product } from '@/components/types/product'
import Card from '@/components/subComp/Card'
import LoadingSpinner from '@/components/subComp/LoadingSpinner'
import { API } from '@/constants/api'

type RelatedProductsProps = {
  currentProductID: number
  currentProductCategory: string
}

export default function RelatedProducts({ currentProductID, currentProductCategory }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await fetch(API.productsByCategory(currentProductCategory))
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: { products: Product[] } = await res.json()
        setRelatedProducts(data.products.filter(p => p.id !== currentProductID))
      } catch (err) {
        console.error('Failed to fetch related products', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchRelatedProducts()
  }, [currentProductCategory, currentProductID])

  if (loading) return <LoadingSpinner className="px-4 py-8" />

  if (error) {
    return (
      <div className="px-4 py-8 text-sm text-gray-500">
        Could not load related products.
      </div>
    )
  }

  if (relatedProducts.length === 0) return null

  return (
    <div className='px-4 py-8'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 py-4'>Other Products You Might Like...</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {relatedProducts.map((product: Product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
