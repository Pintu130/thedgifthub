import Link from "next/link"
import Image from "next/image"
import type { Category } from "@/lib/types"

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/category/${c.slug}`}
          className="group bg-muted/40 rounded-lg p-4 flex flex-col items-center gap-3 hover:bg-muted transition-colors"
        >
          <Image
            src={c.image || "/placeholder.svg?height=96&width=96&query=gift%20category"}
            alt={c.name}
            width={96}
            height={96}
            className="rounded"
          />
          <span className="text-sm font-medium group-hover:text-emerald-700">{c.name}</span>
        </Link>
      ))}
    </div>
  )
}
