"use client"

import { useAppSelector } from "@/store/hooks"
import { selectWatchlistIds } from "@/store/slices/watchlist-slice"
import { ProductGrid } from "@/components/product-grid"
import { getProducts } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WatchlistPage() {
  const ids = useAppSelector(selectWatchlistIds)
  const products = getProducts().filter((p) => ids.includes(p.id))

  return (
    <main className="container mx-auto px-4 py-6 max-w-6xl">
      <h1 className="mb-4 text-xl font-semibold">Your Watchlist</h1>
      {products.length ? (
        <ProductGrid products={products} />
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">No saved items yet.</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </>
      )}
    </main>
  )
}
