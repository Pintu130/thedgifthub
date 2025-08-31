"use client"

import { useState } from "react"
import { getCategories } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(getCategories())
  const [name, setName] = useState("")

  const add = () => {
    if (!name) return
    setCategories((cs) => [...cs, { slug: name.toLowerCase().replace(/\s+/g, "-"), name }])
    setName("")
  }

  const remove = (slug: string) => setCategories((cs) => cs.filter((x) => x.slug !== slug))

  return (
    <div className="px-4 md:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Manage Categories</h1>
      <div className="flex items-center gap-3">
        <Input placeholder="Category name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={add}>
          Add
        </Button>
      </div>
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c.slug} className="flex items-center justify-between bg-muted/40 p-3 rounded">
            <span>{c.name}</span>
            <Button variant="destructive" onClick={() => remove(c.slug)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
