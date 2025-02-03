"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "full" | "college" | "department"
}

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const signIn = (email: string, password: string) => {
    // Dummy authentication logic
    if (email === "admin@example.com" && password === "password") {
      const user: User = {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        role: "full",
      }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      return true
    }
    return false
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

