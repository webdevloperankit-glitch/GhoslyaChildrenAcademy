import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock } from "lucide-react"

export function UpcomingEvents() {
  const upcomingEvents = [
    {
      title: "Parent-Teacher Meeting",
      date: "December 20, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "School Premises",
      description: "Individual meetings to discuss student progress and development.",
    },
    {
      title: "Winter Carnival",
      date: "December 25, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "School Playground",
      description: "Fun-filled day with games, food stalls, and entertainment for the whole family.",
    },
    {
      title: "New Year Celebration",
      date: "January 1, 2025",
      time: "11:00 AM - 1:00 PM",
      location: "School Auditorium",
      description: "Welcome the new year with cultural performances and refreshments.",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="border-l-4 border-primary pl-6 pb-6 last:pb-0">
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <p className="text-muted-foreground mb-3 leading-relaxed">{event.description}</p>

              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <Button variant="outline" className="w-full bg-transparent">
            View All Upcoming Events
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
