"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (signIn(email, password)) {
      router.push("/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i0.wp.com/ntu.edu.iq/wp-content/uploads/2023/11/NTU_1200x675.jpg?fit=1200%2C675&ssl=1')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 w-full max-w-md p-8 rounded-lg backdrop-blur-md bg-white/30 shadow-xl">
        <div className="flex justify-center mb-8">
          <Image
            src="https://upload.wikimedia.org/wikipedia/ar/5/5a/%D8%B4%D8%B9%D8%A7%D8%B1_%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D8%A9_%D8%A7%D9%84%D8%AA%D9%82%D9%86%D9%8A%D8%A9_%D8%A7%D9%84%D8%B4%D9%85%D8%A7%D9%84%D9%8A%D8%A9.jpg"
            alt="NTU Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-white mb-6">تسجيل الدخول</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              id="email"
              placeholder="البريد الإلكتروني"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Input
              id="password"
              placeholder="كلمة المرور"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            type="submit"
          >
            تسجيل الدخول
          </Button>
        </form>
      </div>
    </div>
  )
}

