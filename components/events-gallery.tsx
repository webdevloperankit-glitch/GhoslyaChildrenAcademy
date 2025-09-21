"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Play } from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
  location: string
  category: string
  description: string
  image: string
  isVideo?: boolean
  participants?: number
}

export function EventsGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const events: Event[] = [
    {
      id: "1",
      title: "Annual Sports Day 2024",
      date: "March 15, 2024",
      location: "School Playground",
      category: "sports",
      description:
        "Students showcased their athletic talents in various sports competitions including track and field events.",
      image: "/placeholder-bbvn9.png",
      participants: 250,
    },
    {
      id: "2",
      title: "Science Exhibition",
      date: "February 28, 2024",
      location: "Science Laboratory",
      category: "academic",
      description: "Young scientists presented innovative projects and experiments to parents and fellow students.",
      image: "/school-science-fair-exhibition-projects.jpg",
      participants: 180,
    },
    {
      id: "3",
      title: "Cultural Dance Performance",
      date: "January 20, 2024",
      location: "School Auditorium",
      category: "cultural",
      description: "Students performed traditional and contemporary dances celebrating our rich cultural heritage.",
      image: "/placeholder-8xzt8.png",
      isVideo: true,
      participants: 120,
    },
    {
      id: "4",
      title: "Art & Craft Workshop",
      date: "January 10, 2024",
      location: "Art Room",
      category: "creative",
      description: "Creative minds came together to create beautiful artwork and handicrafts using various materials.",
      image: "/placeholder-uwg3d.png",
      participants: 85,
    },
    {
      id: "5",
      title: "Inter-School Quiz Competition",
      date: "December 15, 2023",
      location: "Main Hall",
      category: "academic",
      description: "Our students competed against other schools in a challenging quiz covering various subjects.",
      image: "/placeholder-q0mla.png",
      participants: 60,
    },
    {
      id: "6",
      title: "Music Concert",
      date: "November 25, 2023",
      location: "School Auditorium",
      category: "cultural",
      description: "A melodious evening featuring vocal and instrumental performances by our talented students.",
      image: "/placeholder-2xkge.png",
      isVideo: true,
      participants: 200,
    },
  ]

  const categories = [
    { id: "all", label: "All Events" },
    { id: "sports", label: "Sports" },
    { id: "academic", label: "Academic" },
    { id: "cultural", label: "Cultural" },
    { id: "creative", label: "Creative" },
  ]

  const filteredEvents =
    selectedCategory === "all" ? events : events.filter((event) => event.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="rounded-full"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {event.isVideo && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                </div>
              )}
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                {categories.find((cat) => cat.id === event.category)?.label}
              </Badge>
            </div>

            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-balance">{event.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{event.description}</p>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                {event.participants && (
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{event.participants} participants</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No events found in this category.</p>
        </div>
      )}
    </div>
  )
}
