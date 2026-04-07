const EXTERNAL = 'https://dummyjson.com'

export const API = {
  // Used server-side only (RSC in app/product/[id]/page.tsx) — direct fetch is fine
  productSSR:         (id: number | string) => `${EXTERNAL}/products/${id}`,
  // Proxied through Next.js for client-side usage
  product:            (id: number | string) => `/api/products/${id}`,
  productsByCategory: (category: string)    => `/api/products/category/${category}`,
  allProducts:        (limit = 194)         => `/api/products?limit=${limit}`,
}
