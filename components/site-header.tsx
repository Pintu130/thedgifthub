"use client"

import { useRouter } from "next/navigation"

import { useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/store/hooks"
import SearchAutocomplete from "@/components/search-autocomplete"

const nav = [
  { href: "/", label: "Home" },
  { href: "/category/corporate-gifts", label: "Corporate" },
  { href: "/category/phone-stand", label: "Phone Stand" },
  { href: "/category/diary", label: "Diary" },
  { href: "/category/books", label: "Books" },
  { href: "/category/key-stand", label: "Key Stand" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const qty = useAppSelector((s) => s.cart.items.reduce((n, i) => n + i.qty, 0))
  const wlCount = useAppSelector((s) => s.watchlist.ids.length)
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const router = useRouter()

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b">
      <div className="px-4 md:px-8 min-h-14 flex items-center">
        <div className="flex w-full items-center justify-between gap-3">
          {/* Logo (always visible) */}
          <Link href="/" className="font-semibold text-primary">
            The D Gift Hub
          </Link>

          {/* Desktop nav + actions */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-5">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`text-sm relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full ${
                    pathname === n.href 
                      ? "text-primary font-medium after:bg-[#C4294F] after:w-full" 
                      : "text-muted-foreground hover:text-foreground after:bg-[#C4294F]"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/watchlist" className="inline-flex items-center gap-1 relative">
                  <Heart size={16} />
                  <span>Watchlist</span>
                  {wlCount > 0 && (
                    <span
                      className="absolute -right-2 -top-2 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground"
                      aria-live="polite"
                    >
                      {wlCount}
                    </span>
                  )}
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/cart" aria-label="Cart" className="inline-flex items-center relative">
                  <ShoppingCart size={18} />
                  <span className="sr-only">Cart</span>
                  {qty > 0 && (
                    <span
                      className="absolute -right-2 -top-2 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground"
                      aria-live="polite"
                    >
                      {qty}
                    </span>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden px-4 pb-3">
        <SearchAutocomplete placeholder="Search gifts" />
      </div>
    </header>
  )
}
