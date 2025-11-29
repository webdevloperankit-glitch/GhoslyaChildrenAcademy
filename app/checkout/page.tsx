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
import { Shield, CheckCircle, Smartphone, ArrowRight, Copy } from "lucide-react"
import Image from "next/image"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"details" | "payment" | "confirm">("details")
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  })
  const [transactionId, setTransactionId] = useState("")
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

  const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setBillingDetails({
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    })
    setStep("payment")
  }

  const handlePaymentConfirm = async () => {
    if (!transactionId.trim()) {
      toast.error("Please enter your UPI Transaction ID")
      return
    }

    if (!currentUser) return

    setIsLoading(true)

    try {
      // Send email notification about the order
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
            transactionId: transactionId,
            paymentMethod: "PhonePe UPI",
          },
          courses: courses.filter((c) => orderItems.includes(c.id)).map((c) => c.title),
        }),
      })

      // Enroll user in courses
      enrollCourses(orderItems)
      addRevenue(orderTotal)
      if (type === "cart") clearCart()

      setStep("confirm")
      toast.success("Payment confirmed! Courses added to your library.")
    } catch (error) {
      console.error("Order error:", error)
      toast.error("Failed to process order. Please contact support.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyUPI = () => {
    navigator.clipboard.writeText("webdevloperankit@ybl")
    toast.success("UPI ID copied!")
  }

  if (!currentUser) return null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[90px] pb-16">
        <div className="max-w-xl mx-auto px-5">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-8">
            {step === "confirm" ? (
              <>
                Payment <span className="text-primary neon-text">Successful</span>
              </>
            ) : (
              <>
                Billing <span className="text-primary neon-text">Details</span>
              </>
            )}
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "details" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"}`}
            >
              1
            </div>
            <div className={`w-12 h-1 ${step !== "details" ? "bg-primary" : "bg-border"}`} />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "payment" ? "bg-primary text-primary-foreground" : step === "confirm" ? "bg-primary/20 text-primary" : "bg-border text-muted-foreground"}`}
            >
              2
            </div>
            <div className={`w-12 h-1 ${step === "confirm" ? "bg-primary" : "bg-border"}`} />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "confirm" ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground"}`}
            >
              3
            </div>
          </div>

          <Card className="bg-card border-border shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">Order Summary</CardTitle>
              <p className="text-muted-foreground">{orderDesc}</p>
              <p className="text-3xl font-bold text-primary neon-text mt-2">₹{orderTotal}</p>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Step 1: Billing Details */}
              {step === "details" && (
                <>
                  <div className="flex items-center justify-center gap-4 mb-6 text-muted-foreground text-sm">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Smartphone className="w-4 h-4" />
                      <span>PhonePe</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <form onSubmit={handleDetailsSubmit} className="space-y-4">
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
                      >
                        Continue to Payment <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </div>
                </>
              )}

              {/* Step 2: QR Code Payment */}
              {step === "payment" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Scan the QR code with PhonePe, Google Pay, or any UPI app
                    </p>

                    {/* QR Code Image */}
                    <div className="bg-white p-4 rounded-xl inline-block mx-auto mb-4">
                      <Image
                        src="/phonepe-upi-qr-code-payment.jpg"
                        alt="PhonePe QR Code"
                        width={250}
                        height={250}
                        className="rounded-lg"
                      />
                    </div>

                    {/* UPI ID */}
                    <div className="flex items-center justify-center gap-2 bg-background border border-border rounded-lg p-3 max-w-xs mx-auto">
                      <span className="text-sm font-mono">webdevloperankit@ybl</span>
                      <button onClick={copyUPI} className="text-primary hover:text-primary/80">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-primary font-bold text-lg mt-4">Amount: ₹{orderTotal}</p>
                  </div>

                  <div className="border-t border-border pt-6 space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      After payment, enter your UPI Transaction ID below
                    </p>

                    <Input
                      placeholder="Enter UPI Transaction ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="bg-background border-border focus:border-primary py-5"
                    />

                    <Button
                      onClick={handlePaymentConfirm}
                      className="w-full bg-primary text-primary-foreground hover:bg-foreground hover:text-primary neon-glow py-6"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "I Have Paid - Confirm Payment"}
                    </Button>

                    <button
                      onClick={() => setStep("details")}
                      className="w-full text-muted-foreground text-sm hover:text-foreground"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {step === "confirm" && (
                <div className="text-center py-8 space-y-6">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                    <p className="text-muted-foreground">
                      Your payment has been received. Your courses are now available in your library.
                    </p>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-4 text-left space-y-2">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Name:</span> {billingDetails.firstName}{" "}
                      {billingDetails.lastName}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Transaction ID:</span> {transactionId}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Amount Paid:</span> ₹{orderTotal}
                    </p>
                  </div>

                  <Button
                    onClick={() => router.push("/my-courses")}
                    className="w-full bg-primary text-primary-foreground hover:bg-foreground hover:text-primary neon-glow py-6"
                  >
                    Go to My Courses <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
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
