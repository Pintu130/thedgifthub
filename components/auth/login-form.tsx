"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useAppDispatch } from "@/store/hooks"
import { signIn } from "@/store/slices/user-slice"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const submit = async () => {
    setLoading(true)
    // TODO: Integrate Firebase signInWithEmailAndPassword and check emailVerified
    await new Promise((r) => setTimeout(r, 600))
    dispatch(signIn({ email, emailVerified: true }))
    alert("Logged in (demo).")
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={submit} disabled={loading} className="w-full">
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      <div className="text-xs text-muted-foreground flex items-center justify-between">
        <Link href="/(auth)/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/(auth)/register" className="hover:underline">
          Create account
        </Link>
      </div>
    </div>
  )
}
