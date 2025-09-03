"use client"

import { useMemo, useState } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CategoryFilters } from "@/components/category-filters"
import type { Category, Product } from "@/lib/types"

function parsePrice(p: string | null): [number, number] | null {
  if (!p) return null
  const [min, max] = p.split("-").map((n) => Number(n))
  if (Number.isFinite(min) && Number.isFinite(max)) return [min, max]
  return null
}

function hasOffer(price: number, slug: string) {
  return price >= 30 || /gift|diary/i.test(slug)
}

export function CategoryClient({ 
  category, 
  baseProducts,
  slug 
}: { 
  category: Category,
  baseProducts: Product[],
  slug: string 
}) {
  const searchParams = useSearchParams()
  const sortParam = searchParams.get("sort") || "newest"
  const priceParam = searchParams.get("price")
  const offerParam = searchParams.get("offer") === "1"
  const router = useRouter()
  const pathname = usePathname()

  const onSortChange = (value: string) => {
    const sp = new URLSearchParams(searchParams.toString())
    sp.set("sort", value)
    router.push(`${pathname}?${sp.toString()}`)
  }

  const products = useMemo(() => {
    let filtered = baseProducts
    const range = parsePrice(priceParam)
    if (range) {
      filtered = filtered.filter((p) => p.price >= range[0] && p.price <= range[1])
    }
    if (offerParam) {
      filtered = filtered.filter((p) => hasOffer(p.price, p.slug))
    }
    const sorted = [...filtered].sort((a, b) => {
      if (sortParam === "low") return a.price - b.price
      if (sortParam === "high") return b.price - a.price
      return (b.createdAt || 0) - (a.createdAt || 0)
    })
    return sorted
  }, [baseProducts, priceParam, offerParam, sortParam])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 md:px-8 py-6 max-w-6xl mx-auto w-full">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4">
          <h1 className="text-2xl md:text-3xl font-semibold">{category.name}</h1>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-40">
              <Select value={sortParam} onValueChange={onSortChange}>
                <SelectTrigger aria-label="Sort products">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Price: Low to High</SelectItem>
                  <SelectItem value="high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:hidden">
              <CategoryFilters isMobile />
            </div>
          </div>
        </header>
        <div className="md:flex gap-6 overflow-hidden">
          {/* Desktop Filters - Sticky container */}
          <div className="hidden md:block">
            <CategoryFilters />
          </div>
          
          {/* Products Grid - Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}
