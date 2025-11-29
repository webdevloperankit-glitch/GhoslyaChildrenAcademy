"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useStore, type Course } from "@/lib/store"
import { toast } from "sonner"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter()
  const { currentUser, addToCart, cart } = useStore()

  const handleAddToCart = () => {
    if (!currentUser) {
      toast.error("Please sign in to add to cart")
      router.push("/login")
      return
    }
    if (currentUser.role === "admin") {
      toast.error("Admin cannot purchase courses")
      return
    }
    if (currentUser.enrolled.includes(course.id)) {
      toast.error("You already own this course")
      return
    }
    if (cart.includes(course.id)) {
      toast.info("Already in cart")
      return
    }
    addToCart(course.id)
    toast.success("Added to cart")
  }

  const handleBuyNow = () => {
    if (!currentUser) {
      toast.error("Please sign in to purchase")
      router.push("/login")
      return
    }
    if (currentUser.role === "admin") {
      toast.error("Admin cannot purchase courses")
      return
    }
    if (currentUser.enrolled.includes(course.id)) {
      toast.error("You already own this course")
      return
    }
    addToCart(course.id)
    router.push(`/checkout?type=direct&id=${course.id}`)
  }

  return (
    <Card className="bg-card border-border overflow-hidden transition-all hover:-translate-y-2 hover:border-primary hover:shadow-[0_0_10px_rgba(255,0,51,0.5)] group">
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <CardContent className="p-5">
        <span className="text-primary text-xs font-bold uppercase tracking-wider">{course.category}</span>
        <h3 className="text-lg font-semibold mt-2 mb-4">{course.title}</h3>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">₹{course.discount}</span>
          <span className="text-muted-foreground line-through text-sm">₹{course.price}</span>
        </div>
      </CardContent>
      <div className="flex gap-2 p-4 pt-0 border-t border-border bg-secondary/30">
        <Button
          variant="outline"
          className="flex-1 border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/10 bg-transparent"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button
          className="flex-1 bg-primary text-primary-foreground hover:bg-foreground hover:text-primary neon-glow"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </Card>
  )
}
