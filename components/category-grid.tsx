import Link from "next/link"
import Image from "next/image"
import type { Category } from "@/lib/types"

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 sm:px-6">
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/category/${c.slug}`}
          className="group bg-white rounded-lg p-1 flex flex-col items-center gap-3 hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-100"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 relative flex items-center justify-center">
            <Image
              src={c.image || "/placeholder.svg?height=96&width=96&query=gift%20category"}
              alt={c.name}
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 640px) 20vw, (max-width: 768px) 15vw, 10vw"
            />
          </div>
          <span className="text-sm font-medium text-center text-gray-700 group-hover:text-emerald-600 transition-colors">
            {c.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
