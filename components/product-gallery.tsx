"use client"

import Image from "next/image"
import { useState } from "react"

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const safe = images?.length ? images : ["/gift-product.png"]
  const [active, setActive] = useState(0)

  return (
    <div className="w-full">
      <div className="flex gap-3 md:gap-4">
        {/* Thumbnails - vertical on md+, hidden on mobile */}
        <div className="hidden md:flex md:flex-col md:gap-3">
          {safe.map((src, i) => (
            <button
              key={i}
              aria-label={`View image ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 overflow-hidden rounded-md border ${i === active ? "ring-2 ring-primary" : ""}`}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
          <Image
            src={safe[active] || "/placeholder.svg"}
            alt={alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Thumbnails - horizontal on mobile */}
      <div className="mt-3 flex gap-2 overflow-x-auto md:hidden">
        {safe.map((src, i) => (
          <button
            key={i}
            aria-label={`View image ${i + 1}`}
            onClick={() => setActive(i)}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border ${i === active ? "ring-2 ring-primary" : ""}`}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={`${alt} thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
