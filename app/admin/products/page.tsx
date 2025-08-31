"use client"

import { useMemo, useState } from "react"
import { getCategories, getProducts } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminProductsPage() {
  const categories = getCategories()
  const [products, setProducts] = useState(getProducts())
  const [newP, setNewP] = useState({
    name: "",
    price: "",
    categorySlug: categories[0]?.slug || "corporate-gifts",
  })

  const add = () => {
    if (!newP.name || !newP.price) return
    setProducts((ps) => [
      ...ps,
      {
        id: String(Date.now()),
        slug: newP.name.toLowerCase().replace(/\s+/g, "-"),
        name: newP.name,
        price: Number(newP.price),
        categorySlug: newP.categorySlug,
        description: "New product",
        images: [],
        createdAt: Date.now(),
      },
    ])
    setNewP({ name: "", price: "", categorySlug: categories[0]?.slug || "corporate-gifts" })
  }

  const remove = (id: string) => setProducts((ps) => ps.filter((x) => x.id !== id))

  const byCategory = useMemo(
    () =>
      categories.map((c) => ({
        category: c,
        items: products.filter((p) => p.categorySlug === c.slug),
      })),
    [categories, products],
  )

  return (
    <div className="px-4 md:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Manage Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Input placeholder="Name" value={newP.name} onChange={(e) => setNewP({ ...newP, name: e.target.value })} />
        <Input placeholder="Price" value={newP.price} onChange={(e) => setNewP({ ...newP, price: e.target.value })} />
        <Select value={newP.categorySlug} onValueChange={(v) => setNewP({ ...newP, categorySlug: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={add}>
          Add
        </Button>
      </div>

      {byCategory.map(({ category, items }) => (
        <div key={category.slug} className="space-y-2">
          <h2 className="font-medium">{category.name}</h2>
          <ul className="space-y-2">
            {items.map((p) => (
              <li key={p.id} className="flex items-center justify-between bg-muted/40 p-3 rounded">
                <span>
                  {p.name} — ${p.price.toFixed(2)}
                </span>
                <Button variant="destructive" onClick={() => remove(p.id)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
