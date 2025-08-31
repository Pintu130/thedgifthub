"use client"

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="px-4 md:px-8 py-10 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Forgot password</h1>
      <ForgotPasswordForm />
    </div>
  )
}
