"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSlider } from "@/components/hero-slider"
import { CourseCard } from "@/components/course-card"
import { useStore } from "@/lib/store"

export default function HomePage() {
  const { courses, incrementVisits } = useStore()

  useEffect(() => {
    incrementVisits()
  }, [incrementVisits])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[70px]">
        <HeroSlider />
        <div className="max-w-7xl mx-auto px-5 pb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold uppercase tracking-wider">
              Trending <span className="text-primary neon-text">Now</span>
            </h2>
            <p className="text-muted-foreground mt-2">Exclusive content for elite learners.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
