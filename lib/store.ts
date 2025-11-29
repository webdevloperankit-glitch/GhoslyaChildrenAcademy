"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Course {
  id: number
  title: string
  category: string
  price: number
  discount: number
  image: string
  contentUrl: string
}

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: "user" | "admin"
  enrolled: number[]
}

interface StoreState {
  courses: Course[]
  users: User[]
  cart: number[]
  currentUser: User | null
  stats: { visits: number; revenue: number }

  // Actions
  setCourses: (courses: Course[]) => void
  addCourse: (course: Course) => void
  deleteCourse: (id: number) => void

  addToCart: (courseId: number) => void
  removeFromCart: (courseId: number) => void
  clearCart: () => void

  login: (email: string, password: string) => User | null
  register: (name: string, email: string, password: string) => User | null
  logout: () => void
  updateProfile: (name: string, password?: string) => void

  enrollCourse: (courseId: number) => void
  enrollCourses: (courseIds: number[]) => void

  addRevenue: (amount: number) => void
  incrementVisits: () => void

  deleteUser: (email: string) => void
}

const defaultCourses: Course[] = [
  {
    id: 1,
    title: "Cinematic Video Editing",
    category: "Editing",
    price: 5000,
    discount: 999,
    image: "/video-editing-timeline.png",
    contentUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Game Development Masterclass",
    category: "Coding",
    price: 8000,
    discount: 1499,
    image: "/game-development-unity-3d.jpg",
    contentUrl: "https://example.com",
  },
  {
    id: 3,
    title: "Cyber Security Fundamentals",
    category: "Tech",
    price: 4000,
    discount: 499,
    image: "/cyber-security-hacking-code.jpg",
    contentUrl: "https://example.com",
  },
  {
    id: 4,
    title: "Full Stack Web Development",
    category: "Coding",
    price: 6000,
    discount: 1299,
    image: "/web-development-code-screen.jpg",
    contentUrl: "https://example.com",
  },
  {
    id: 5,
    title: "Motion Graphics Pro",
    category: "Editing",
    price: 4500,
    discount: 799,
    image: "/motion-graphics-after-effects.jpg",
    contentUrl: "https://example.com",
  },
  {
    id: 6,
    title: "AI & Machine Learning",
    category: "Tech",
    price: 7000,
    discount: 1599,
    image: "/ai-neural-network.png",
    contentUrl: "https://example.com",
  },
]

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      courses: defaultCourses,
      users: [],
      cart: [],
      currentUser: null,
      stats: { visits: 0, revenue: 0 },

      setCourses: (courses) => set({ courses }),

      addCourse: (course) =>
        set((state) => ({
          courses: [...state.courses, course],
        })),

      deleteCourse: (id) =>
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
        })),

      addToCart: (courseId) => {
        const { cart, currentUser, courses } = get()
        if (currentUser?.role === "admin") return
        if (currentUser?.enrolled.includes(courseId)) return
        if (cart.includes(courseId)) return
        set({ cart: [...cart, courseId] })
      },

      removeFromCart: (courseId) =>
        set((state) => ({
          cart: state.cart.filter((id) => id !== courseId),
        })),

      clearCart: () => set({ cart: [] }),

      login: (email, password) => {
        const { users } = get()
        // Admin login
        if (email === "dayalgrowup@gmail.com" && password === "ankit@2009") {
          const admin: User = { id: 0, name: "Admin", email, password, role: "admin", enrolled: [] }
          set({ currentUser: admin })
          return admin
        }
        // User login
        const user = users.find((u) => u.email === email && u.password === password)
        if (user) {
          set({ currentUser: user })
          return user
        }
        return null
      },

      register: (name, email, password) => {
        const { users } = get()
        if (users.find((u) => u.email === email)) return null
        const newUser: User = {
          id: Date.now(),
          name,
          email,
          password,
          role: "user",
          enrolled: [],
        }
        set({ users: [...users, newUser], currentUser: newUser })
        return newUser
      },

      logout: () => set({ currentUser: null }),

      updateProfile: (name, password) => {
        const { currentUser, users } = get()
        if (!currentUser) return
        const updatedUser = { ...currentUser, name, ...(password && { password }) }
        const updatedUsers = users.map((u) => (u.email === currentUser.email ? updatedUser : u))
        set({ currentUser: updatedUser, users: updatedUsers })
      },

      enrollCourse: (courseId) => {
        const { currentUser, users, cart } = get()
        if (!currentUser || currentUser.role === "admin") return
        if (currentUser.enrolled.includes(courseId)) return

        const updatedUser = { ...currentUser, enrolled: [...currentUser.enrolled, courseId] }
        const updatedUsers = users.map((u) => (u.email === currentUser.email ? updatedUser : u))
        const updatedCart = cart.filter((id) => id !== courseId)
        set({ currentUser: updatedUser, users: updatedUsers, cart: updatedCart })
      },

      enrollCourses: (courseIds) => {
        const { currentUser, users } = get()
        if (!currentUser || currentUser.role === "admin") return

        const newEnrolled = [...new Set([...currentUser.enrolled, ...courseIds])]
        const updatedUser = { ...currentUser, enrolled: newEnrolled }
        const updatedUsers = users.map((u) => (u.email === currentUser.email ? updatedUser : u))
        set({ currentUser: updatedUser, users: updatedUsers, cart: [] })
      },

      addRevenue: (amount) =>
        set((state) => ({
          stats: { ...state.stats, revenue: state.stats.revenue + amount },
        })),

      incrementVisits: () =>
        set((state) => ({
          stats: { ...state.stats, visits: state.stats.visits + 1 },
        })),

      deleteUser: (email) =>
        set((state) => ({
          users: state.users.filter((u) => u.email !== email),
        })),
    }),
    {
      name: "growup-academy-store",
    },
  ),
)
