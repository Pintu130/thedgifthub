"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import { getProducts as getCoreProducts } from "@/lib/data"
import { products as giftsProducts } from "@/lib/gifts-data"

type ProductLite = {
  id: string
  slug: string
  title: string
  price?: number
  image?: string
  category?: string
}

type SearchAutocompleteProps = {
  placeholder?: string
  className?: string
  maxResults?: number
  onQueryChange?: (q: string) => void
}

export default function SearchAutocomplete({
  placeholder = "Search gifts...",
  className,
  maxResults = 6,
  onQueryChange,
}: SearchAutocompleteProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [results, setResults] = React.useState<ProductLite[]>([])
  const [all, setAll] = React.useState<ProductLite[]>([])
  const listRef = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    const core = (getCoreProducts?.() ?? []).map((p: any) => ({
      id: String(p.id ?? p.slug),
      slug: String(p.slug ?? p.id),
      title: String(p.name ?? p.title ?? "Untitled"),
      price: Number(p.price ?? 0),
      image: p.images?.[0] ?? p.image ?? undefined,
      category: p.categorySlug ?? p.category ?? undefined,
    }))
    const gifts = (giftsProducts ?? []).map((p: any) => ({
      id: String(p.id ?? p.slug),
      slug: String(p.slug ?? p.id),
      title: String(p.name ?? p.title ?? "Untitled"),
      price: Number(p.price ?? 0),
      image: p.image ?? p.images?.[0] ?? undefined,
      category: p.category ?? p.categorySlug ?? undefined,
    }))
    setAll([...core, ...gifts])
  }, [])

  React.useEffect(() => {
    const q = query.trim().toLowerCase()
    onQueryChange?.(query)
    if (!q) {
      setResults([])
      setOpen(false)
      return
    }
    const r = all
      .filter((p) => p.title.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q)))
      .slice(0, maxResults)
    setResults(r)
    setOpen(r.length > 0)
  }, [query, all, maxResults, onQueryChange])

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const q = query.trim()
      if (q) {
        router.push(`/search?q=${encodeURIComponent(q)}`)
        setOpen(false)
      }
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  React.useEffect(() => {
    function onDocClick(ev: MouseEvent) {
      if (!listRef.current) return
      const target = ev.target as Node
      if (listRef.current.parentElement && !listRef.current.parentElement.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [])

  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor="global-search" className="sr-only">
        Search
      </label>
      <input
        id="global-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border bg-background px-3 py-2 text-sm",
          "border-border focus:outline-none focus:ring-2 focus:ring-primary",
        )}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls="search-suggestions"
        role="combobox"
      />
      {open ? (
        <ul
          id="search-suggestions"
          ref={listRef}
          role="listbox"
          className={cn(
            "absolute z-50 mt-2 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-sm",
            "border-border",
          )}
        >
          {results.map((p) => (
            <li key={p.id} role="option">
              <Link
                href={`/product/${p.slug}`}
                className="flex items-center gap-3 px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                onClick={() => setOpen(false)}
              >
                <img
                  src={p.image || "/placeholder.svg?height=40&width=40&query=gift%20product"}
                  alt={p.title}
                  className="h-10 w-10 rounded object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.title}</p>
                  {p.price ? <p className="truncate text-xs text-muted-foreground">₹{p.price}</p> : null}
                </div>
              </Link>
            </li>
          ))}
          <li className="px-3 py-2 text-xs text-muted-foreground">Press Enter to view more results</li>
        </ul>
      ) : null}
    </div>
  )
}
