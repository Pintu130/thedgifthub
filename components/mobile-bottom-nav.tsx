"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, ShoppingCart, User, Grid2X2 } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { cn } from "@/lib/utils"

export default function MobileBottomNav() {
  const pathname = usePathname()
  const cartQty = useAppSelector((s) => s.cart?.items?.reduce((sum: number, it: any) => sum + (it.qty ?? 0), 0)) ?? 0
  const wlCount = useAppSelector((s) => s.watchlist?.ids?.length ?? 0)

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href))

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden"
      aria-label="Bottom navigation"
      role="navigation"
    >
      <div className="mx-auto flex h-16 max-w-xl items-center justify-between px-2">
        <BottomItem href="/" label="Home" active={isActive("/")} count={undefined}>
          <Home size={22} aria-hidden="true" />
        </BottomItem>
        <BottomItem href="/categories" label="Categories" active={isActive("/categories")}>
          <Grid2X2 size={22} aria-hidden="true" />
        </BottomItem>
        <BottomItem href="/watchlist" label="Watchlist" active={isActive("/watchlist")} count={wlCount}>
          <Heart size={22} aria-hidden="true" />
        </BottomItem>
        <BottomItem href="/cart" label="Cart" active={isActive("/cart")} count={cartQty}>
          <ShoppingCart size={22} aria-hidden="true" />
        </BottomItem>
        <BottomItem href="/account" label="Account" active={isActive("/account") || isActive("/(auth)")}>
          <User size={22} aria-hidden="true" />
        </BottomItem>
      </div>
    </nav>
  )
}

function BottomItem({
  href,
  label,
  active,
  children,
  count,
}: {
  href: string
  label: string
  active?: boolean
  children: React.ReactNode
  count?: number
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "relative flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 text-[10px] w-full",
        active ? "text-primary" : "text-muted-foreground",
      )}
    >
      <span className="relative">
        {children}
        {typeof count === "number" && count > 0 && (
          <span
            className="absolute -right-2 -top-2 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium leading-4 text-primary-foreground"
            aria-live="polite"
          >
            {count}
          </span>
        )}
      </span>
      <span className="text-center leading-none">{label}</span>
    </Link>
  )
}
