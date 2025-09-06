"use client"

import { useMemo, useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import SearchAutocomplete from "@/components/search-autocomplete"

type Product = {
  id: string
  name: string
  price: number
  image: string
  slug: string
  [key: string]: any
}

export default function FeaturedWithSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return products
    const q = query.toLowerCase()
    return products.filter((p) => (p.name ?? p.title ?? "").toLowerCase().includes(q))
  }, [products, query])

  return (
    <section className="px-4 md:px-8 pb-8 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-pretty">Featured Gifts</h2>
        <SearchAutocomplete placeholder="Search gifts (e.g. mug, bouquet, diary)" onQueryChange={(q) => setQuery(q)} />
      </div>

      <ProductGrid products={filtered} />
    </section>
  )
}
