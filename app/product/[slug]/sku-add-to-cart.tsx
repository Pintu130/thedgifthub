"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"

export default function AddToCart({
  product,
}: { product: { id: string; name: string; price: number; image: string; slug: string } }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  return (
    <div className="flex w-full flex-col sm:flex-row sm:items-center gap-2">
      <label className="sr-only" htmlFor="qty-input">
        Quantity
      </label>
      <input
        id="qty-input"
        type="number"
        inputMode="numeric"
        min={1}
        value={qty}
        onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
        className="w-full sm:w-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
        aria-label="Quantity"
      />
      <Button className="w-full sm:w-auto" onClick={() => add(product, qty)}>
        Add to cart
      </Button>
    </div>
  )
}
