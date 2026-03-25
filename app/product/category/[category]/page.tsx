'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { womenCat, menCat, beautyCat, deviceCat, homeCat, autoMobileCat } from '@/components/UI/Categories';
import { Product } from '@/components/Section/ProductsGrid';
import Card from '@/components/UI/Card';
import Sidebar from '@/components/UI/Sidebar';
import { FilterProvider, useFilter } from '@/components/UI/FilterContext';
import Header from '@/components/Header/Header';
import HeaderCategory from '@/components/UI/HeaderCategory';
import Footer from '@/components/Footer/Footer';
import Breadcrumb from '@/components/UI/Breadcrumb';


const CategoryContent = ({
  category,
  selectedSubCategory,
  products,
  loading,
}: {
  category: string;
  selectedSubCategory: string;
  products: Product[];
  loading: boolean;
}) => {
  const { filteredProducts, hasActiveFilters } = useFilter();

  // Only use FilterContext results when the user has actively set a filter,
  // otherwise show the category-specific products fetched from the API.
  const displayProducts = hasActiveFilters ? filteredProducts : products;

  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold my-8 uppercase pl-2">
        {category} {selectedSubCategory && `- ${selectedSubCategory.split('-').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')}`}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : displayProducts.length === 0 ? (
        <p className="text-gray-500 col-span-4">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryPage = () => {
  const params = useParams();
  const category = params.category as string;
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const getSubCategories = (mainCat: string) => {
    switch (mainCat.toLowerCase()) {
      case 'women': return womenCat;
      case 'men': return menCat;
      case 'beauty': return beautyCat;
      case 'devices': return deviceCat;
      case 'home decors': return homeCat;
      case 'automobile': return autoMobileCat;
      default: return [];
    }
  };

  const subCategories = getSubCategories(category);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/category/${selectedSubCategory || category.toLowerCase()}`
        );
        const data = await response.json();
        setProducts(data.products);
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
      <div className="container px-4 w-full min-h-screen">
        <Header />
        <HeaderCategory />
        <Breadcrumb />
        <div className="flex flex-col md:flex-row gap-6 py-4">
          <Sidebar />
          <CategoryContent
            category={category}
            selectedSubCategory={selectedSubCategory}
            products={products}
            loading={loading}
          />
        </div>
        <Footer />
      </div>
    </FilterProvider>
  );
};

export default CategoryPage;
