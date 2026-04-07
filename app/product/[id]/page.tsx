import React from 'react'
import PageLayout from '@/components/subComp/PageLayout'
import { API } from '@/constants/api'
import { Product } from '@/components/types/product'
import ProductDetails from './ProductDetails'
import RelatedProducts from './RelatedProducts'
import Breadcrumb from '@/components/subComp/Breadcrumb'

async function getProduct(id: number): Promise<Product> {
  const res = await fetch(API.productSSR(id), { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export default async function ProductDetail({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  const product = await getProduct(id)

  return (
    <PageLayout>
      <div className='pl-4'>
        <Breadcrumb />
      </div>
      <ProductDetails product={product} key={product.id} />
      <RelatedProducts currentProductID={product.id} currentProductCategory={product.category} />
    </PageLayout>
  )
}