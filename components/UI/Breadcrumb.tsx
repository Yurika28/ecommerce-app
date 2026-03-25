'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Breadcrumb() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [productTitle, setProductTitle] = useState('')
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    const fetchProductTitle = async () => {
      const productMatch = pathname.match(/^\/product\/(\d+)$/)
      if (productMatch) {
        const productId = productMatch[1]
        try {
          const res = await fetch(`https://dummyjson.com/products/${productId}`)
          const products = await res.json()
          setProductTitle(products.title)
        } catch (err) {
          console.error('Failed to fetch product title:', err)
        }
      }

      const categoryMatch = pathname.match(/^\/product\/category\/(.+)$/)
      if (categoryMatch) {
        const category = decodeURIComponent(categoryMatch[1])
        setCategoryName(category)
      }
    }

    fetchProductTitle()
  }, [pathname])

  return (
    <nav className="text-sm text-gray-700 mt-4">
      <Link href="/" className="hover:underline text-blue-600">
        Home
      </Link>

      {pathname === '/search' && query && (
        <span className="text-gray-500">
          <span className="mx-1">/</span>
          <span className="text-blue-600">
            {query.charAt(0).toUpperCase() + query.slice(1)}
          </span>
        </span>
      )}

      {pathname.startsWith('/product/') && productTitle && (
        <span className="text-gray-500">
          <span className="mx-1">/</span>
          <span className="text-blue-600">
            {productTitle.toUpperCase()}
          </span>
        </span>
      )}

      {pathname.startsWith('/product/category/') && categoryName && (
        <span className="text-gray-500">
          <span className="mx-1">/</span>
          <span className="text-blue-600">
            {categoryName.toUpperCase()}
          </span>
        </span>
      )}
    </nav>
  )
}
