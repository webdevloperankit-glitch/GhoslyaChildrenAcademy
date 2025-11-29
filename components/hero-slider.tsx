"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()
  const { courses, currentUser, addToCart } = useStore()

  const sliderCourses = courses.slice(0, 3)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderCourses.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [sliderCourses.length])

  const handleBuyNow = (courseId: number) => {
    if (!currentUser) {
      router.push("/login")
      return
    }
    addToCart(courseId)
    router.push(`/checkout?type=direct&id=${courseId}`)
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden mb-12">
      {sliderCourses.map((course, index) => (
        <div
          key={course.id}
          className={cn(
            "absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 flex items-center pl-[5%]",
            index === currentSlide ? "opacity-100" : "opacity-0",
          )}
          style={{ backgroundImage: `url(${course.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className={cn("relative z-10 max-w-xl", index === currentSlide && "animate-slide-in")}>
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">Master {course.category} with our expert-led course.</p>
            <Button
              className="bg-primary text-primary-foreground hover:bg-foreground hover:text-primary neon-glow transition-all"
              onClick={() => handleBuyNow(course.id)}
            >
              Buy Now ₹{course.discount}
            </Button>
          </div>
        </div>
      ))}

      {/* Slider Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {sliderCourses.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentSlide ? "bg-primary neon-glow" : "bg-muted-foreground/50",
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
