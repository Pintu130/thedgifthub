"use client"

import Image from "next/image"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { removeItem, updateQty, selectCartTotal } from "@/store/slices/cart-slice"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"

export default function CartPage() {
  const { items } = useAppSelector((s) => s.cart)
  const total = useAppSelector(selectCartTotal)
  const dispatch = useAppDispatch()

  return (
    <div className="px-4 md:px-8 py-10 max-w-5xl mx-auto space-y-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#be123c]">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="space-y-6 text-center">
          <p className="text-lg text-gray-600">Your cart is empty.</p>
          <Button
            asChild
            className="bg-[#be123c] hover:bg-[#9f0f32] text-white px-6 py-2 rounded-lg"
          >
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <ul className="space-y-5">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex sm:flex-nowrap flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-xl p-4 shadow-sm bg-white"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 flex-1">
                  <Image
                    src={item.image || "/placeholder.svg?height=100&width=100"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover w-24 h-24 border"
                  />
                  <div className="space-y-2">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <div className="flex items-end gap-3">
                      <p className="text-primary text-xl font-semibold">${item.price.toFixed(2)}</p>
                      <p className="text-muted-foreground line-through">${(item.price * 1.35).toFixed(2)}</p>
                      <p className="text-green-600 text-sm font-medium">26% off</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row justify-end items-center gap-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-[#be123c] rounded-lg overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        dispatch(updateQty({ id: item.id, qty: Math.max(item.qty - 1, 1) }))
                      }
                      aria-label="Decrease quantity"
                      className="text-[#be123c] hover:bg-[#e92153] cursor-pointer"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 text-sm font-medium">{item.qty}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
                      aria-label="Increase quantity"
                      className="text-[#be123c] hover:bg-[#e92153] cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(removeItem(item.id))}
                    className="text-[#be123c] hover:bg-[#e92153] cursor-pointer"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Summary */}
          <div className="border-t pt-6 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-lg">Price Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Price ({items.reduce((sum, item) => sum + item.qty, 0)} items)</span>
                  <span>${(total * 1.35).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${(total * 0.35).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
                <p className="text-green-600 text-sm font-medium">
                  You will save ${(total * 0.35).toFixed(2)} on this order
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                asChild
                size="lg"
                className="bg-[#be123c] hover:bg-[#e92153] text-white px-8 py-3 rounded-lg"
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
