"use client"

import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-white p-4 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>
        <div className="bg-white rounded-lg p-0">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
