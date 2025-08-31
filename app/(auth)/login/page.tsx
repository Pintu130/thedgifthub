"use client"

import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="px-4 md:px-8 py-10 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <LoginForm />
    </div>
  )
}
