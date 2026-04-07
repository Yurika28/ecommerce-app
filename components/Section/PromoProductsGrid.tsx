import React from 'react'
import Card from '../subComp/Card'
import Link from 'next/link'
import { productUrls, ProductUrlKey } from '../subComp/GridCat'
import { Product } from '@/components/types/product'


type GridProductsProps = {
  products: Product[] | ProductUrlKey
  titlePromo: string
}

async function fetchProducts(source: Product[] | ProductUrlKey): Promise<Product[]> {
  if (typeof source !== 'string') {
    return source.slice(0, 4)
  }

  const url = productUrls[source]
  const res = await fetch(url, { next: { revalidate: 3600 } })
  const data = await res.json()

  return data.products.slice(0, 4)
}

export default async function PromoProductsGrid({
  products,
  titlePromo
}: GridProductsProps) {
  const displayProducts = await fetchProducts(products)

  let categorySlug: string | undefined

  if (typeof products === 'string') {
    const categoryUrl = productUrls[products]
    categorySlug = categoryUrl.split('/').pop()
  }

  return (
    <div className="space-y-6 p-4">

      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-2xl font-bold">{titlePromo}</h2>

        {categorySlug && (
          <Link href={`/product/category/${categorySlug}`}>
            <span className="text-sm text-neutral-500 hover:underline cursor-pointer">
              View All
            </span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {displayProducts.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>

    </div>
  )
}