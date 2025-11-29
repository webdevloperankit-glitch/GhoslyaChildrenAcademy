"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, register } = useStore()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const user = login(email.toLowerCase(), password)
    if (user) {
      toast.success("Welcome back!")
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } else {
      toast.error("Invalid credentials")
    }
    setIsLoading(false)
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const user = register(name, email.toLowerCase(), password)
    if (user) {
      toast.success("Account created successfully!")
      router.push("/")
    } else {
      toast.error("Email already registered")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-5">
      <Card className="w-full max-w-md bg-card border-border shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-muted transition-colors">
        <CardHeader className="text-center pb-2">
          <Link href="/" className="flex items-center justify-center gap-2 text-xl font-extrabold mb-4">
            <PlayCircle className="h-7 w-7 text-primary neon-text" />
            <span>
              GrowUp<span className="text-primary">Academy</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold">Welcome</h2>
          <div className="flex mt-4 bg-background p-1 rounded">
            <button
              className={cn(
                "flex-1 py-2 font-bold transition-all rounded",
                mode === "login" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={cn(
                "flex-1 py-2 font-bold transition-all rounded",
                mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
              onClick={() => setMode("signup")}
            >
              Register
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="bg-background border-border focus:border-primary pl-4 py-6"
                />
              </div>
              <div className="relative">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="bg-background border-border focus:border-primary pl-4 py-6"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-foreground hover:text-primary neon-glow py-6"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Access Account"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="relative">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="bg-background border-border focus:border-primary pl-4 py-6"
                />
              </div>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="bg-background border-border focus:border-primary pl-4 py-6"
                />
              </div>
              <div className="relative">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="bg-background border-border focus:border-primary pl-4 py-6"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-foreground hover:text-primary neon-glow py-6"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
