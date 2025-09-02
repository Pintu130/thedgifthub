"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import type { Offer } from "@/lib/types"

export function HeroSlider({ offers }: { offers: Offer[] }) {
  const [index, setIndex] = useState(0)
  const timer = useRef<NodeJS.Timeout>()
  const next = () => setIndex((i) => (i + 1) % offers.length)
  const prev = () => setIndex((i) => (i - 1 + offers.length) % offers.length)

  useEffect(() => {
    if (offers.length === 0) return
    timer.current = setInterval(next, 4500)
    return () => timer.current && clearInterval(timer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offers.length])

  if (offers.length === 0) return null
  const active = offers[index]

  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
      <div className="relative w-screen h-[320px] md:h-[460px]">
        <Image
          src={active.image || "/placeholder.svg?height=800&width=2500&query=gift%20offer%20banner"}
          alt={active.title}
          fill
          className="object-cover w-full h-full shadow-sm"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-md">{active.title}</h1>
            {active.description && (
              <p className="text-base md:text-lg text-white/90 leading-relaxed drop-shadow-md">
                {active.description}
              </p>
            )}
            {active.cta && (
              <Button 
                className="mt-4 px-8 py-6 text-base md:text-lg font-semibold bg-amber-500 hover:bg-amber-600 text-black transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                {active.cta}
              </Button>
            )}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
          {offers.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <div className="absolute inset-y-0 left-2 md:left-4 flex items-center">
          <button
            className="h-10 w-10 rounded-full bg-white/70 hover:bg-white text-black"
            onClick={prev}
            aria-label="Previous slide"
          >
            ‹
          </button>
        </div>
        <div className="absolute inset-y-0 right-2 md:right-4 flex items-center">
          <button
            className="h-10 w-10 rounded-full bg-white/70 hover:bg-white text-black"
            onClick={next}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
