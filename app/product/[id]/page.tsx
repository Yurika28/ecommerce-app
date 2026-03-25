import React from 'react'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { Product } from '@/components/Section/ProductsGrid'
import ProductDetails from './ProductDetails'
import RelatedProducts from './RelatedProducts'
import HeaderCategory from '@/components/UI/HeaderCategory'
import Breadcrumb from '@/components/UI/Breadcrumb'


async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export default async function ProductDetail({ params }: { params: { id: number } }) {
  const product = await getProduct(params.id)


  return (
    <div>
      <Header />
      <HeaderCategory />
      <div className='pl-4'>
        <Breadcrumb />
      </div>
      <ProductDetails product={product} key={product.id} />
      <RelatedProducts currentProductID={product.id} currentProductCategory={product.category} />
      <Footer />
    </div>
  )
}