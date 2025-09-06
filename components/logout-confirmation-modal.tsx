"use client"

import Swal from "sweetalert2"
import { logoutUser } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface LogoutConfirmationProps {
  onLogoutSuccess?: () => void
}

export function useLogoutConfirmation({ onLogoutSuccess }: LogoutConfirmationProps = {}) {
  const router = useRouter()

  const showLogoutConfirmation = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626", // Red color to match theme
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      reverseButtons: true
    })

    if (result.isConfirmed) {
      try {
        // Show loading
        Swal.fire({
          title: "Logging out...",
          text: "Please wait",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })

        const logoutResult = await logoutUser()
        
        if (logoutResult.success) {
          // Close loading modal
          Swal.close()
          
          onLogoutSuccess?.()
          router.push("/") // Redirect to home page
        } else {
          await Swal.fire({
            title: "Error!",
            text: "Failed to logout. Please try again.",
            icon: "error",
            confirmButtonColor: "#dc2626"
          })
        }
      } catch (error) {
        console.error("Logout error:", error)
        await Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626"
        })
      }
    }
  }

  return { showLogoutConfirmation }
}
