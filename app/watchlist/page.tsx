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
      {/* <h1 className="mb-4 text-xl font-semibold">Your Watchlist</h1> */}
      <h1 className="text-3xl font-bold text-[#be123c]">Your Watchlist</h1>

      {products.length ? (
        <ProductGrid products={products} />
      ) : (
        <>
          <div className="space-y-6 text-center">
            <p className="text-lg text-gray-600">No saved items yet.</p>
            <Button
              asChild
              className="bg-[#be123c] hover:bg-[#9f0f32] text-white px-6 py-2 rounded-lg"
            >
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </>
      )}
    </main>
  )
}
