"use client"

import { useState } from "react"
import { getOffers } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminOffersPage() {
  const [offers, setOffers] = useState(getOffers())
  const [form, setForm] = useState({ title: "", image: "", cta: "" })

  const add = () => {
    if (!form.title) return
    setOffers((o) => [...o, { id: String(Date.now()), title: form.title, image: form.image, cta: form.cta }])
    setForm({ title: "", image: "", cta: "" })
  }

  const remove = (id: string) => setOffers((o) => o.filter((x) => x.id !== id))

  return (
    <div className="px-4 md:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Manage Homepage Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <Input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <Input placeholder="CTA Text" value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} />
      </div>
      <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={add}>
        Add Offer
      </Button>
      <ul className="space-y-3">
        {offers.map((o) => (
          <li key={o.id} className="flex items-center justify-between bg-muted/40 p-3 rounded">
            <div>
              <p className="font-medium">{o.title}</p>
              <p className="text-xs text-muted-foreground">{o.image}</p>
            </div>
            <Button variant="destructive" onClick={() => remove(o.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
