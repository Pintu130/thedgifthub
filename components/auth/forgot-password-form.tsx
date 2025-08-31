"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    // TODO: Firebase sendPasswordResetEmail
    await new Promise((r) => setTimeout(r, 800))
    alert("Password reset email sent (demo).")
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button className="bg-emerald-600 hover:bg-emerald-700 w-full" onClick={submit} disabled={loading}>
        {loading ? "Sending..." : "Send reset link"}
      </Button>
    </div>
  )
}
