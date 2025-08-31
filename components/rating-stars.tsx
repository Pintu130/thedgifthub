"use client"
import { cn } from "@/lib/utils"

export function RatingStars({
  value,
  outOf = 5,
  size = 16,
  className,
}: {
  value: number
  outOf?: number
  size?: number
  className?: string
}) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const empty = outOf - full - (half ? 1 : 0)
  const Star = ({ fill = "none" }: { fill?: "none" | "currentColor" }) => (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("text-yellow-500 inline-block", fill === "none" && "opacity-40")}
    >
      <path
        fill={fill}
        stroke="currentColor"
        d="M12 .587l3.668 7.431 8.207 1.193-5.938 5.79 1.402 8.175L12 18.896 4.661 23.176l1.402-8.175L.125 9.211l8.207-1.193z"
      />
    </svg>
  )
  return (
    <span className={cn("inline-flex items-center", className)}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={"f" + i} fill="currentColor" />
      ))}
      {half && (
        <span className="relative inline-block" style={{ width: size, height: size }}>
          <span className="absolute inset-0 overflow-hidden" style={{ width: size / 2 }}>
            <Star fill="currentColor" />
          </span>
          <Star />
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={"e" + i} />
      ))}
    </span>
  )
}
