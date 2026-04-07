'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getSubcategories } from '@/components/utils/categories';
import { Product } from '@/components/types/product';
import Sidebar from '@/components/subComp/Sidebar';
import { FilterProvider } from '@/components/subComp/FilterContext';
import PageLayout from '@/components/subComp/PageLayout';
import { API } from '@/constants/api';
import { unslug } from '@/components/utils/slug';
import Breadcrumb from '@/components/subComp/Breadcrumb';
import CategoryContent from './CategoryContent';

const CategoryPage = () => {
  const params = useParams();
  const category = params.category as string;
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const subCategories = getSubcategories(category);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          API.productsByCategory(selectedSubCategory || category.toLowerCase())
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setProducts(data.products ?? []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, selectedSubCategory]);

  return (
    <FilterProvider>
      <PageLayout>
        <div className="container px-4 w-full flex-1">
          <Breadcrumb />

          {subCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setSelectedSubCategory('')}
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  selectedSubCategory === ''
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                All
              </button>
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                    selectedSubCategory === sub
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-600 hover:text-blue-600'
                  }`}
                >
                  {unslug(sub).toUpperCase()}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6 py-4">
            <Sidebar />
            <CategoryContent
              category={category}
              selectedSubCategory={selectedSubCategory}
              products={products}
              loading={loading}
            />
          </div>
        </div>
      </PageLayout>
    </FilterProvider>
  );
};

export default CategoryPage;