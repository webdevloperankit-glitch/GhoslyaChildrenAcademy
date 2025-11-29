"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { toast } from "sonner"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const { cart, courses, currentUser, enrollCourses, addRevenue, clearCart } = useStore()

  const type = searchParams.get("type")
  const directId = searchParams.get("id")

  // Calculate order details
  let orderItems: number[] = []
  let orderDesc = ""
  let orderTotal = 0

  if (type === "direct" && directId) {
    const course = courses.find((c) => c.id === Number.parseInt(directId))
    if (course) {
      orderItems = [course.id]
      orderDesc = course.title
      orderTotal = course.discount
    }
  } else {
    orderItems = cart
    const cartCourses = courses.filter((c) => cart.includes(c.id))
    orderDesc = `${cart.length} Courses`
    orderTotal = cartCourses.reduce((sum, c) => sum + c.discount, 0)
  }

  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
    }
  }, [currentUser, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!currentUser) return

    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const billingDetails = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    }

    try {
      // Send order email notification
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: `${billingDetails.firstName} ${billingDetails.lastName}`,
            email: currentUser.email,
            phone: billingDetails.phone,
            address: billingDetails.address,
          },
          order: {
            items: orderItems,
            description: orderDesc,
            amount: orderTotal,
          },
          courses: courses.filter((c) => orderItems.includes(c.id)).map((c) => c.title),
        }),
      })

      const result = await response.json()

      // Complete the order locally
      enrollCourses(orderItems)
      addRevenue(orderTotal)
      if (type === "cart") clearCart()

      toast.success("Payment successful! Order completed.")
      router.push("/my-courses")
    } catch (error) {
      console.error("Order error:", error)
      toast.error("Failed to process order. Please try again.")
    }

    setIsLoading(false)
  }

  if (!currentUser) return null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[90px] pb-16">
        <div className="max-w-xl mx-auto px-5">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-8">
            Billing <span className="text-primary neon-text">Details</span>
          </h1>
          <Card className="bg-card border-border shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">Order Summary</CardTitle>
              <p className="text-muted-foreground">{orderDesc}</p>
              <p className="text-3xl font-bold text-primary neon-text mt-2">₹{orderTotal}</p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="border-t border-border pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      required
                      className="bg-background border-border focus:border-primary py-5"
                    />
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      required
                      className="bg-background border-border focus:border-primary py-5"
                    />
                  </div>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Mobile Number"
                    required
                    className="bg-background border-border focus:border-primary py-5"
                  />
                  <Input
                    name="address"
                    placeholder="Full Address"
                    required
                    className="bg-background border-border focus:border-primary py-5"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-foreground hover:text-primary neon-glow py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Pay & Complete Order"}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
