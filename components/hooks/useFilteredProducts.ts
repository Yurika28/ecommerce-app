import { useMemo } from 'react'
import { Product } from '@/components/types/product'
import { FilterState } from '@/components/subComp/FilterContext'

export function useFilteredProducts(allProducts: Product[], filters: FilterState): Product[] {
  const { searchQuery, selectedCategory, keyword, minPrice, maxPrice } = filters

  return useMemo(() => {
    let result = allProducts ?? []

    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (keyword) {
      result = result.filter(p =>
        p.brand?.toLowerCase().includes(keyword.toLowerCase())
      )
    }

    if (minPrice !== undefined) {
      result = result.filter(p => p.price >= minPrice)
    }

    if (maxPrice !== undefined) {
      result = result.filter(p => p.price <= maxPrice)
    }

    return result
  }, [allProducts, searchQuery, selectedCategory, keyword, minPrice, maxPrice])
}
