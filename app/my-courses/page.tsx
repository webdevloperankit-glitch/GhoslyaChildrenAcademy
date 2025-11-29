"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Play } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store"

export default function MyCoursesPage() {
  const router = useRouter()
  const { currentUser, courses } = useStore()

  useEffect(() => {
    if (!currentUser || currentUser.role === "admin") {
      router.push("/login")
    }
  }, [currentUser, router])

  if (!currentUser) return null

  const myCourses = courses.filter((c) => currentUser.enrolled.includes(c.id))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[90px] pb-16">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-8">
            My <span className="text-primary neon-text">Library</span>
          </h1>
          {myCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myCourses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-card border-border overflow-hidden hover:border-primary hover:shadow-[0_0_10px_rgba(255,0,51,0.5)] transition-all"
                >
                  <div className="relative h-[200px]">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold mb-4">{course.title}</h3>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-foreground hover:text-primary neon-glow"
                      onClick={() => router.push(`/player/${course.id}`)}
                    >
                      <Play className="h-4 w-4 mr-2" /> Launch
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-16">No courses purchased yet. Start learning today!</p>
          )}
        </div>
      </main>
    </div>
  )
}
