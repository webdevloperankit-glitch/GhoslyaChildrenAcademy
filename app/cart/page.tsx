"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store"

export default function CartPage() {
  const router = useRouter()
  const { cart, courses, removeFromCart, currentUser } = useStore()

  const cartItems = courses.filter((c) => cart.includes(c.id))
  const total = cartItems.reduce((sum, item) => sum + item.discount, 0)

  const handleCheckout = () => {
    if (!currentUser) {
      router.push("/login")
      return
    }
    router.push("/checkout?type=cart")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[90px] pb-16">
        <div className="max-w-2xl mx-auto px-5">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-8">
            Your <span className="text-primary neon-text">Bag</span>
          </h1>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-4 border-b border-border last:border-b-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-primary text-sm">₹{item.discount}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Total:</h3>
                      <span className="text-2xl font-bold text-primary neon-text">₹{total}</span>
                    </div>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-foreground hover:text-primary neon-glow py-6"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-12">Your cart is empty.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
