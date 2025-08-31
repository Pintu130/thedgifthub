"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { makeSelectIsWatchlisted, toggle } from "@/store/slices/watchlist-slice"

function hasOffer(p: Product) {
  // simple heuristic for demo offers
  return p.price >= 30 || /gift|diary/i.test(p.slug)
}

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()
  const isSaved = useAppSelector(makeSelectIsWatchlisted(product.id))

  return (
    <div className="relative border rounded-lg overflow-hidden bg-card text-card-foreground w-full">
      {/* Offer badge */}
      {hasOffer(product) && (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
          10% OFF
        </span>
      )}
      {/* Save button */}
      <button
        aria-label={isSaved ? "Remove from watchlist" : "Save to watchlist"}
        onClick={() => dispatch(toggle(product.id))}
        className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background/90 text-foreground hover:text-primary"
      >
        <Heart size={16} className={isSaved ? "fill-primary text-primary" : ""} />
      </button>

      <Link href={`/product/${product.slug}`} className="block">
        <Image
          src={product.images?.[0] || "/placeholder.svg?height=320&width=320&query=gift%20product"}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-auto"
        />
      </Link>
      <div className="p-4 space-y-2">
        <Link href={`/product/${product.slug}`} className="block font-medium hover:text-primary">
          {product.name}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          <Button asChild size="sm">
            <Link href={`/product/${product.slug}`}>View</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
