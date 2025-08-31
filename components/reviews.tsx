"use client"
import { RatingStars } from "./rating-stars"

export type Review = {
  id: string
  author: string
  rating: number
  date: string
  text: string
}

export function Reviews({ reviews = [] }: { reviews?: Review[] }) {
  const avg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0

  return (
    <section aria-labelledby="reviews-heading" className="mt-8">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="reviews-heading" className="text-lg font-semibold text-balance">
          Customer Reviews
        </h2>
        <div className="flex items-center gap-2">
          <RatingStars value={avg} />
          <span className="text-sm text-muted-foreground">
            {avg.toFixed(1)} • {reviews.length} review{reviews.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <ul className="space-y-4">
        {reviews.length === 0 && <li className="text-sm text-muted-foreground">No reviews yet.</li>}
        {reviews.map((r) => (
          <li key={r.id} className="rounded-lg border bg-card p-4">
            <div className="mb-1 flex items-center justify-between">
              <div className="font-medium">{r.author}</div>
              <div className="text-xs text-muted-foreground">{r.date}</div>
            </div>
            <RatingStars value={r.rating} className="mb-2" />
            <p className="text-sm leading-relaxed text-pretty">{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
