"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cart, currentUser, logout } = useStore()

  const isAdmin = currentUser?.role === "admin"

  const navLinks = [
    { href: "/", label: "Home" },
    ...(currentUser && !isAdmin ? [{ href: "/my-courses", label: "My Content" }] : []),
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
    ...(currentUser && !isAdmin ? [{ href: "/profile", label: "Profile" }] : []),
  ]

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-5">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold">
          <PlayCircle className="h-7 w-7 text-primary neon-text" />
          <span>
            GrowUp<span className="text-primary">Academy</span>
          </span>
        </Link>

        <button className="md:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        <ul
          className={cn(
            "md:flex items-center gap-6",
            mobileMenuOpen
              ? "flex flex-col absolute top-[70px] left-0 w-full bg-card p-5 border-b border-primary"
              : "hidden",
          )}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "font-medium text-muted-foreground hover:text-primary transition-colors uppercase text-sm tracking-wider",
                  pathname === link.href && "text-primary neon-text",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {!isAdmin && (
            <li>
              <Link
                href="/cart"
                className="flex items-center gap-1 font-medium text-muted-foreground hover:text-primary transition-colors uppercase text-sm tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-4 w-4" />
                Cart
                {cart.length > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5">{cart.length}</Badge>
                )}
              </Link>
            </li>
          )}

          <li>
            {currentUser ? (
              <Button
                variant="outline"
                className="border-border text-muted-foreground hover:border-foreground hover:text-foreground bg-transparent"
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground neon-glow bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
