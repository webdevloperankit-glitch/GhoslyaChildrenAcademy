"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { toast } from "sonner"

export default function ProfilePage() {
  const router = useRouter()
  const { currentUser, updateProfile } = useStore()

  useEffect(() => {
    if (!currentUser || currentUser.role === "admin") {
      router.push("/login")
    }
  }, [currentUser, router])

  if (!currentUser) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const password = formData.get("password") as string

    updateProfile(name, password || undefined)
    toast.success("Profile updated successfully")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[90px] pb-16">
        <div className="max-w-lg mx-auto px-5">
          <Card className="bg-card border-border overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <div className="h-28 bg-gradient-to-r from-background to-primary/50" />
            <div className="flex justify-center -mt-14">
              <div className="w-28 h-28 bg-background rounded-full border-4 border-card flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
            </div>
            <CardContent className="pt-4 pb-8 px-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
              <span className="inline-block bg-secondary text-primary px-4 py-1 rounded-full text-sm border border-primary mb-8">
                MEMBER
              </span>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  name="name"
                  placeholder="Display Name"
                  defaultValue={currentUser.name}
                  required
                  className="bg-background border-border focus:border-primary py-5"
                />
                <Input
                  name="email"
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="bg-background border-border py-5 opacity-50"
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="New Password (leave blank to keep)"
                  className="bg-background border-border focus:border-primary py-5"
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-foreground hover:text-primary neon-glow py-6"
                >
                  Update Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
