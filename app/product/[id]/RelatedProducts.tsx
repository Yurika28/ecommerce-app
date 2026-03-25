'use client'
import React, { useState, useEffect } from 'react'
import { Product } from '@/components/Section/ProductsGrid'
import Card from '@/components/UI/Card'

type RelatedProductsProps = {
  currentProductID: number
  currentProductCategory: string
}

export default function RelatedProducts({ currentProductID, currentProductCategory }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${currentProductCategory}`)
        const data: { products: Product[] } = await res.json()
        setRelatedProducts(data.products.filter(p => p.id !== currentProductID))
      } catch (err) {
        console.error('Failed to fetch related products', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRelatedProducts()
  }, [currentProductCategory, currentProductID])

  if (loading) {
    return (
      <div className="px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (relatedProducts.length === 0) return null

  return (
    <div className='px-4 py-8'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 py-4'>Other Products You Might Like...</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {relatedProducts.map((product: Product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
