"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function NavbarSearch({ className }: { className?: string }) {
  const router = useRouter()
  const params = useSearchParams()
  const [q, setQ] = useState(params.get("q") ?? "")

  useEffect(() => {
    setQ(params.get("q") ?? "")
  }, [params])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const query = q.trim()
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search")
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full max-w-md", className)} role="search" aria-label="Site">
      <label htmlFor="nav-search" className="sr-only">
        Search gifts
      </label>
      <div className="flex items-center rounded-md border bg-background pl-3 focus-within:ring-2 focus-within:ring-primary">
        <input
          id="nav-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search gifts, categories..."
          className="w-full bg-transparent px-2 py-2 text-sm outline-none"
          aria-label="Search"
        />
        <button type="submit" className="px-3 py-2 text-sm font-medium text-primary">
          Search
        </button>
      </div>
    </form>
  )
}
