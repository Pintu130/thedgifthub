"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { registerUser } from "@/lib/auth"

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const submit = async () => {
    if (!email || !password || !name) {
      setMessage({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      return
    }

    setLoading(true)
    setMessage(null)

    const result = await registerUser(email, password, name)
    
    if (result.success) {
      setMessage({ 
        type: 'success', 
        text: 'Registration successful! Please check your email and verify your account before logging in.' 
      })
      // Clear form
      setEmail("")
      setPassword("")
      setName("")
    } else {
      setMessage({ type: 'error', text: result.error || 'Registration failed' })
    }
    
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      {message && (
        <Alert className={message.type === 'error' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}>
          <AlertDescription className={message.type === 'error' ? 'text-red-700' : 'text-green-700'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}
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
