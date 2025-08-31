"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    // TODO: Firebase createUserWithEmailAndPassword + sendEmailVerification
    await new Promise((r) => setTimeout(r, 800))
    alert("Verification email sent (demo). Complete registration after verifying email.")
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={submit} disabled={loading} className="w-full">
        {loading ? "Creating..." : "Create account"}
      </Button>
      <div className="text-xs text-muted-foreground text-center">
        Already have an account?{" "}
        <Link href="/login" className="hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}
