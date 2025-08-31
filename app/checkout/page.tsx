"use client"

import { useState } from "react"
import { useAppSelector } from "@/store/hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function CheckoutPage() {
  const { items } = useAppSelector((s) => s.cart)
  const authenticated = useAppSelector((s) => s.user.authenticated)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
  })

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const submit = async () => {
    if (!authenticated) {
      alert("Please login before purchasing.")
      return
    }
    if (items.length === 0) return
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer: form }),
      })
      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      } else {
        alert(data?.error || "Failed to create checkout session.")
      }
    } catch (e: any) {
      alert(e?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl md:text-3xl font-semibold">Checkout</h1>
        {!authenticated && (
          <p className="text-sm text-amber-600">You must be logged in to complete purchase. Use Login in the header.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Full name" value={form.name} onChange={(e) => update("name", e.target.value)} />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
          <Textarea placeholder="Address" value={form.address} onChange={(e) => update("address", e.target.value)} />
          <Input placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} />
          <Input placeholder="Country" value={form.country} onChange={(e) => update("country", e.target.value)} />
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          disabled={items.length === 0 || loading}
          onClick={submit}
        >
          {loading ? "Creating Session..." : "Pay with Stripe"}
        </Button>
      </div>
      <aside className="space-y-4 bg-muted/40 p-4 rounded-md">
        <h2 className="font-medium">Order Summary</h2>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items.</p>
        ) : (
          <ul className="text-sm space-y-1">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between">
                <span>
                  {i.name} × {i.qty}
                </span>
                <span>${(i.price * i.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  )
}
