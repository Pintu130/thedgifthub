"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/hooks"
import { signIn } from "@/store/slices/user-slice"
import { loginUser } from "@/lib/auth"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const submit = async () => {
    if (!email || !password) {
      setMessage({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    setLoading(true)
    setMessage(null)

    const result = await loginUser(email, password)
    
    if (result.success) {
      dispatch(signIn({ 
        email: result.user!.email, 
        emailVerified: result.user!.emailVerified,
        name: result.user!.name,
        uid: result.user!.uid
      }))
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' })
      
      // Redirect to home page after 1 second
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      setMessage({ type: 'error', text: result.error || 'Login failed' })
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
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={submit} disabled={loading} className="w-full">
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      <div className="text-xs text-muted-foreground flex items-center justify-between">
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="hover:underline">
          Create account
        </Link>
      </div>
    </div>
  )
}
