"use client"

import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-white p-4 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500">Join us today</p>
        </div>
        <div className="bg-white rounded-lg p-0">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
