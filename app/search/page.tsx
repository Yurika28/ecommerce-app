'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/UI/Card';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import HeaderMenu from '@/components/UI/HeaderCategory';
import Breadcrumb from '@/components/UI/Breadcrumb';
import Sidebar from '@/components/UI/Sidebar';
import { FilterProvider, useFilter } from '@/components/UI/FilterContext';

function SearchResults({ query }: { query: string }) {
  const { filteredProducts, allProducts } = useFilter()
  const loading = allProducts.length === 0

  return (
    <div>
      <h2 className="text-2xl font-bold py-6">
        Search Results for: <span className="text-blue-600">{query.toUpperCase()}</span>
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
        {loading ? (
          <p className="col-span-4">Loading...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-4">No products found.</p>
        )}
      </div>
    </div>
  )
}

export default function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <FilterProvider initialSearchQuery={query}>
      <div>
        <Header />
        <HeaderMenu />

        <main className="p-4 mb-6">
          <Breadcrumb />
          <div className='w-full flex gap-2 md:gap-6'>
            <Sidebar />
            <SearchResults query={query} />
          </div>
        </main>

        <Footer />
      </div>
    </FilterProvider>
  );
}
