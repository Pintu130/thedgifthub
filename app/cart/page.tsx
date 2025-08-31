"use client"

import Image from "next/image"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { removeItem, updateQty, selectCartTotal } from "@/store/slices/cart-slice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CartPage() {
  const { items } = useAppSelector((s) => s.cart)
  const total = useAppSelector(selectCartTotal)
  const dispatch = useAppDispatch()

  return (
    <div className="px-4 md:px-8 py-8 space-y-8">
      <h1 className="text-2xl md:text-3xl font-semibold">Your Cart</h1>
      {items.length === 0 ? (
        <div className="space-y-4">
          <p>Your cart is empty.</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/40 p-3 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image || "/placeholder.svg?height=80&width=80&query=gift%20product"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    className="w-20"
                    value={item.qty}
                    onChange={(e) => dispatch(updateQty({ id: item.id, qty: Number(e.target.value || 1) }))}
                    aria-label={`Quantity for ${item.name}`}
                  />
                  <Button variant="destructive" onClick={() => dispatch(removeItem(item.id))}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-lg">
              Total: <span className="font-semibold">${total.toFixed(2)}</span>
            </p>
            <Button asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
