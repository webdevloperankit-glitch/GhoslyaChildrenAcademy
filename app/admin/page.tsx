"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, BookOpen, Users, Settings, Trash2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type AdminTab = "dashboard" | "courses" | "users" | "settings"

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard")
  const { currentUser, courses, users, stats, addCourse, deleteCourse, deleteUser } = useStore()

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      router.push("/login")
    }
  }, [currentUser, router])

  if (!currentUser || currentUser.role !== "admin") return null

  const handleAddCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newCourse = {
      id: Date.now(),
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      price: Number.parseInt(formData.get("price") as string),
      discount: Number.parseInt(formData.get("discount") as string),
      image: formData.get("image") as string,
      contentUrl: formData.get("contentUrl") as string,
    }

    addCourse(newCourse)
    toast.success("Course published successfully!")
    e.currentTarget.reset()
  }

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "courses" as const, label: "Courses", icon: BookOpen },
    { id: "users" as const, label: "Users", icon: Users },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[90px] pb-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <Card className="lg:w-64 bg-card border-border shrink-0">
              <CardHeader>
                <CardTitle className="text-lg">Command Center</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul>
                  {tabs.map((tab) => (
                    <li
                      key={tab.id}
                      className={cn(
                        "flex items-center gap-3 px-6 py-3 cursor-pointer border-b border-border text-muted-foreground hover:text-foreground hover:pl-8 hover:border-l-2 hover:border-l-primary transition-all",
                        activeTab === tab.id && "text-foreground border-l-2 border-l-primary pl-8",
                      )}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Content */}
            <Card className="flex-1 bg-card border-border">
              <CardContent className="p-6">
                {/* Dashboard Tab */}
                {activeTab === "dashboard" && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">Analytics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="bg-background border-border">
                        <CardContent className="p-6 text-center">
                          <h3 className="text-muted-foreground mb-2">Visits</h3>
                          <span className="text-3xl font-bold text-primary neon-text">{stats.visits}</span>
                        </CardContent>
                      </Card>
                      <Card className="bg-background border-border">
                        <CardContent className="p-6 text-center">
                          <h3 className="text-muted-foreground mb-2">Users</h3>
                          <span className="text-3xl font-bold text-primary neon-text">{users.length}</span>
                        </CardContent>
                      </Card>
                      <Card className="bg-background border-border">
                        <CardContent className="p-6 text-center">
                          <h3 className="text-muted-foreground mb-2">Revenue</h3>
                          <span className="text-3xl font-bold text-primary neon-text">₹{stats.revenue}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Courses Tab */}
                {activeTab === "courses" && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">Manage Content</h2>
                    <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <Input
                        name="title"
                        placeholder="Title"
                        required
                        className="bg-background border-border focus:border-primary"
                      />
                      <Input
                        name="category"
                        placeholder="Category"
                        required
                        className="bg-background border-border focus:border-primary"
                      />
                      <Input
                        name="price"
                        type="number"
                        placeholder="Price"
                        required
                        className="bg-background border-border focus:border-primary"
                      />
                      <Input
                        name="discount"
                        type="number"
                        placeholder="Discount Price"
                        required
                        className="bg-background border-border focus:border-primary"
                      />
                      <Input
                        name="image"
                        placeholder="Image URL"
                        required
                        className="bg-background border-border focus:border-primary"
                      />
                      <Input
                        name="contentUrl"
                        placeholder="Hidden Content URL"
                        required
                        className="bg-background border-border focus:border-primary"
                      />
                      <div className="md:col-span-2">
                        <Button
                          type="submit"
                          className="bg-primary text-primary-foreground hover:bg-foreground hover:text-primary neon-glow"
                        >
                          Publish
                        </Button>
                      </div>
                    </form>
                    <div className="border-t border-border pt-6">
                      <h3 className="font-semibold mb-4">Existing Courses</h3>
                      {courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex justify-between items-center py-3 px-4 border-b border-border text-muted-foreground hover:bg-secondary/20"
                        >
                          <span>{course.title}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-destructive"
                            onClick={() => {
                              deleteCourse(course.id)
                              toast.success("Course deleted")
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">User Database</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 text-primary">Name</th>
                            <th className="text-left py-3 px-4 text-primary">Email</th>
                            <th className="text-left py-3 px-4 text-primary">Courses</th>
                            <th className="text-left py-3 px-4 text-primary">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id} className="border-b border-border">
                              <td className="py-3 px-4">{user.name}</td>
                              <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                              <td className="py-3 px-4 text-muted-foreground">{user.enrolled.length}</td>
                              <td className="py-3 px-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-primary hover:text-destructive"
                                  onClick={() => {
                                    deleteUser(user.email)
                                    toast.success("User deleted")
                                  }}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                          {users.length === 0 && (
                            <tr>
                              <td colSpan={4} className="py-8 text-center text-muted-foreground">
                                No users registered yet
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6">Configuration</h2>
                    <Card className="bg-background border-border">
                      <CardContent className="p-6">
                        <p className="text-muted-foreground mb-4">
                          Admin Email: <span className="text-foreground">dayalgrowup@gmail.com</span>
                        </p>
                        <p className="text-muted-foreground mb-6">
                          All order and contact notifications are sent to:{" "}
                          <span className="text-primary">webdevloperankit@gmail.com</span>
                        </p>
                        <Button
                          variant="outline"
                          className="border-border text-muted-foreground hover:border-destructive hover:text-destructive bg-transparent"
                          onClick={() => {
                            if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
                              localStorage.clear()
                              window.location.reload()
                            }
                          }}
                        >
                          Factory Reset
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
