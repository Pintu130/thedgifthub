import type React from "react"
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[60vh] grid place-items-center px-4">
      <div className="w-full max-w-md">{children}</div>
    </main>
  )
}
