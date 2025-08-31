"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function CategoryFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const sp = new URLSearchParams(params.toString())
      if (value && value.length > 0) sp.set(key, value)
      else sp.delete(key)
      router.push(`${pathname}?${sp.toString()}`)
    },
    [params, pathname, router],
  )

  const price = params.get("price") || ""
  const rating = params.get("rating") || ""
  const offer = params.get("offer") === "1"

  return (
    <aside className="md:sticky md:top-16 w-full md:w-64 rounded-lg border bg-card p-4 space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Price</h3>
        <select
          value={price}
          onChange={(e) => setParam("price", e.target.value || null)}
          className="w-full rounded-md border bg-background px-2 py-2 text-sm"
        >
          <option value="">Any</option>
          <option value="0-499">Under 499</option>
          <option value="500-999">500 - 999</option>
          <option value="1000-1999">1000 - 1999</option>
          <option value="2000-999999">2000+</option>
        </select>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Rating</h3>
        <select
          value={rating}
          onChange={(e) => setParam("rating", e.target.value || null)}
          className="w-full rounded-md border bg-background px-2 py-2 text-sm"
        >
          <option value="">Any</option>
          <option value="4">4+ stars</option>
          <option value="3">3+ stars</option>
          <option value="2">2+ stars</option>
        </select>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Offers</h3>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={offer} onChange={(e) => setParam("offer", e.target.checked ? "1" : null)} />
          Offers only
        </label>
      </div>
    </aside>
  )
}
