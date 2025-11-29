"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Download } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore, type Course } from "@/lib/store"

export default function PlayerPage() {
  const router = useRouter()
  const params = useParams()
  const { currentUser, courses } = useStore()
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
      return
    }

    const courseId = Number.parseInt(params.id as string)
    const foundCourse = courses.find((c) => c.id === courseId)

    if (!foundCourse || !currentUser.enrolled.includes(courseId)) {
      router.push("/my-courses")
      return
    }

    setCourse(foundCourse)
  }, [currentUser, courses, params.id, router])

  if (!course) return null

  const isYoutube = course.contentUrl.includes("youtube")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[90px] pb-16">
        <div className="max-w-4xl mx-auto px-5">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary mb-6"
            onClick={() => router.push("/my-courses")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Library
          </Button>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-background rounded-lg overflow-hidden mb-6">
                {isYoutube ? (
                  <iframe
                    src={course.contentUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    External Content - Access via download link
                  </div>
                )}
              </div>
              <a
                href={course.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all font-bold"
              >
                <Download className="h-4 w-4" /> Download Assets
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
