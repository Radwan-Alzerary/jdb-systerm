"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SignOutButton() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  if (!user) return null

  const handleSignOut = () => {
    signOut()
    router.push("/signin")
  }

  return (
    <Button variant="outline" onClick={handleSignOut}>
      تسجيل الخروج
    </Button>
  )
}

