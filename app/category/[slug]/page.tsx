"use client"

import { useMemo, useState } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CategoryFilters } from "@/components/category-filters"

function parsePrice(p: string | null): [number, number] | null {
  if (!p) return null
  const [min, max] = p.split("-").map((n) => Number(n))
  if (Number.isFinite(min) && Number.isFinite(max)) return [min, max]
  return null
}

function hasOffer(price: number, slug: string) {
  return price >= 30 || /gift|diary/i.test(slug)
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const category = getCategoryBySlug(slug)
  const baseProducts = getProductsByCategory(slug)
  const searchParams = useSearchParams()
  const sortParam = searchParams.get("sort") || "newest"
  const priceParam = searchParams.get("price")
  const ratingParam = searchParams.get("rating") // reserved for future when ratings are in data
  const offerParam = searchParams.get("offer") === "1"

  const router = useRouter()
  const pathname = usePathname()
  const [showFilters, setShowFilters] = useState(false)
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
    // ratingParam reserved for future (no ratings in demo data)
    const sorted = [...filtered].sort((a, b) => {
      if (sortParam === "low") return a.price - b.price
      if (sortParam === "high") return b.price - a.price
      return (b.createdAt || 0) - (a.createdAt || 0)
    })
    return sorted
  }, [baseProducts, priceParam, offerParam, sortParam /* ratingParam */])

  if (!category) {
    return <div className="px-4 md:px-8 py-16">Category not found.</div>
  }

  return (
    <div className="px-4 md:px-8 py-6 max-w-6xl mx-auto">
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
          <button
            type="button"
            className="md:hidden inline-flex items-center rounded-md border px-3 py-2 text-sm bg-background"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-controls="mobile-filters"
          >
            Filters
          </button>
        </div>
      </header>
      {showFilters && (
        <div id="mobile-filters" className="md:hidden mb-4">
          <CategoryFilters />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-[16rem_minmax(0,1fr)] gap-6">
        <div className="hidden md:block md:sticky md:top-16">
          <CategoryFilters />
        </div>
        <div className="col-span-1 md:col-span-2">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}
