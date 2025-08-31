"use client"

import { useEffect, useRef, useState } from "react"

const slides = [
  {
    id: "s1",
    title: "Festive Gifts Sale",
    subtitle: "Up to 50% off",
    img: "/placeholder-cx5lc.png",
  },
  {
    id: "s2",
    title: "Personalized Gifts",
    subtitle: "Make it memorable",
    img: "/placeholder-xqfio.png",
  },
  {
    id: "s3",
    title: "Last-Minute Surprises",
    subtitle: "Same-day options",
    img: "/placeholder-h25jt.png",
  },
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 4000)
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [])

  return (
    <section aria-label="Promotions" className="relative">
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((s) => (
            <div key={s.id} className="min-w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.img || "/placeholder.svg"}
                alt={`${s.title} - ${s.subtitle}`}
                className="h-48 w-full object-cover md:h-80"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-rose-600" : "bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  )
}
