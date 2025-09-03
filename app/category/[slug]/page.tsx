import { Suspense } from 'react'
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data"
import { CategoryClient } from './category-client'

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  const baseProducts = getProductsByCategory(slug)

  if (!category) {
    return <div className="px-4 md:px-8 py-16">Category not found.</div>
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <div className="px-4 md:px-8 py-6 max-w-6xl mx-auto w-full">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <CategoryClient 
        category={category} 
        baseProducts={baseProducts} 
        slug={slug} 
      />
    </Suspense>
  )
}
