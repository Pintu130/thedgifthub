"use client"

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-white p-4 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-500">Enter your email to receive a reset link</p>
        </div>
        <div className="bg-white rounded-lg p-0">
          <ForgotPasswordForm />
        </div>
        <div className="text-center text-sm text-gray-600">
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
