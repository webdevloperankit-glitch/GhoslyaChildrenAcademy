import { Navigation } from "@/components/navigation"
import { ScrollingBanner } from "@/components/scrolling-banner"
import { EventsGallery } from "@/components/events-gallery"
import { UpcomingEvents } from "@/components/upcoming-events"
import { Footer } from "@/components/footer"

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <ScrollingBanner />
      <Navigation />

      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">School Events & Activities</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Discover the vibrant life at Ghoslya Childrens Academy through our diverse range of educational, cultural,
              and recreational events that enrich our students' learning experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <EventsGallery />
            </div>
            <div className="lg:col-span-1">
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
